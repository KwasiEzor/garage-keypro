# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: testimonials-carousel.spec.js >> Carrousel de témoignages >> cliquer une puce saute directement à la carte correspondante
- Location: tests/e2e/testimonials-carousel.spec.js:56:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText(/5\s*(sur|of)\s*7/i)
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText(/5\s*(sur|of)\s*7/i)

```

```yaml
- banner:
  - link "+228 72 11 44 44":
    - /url: tel:+22872114444
  - link "garagelaredemption@gmail.com":
    - /url: mailto:garagelaredemption@gmail.com
  - text: Lomé, Togo
  - button "fr" [pressed]
  - button "en"
  - link "LinkedIn":
    - /url: "#"
  - link "X":
    - /url: "#"
  - link "YouTube":
    - /url: "#"
  - link "Instagram":
    - /url: "#"
  - link "Facebook":
    - /url: "#"
  - link "KEYPRO SERVICE CENTER":
    - /url: /
    - img "KEYPRO Service Center"
  - navigation:
    - link "Accueil":
      - /url: /
    - link "Services":
      - /url: /services
    - link "À propos":
      - /url: /a-propos
    - link "Marques":
      - /url: /marques
    - link "Galerie":
      - /url: /galerie
    - link "Contact":
      - /url: /contact
  - link "Demander un devis":
    - /url: /contact
