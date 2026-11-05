// Informations générales du site. Tout le texte modifiable est ici ou dans projects.ts.

export const site = {
  name: 'Florian Martinez',
  initials: 'F/M',
  role: 'Développeur web',
  title: 'Florian Martinez · Développeur web',
  description:
    'Portfolio de Florian Martinez, développeur web : tableaux de bord temps réel, sites vitrines et outils back-end en Go, Vue et Svelte.',
  lead: 'Développeur web. Je conçois des interfaces précises et performantes, du premier pixel jusqu’à la mise en production.',

  // Badge en haut de page. Mettre `available: false` pour le masquer.
  // À CONFIRMER : texte d'exemple.
  availability: { available: true, label: 'Disponible · Janvier 2027' },

  // À CONFIRMER : adresse d'exemple, à remplacer par la vraie.
  email: 'bonjour@florian.dev',
  contactNote: 'Réponse sous 24 heures, du lundi au vendredi.',

  // Liens affichés dans le pied de page. Laisser `href` vide pour masquer un lien.
  links: [
    { label: 'GitHub', href: 'https://github.com/FloMtz2312' },
    { label: 'LinkedIn', href: '' },
  ],
};

// Bloc « Profil ». À CONFIRMER : texte d'exemple, à réécrire avec ton parcours.
export const profile = {
  badge: '',
  paragraphs: [
    'Je travaille à la frontière entre le design et l’ingénierie. J’aime les interfaces qui paraissent simples parce que tout le travail est caché derrière.',
    'Je construis aussi bien le back-end en Go que l’interface en Vue ou en Svelte, et je m’occupe du déploiement jusqu’en production.',
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
