// Projets affichés dans « Travaux ». L'ordre du tableau est l'ordre d'affichage.
// Les images sont dans public/projects/<id>/ ; `mobile: true` = capture verticale (affichée en entier).

export interface ProjectImage {
  src: string;
  alt: string;
  mobile?: boolean;
}

export interface Project {
  id: string; // sert aussi d'ancre : /portfolio/#<id> ouvre directement la fenêtre du projet
  title: string;
  kind: string;
  year: number;
  summary: string; // texte de la carte
  tag: string; // phrase sous le titre dans la fenêtre
  description: string;
  features: string[];
  stack: string[];
  cardStack: string[]; // technologies affichées sur la carte (les plus parlantes)
  metric: string;
  links: { label: string; href: string }[];
  note?: string;
  images: ProjectImage[];
}

export const projects: Project[] = [
  {
    id: 'cod4-monitor',
    title: 'CoD4 Monitor',
    kind: 'Projet personnel',
    year: 2026,
    summary:
      'Tableau de bord pour suivre et administrer des serveurs Call of Duty 4 : joueurs en direct, stats, modération, détection des contournements de ban.',
    tag: 'Tableau de bord web pour suivre et administrer des serveurs Call of Duty 4.',
    description:
      'J’administre un serveur Call of Duty 4 qui tourne avec un mod que j’ai développé. Pour le suivre sans rester connecté au jeu, j’ai construit ce tableau de bord : il interroge le serveur, lit ses journaux en continu et transforme chaque partie en statistiques.',
    features: [
      'Suivi en direct : joueurs connectés, score du round, console et chat.',
      'Statistiques et classements : fréquentation, maps, précision, records et fiche de chaque joueur.',
      'Modération : kick, ban, commandes programmées, journal des actions et détection des contournements de ban.',
      'Comptes sur invitation, avec des rôles et des permissions par serveur.',
      'Interface en français, anglais et allemand, installable sur téléphone avec notifications.',
      'Déploiement Docker derrière Caddy (HTTPS automatique) et sauvegardes quotidiennes.',
    ],
    stack: ['Go', 'Gin', 'SQLite', 'Svelte', 'Vite', 'Docker', 'Caddy', 'PWA'],
    cardStack: ['Go', 'Svelte', 'SQLite', 'Docker'],
    metric: 'Temps réel · 3 langues · appli mobile',
    links: [{ label: 'Voir le code sur GitHub', href: 'https://github.com/FloMtz2312/cod4-monitor' }],
    note: 'Captures réalisées avec des données de démonstration.',
    images: [
      { src: 'projects/cod4-monitor/live.webp', alt: 'Vue en direct : partie en cours, joueurs et activité des dernières 24 heures' },
      { src: 'projects/cod4-monitor/classements.webp', alt: 'Classement combat des 7 derniers jours' },
      { src: 'projects/cod4-monitor/statistiques.webp', alt: 'Statistiques avancées : fréquentation sur 30 jours et changements de map' },
      { src: 'projects/cod4-monitor/mobile.webp', alt: 'Version mobile, installable comme une application', mobile: true },
    ],
  },
  {
    id: 'saxo',
    title: 'Thibault Martinez',
    kind: 'Projet client',
    year: 2026,
    summary: 'Site vitrine d’un saxophoniste : formules, répertoire, galerie et formulaire de demande de devis.',
    tag: 'Site vitrine d’un saxophoniste pour les mariages et les événements.',
    description:
      'Site réalisé pour Thibault Martinez, saxophoniste à Montpellier, sur la Côte d’Azur et à Paris. L’objectif : présenter ses formules en quelques secondes et recevoir des demandes de date complètes.',
    features: [
      'Page unique avec vidéo d’accueil, formules, répertoire, galerie et portrait.',
      'Fenêtre de détail pour chaque formule.',
      'Formulaire de demande de date protégé contre les robots (Cloudflare Turnstile vérifié côté serveur), envoyé par e-mail avec Resend.',
      'Mentions légales, conditions générales de vente et politique de confidentialité.',
      'Hébergement sur Cloudflare Workers, sitemap et référencement soignés.',
    ],
    stack: ['Vue 3', 'Vite', 'Cloudflare Workers', 'Turnstile', 'Resend'],
    cardStack: ['Vue 3', 'Vite', 'Cloudflare Workers'],
    metric: 'Projet client · formulaire anti-spam',
    links: [],
    note: 'Projet client : code privé.',
    images: [
      { src: 'projects/saxo/accueil.webp', alt: 'Accueil avec la vidéo de présentation' },
      { src: 'projects/saxo/formules.webp', alt: 'Les trois formules proposées' },
      { src: 'projects/saxo/repertoire.webp', alt: 'Répertoire et portrait du musicien' },
      { src: 'projects/saxo/mobile.webp', alt: 'Version mobile', mobile: true },
    ],
  },
  {
    id: 'dev-finder',
    title: 'Dev Finder',
    kind: 'Projet personnel',
    year: 2026,
    summary:
      'Agrégateur d’offres d’emploi de développeur : collecte, dédoublonnage, enrichissement par IA locale et suivi des candidatures.',
    tag: 'Agrégateur d’offres d’emploi de développeur, avec suivi des candidatures.',
    description:
      'Les offres de développeur sont éparpillées sur des dizaines de sites. Dev Finder les collecte, les normalise et supprime les doublons pour tout consulter au même endroit, avec des filtres précis.',
    features: [
      'Collecte depuis le flux RSS de We Work Remotely et l’API Hacker News « Who is hiring? », en respectant les conditions des sources (délai entre requêtes, attribution).',
      'Normalisation : pays, télétravail, contrat, séniorité, une centaine de technologies et salaires convertis en équivalent annuel.',
      'Dédoublonnage entre sources : clé normalisée, puis similarité Jaro-Winkler et Levenshtein.',
      'Enrichissement optionnel par un modèle d’IA local (LM Studio ou Ollama), en JSON strict validé côté Go.',
      'Interface rendue côté serveur avec htmx : filtres instantanés, vue liste et détail, raccourcis clavier, suivi des candidatures, export CSV.',
    ],
    stack: ['Go', 'Gin', 'MySQL', 'htmx', 'LLM local', 'Docker'],
    cardStack: ['Go', 'Gin', 'MySQL', 'LLM local'],
    metric: '≈ 590 offres collectées en moins de 30 s',
    links: [],
    note: 'Code privé, disponible sur demande.',
    images: [
      { src: 'projects/dev-finder/recherche.webp', alt: 'Recherche « React » avec la fiche d’une offre ouverte' },
      { src: 'projects/dev-finder/filtres.webp', alt: 'Panneau de filtres : rôle, salaire, visa, technologies' },
      { src: 'projects/dev-finder/mobile.webp', alt: 'Version mobile', mobile: true },
    ],
  },
];
