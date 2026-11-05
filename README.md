# Portfolio · Florian Martinez

Portfolio de développeur web, design « Obsidienne » : fond de métal liquide vert et bleu animé, panneaux de verre dépoli, fenêtre de détail pour chaque projet.

Site statique construit avec [Astro](https://astro.build), publié sur GitHub Pages : <https://flomtz2312.github.io/portfolio/>

## Lancer en local

Node.js **22.23.4 ou plus récent** (exigé par Astro 7).

```sh
npm install
npm run dev       # http://localhost:4321/portfolio/
npm run build     # site final dans dist/
npm run preview   # sert dist/ comme sur GitHub Pages
```

## Modifier le contenu

Tout le texte est dans deux fichiers, sans toucher à la mise en page :

| Fichier | Contenu |
|---|---|
| `src/data/site.ts` | Nom, accroche, badge de disponibilité, e-mail, liens du pied de page, bloc Profil |
| `src/data/projects.ts` | Les projets : textes de la carte et de la fenêtre, stack, chiffre clé, liens, captures |

Les lignes marquées `À CONFIRMER` contiennent encore du texte d'exemple (disponibilité, e-mail, texte du profil).

### Ajouter un projet

1. Mettre les captures dans `public/projects/<id>/` (WebP, ~1600 px de large ; ~640 px pour une capture mobile).
2. Ajouter une entrée dans `src/data/projects.ts`. Mettre `mobile: true` sur une capture verticale.
3. La carte et la fenêtre sont générées automatiquement. Le lien `…/portfolio/#<id>` ouvre directement la fenêtre du projet.

## Structure

```
src/
  components/
    Background.astro   fond animé (gouttes, filtre SVG goo, parallaxe, goutte qui suit la souris)
    Nav.astro          barre de navigation avec la goutte qui glisse entre les liens
    Hero.astro         introduction
    Projects.astro     cartes + fenêtre de détail (galerie, clavier, glisser du doigt)
    Profile.astro      bloc Profil
    Contact.astro      contact : « Copier l’adresse » et formulaire (envoyé au Worker)
  data/                contenu (voir plus haut)
  layouts/Base.astro   <head> : titre, description, Open Graph, polices
  pages/index.astro    page unique
  styles/global.css    couleurs, polices, verre, boutons
worker/               Worker Cloudflare du formulaire (Turnstile + Resend)
public/
  projects/            captures des projets
  favicon.svg
```

Les animations sont coupées quand le système demande de réduire les animations (`prefers-reduced-motion`).

## Déploiement

Le workflow `.github/workflows/deploy.yml` construit et publie le site à chaque push sur `main` (ou à la main depuis l'onglet Actions).

À faire une seule fois sur GitHub : **Settings → Pages → Build and deployment → Source : GitHub Actions**.

L'adresse dépend de `base` dans `astro.config.mjs` : `/portfolio` pour ce dépôt. Pour publier à la racine (`https://flomtz2312.github.io/`), renommer le dépôt en `flomtz2312.github.io` et mettre `base: '/'`.

## Captures

Les captures de CoD4 Monitor ont été faites avec des données de démonstration (parties et joueurs fictifs). Celles de Dev Finder viennent d'une vraie collecte de novembre 2026.

## Formulaire de contact (Resend)

GitHub Pages ne sert que des fichiers statiques : la clé Resend ne peut pas être dans la page. Le formulaire envoie donc ses données à un petit Worker Cloudflare (`worker/`), qui vérifie le captcha Turnstile, filtre les robots (champ piège) puis appelle Resend. Tant que `contactForm.endpoint` est vide dans `src/data/site.ts`, le formulaire est masqué.

Mise en place (une fois) :

1. **Resend** : créer une clé API (resend.com → API Keys). Sans domaine vérifié, l'expéditeur `onboarding@resend.dev` ne peut écrire qu'à l'adresse du compte Resend, ce qui suffit ici. Avec un domaine, changer `FROM_EMAIL` dans `worker/wrangler.jsonc`.
2. **Turnstile** : tableau de bord Cloudflare → Turnstile → ajouter un widget, domaines `flomtz2312.github.io` et `localhost`. Noter la clé de site et la clé secrète.
3. **Worker** :
   ```sh
   cd worker
   npx wrangler login
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put TURNSTILE_SECRET
   npx wrangler secret put TO_EMAIL        # adresse qui reçoit les messages
   npx wrangler deploy                     # affiche l'URL https://portfolio.<compte>.workers.dev
   ```

   Sans PC, depuis le tableau de bord Cloudflare : **Workers & Pages → Create → Import a repository** → dépôt `portfolio`, **Root directory : `worker`** (sinon Cloudflare publie le site Astro à la place du Worker), puis les trois valeurs dans **Settings → Variables and Secrets**, type *Secret*. Le nom du Worker doit être celui de `name` dans `worker/wrangler.jsonc` (`portfolio`).
4. Dans `src/data/site.ts`, renseigner `contactForm.endpoint` (URL du Worker) et `contactForm.turnstileSiteKey`.

En local : `worker/.dev.vars` (ignoré par git) avec les clés de test Turnstile, puis `npx wrangler dev` dans `worker/` et `endpoint: 'http://localhost:8787'`.

```
RESEND_API_KEY=re_...
TURNSTILE_SECRET=1x0000000000000000000000000000000AA
TO_EMAIL=ton@adresse
```

Clé de site de test (toujours valide) : `1x00000000000000000000AA`.
