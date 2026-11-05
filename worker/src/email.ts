// Modèle de l'e-mail envoyé quand quelqu'un remplit le formulaire du portfolio.
// HTML en tableaux et styles en ligne : c'est ce que les messageries (Gmail, Outlook, Apple Mail) affichent de façon fiable.
// Tout ce qui vient du visiteur passe par esc() : il ne peut pas injecter de HTML.

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  receivedAt: Date;
}

const SITE_URL = 'https://flomtz2312.github.io/portfolio/';

// Couleurs du portfolio (thème Obsidienne)
const C = {
  page: '#eceef2',
  card: '#ffffff',
  ink: '#111318',
  soft: '#4a505c',
  muted: '#7a808c',
  line: '#e3e6eb',
  well: '#f5f7f9',
  head: '#08090c',
  headMuted: '#8a909c',
  mint: '#1f9a6e',
  mintBright: '#59f0a8',
  ice: '#a9dcff',
};

const FONT = "'Geist', 'Helvetica Neue', Helvetica, Arial, sans-serif";
const MONO = "'Geist Mono', ui-monospace, Menlo, Consolas, monospace";
const DISPLAY = "'Michroma', 'Eurostile', 'Arial Black', Arial, sans-serif";

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}

function frDate(d: Date): string {
  try {
    return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Europe/Paris' }).format(d);
  } catch {
    return d.toISOString();
  }
}

export function renderContactEmail(m: ContactMessage): { subject: string; html: string; text: string } {
  const firstName = m.name.split(/\s+/)[0] || m.name;
  const date = frDate(m.receivedAt);
  const subject = `Nouveau message de ${m.name} · Portfolio`;
  const replyHref = `mailto:${esc(m.email)}?subject=${encodeURIComponent('Re: ton message sur mon portfolio')}`;
  // Le message garde ses retours à la ligne.
  const body = esc(m.message).replace(/\r?\n/g, '<br>');
  const preheader = esc(`${m.name} : ${m.message.replace(/\s+/g, ' ').slice(0, 110)}`);

  const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(subject)}</title>
<style>
  @media (max-width: 620px) {
    .card { width: 100% !important; border-radius: 0 !important; }
    .pad { padding-left: 22px !important; padding-right: 22px !important; }
    .title { font-size: 22px !important; }
    .btn a { display: block !important; text-align: center !important; }
  }
  a { color: ${C.mint}; }
</style>
</head>
<body style="margin:0;padding:0;background:${C.page};-webkit-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.page};">
    <tr>
      <td align="center" style="padding:32px 12px;">
        <table role="presentation" class="card" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:${C.card};border-radius:18px;overflow:hidden;">

          <!-- En-tête sombre, comme le site -->
          <tr>
            <td class="pad" style="background:${C.head};padding:22px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:${DISPLAY};font-size:15px;letter-spacing:3px;color:#ffffff;">F/M</td>
                  <td align="right" style="font-family:${MONO};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${C.headMuted};">
                    <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${C.mintBright};margin-right:6px;vertical-align:middle;"></span>Formulaire de contact
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr><td style="height:3px;line-height:3px;font-size:0;background:${C.mintBright};background-image:linear-gradient(90deg,${C.mintBright},${C.ice});">&nbsp;</td></tr>

          <!-- Titre -->
          <tr>
            <td class="pad" style="padding:34px 32px 8px;">
              <div style="font-family:${MONO};font-size:11px;letter-spacing:1.6px;text-transform:uppercase;color:${C.mint};">Nouveau message</div>
              <h1 class="title" style="margin:10px 0 0;font-family:${FONT};font-size:26px;line-height:1.25;font-weight:600;color:${C.ink};">${esc(m.name)} t’a écrit depuis ton portfolio</h1>
            </td>
          </tr>

          <!-- Expéditeur et date -->
          <tr>
            <td class="pad" style="padding:18px 32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${C.line};border-bottom:1px solid ${C.line};">
                <tr>
                  <td style="padding:12px 0 6px;width:90px;font-family:${MONO};font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${C.muted};vertical-align:top;">De</td>
                  <td style="padding:12px 0 6px;font-family:${FONT};font-size:15px;color:${C.ink};">${esc(m.name)} · <a href="mailto:${esc(m.email)}" style="color:${C.mint};text-decoration:none;">${esc(m.email)}</a></td>
                </tr>
                <tr>
                  <td style="padding:6px 0 12px;width:90px;font-family:${MONO};font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${C.muted};vertical-align:top;">Reçu le</td>
                  <td style="padding:6px 0 12px;font-family:${FONT};font-size:15px;color:${C.soft};">${esc(date)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td class="pad" style="padding:24px 32px 0;">
              <div style="font-family:${MONO};font-size:11px;letter-spacing:1px;text-transform:uppercase;color:${C.muted};margin-bottom:10px;">Message</div>
              <div style="background:${C.well};border-radius:14px;padding:20px 22px;font-family:${FONT};font-size:16px;line-height:1.65;color:${C.ink};word-break:break-word;">${body}</div>
            </td>
          </tr>

          <!-- Bouton répondre -->
          <tr>
            <td class="pad btn" style="padding:28px 32px 34px;">
              <a href="${replyHref}" style="display:inline-block;background:${C.head};color:#ffffff;font-family:${FONT};font-size:15px;font-weight:600;text-decoration:none;padding:14px 26px;border-radius:999px;">Répondre à ${esc(firstName)} →</a>
              <div style="margin-top:12px;font-family:${FONT};font-size:13px;line-height:1.5;color:${C.muted};">Ou réponds simplement à ce mail : la réponse partira vers ${esc(m.email)}.</div>
            </td>
          </tr>

          <!-- Pied -->
          <tr>
            <td class="pad" style="padding:18px 32px;border-top:1px solid ${C.line};background:${C.well};">
              <div style="font-family:${MONO};font-size:11px;line-height:1.6;color:${C.muted};">
                Envoyé par le formulaire de <a href="${SITE_URL}" style="color:${C.muted};">flomtz2312.github.io/portfolio</a>, vérifié par Cloudflare Turnstile.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `Nouveau message depuis ton portfolio`,
    ``,
    `De : ${m.name} <${m.email}>`,
    `Reçu le : ${date}`,
    ``,
    m.message,
    ``,
    `—`,
    `Réponds à ce mail pour écrire à ${firstName}.`,
    `Formulaire de ${SITE_URL}`,
  ].join('\n');

  return { subject, html, text };
}
