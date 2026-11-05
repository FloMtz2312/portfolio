// Reçoit le formulaire de contact du portfolio, vérifie Turnstile puis envoie le message via Resend.
// La clé Resend ne quitte jamais ce Worker.

interface Env {
  RESEND_API_KEY: string; // secret
  TURNSTILE_SECRET: string; // secret
  TO_EMAIL: string; // secret : ta boîte de réception (pas dans le dépôt public)
  FROM_EMAIL: string; // expéditeur vérifié chez Resend
  ALLOWED_ORIGINS: string; // origines autorisées, séparées par des virgules
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const origin = req.headers.get('Origin') || '';
    const allowed = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());
    const cors: Record<string, string> = allowed.includes(origin)
      ? { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'POST', Vary: 'Origin' }
      : {};
    const reply = (status: number, error?: string, codes?: string[]) =>
      Response.json(error ? { ok: false, error, ...(codes ? { codes } : {}) } : { ok: true }, { status, headers: cors });

    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (req.method !== 'POST') return reply(405, 'Méthode non autorisée.');
    if (!cors['Access-Control-Allow-Origin']) return reply(403, 'Origine non autorisée.');

    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      return reply(400, 'Requête invalide.');
    }
    const field = (k: string) => String(form.get(k) ?? '').trim();
    const name = field('name').replace(/[\r\n]+/g, ' ');
    const email = field('email');
    const message = field('message');

    // Champ piège invisible : un humain le laisse vide. On répond « ok » pour ne rien apprendre au robot.
    if (field('website')) return reply(200);

    if (!name || name.length > 100) return reply(400, 'Indique ton nom (100 caractères max).');
    if (!EMAIL.test(email) || email.length > 200) return reply(400, 'Adresse e-mail invalide.');
    if (message.length < 10 || message.length > 5000) return reply(400, 'Le message doit faire entre 10 et 5000 caractères.');

    const token = field('cf-turnstile-response');
    if (!token) return reply(400, 'Coche la case anti-robot avant d’envoyer (elle peut mettre quelques secondes à apparaître).', ['missing-input-response']);

    const check = new FormData();
    check.append('secret', (env.TURNSTILE_SECRET ?? '').trim());
    check.append('response', token);
    const ip = req.headers.get('CF-Connecting-IP');
    if (ip) check.append('remoteip', ip);
    const verdict = (await (await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: check })).json()) as {
      success: boolean;
      'error-codes'?: string[];
      hostname?: string;
    };
    if (!verdict.success) {
      // Codes Turnstile (non secrets) renvoyés pour le diagnostic, ex. invalid-input-secret = mauvaise clé secrète,
      // timeout-or-duplicate = jeton expiré ou déjà utilisé.
      const codes = verdict['error-codes'] ?? [];
      console.warn('Turnstile refusé', codes, verdict.hostname);
      return reply(403, 'Vérification anti-robot échouée, réessaie.', codes);
    }

    const sent = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${(env.RESEND_API_KEY ?? '').trim()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.FROM_EMAIL,
        to: [(env.TO_EMAIL ?? '').trim()],
        reply_to: email,
        subject: `Portfolio · message de ${name}`,
        text: `${name} <${email}>\n\n${message}`,
      }),
    });
    if (!sent.ok) {
      console.error('Resend', sent.status, await sent.text());
      return reply(502, 'L’envoi a échoué, écris-moi directement par e-mail.');
    }
    return reply(200);
  },
};