- main:
  - img "Technicien intervenant sur le moteur d’un véhicule"
  - paragraph: Lomé · Togo — Spécialiste clés auto & électronique
  - paragraph: Technicien
  - heading "AUTOMOBILE" [level=1]
  - paragraph: Reproduction et programmation de clés, diagnostic électronique et assistance mobile. Toutes marques, intervention rapide partout dans le Grand Lomé.
  - list:
    - listitem: Auto scanner
    - listitem: Programmeur
    - listitem: Conseiller technique
  - link "Prendre rendez-vous":
    - /url: /contact
  - link "+228 72 11 44 44":
    - /url: tel:+22872114444
  - text: Agoè-Nyivé, Lomé — Togo Toutes marques Sur site en 30 min
  - img "Clé intelligente Mercedes-Benz tenue en main"
  - paragraph: Clés programmées
  - text: 2 000+
  - paragraph: Assistance
  - paragraph: 24/7
  - text: Toutes marques
  - link "Appelez-nous +228 72 11 44 44 / 98 48 88 44 / 22 46 66 26":
    - /url: tel:+22872114444
  - link "Écrivez-nous garagelaredemption@gmail.com":
    - /url: mailto:garagelaredemption@gmail.com
  - link "WhatsApp +228 72 11 44 44":
    - /url: https://wa.me/22872114444
  - paragraph: Clé perdue ?
  - heading "Pas de remorquage. Nous venons à vous." [level=2]
  - paragraph: Une clé perdue n'immobilise plus votre véhicule. Notre unité mobile se déplace avec le matériel complet de fabrication et de programmation, où que vous soyez dans le Grand Lomé.
  - text: "01"
  - heading "Vous appelez" [level=3]
  - paragraph: Marque, modèle, année et votre position. Une minute suffit.
  - text: "02"
  - heading "Nous arrivons" [level=3]
  - paragraph: Unité mobile équipée, en moyenne sous 30 minutes dans Lomé.
  - text: "03"
  - heading "Vous repartez" [level=3]
  - paragraph: Clé fabriquée, programmée et testée devant vous.
  - link "WhatsApp":
    - /url: https://wa.me/22872114444
  - link "+228 72 11 44 44":
    - /url: tel:+22872114444
  - paragraph: Ce que nous faisons
  - heading "Des solutions complètes pour vos clés et votre électronique" [level=2]
  - paragraph: Clé perdue, télécommande hors service, voyant moteur allumé ? KEYPRO SERVICE CENTER intervient en atelier comme à domicile.
  - 'link "Clé de voiture avec télécommande intégrée Clés auto — duplication & programmation Double de clé, clé perdue, clé cassée : fabrication et programmation sur place. En savoir plus"':
    - /url: /services#cles-auto
    - img "Clé de voiture avec télécommande intégrée"
    - heading "Clés auto — duplication & programmation" [level=3]
    - paragraph: "Double de clé, clé perdue, clé cassée : fabrication et programmation sur place."
    - text: En savoir plus
  - link "Clé intelligente noire Smart keys (clés intelligentes) Clés mains libres, démarrage sans clé, boîtiers Keyless. En savoir plus":
    - /url: /services#smart-keys
    - img "Clé intelligente noire"
    - heading "Smart keys (clés intelligentes)" [level=3]
    - paragraph: Clés mains libres, démarrage sans clé, boîtiers Keyless.
    - text: En savoir plus
  - link "Télécommande de véhicule sur fond noir Télécommandes Réparation, appairage et remplacement de télécommandes centralisées. En savoir plus":
    - /url: /services#telecommandes
    - img "Télécommande de véhicule sur fond noir"
    - heading "Télécommandes" [level=3]
    - paragraph: Réparation, appairage et remplacement de télécommandes centralisées.
    - text: En savoir plus
  - link "Tableau de bord et compteur de véhicule Diagnostic électronique Lecture des codes défaut, analyse des capteurs et des calculateurs. En savoir plus":
    - /url: /services#diagnostic
    - img "Tableau de bord et compteur de véhicule"
    - heading "Diagnostic électronique" [level=3]
    - paragraph: Lecture des codes défaut, analyse des capteurs et des calculateurs.
    - text: En savoir plus
  - link "Compte-tours d’un véhicule Codage et programmation véhicule Reprogrammation de calculateurs, codage de composants, mises à jour. En savoir plus":
    - /url: /services#programmation
    - img "Compte-tours d’un véhicule"
    - heading "Codage et programmation véhicule" [level=3]
    - paragraph: Reprogrammation de calculateurs, codage de composants, mises à jour.
    - text: En savoir plus
  - 'link "Intervention sur une roue en atelier Assistance automobile mobile Nous venons à vous : domicile, bureau, parking, bord de route. En savoir plus"':
    - /url: /services#assistance-mobile
    - img "Intervention sur une roue en atelier"
    - heading "Assistance automobile mobile" [level=3]
    - paragraph: "Nous venons à vous : domicile, bureau, parking, bord de route."
    - text: En savoir plus
  - text: 2 000+
  - paragraph: Véhicules pris en charge
  - text: "4"
  - paragraph: Origines de marques couvertes
  - text: 30min
  - paragraph: Délai moyen d'intervention
  - text: 7j/7
  - paragraph: Assistance urgence
  - img "Mécanicien au travail"
  - img "Outils de mécanique"
  - img "Remise de clé devant un véhicule"
  - img "Entretien moteur"
  - text: 10+ Années d'expérience
  - paragraph: À propos de KEYPRO
  - heading "Expertise technique, rapidité et transparence" [level=2]
  - paragraph: KEYPRO SERVICE CENTER est un centre technique spécialisé dans les clés automobiles et l'électronique embarquée. Nous combinons des outils de diagnostic modernes et une équipe formée aux systèmes des constructeurs japonais, européens, américains et chinois.
  - list:
    - listitem: Diagnostic électronique complet
    - listitem: Programmation et codage véhicule
    - listitem: Intervention mobile sur site
  - link "En savoir plus":
    - /url: /a-propos
  - link "+228 98 48 88 44":
    - /url: tel:+22898488844
  - paragraph: Intervention mobile
  - heading "Partout dans le Grand Lomé" [level=2]
  - paragraph: Notre atelier est à Agoè-Nyivé, mais notre unité mobile couvre l'ensemble de l'agglomération.
  - text: Agoè-Nyivé Adidogomé Bè Akodésséwa Hédzranawoé Tokoin Nyékonakpoè Baguida Avépozo Kégué Totsi Djidjolé Agoè-Nyivé Adidogomé Bè Akodésséwa Hédzranawoé Tokoin Nyékonakpoè Baguida Avépozo Kégué Totsi Djidjolé
  - link "Voir la carte":
    - /url: /contact
  - paragraph: Notre méthode
  - heading "Comment nous travaillons" [level=2]
  - article:
    - img "Écran tactile allumé dans un véhicule moderne"
    - text: "01"
    - heading "Identifier le problème" [level=3]
    - paragraph: Vous nous décrivez la panne par téléphone ou WhatsApp, nous qualifions le besoin.
  - article:
    - img "Tableau de bord avec navigation embarquée"
    - text: "02"
    - heading "Proposer une solution" [level=3]
    - paragraph: Nous vous annonçons la démarche, le délai et le tarif avant toute intervention.
  - article:
    - img "Technicien intervenant sur le moteur"
    - text: "03"
    - heading "Intervenir" [level=3]
    - paragraph: En atelier ou sur site, avec le matériel de diagnostic et de programmation adapté.
  - article:
    - img "Remise de la clé devant le véhicule"
    - text: "04"
    - heading "Livrer et garantir" [level=3]
    - paragraph: Test complet devant vous, conseils d'entretien et suivi après intervention.
  - paragraph: Spécialiste en toutes marques
  - heading "Japonaises, chinoises, américaines, européennes" [level=2]
  - article:
    - img "Véhicule récent en concession"
    - heading "Japonaises" [level=3]
    - text: "8"
    - list:
      - listitem: Toyota
      - listitem: Nissan
      - listitem: Honda
      - listitem: Mitsubishi
      - listitem: Suzuki
      - listitem: Mazda
      - listitem: Subaru
      - listitem: Isuzu
  - article:
    - img "Volant multifonction d’un véhicule européen"
    - heading "Européennes" [level=3]
    - text: "8"
    - list:
      - listitem: Mercedes-Benz
      - listitem: BMW
      - listitem: Volkswagen
      - listitem: Audi
      - listitem: Peugeot
      - listitem: Renault
      - listitem: Citroën
      - listitem: Volvo
  - article:
    - img "Coupé noir contemporain"
    - heading "Américaines" [level=3]
    - text: "8"
    - list:
      - listitem: Ford
      - listitem: Chevrolet
      - listitem: Jeep
      - listitem: Dodge
      - listitem: GMC
      - listitem: Cadillac
      - listitem: Chrysler
      - listitem: Tesla
  - article:
    - img "Habitacle moderne avec écran de navigation"
    - heading "Chinoises" [level=3]
    - text: "8"
    - list:
      - listitem: Chery
      - listitem: Geely
      - listitem: Haval
      - listitem: BYD
      - listitem: Changan
      - listitem: JAC
      - listitem: Dongfeng
      - listitem: MG
  - link "Voir tout":
    - /url: /marques
  - paragraph: Pourquoi KEYPRO
  - heading "Nos avantages" [level=2]
  - article:
    - img "Traînées lumineuses d’un véhicule en mouvement de nuit"
    - heading "Intervention rapide" [level=3]
    - paragraph: Nous nous déplaçons là où vous êtes, sans remorquage inutile.
    - link "Nos services":
      - /url: /services
  - article:
    - img "Écran de diagnostic embarqué"
    - heading "Expertise spécialisée" [level=3]
    - paragraph: "Clés intelligentes, immobiliseurs, calculateurs : notre cœur de métier."
  - article:
    - img "Habitacle haut de gamme"
    - heading "Toutes marques" [level=3]
    - paragraph: Compatible avec la majorité des véhicules modernes.
  - article:
    - img "Combiné d’instruments numérique"
    - heading "Digital et IA" [level=3]
    - paragraph: Chatbot, prise de rendez-vous et notifications en temps réel.
  - paragraph: Témoignages
  - heading "Ce que disent nos clients" [level=2]
  - region "Témoignages clients":
    - group "1/7":
      - figure "K Kossi A. Agoè-Nyivé · Toyota RAV4":
        - text: “
        - blockquote: J'avais perdu l'unique clé de mon Toyota. L'équipe est venue jusqu'au parking à Agoè, a fabriqué et programmé une nouvelle clé en moins d'une heure.
        - text: K Kossi A. Agoè-Nyivé · Toyota RAV4
    - group "2/7":
      - figure "A Afiwa D. Tokoin · Hyundai Tucson":
        - text: “
        - blockquote: Voyant moteur allumé depuis des semaines et deux garages incapables de trouver. Diagnostic clair chez KEYPRO, réparé le jour même.
        - text: A Afiwa D. Tokoin · Hyundai Tucson
    - group "3/7":
      - figure "K Komlan M. Lomé · Responsable logistique":
        - text: “
        - blockquote: "Ils gèrent la flotte de notre société sur tout le Grand Lomé : doubles de clés, diagnostics périodiques. Sérieux et réactifs."
        - text: K Komlan M. Lomé · Responsable logistique
    - group "4/7":
      - figure "Y Yawa K. Bè · Peugeot 308":
        - text: “
        - blockquote: Clé cassée dans le contact un dimanche soir. Ils ont répondu tout de suite sur WhatsApp et sont venus la même heure. Sauvés.
        - text: Y Yawa K. Bè · Peugeot 308
    - group "5/7":
      - figure "E Edem T. Adidogomé · Nissan Note":
        - text: “
        - blockquote: Devis clair envoyé avant toute intervention, prix honnête pour une clé à transpondeur — bien moins cher qu'au concessionnaire.
        - text: E Edem T. Adidogomé · Nissan Note
    - group "6/7":
      - figure "A Ama S. Baguida · Toyota Hilux":
        - text: “
        - blockquote: Notre camionnette de chantier ne pouvait plus démarrer un vendredi. Diagnostic sur place, pièce identifiée, réparée avant le week-end.
        - text: A Ama S. Baguida · Toyota Hilux
    - group "7/7":
      - figure "K Koffi N. Hédzranawoé · Kia Picanto":
        - text: “
        - blockquote: Accueil sérieux, explications en français et en anglais, aucun jargon pour me vendre plus cher. J'y retourne pour tout entretien clé.
        - text: K Koffi N. Hédzranawoé · Kia Picanto
  - button "Témoignage précédent"
  - button "Témoignage suivant"
  - button "Aller au témoignage 1"
  - button "Aller au témoignage 2"
  - button "Aller au témoignage 3"
  - button "Aller au témoignage 4"
  - button "Aller au témoignage 5"
  - button "Aller au témoignage 6"
  - button "Aller au témoignage 7"
  - paragraph: Témoignage 3 sur 7, Komlan M.
  - img "Gros plan sur un moteur"
  - heading "Besoin d'une clé, d'un diagnostic ou d'une intervention rapide ?" [level=2]
  - paragraph: Appelez-nous ou envoyez un message WhatsApp. Nous répondons en quelques minutes.
  - link "+228 72 11 44 44":
    - /url: tel:+22872114444
  - link "WhatsApp":
    - /url: https://wa.me/22872114444
  - link "Devis gratuit":
    - /url: /contact
