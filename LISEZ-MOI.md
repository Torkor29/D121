# Site D121 — Revêtements de sol

Site vitrine statique prêt à mettre en ligne.

## 🛠️ Console d'administration (`admin.html`)

Un panneau d'administration sur-mesure pour modifier le site sans coder. Il **modifie directement
les fichiers sources** (le HTML reste statique → SEO préservé).

**Comment l'ouvrir** (Chrome ou Edge recommandé) :
1. Lancez un petit serveur local dans le dossier `site` :
   ```
   python -m http.server 8121
   ```
2. Ouvrez **http://localhost:8121/admin.html** (⚠️ pas par double-clic : le navigateur bloquerait l'accès aux fichiers).
3. Cliquez « Autoriser l'accès au dossier » et sélectionnez le dossier `site` (une fois par session) pour pouvoir **enregistrer**.

**Onglets :**
- **Tableau de bord** — autorisation d'accès, changement de **domaine** partout (canonical/OG/sitemap), inventaire du « backend », aide au déploiement.
- **Apparence** — palette de couleurs du thème avec **aperçu en direct**, puis enregistrement dans `css/style.css`.
- **SEO** — titre, meta description et textes de partage, **par page**, avec compteurs de longueur.
- **Avis clients** — ajouter / modifier / supprimer les témoignages de l'accueil (note, texte, prénom). L'initiale de la pastille est reprise automatiquement.
- **Zones** — gérer les communes desservies (nom + coordonnées) : met à jour d'un coup la **carte**, les **badges** de la page Contact et les **données SEO** (`areaServed`).
- **Backend & config** — clé du formulaire (Web3Forms), téléphone, email, lien Google (remplacés partout).
- **Textes** — rechercher / remplacer n'importe quel texte du site, avec aperçu avant application.

