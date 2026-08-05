# TOMOS.io

Site statique bilingue (FR/EN) pour TOMOS — infrastructure SaaS modulaire en marque blanche pour experts-comptables et professionnels du conseil.

Tout le contenu déployable vit dans [`site/`](site/) : c'est ce dossier (et uniquement lui) qu'il faut mettre en ligne. Le reste du dépôt Dropbox (pitch, exports Ycode, logos sources...) reste local et n'est pas suivi par git (voir `.gitignore`).

## Structure

```
site/
├── index.html       Accueil (positionnement partenaire)
├── t1.html           Module T1 — Expenses
├── t2.html           Module T2 — Invoicing (preuve de concept : facture.mu)
├── t3.html           Module T3 — Cam (bientôt disponible)
├── t4.html           Module T4 — Bot
├── partner.html      Page programme partenaire / contact
└── assets/
    ├── css/style.css
    ├── js/i18n.js     Bascule FR/EN (data-i18n, localStorage)
    └── img/           Logos + captures (WebP)
```

Pas de build, pas de dépendances — HTML/CSS/JS statique. La bascule de langue est gérée côté client via `assets/js/i18n.js` et un objet `window.I18N` défini dans chaque page.

## Tester en local

```bash
cd site
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## Déploiement sur Hostinger (domaine tomos.io)

1. **GitHub** : pousser ce dépôt sur GitHub (`git remote add origin ... && git push -u origin main`).
2. **Hostinger — hPanel** :
   - Pointer le domaine `tomos.io` vers l'hébergement Hostinger (nameservers ou DNS A/CNAME selon où le domaine est enregistré).
   - Dans hPanel → Sites Web, créer/sélectionner le site, puis déployer via :
     - **Git** : hPanel propose un déploiement Git natif (Avancé → Git) — renseigner l'URL du repo GitHub et la branche `main`, définir `site/` comme dossier racine si l'option est disponible, sinon déployer puis déplacer le contenu de `site/` vers `public_html/`.
     - **ou FTP/File Manager** : uploader le contenu de `site/` (pas le dossier lui-même) directement dans `public_html/`.
3. Vérifier le certificat SSL (Hostinger le génère automatiquement via Let's Encrypt une fois le DNS propagé).
4. Mettre à jour l'adresse `contact@tomos.io` utilisée dans les CTA (`mailto:`) une fois la messagerie du domaine configurée dans Hostinger.

## Contenu à finaliser

- `partner.html` : le "formulaire" ouvre un email pré-rempli (`mailto:`) — pas de backend. À remplacer par un vrai formulaire (Hostinger permet d'ajouter un formulaire de contact, ou un service tiers type Formspree) si besoin de collecte structurée.
- T2 (Invoicing) et T3 (Cam) restent des pages "preuve de concept" / "bientôt" — à enrichir quand ces modules seront prêts à être vendus en propre (au-delà de facture.mu).
- Logos T1–T4 (`site/assets/img/logos/logo-t*.svg`) sont disponibles mais pas encore utilisés dans les pages produits — à intégrer si une identité visuelle par module est souhaitée.