- contentinfo:
  - img "KEYPRO Service Center"
  - paragraph: Recevez nos conseils entretien
  - paragraph: Clés auto • Programmation • Diagnostic • Assistance mobile
  - text: Votre e-mail
  - textbox "Votre e-mail"
  - button "S’inscrire"
  - heading "À propos" [level=3]
  - paragraph: Centre technique spécialisé dans les clés automobiles, l’électronique embarquée et l’assistance mobile. Toutes marques.
  - link "LinkedIn":
    - /url: "#"
  - link "X":
    - /url: "#"
  - link "YouTube":
    - /url: "#"
  - link "Instagram":
    - /url: "#"
  - link "Facebook":
    - /url: "#"
  - heading "Navigation" [level=3]
  - list:
    - listitem:
      - link "Accueil":
        - /url: /
    - listitem:
      - link "Services":
        - /url: /services
    - listitem:
      - link "À propos":
        - /url: /a-propos
    - listitem:
      - link "Marques":
        - /url: /marques
    - listitem:
      - link "Galerie":
        - /url: /galerie
    - listitem:
      - link "Contact":
        - /url: /contact
  - heading "Contact" [level=3]
  - list:
    - listitem: Agoè-Nyivé, Lomé — Togo
    - listitem:
      - link "+228 72 11 44 44":
        - /url: tel:+22872114444
      - link "+228 98 48 88 44":
        - /url: tel:+22898488844
      - link "+228 22 46 66 26":
        - /url: tel:+22822466626
    - listitem:
      - link "garagelaredemption@gmail.com":
        - /url: mailto:garagelaredemption@gmail.com
  - heading "Horaires" [level=3]
  - list:
    - listitem: Lundi – Vendredi 08h00 – 19h00
    - listitem: Samedi 08h00 – 19h00
    - listitem: Dimanche Urgences uniquement
  - paragraph: © 2026 KEYPRO SERVICE CENTER. Tous droits réservés.
  - navigation:
    - link "Politique de confidentialité":
      - /url: /politique-confidentialite
    - link "Mentions légales":
      - /url: /mentions-legales
  - paragraph: "Photos : Unsplash"