> 🔒 **Ne mettez pas `admin.html` en ligne** sur le site public (ou protégez-le). Il ne peut pas modifier
> le serveur distant (il n'écrit que dans un dossier local que vous choisissez), mais autant le garder privé.
> Sur Netlify, supprimez `admin.html` du dossier avant de déployer, ou ajoutez-le aux exclusions.

---

## 📄 Pages

| Fichier | Page |
|---|---|
| `index.html` | Accueil — présentation, activité, secteur, horaires |
| `services.html` | Prestations — **1 seule page**, organisée en 4 familles avec navigation rapide |
| `contact.html` | Contact — formulaire + boutons appel/SMS + consentement RGPD |
| `mentions-legales.html` | Mentions légales (obligatoire) |
| `politique-confidentialite.html` | Politique de confidentialité / RGPD |
| `css/style.css` | Mise en forme |
| `js/main.js` | Menu, animations, envoi du formulaire |
| `assets/` | Logo, photos de chantier et images d'illustration |

---

## ✅ 1. Activer le formulaire (5 min, gratuit) — À FAIRE

Le formulaire envoie les demandes **directement dans votre Gmail** (`d121.revetement@gmail.com`)
via le service gratuit **Web3Forms**.

1. Allez sur **https://web3forms.com**
2. Saisissez **d121.revetement@gmail.com**, cliquez « Create Access Key »
3. Vous recevez une **clé** par email (suite de lettres/chiffres)
4. Ouvrez `js/main.js`, ligne ~50, remplacez :
   ```js
   var WEB3FORMS_KEY = 'VOTRE_CLE_WEB3FORMS';
   ```
   par votre clé, ex. :
   ```js
   var WEB3FORMS_KEY = 'a1b2c3d4-1234-5678-9abc-def012345678';
   ```
5. Enregistrez. ✅

> **Tant que la clé n'est pas renseignée**, le formulaire ouvre la messagerie du visiteur
> pré-remplie (secours). Le site marche déjà, mais mettez la clé pour recevoir les demandes
> **automatiquement par email**.
>
> 👉 Vous pouvez me transmettre la clé : je la mets en place et je teste l'envoi pour vous.

**SMS & appel** : les boutons de la page Contact utilisent le **07 66 19 53 11**. Sur mobile,
ils ouvrent directement l'application Téléphone ou SMS. Rien à configurer.

---

## ⚖️ 2. Compléter les mentions légales — À FAIRE

Les pages légales contiennent des champs surlignés **[À COMPLÉTER]**. À renseigner (obligatoire) :

Dans `mentions-legales.html` :
- **Forme juridique** (EI / micro-entreprise / EURL / SASU…)
- **SIRET**
- **TVA intracommunautaire** (ou « TVA non applicable, art. 293 B du CGI » si micro-entreprise)
- **Directeur de la publication** (nom du gérant)
- **Hébergeur** (nom + adresse + site — voir §4, ex. Render)

Dans `politique-confidentialite.html` :
- **Date** de mise à jour
- **Durée de conservation** des données (ex. 3 ans)

> Faites Rechercher/Remplacer sur `[À COMPLÉTER` pour tous les retrouver.
> Une fois complétés, supprimez la balise `<span class="todo">…</span>` autour (ou gardez juste le texte).

---

## 🌐 3. Mettre le site en ligne + nom de domaine

**Deux choses distinctes** (souvent confondues) :

| | À quoi ça sert | Coût |
|---|---|---|
| **Hébergement** (Render, Netlify…) | Stocke les fichiers et sert le site sur Internet | Gratuit pour un site statique |
| **Nom de domaine** (`d121-revetements.fr`) | L'adresse « jolie » que tapent les clients | ~7–12 €/an chez un registrar |

👉 **Render n'a rien à voir avec le nom de domaine.** Render héberge ; le domaine s'achète
séparément (OVH, Gandi, Ionos…), puis on **relie** les deux.

### Option A — Render (ce que vous envisagez)
1. Créez un compte sur https://render.com
2. **New +** → **Static Site** → connectez le dossier `site` (via un dépôt GitHub, ou glisser-déposer selon l'offre)
3. Render publie sur une adresse gratuite type `d121.onrender.com` (HTTPS inclus)
4. Pour un vrai nom de domaine : Render → onglet **Custom Domains** → ajoutez `d121-revetements.fr`,
   puis chez votre registrar, créez les enregistrements DNS indiqués par Render (un **CNAME** / **A**).
   Render fournit le certificat HTTPS automatiquement.

### Option B — ⭐ RECOMMANDÉ pour ce site : Netlify (le plus simple)
> Site statique = **jamais de mise en veille**, disponible 24h/24 gratuitement (la « veille du gratuit »
> ne concerne que les serveurs applicatifs, pas les sites statiques). Limite : 100 Go/mois de bande
> passante ≈ 50 000 visites — largement suffisant. Aucune pub imposée sur vos pages.
- **Netlify** : https://app.netlify.com/drop → glissez-déposez le dossier `site` → en ligne en 30 s.
  Ajout du domaine perso : **Domain settings** → **Add custom domain**.
- Fonctionne exactement pareil : hébergement gratuit + on branche le domaine acheté ailleurs.

### Acheter le nom de domaine
- Registrar conseillé (français, `.fr` facile) : **OVHcloud** ou **Gandi**.
- Cherchez la disponibilité de `d121-revetements.fr` (ou `.com`), achetez (~10 €/an), puis suivez
  les instructions DNS de votre hébergeur (Render/Netlify) pour le relier.

> 💡 Avec un nom de domaine, vous pourrez aussi avoir un **email pro** type
> `contact@d121-revetements.fr` (option payante chez le registrar). Le Gmail actuel suffit pour démarrer.

---

## ⭐ Avis clients (page d'accueil) — À REMPLIR

Une section « Avis clients » est prête sur l'accueil, avec **2 emplacements**. Ouvrez `index.html`,
cherchez `AVIS CLIENTS`, et remplacez dans chaque carte :
- le texte entre `« [Avis client n°… ] »` par le texte réel de l'avis,
- `Prénom N.` par le prénom du client,
- la lettre de la pastille (`<span class="review-card__avatar">P</span>`) par l'initiale.

> 👉 Envoyez-moi vos 2 avis (prénom + texte) et je les intègre proprement.

## 🌍 Google Business Profile — DÉJÀ INTÉGRÉ

Votre fiche Google (`https://share.google/bE6m2I10jKijiJIXd`) est reliée au site :
- Bouton **« Voir nos avis sur Google »** dans la section Avis de l'accueil,
- Bouton **« Voir sur Google Maps »** sur la page Contact (à côté de la carte).

> Astuce avis : pour inviter vos clients à laisser un avis, partagez-leur directement ce lien —
> il ouvre votre fiche où le bouton « Rédiger un avis » est disponible. *(Un lien « écrire un avis »
> en un clic nécessite le Place ID exact de la fiche ; envoyez-le moi si vous le trouvez dans Google
> Business, je l'ajouterai.)*

## 🗺️ Carte des zones d'intervention

La page Contact contient une **carte interactive** (Leaflet + OpenStreetMap, gratuite, sans clé API)
centrée sur Brest, avec un **repère pour chacune des 8 communes desservies** (Brest, Bohars, Guilers,
Gouesnou, Guipavas, Plouzané, Le Relecq-Kerhuon, Plougastel-Daoulas) et le cercle de zone. Ces communes
sont aussi déclarées dans les données structurées (`areaServed`) → bon pour le référencement local sur
chaque commune. Pour ajouter/retirer une commune : modifiez le tableau `communes` dans `js/main.js`.

## 🖼️ Photos du site (mises à jour)

Les visuels d'illustration ont été recurés (Pexels, libres de droits) pour un rendu cohérent par section.

⚠️ **Important — galerie « Réalisations »** : les photos de la galerie (accueil + page Réalisations) sont
désormais **illustratives** (elles montrent des rendus types, pas vos chantiers réels). Pour une page
« Réalisations » idéale (confiance + SEO), l'idéal est d'y mettre **vos propres photos de chantier bien
cadrées**. Vos anciennes photos réelles sont conservées dans `assets/photos/` (`sol-collectif.jpg`,
`moquette.jpg`) et dans `../_photos_originaux/` — envoyez-moi vos meilleures photos et je les remets en place.
Pour remplacer une image, gardez le même nom de fichier dans `assets/photos/`.

## 🖼️ Page Réalisations / Galerie

La page `realisations.html` est prête (menu **Réalisations**) avec vos vraies photos de chantier et
un **agrandissement au clic** (lightbox + flèches). Pour ajouter des photos plus tard : déposez-les
dans `assets/photos/` et dupliquez un bloc `<figure>…</figure>` dans `realisations.html`.
> Pour **masquer temporairement** la page : retirez la ligne `<a href="realisations.html">Réalisations</a>`
> du menu (`<nav class="nav__links">`) sur chaque page.

## 🔎 SEO — ce qui est en place et ce qu'il reste à faire

Le site est optimisé pour le référencement (balises complètes, données structurées, etc.).

### ✅ Déjà en place
- Balises `title` + `meta description` uniques et optimisées « Brest » sur chaque page
- Balises **Open Graph** + **Twitter Card** (bel aperçu quand on partage le lien) + image `og-image.jpg`
- **Données structurées JSON-LD** : fiche entreprise locale (LocalBusiness), horaires, zone Brest,
  catalogue de prestations, fil d'ariane, FAQ → éligibles aux résultats enrichis Google
- **Section FAQ** visible (bonne pour capter les recherches « comment / prix / secteur »)
- `robots.txt`, `sitemap.xml`, `site.webmanifest`, favicons (onglet, mobile, partage)
- Balises géo (`geo.region` Finistère), langue `fr`, canonical, images en `lazy-load` (site rapide)
- Adresse volontairement **absente** des données structurées (modèle « zone d'intervention »),
  comme demandé — seule la ville Brest / 29200 est déclarée.

### ⚠️ À FAIRE de votre côté (2 actions à fort impact)
1. **Remplacer le domaine** : tout le SEO utilise `https://www.d121-revetements.fr`.
   Si votre domaine final est différent, faites un **Rechercher/Remplacer** de
   `https://www.d121-revetements.fr` dans **tous** les fichiers `.html`, `robots.txt` et `sitemap.xml`.
2. **Créer une fiche Google Business Profile** (gratuit) sur https://business.google.com →
   c'est **LE levier n°1** pour un artisan local : apparaître sur Google Maps et dans le bloc local
   pour « revêtement sol Brest ». Utilisez les mêmes nom, téléphone, horaires et zone que le site.

### 📈 Après la mise en ligne
- Inscrivez le site sur **Google Search Console** (https://search.google.com/search-console) et
  soumettez `sitemap.xml` → Google indexe plus vite.
- Testez les données structurées : https://search.google.com/test/rich-results (collez l'URL).
- Vérifiez la vitesse : https://pagespeed.web.dev.

---

## 🖼️ À propos des images

- Les **photos de chantier** (`hall`, `sanitaire`, `escalier`, `sol-collectif`, `moquette`) sont les vôtres.
- Les **images d'illustration** (`pvc-lames-bois`, `pvc-piece-grise`, `salle-de-bain`, `moquette-velours`,
  `lames-grises-detail`) viennent de **Pexels** (libres de droits, usage commercial gratuit, sans attribution
  obligatoire — une mention est tout de même faite dans le pied de page et les mentions légales).
- Pour remplacer une image : déposez la vôtre dans `assets/photos/` avec le **même nom**, ou changez
  le `src="..."` dans le HTML.

---

## ✏️ Modifier les textes

Ouvrez les fichiers `.html` avec un éditeur (Bloc-notes, VS Code) et modifiez le texte entre les balises.
L'**adresse postale n'apparaît que sur la page Mentions légales** (obligation légale) ; ailleurs, seule
la zone « Brest & agglomération » est affichée, comme demandé.
