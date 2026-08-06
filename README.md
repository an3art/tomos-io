# TOMOS.io

Site statique bilingue (FR/EN) pour TOMOS — infrastructure SaaS modulaire en marque blanche pour experts-comptables et professionnels du conseil.

Ce dépôt est **à plat** : tout ce qui est à la racine (`index.html`, `t1.html`, ..., `assets/`) est le site déployable, prêt à être copié tel quel dans `public_html/`. Le reste du dossier Dropbox local (pitch, exports Ycode, logos sources...) reste hors du dépôt (voir `.gitignore`, en liste blanche : tout est ignoré sauf les fichiers du site).

## Structure

```
index.html       Accueil (positionnement partenaire)
t1.html           Module T1 — Expenses
t2.html           Module T2 — Invoicing (preuve de concept : facture.mu)
t3.html           Module T3 — Cam (bientôt disponible)
t4.html           Module T4 — Bot
partner.html      Page programme partenaire / contact
assets/
├── css/style.css
├── js/i18n.js     Bascule FR/EN (data-i18n, localStorage)
└── img/           Logos + captures (WebP)
```

Pas de build, pas de dépendances — HTML/CSS/JS statique. La bascule de langue est gérée côté client via `assets/js/i18n.js` et un objet `window.I18N` défini dans chaque page.

## Tester en local

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## Déploiement sur Hostinger (hPanel → Git)

Repo : `git@github.com:an3art/tomos-io.git` (privé — la clé SSH affichée sur la page **Avancé → GIT** de hPanel doit être ajoutée comme *Deploy key* sur le repo GitHub, Settings → Deploy keys).

Dans hPanel → site `tomos.io` → **Avancé → GIT → Create a New Repository** :
- Repository : `git@github.com:an3art/tomos-io.git`
- Branch : `main`
- Directory : laisser vide (déploie directement dans `public_html/`)

Ensuite, sur le Dashboard du site : **Connect domain** pour rattacher `tomos.io` à cet hébergement, puis **Manage SSL** pour émettre le certificat une fois le domaine connecté.

Pour republier après un changement : `git push` sur `main`, puis relancer le déploiement Git depuis hPanel (bouton de resynchronisation sur la page GIT).

## Contenu à finaliser

- `partner.html` : le "formulaire" ouvre un email pré-rempli (`mailto:contact@tomos.io`) — pas de backend. À remplacer par un vrai formulaire si besoin de collecte structurée.
- T2 (Invoicing) et T3 (Cam) restent des pages "preuve de concept" / "bientôt" — à enrichir quand ces modules seront prêts à être vendus en propre (au-delà de facture.mu).
- Logos T1–T4 (`assets/img/logos/logo-t*.svg`) sont disponibles mais pas encore utilisés dans les pages produits — à intégrer si une identité visuelle par module est souhaitée.
- Une fois le domaine migré de Ycode vers Hostinger, penser à déconnecter le domaine personnalisé côté Ycode pour éviter toute confusion.