- link "Discuter sur WhatsApp":
  - /url: https://wa.me/22872114444?text=Bonjour%20KEYPRO%20Service%20Center%2C%20j'aimerais%20des%20informations%20sur%20vos%20services.
- alert
- status:
  - paragraph:
    - text: Ce site utilise uniquement des cookies fonctionnels (langue, session d’administration) — aucun traceur publicitaire ni de mesure d’audience.
    - link "En savoir plus":
      - /url: /politique-confidentialite
  - button "J’ai compris"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | /**
  4  |  * Régression ciblée : une capture d'écran a montré des cartes de
  5  |  * témoignages larges de ~150 px, forçant un mot par ligne. La cause était
  6  |  * un padding en pourcentage sur la piste combiné à une largeur en
  7  |  * pourcentage sur les cartes — les deux se multipliaient au lieu de
  8  |  * s'additionner (voir le commit qui corrige components/TestimonialsCarousel.jsx).
  9  |  * Le test de largeur ci-dessous aurait détecté cette régression.
  10 |  *
  11 |  * Locale forcée en français : sans ça, la langue par défaut du navigateur
  12 |  * Playwright (en-US) ferait basculer LanguageProvider en anglais avant que
  13 |  * le test n'ait pu lire quoi que ce soit.
  14 |  */
  15 | test.use({ locale: 'fr-FR' });
  16 | 
  17 | const region = (page) => page.getByRole('region', { name: /témoignages|testimonials/i });
  18 | 
  19 | test.describe('Carrousel de témoignages', () => {
  20 |   test('affiche la région, les 7 cartes et 7 puces', async ({ page }) => {
  21 |     await page.goto('/');
  22 |     const carrousel = region(page);
  23 |     await expect(carrousel).toBeVisible();
  24 | 
  25 |     const cartes = carrousel.getByRole('group');
  26 |     await expect(cartes).toHaveCount(7);
  27 | 
  28 |     const puces = page.locator('button[aria-label*="témoignage" i], button[aria-label*="testimonial" i]');
  29 |     await expect(puces).toHaveCount(7);
  30 |   });
  31 | 
  32 |   test('la première carte a une largeur lisible (régression : plus de 220 px)', async ({ page }) => {
  33 |     await page.goto('/');
  34 |     const premiere = region(page).getByRole('group').first();
  35 |     const box = await premiere.boundingBox();
  36 |     expect(box).not.toBeNull();
  37 |     // Avant correction : ~130-190 px, texte réduit à un mot par ligne.
  38 |     expect(box.width).toBeGreaterThan(220);
  39 |     expect(box.width).toBeLessThan(600);
  40 |   });
  41 | 
  42 |   test('la flèche "suivant" avance à la carte 2, la puce 2 devient active', async ({ page }) => {
  43 |     await page.goto('/');
  44 |     // Les flèches sont des soeurs de la région (role="region" est sur la
  45 |     // piste défilante elle-même), pas des descendantes — on les cherche
  46 |     // donc au niveau de la page, pas via carrousel.getByRole(...).
  47 |     await page.getByRole('button', { name: /suivant|next/i }).click();
  48 | 
  49 |     // La région annonce le changement (aria-live), on peut s'y fier sans timing fragile.
  50 |     await expect(page.getByText(/2\s*(sur|of)\s*7/i)).toBeVisible({ timeout: 5000 });
  51 | 
  52 |     const puce2 = page.locator('button[aria-current="true"]');
  53 |     await expect(puce2).toHaveCount(1);
  54 |   });
  55 | 
  56 |   test('cliquer une puce saute directement à la carte correspondante', async ({ page }) => {
  57 |     await page.goto('/');
  58 |     const puces = page.locator('button[aria-label*="témoignage" i], button[aria-label*="testimonial" i]');
  59 |     await puces.nth(4).click(); // 5ᵉ témoignage
  60 | 
> 61 |     await expect(page.getByText(/5\s*(sur|of)\s*7/i)).toBeVisible({ timeout: 5000 });
     |                                                       ^ Error: expect(locator).toBeVisible() failed
  62 |   });
  63 | 
  64 |   test('la navigation boucle : "suivant" depuis la dernière carte revient à la première', async ({ page }) => {
  65 |     await page.goto('/');
  66 |     const suivant = page.getByRole('button', { name: /suivant|next/i });
  67 | 
  68 |     for (let i = 0; i < 6; i++) {
  69 |       await suivant.click();
  70 |       await page.waitForTimeout(150);
  71 |     }
  72 |     await expect(page.getByText(/7\s*(sur|of)\s*7/i)).toBeVisible({ timeout: 5000 });
  73 | 
  74 |     await suivant.click();
  75 |     await expect(page.getByText(/1\s*(sur|of)\s*7/i)).toBeVisible({ timeout: 5000 });
  76 |   });
  77 | 
  78 |   test('les flèches gauche/droite du clavier déplacent le carrousel', async ({ page }) => {
  79 |     await page.goto('/');
  80 |     const carrousel = region(page);
  81 |     await carrousel.focus();
  82 |     await page.keyboard.press('ArrowRight');
  83 |     await expect(page.getByText(/2\s*(sur|of)\s*7/i)).toBeVisible({ timeout: 5000 });
  84 | 
  85 |     await page.keyboard.press('ArrowLeft');
  86 |     await expect(page.getByText(/1\s*(sur|of)\s*7/i)).toBeVisible({ timeout: 5000 });
  87 |   });
  88 | });
  89 | 
```