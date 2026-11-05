// Informations générales du site. Tout le texte modifiable est ici ou dans projects.ts.

export const site = {
  name: 'Florian Martinez',
  initials: 'F/M',
  role: 'Développeur web',
  title: 'Florian Martinez · Développeur web',
  description:
    'Portfolio de Florian Martinez, développeur web full-stack depuis 2021 : plateformes de monitoring, tableaux de bord temps réel et sites vitrines. Disponible en CDI ou en freelance.',
  lead: 'Développeur web full-stack depuis 2021. Je conçois des applications web fiables, du serveur jusqu’à l’interface, et je les accompagne jusqu’en production.',

  // Badge en haut de page. Mettre `available: false` pour le masquer.
  availability: { available: true, label: 'Disponible maintenant · CDI ou freelance' },

  email: 'florian_martinez1@outlook.com',
  contactNote: 'Réponse sous 48 h.',

  // Formulaire de contact (Worker Cloudflare + Resend, voir worker/ et le README).
  // Tant que `endpoint` est vide, le formulaire est masqué. La clé de site Turnstile est publique.
  contactForm: {
    endpoint: 'https://portfolio.florian-martinez1.workers.dev',
    turnstileSiteKey: '0x4AAAAAAF1ZqhiD_d4apGiD',
  },

  // Liens affichés dans le pied de page. Laisser `href` vide pour masquer un lien.
  links: [
    { label: 'GitHub', href: 'https://github.com/FloMtz2312' },
    { label: 'LinkedIn', href: '' },
  ],
};

// Bloc « Profil ».
export const profile = {
  badge: 'Développeur depuis 2021',
  paragraphs: [
    'Développeur web full-stack depuis 2021, je suis diplômé d’une licence APIDAE à l’Université de Montpellier.',
    'Aujourd’hui développeur web chez Pyrescom, je développe la plateforme de monitoring des produits EPNRJ et BATNRJ, côté serveur comme côté interface.',
    'Je suis ouvert à un CDI en hybride comme à des missions freelance en télétravail.',
  ],
  stack: [
    { name: 'Go', use: 'back-end' },
    { name: 'Vue 3', use: 'front-end' },
    { name: 'Svelte', use: 'front-end' },
    { name: 'MySQL / SQLite', use: 'données' },
    { name: 'Docker', use: 'déploiement' },
    { name: 'Cloudflare', use: 'hébergement' },
  ],
};
