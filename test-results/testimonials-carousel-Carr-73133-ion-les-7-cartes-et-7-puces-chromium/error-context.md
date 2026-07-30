# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: testimonials-carousel.spec.js >> Carrousel de témoignages >> affiche la région, les 7 cartes et 7 puces
- Location: tests/e2e/testimonials-carousel.spec.js:20:7

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('button[aria-label*="témoignage" i], button[aria-label*="testimonial" i]')
Expected: 7
Received: 9
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('button[aria-label*="témoignage" i], button[aria-label*="testimonial" i]')
    12 × locator resolved to 9 elements
       - unexpected value "9"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - link "+228 72 11 44 44" [ref=e6] [cursor=pointer]:
          - /url: tel:+22872114444
        - link "garagelaredemption@gmail.com" [ref=e9] [cursor=pointer]:
          - /url: mailto:garagelaredemption@gmail.com
        - generic [ref=e13]: Lomé, Togo
      - generic [ref=e17]:
        - generic [ref=e18]:
          - button "fr" [pressed] [ref=e19] [cursor=pointer]
          - button "en" [ref=e20] [cursor=pointer]
        - generic [ref=e21]:
          - link "LinkedIn" [ref=e22] [cursor=pointer]:
            - /url: "#"
          - link "X" [ref=e25] [cursor=pointer]:
            - /url: "#"
          - link "YouTube" [ref=e28] [cursor=pointer]:
            - /url: "#"
          - link "Instagram" [ref=e31] [cursor=pointer]:
            - /url: "#"
          - link "Facebook" [ref=e34] [cursor=pointer]:
            - /url: "#"
    - generic [ref=e38]:
      - link "KEYPRO SERVICE CENTER" [ref=e39] [cursor=pointer]:
        - /url: /
        - img "KEYPRO Service Center" [ref=e40]
      - navigation [ref=e48]:
        - link "Accueil" [ref=e49] [cursor=pointer]:
          - /url: /
        - link "Services" [ref=e51] [cursor=pointer]:
          - /url: /services
        - link "À propos" [ref=e52] [cursor=pointer]:
          - /url: /a-propos
        - link "Marques" [ref=e53] [cursor=pointer]:
          - /url: /marques
        - link "Galerie" [ref=e54] [cursor=pointer]:
          - /url: /galerie
        - link "Contact" [ref=e55] [cursor=pointer]:
          - /url: /contact
      - link "Demander un devis" [ref=e57] [cursor=pointer]:
        - /url: /contact
  - main [ref=e60]:
    - generic [ref=e61]:
      - img "Technicien intervenant sur le moteur d’un véhicule" [ref=e65]
      - generic [ref=e70]:
        - generic [ref=e71]:
          - paragraph [ref=e73]: Lomé · Togo — Spécialiste clés auto & électronique
          - paragraph [ref=e75]: Technicien
          - heading "AUTOMOBILE" [level=1] [ref=e76]
          - paragraph [ref=e80]: Reproduction et programmation de clés, diagnostic électronique et assistance mobile. Toutes marques, intervention rapide partout dans le Grand Lomé.
          - list [ref=e82]:
            - listitem [ref=e83]: Auto scanner
            - listitem [ref=e87]: Programmeur
            - listitem [ref=e91]: Conseiller technique
          - generic [ref=e96]:
            - link "Prendre rendez-vous" [ref=e98] [cursor=pointer]:
              - /url: /contact
            - link "+228 72 11 44 44" [ref=e102] [cursor=pointer]:
              - /url: tel:+22872114444
          - generic [ref=e106]:
            - generic [ref=e107]: Agoè-Nyivé, Lomé — Togo
            - generic [ref=e111]: Toutes marques
            - generic [ref=e114]: Sur site en 30 min
        - generic [ref=e120]:
          - img "Clé intelligente Mercedes-Benz tenue en main" [ref=e122]
          - generic [ref=e123]:
            - paragraph [ref=e124]: Clés programmées
            - generic [ref=e125]: 2 000+
          - generic [ref=e126]:
            - paragraph [ref=e127]: Assistance
            - paragraph [ref=e128]: 24/7
          - generic [ref=e129]: Toutes marques
    - generic [ref=e138]:
      - link "Appelez-nous +228 72 11 44 44 / 98 48 88 44 / 22 46 66 26" [ref=e139] [cursor=pointer]:
        - /url: tel:+22872114444
        - generic [ref=e143]:
          - generic [ref=e144]: Appelez-nous
          - generic [ref=e145]: +228 72 11 44 44 / 98 48 88 44 / 22 46 66 26
      - link "Écrivez-nous garagelaredemption@gmail.com" [ref=e146] [cursor=pointer]:
        - /url: mailto:garagelaredemption@gmail.com
        - generic [ref=e151]:
          - generic [ref=e152]: Écrivez-nous
          - generic [ref=e153]: garagelaredemption@gmail.com
      - link "WhatsApp +228 72 11 44 44" [ref=e154] [cursor=pointer]:
        - /url: https://wa.me/22872114444
        - generic [ref=e159]:
          - generic [ref=e160]: WhatsApp
          - generic [ref=e161]: +228 72 11 44 44
    - generic [ref=e168]:
      - generic [ref=e169]:
        - paragraph [ref=e170]: Clé perdue ?
        - heading "Pas de remorquage. Nous venons à vous." [level=2] [ref=e171]:
          - text: Pas de remorquage.
          - generic [ref=e172]: Nous venons à vous.
        - paragraph [ref=e173]: Une clé perdue n'immobilise plus votre véhicule. Notre unité mobile se déplace avec le matériel complet de fabrication et de programmation, où que vous soyez dans le Grand Lomé.
      - generic [ref=e174]:
        - generic [ref=e175]:
          - text: "01"
          - heading "Vous appelez" [level=3] [ref=e176]
          - paragraph [ref=e177]: Marque, modèle, année et votre position. Une minute suffit.
        - generic [ref=e178]:
          - text: "02"
          - heading "Nous arrivons" [level=3] [ref=e179]
          - paragraph [ref=e180]: Unité mobile équipée, en moyenne sous 30 minutes dans Lomé.
        - generic [ref=e181]:
          - text: "03"
          - heading "Vous repartez" [level=3] [ref=e182]
          - paragraph [ref=e183]: Clé fabriquée, programmée et testée devant vous.
      - generic [ref=e184]:
        - link "WhatsApp" [ref=e185] [cursor=pointer]:
          - /url: https://wa.me/22872114444
        - link "+228 72 11 44 44" [ref=e189] [cursor=pointer]:
          - /url: tel:+22872114444
    - generic [ref=e193]:
      - generic [ref=e194]:
        - paragraph [ref=e196]: Ce que nous faisons
        - heading "Des solutions complètes pour vos clés et votre électronique" [level=2] [ref=e197]:
          - generic [ref=e198]: Des
          - generic [ref=e200]: solutions
          - generic [ref=e202]: complètes
          - generic [ref=e204]: pour
          - generic [ref=e206]: vos
          - generic [ref=e208]: clés
          - generic [ref=e210]: et
          - generic [ref=e212]: votre
          - generic [ref=e214]: électronique
        - paragraph [ref=e217]: Clé perdue, télécommande hors service, voyant moteur allumé ? KEYPRO SERVICE CENTER intervient en atelier comme à domicile.
      - generic [ref=e218]:
        - link [ref=e221] [cursor=pointer]:
          - /url: /services#cles-auto
          - img "Clé de voiture avec télécommande intégrée" [ref=e223]
          - generic [ref=e229]:
            - heading "Clés auto — duplication & programmation" [level=3] [ref=e230]
            - paragraph [ref=e231]: "Double de clé, clé perdue, clé cassée : fabrication et programmation sur place."
            - generic [ref=e232]: En savoir plus
        - link [ref=e237] [cursor=pointer]:
          - /url: /services#smart-keys
          - img "Clé intelligente noire" [ref=e239]
          - generic [ref=e245]:
            - heading "Smart keys (clés intelligentes)" [level=3] [ref=e246]
            - paragraph [ref=e247]: Clés mains libres, démarrage sans clé, boîtiers Keyless.
            - generic [ref=e248]: En savoir plus
        - link [ref=e253] [cursor=pointer]:
          - /url: /services#telecommandes
          - img "Télécommande de véhicule sur fond noir" [ref=e255]
          - generic [ref=e262]:
            - heading "Télécommandes" [level=3] [ref=e263]
            - paragraph [ref=e264]: Réparation, appairage et remplacement de télécommandes centralisées.
            - generic [ref=e265]: En savoir plus
        - link [ref=e270] [cursor=pointer]:
          - /url: /services#diagnostic
          - img "Tableau de bord et compteur de véhicule" [ref=e272]
          - generic [ref=e278]:
            - heading "Diagnostic électronique" [level=3] [ref=e279]
            - paragraph [ref=e280]: Lecture des codes défaut, analyse des capteurs et des calculateurs.
            - generic [ref=e281]: En savoir plus
        - link [ref=e286] [cursor=pointer]:
          - /url: /services#programmation
          - img "Compte-tours d’un véhicule" [ref=e288]
          - generic [ref=e293]:
            - heading "Codage et programmation véhicule" [level=3] [ref=e294]
            - paragraph [ref=e295]: Reprogrammation de calculateurs, codage de composants, mises à jour.
            - generic [ref=e296]: En savoir plus
        - link [ref=e301] [cursor=pointer]:
          - /url: /services#assistance-mobile
          - img "Intervention sur une roue en atelier" [ref=e303]
          - generic [ref=e310]:
            - heading "Assistance automobile mobile" [level=3] [ref=e311]
            - paragraph [ref=e312]: "Nous venons à vous : domicile, bureau, parking, bord de route."
            - generic [ref=e313]: En savoir plus
    - generic [ref=e322]:
      - generic [ref=e323]:
        - generic [ref=e324]: 2 000+
        - paragraph [ref=e325]: Véhicules pris en charge
      - generic [ref=e326]:
        - generic [ref=e327]: "4"
        - paragraph [ref=e328]: Origines de marques couvertes
      - generic [ref=e329]:
        - generic [ref=e330]: 30min
        - paragraph [ref=e331]: Délai moyen d'intervention
      - generic [ref=e332]:
        - generic [ref=e333]: 7j/7
        - paragraph [ref=e334]: Assistance urgence
    - generic [ref=e336]:
      - generic [ref=e337]:
        - generic [ref=e338]:
          - generic [ref=e339]:
            - img "Mécanicien au travail" [ref=e344]
            - img "Outils de mécanique" [ref=e347]
          - generic [ref=e348]:
            - img "Remise de clé devant un véhicule" [ref=e351]
            - img "Entretien moteur" [ref=e356]
        - generic:
          - generic: 10+
          - generic: Années d'expérience
      - generic [ref=e357]:
        - paragraph [ref=e359]: À propos de KEYPRO
        - heading "Expertise technique, rapidité et transparence" [level=2] [ref=e360]:
          - generic [ref=e361]: Expertise
          - generic [ref=e363]: technique,
          - generic [ref=e365]: rapidité
          - generic [ref=e367]: et
          - generic [ref=e369]: transparence
        - paragraph [ref=e372]: KEYPRO SERVICE CENTER est un centre technique spécialisé dans les clés automobiles et l'électronique embarquée. Nous combinons des outils de diagnostic modernes et une équipe formée aux systèmes des constructeurs japonais, européens, américains et chinois.
        - list [ref=e373]:
          - listitem [ref=e374]:
            - generic [ref=e379]: Diagnostic électronique complet
          - listitem [ref=e380]:
            - generic [ref=e385]: Programmation et codage véhicule
          - listitem [ref=e386]:
            - generic [ref=e391]: Intervention mobile sur site
        - generic [ref=e393]:
          - link "En savoir plus" [ref=e395] [cursor=pointer]:
            - /url: /a-propos
          - link "+228 98 48 88 44" [ref=e398] [cursor=pointer]:
            - /url: tel:+22898488844
    - generic [ref=e403]:
      - generic [ref=e405]:
        - paragraph [ref=e406]: Intervention mobile
        - heading "Partout dans le Grand Lomé" [level=2] [ref=e407]
        - paragraph [ref=e408]: Notre atelier est à Agoè-Nyivé, mais notre unité mobile couvre l'ensemble de l'agglomération.
      - generic [ref=e411]:
        - generic [ref=e412]: Agoè-Nyivé
        - generic [ref=e414]: Adidogomé
        - generic [ref=e416]: Bè
        - generic [ref=e418]: Akodésséwa
        - generic [ref=e420]: Hédzranawoé
        - generic [ref=e422]: Tokoin
        - generic [ref=e424]: Nyékonakpoè
        - generic [ref=e426]: Baguida
        - generic [ref=e428]: Avépozo
        - generic [ref=e430]: Kégué
        - generic [ref=e432]: Totsi
        - generic [ref=e434]: Djidjolé
        - generic [ref=e436]: Agoè-Nyivé
        - generic [ref=e438]: Adidogomé
        - generic [ref=e440]: Bè
        - generic [ref=e442]: Akodésséwa
        - generic [ref=e444]: Hédzranawoé
        - generic [ref=e446]: Tokoin
        - generic [ref=e448]: Nyékonakpoè
        - generic [ref=e450]: Baguida
        - generic [ref=e452]: Avépozo
        - generic [ref=e454]: Kégué
        - generic [ref=e456]: Totsi
        - generic [ref=e458]: Djidjolé
      - link "Voir la carte" [ref=e462] [cursor=pointer]:
        - /url: /contact
    - generic [ref=e472]:
      - generic [ref=e473]:
        - paragraph [ref=e475]: Notre méthode
        - heading "Comment nous travaillons" [level=2] [ref=e476]:
          - generic [ref=e477]: Comment
          - generic [ref=e479]: nous
          - generic [ref=e481]: travaillons
      - generic [ref=e483]:
        - article [ref=e485]:
          - generic [ref=e486]:
            - img "Écran tactile allumé dans un véhicule moderne" [ref=e487]
            - generic [ref=e489]: "01"
            - generic [ref=e490]: "01"
          - generic [ref=e491]:
            - heading "Identifier le problème" [level=3] [ref=e492]
            - paragraph [ref=e493]: Vous nous décrivez la panne par téléphone ou WhatsApp, nous qualifions le besoin.
        - article [ref=e496]:
          - generic [ref=e497]:
            - img "Tableau de bord avec navigation embarquée" [ref=e498]
            - generic [ref=e500]: "02"
            - generic [ref=e501]: "02"
          - generic [ref=e502]:
            - heading "Proposer une solution" [level=3] [ref=e503]
            - paragraph [ref=e504]: Nous vous annonçons la démarche, le délai et le tarif avant toute intervention.
        - article [ref=e507]:
          - generic [ref=e508]:
            - img "Technicien intervenant sur le moteur" [ref=e509]
            - generic [ref=e511]: "03"
            - generic [ref=e512]: "03"
          - generic [ref=e513]:
            - heading "Intervenir" [level=3] [ref=e514]
            - paragraph [ref=e515]: En atelier ou sur site, avec le matériel de diagnostic et de programmation adapté.
        - article [ref=e518]:
          - generic [ref=e519]:
            - img "Remise de la clé devant le véhicule" [ref=e520]
            - generic [ref=e522]: "04"
            - generic [ref=e523]: "04"
          - generic [ref=e524]:
            - heading "Livrer et garantir" [level=3] [ref=e525]
            - paragraph [ref=e526]: Test complet devant vous, conseils d'entretien et suivi après intervention.
    - generic [ref=e529]:
      - generic [ref=e530]:
        - paragraph [ref=e532]: Spécialiste en toutes marques
        - heading "Japonaises, chinoises, américaines, européennes" [level=2] [ref=e533]:
          - generic [ref=e534]: Japonaises,
          - generic [ref=e536]: chinoises,
          - generic [ref=e538]: américaines,
          - generic [ref=e540]: européennes
      - generic [ref=e542]:
        - article [ref=e544]:
          - generic [ref=e545]:
            - img "Véhicule récent en concession" [ref=e546]
            - heading "Japonaises" [level=3] [ref=e549]
            - generic [ref=e550]: "8"
          - list [ref=e551]:
            - listitem [ref=e552]: Toyota
            - listitem [ref=e553]: Nissan
            - listitem [ref=e554]: Honda
            - listitem [ref=e555]: Mitsubishi
            - listitem [ref=e556]: Suzuki
            - listitem [ref=e557]: Mazda
            - listitem [ref=e558]: Subaru
            - listitem [ref=e559]: Isuzu
        - article [ref=e561]:
          - generic [ref=e562]:
            - img "Volant multifonction d’un véhicule européen" [ref=e563]
            - heading "Européennes" [level=3] [ref=e566]
            - generic [ref=e567]: "8"
          - list [ref=e568]:
            - listitem [ref=e569]: Mercedes-Benz
            - listitem [ref=e570]: BMW
            - listitem [ref=e571]: Volkswagen
            - listitem [ref=e572]: Audi
            - listitem [ref=e573]: Peugeot
            - listitem [ref=e574]: Renault
            - listitem [ref=e575]: Citroën
            - listitem [ref=e576]: Volvo
        - article [ref=e578]:
          - generic [ref=e579]:
            - img "Coupé noir contemporain" [ref=e580]
            - heading "Américaines" [level=3] [ref=e583]
            - generic [ref=e584]: "8"
          - list [ref=e585]:
            - listitem [ref=e586]: Ford
            - listitem [ref=e587]: Chevrolet
            - listitem [ref=e588]: Jeep
            - listitem [ref=e589]: Dodge
            - listitem [ref=e590]: GMC
            - listitem [ref=e591]: Cadillac
            - listitem [ref=e592]: Chrysler
            - listitem [ref=e593]: Tesla
        - article [ref=e595]:
          - generic [ref=e596]:
            - img "Habitacle moderne avec écran de navigation" [ref=e597]
            - heading "Chinoises" [level=3] [ref=e600]
            - generic [ref=e601]: "8"
          - list [ref=e602]:
            - listitem [ref=e603]: Chery
            - listitem [ref=e604]: Geely
            - listitem [ref=e605]: Haval
            - listitem [ref=e606]: BYD
            - listitem [ref=e607]: Changan
            - listitem [ref=e608]: JAC
            - listitem [ref=e609]: Dongfeng
            - listitem [ref=e610]: MG
      - link "Voir tout" [ref=e613] [cursor=pointer]:
        - /url: /marques
    - generic [ref=e617]:
      - generic [ref=e618]:
        - paragraph [ref=e620]: Pourquoi KEYPRO
        - heading "Nos avantages" [level=2] [ref=e621]:
          - generic [ref=e622]: Nos
          - generic [ref=e624]: avantages
      - generic [ref=e626]:
        - article [ref=e628]:
          - img "Traînées lumineuses d’un véhicule en mouvement de nuit" [ref=e629]
          - generic [ref=e632]:
            - heading "Intervention rapide" [level=3] [ref=e636]
            - paragraph [ref=e637]: Nous nous déplaçons là où vous êtes, sans remorquage inutile.
            - link "Nos services" [ref=e639] [cursor=pointer]:
              - /url: /services
        - article [ref=e643]:
          - img "Écran de diagnostic embarqué" [ref=e644]
          - generic [ref=e647]:
            - heading "Expertise spécialisée" [level=3] [ref=e651]
            - paragraph [ref=e652]: "Clés intelligentes, immobiliseurs, calculateurs : notre cœur de métier."
        - article [ref=e654]:
          - img "Habitacle haut de gamme" [ref=e655]
          - generic [ref=e658]:
            - heading "Toutes marques" [level=3] [ref=e663]
            - paragraph [ref=e664]: Compatible avec la majorité des véhicules modernes.
        - article [ref=e666]:
          - img "Combiné d’instruments numérique" [ref=e667]
          - generic [ref=e670]:
            - heading "Digital et IA" [level=3] [ref=e674]
            - paragraph [ref=e675]: Chatbot, prise de rendez-vous et notifications en temps réel.
    - generic [ref=e682]:
      - generic [ref=e683]:
        - paragraph [ref=e685]: Témoignages
        - heading "Ce que disent nos clients" [level=2] [ref=e686]:
          - generic [ref=e687]: Ce
          - generic [ref=e689]: que
          - generic [ref=e691]: disent
          - generic [ref=e693]: nos
          - generic [ref=e695]: clients
      - generic [ref=e698]:
        - region "Témoignages clients" [ref=e699]:
          - group "1/7" [ref=e700]:
            - figure "K Kossi A. Agoè-Nyivé · Toyota RAV4" [ref=e702]:
              - generic [ref=e703]: “
              - blockquote [ref=e704]: J'avais perdu l'unique clé de mon Toyota. L'équipe est venue jusqu'au parking à Agoè, a fabriqué et programmé une nouvelle clé en moins d'une heure.
              - generic "5/5" [ref=e705]:
                - generic [ref=e706]: ★
                - generic [ref=e707]: ★
                - generic [ref=e708]: ★
                - generic [ref=e709]: ★
                - generic [ref=e710]: ★
              - generic [ref=e711]:
                - generic [ref=e712]: K
                - generic [ref=e713]:
                  - generic [ref=e714]: Kossi A.
                  - generic [ref=e715]: Agoè-Nyivé · Toyota RAV4
          - group "2/7" [ref=e716]:
            - figure "A Afiwa D. Tokoin · Hyundai Tucson" [ref=e718]:
              - generic [ref=e719]: “
              - blockquote [ref=e720]: Voyant moteur allumé depuis des semaines et deux garages incapables de trouver. Diagnostic clair chez KEYPRO, réparé le jour même.
              - generic "5/5" [ref=e721]:
                - generic [ref=e722]: ★
                - generic [ref=e723]: ★
                - generic [ref=e724]: ★
                - generic [ref=e725]: ★
                - generic [ref=e726]: ★
              - generic [ref=e727]:
                - generic [ref=e728]: A
                - generic [ref=e729]:
                  - generic [ref=e730]: Afiwa D.
                  - generic [ref=e731]: Tokoin · Hyundai Tucson
          - group "3/7" [ref=e732]:
            - figure "K Komlan M. Lomé · Responsable logistique" [ref=e734]:
              - generic [ref=e735]: “
              - blockquote [ref=e736]: "Ils gèrent la flotte de notre société sur tout le Grand Lomé : doubles de clés, diagnostics périodiques. Sérieux et réactifs."
              - generic "5/5" [ref=e737]:
                - generic [ref=e738]: ★
                - generic [ref=e739]: ★
                - generic [ref=e740]: ★
                - generic [ref=e741]: ★
                - generic [ref=e742]: ★
              - generic [ref=e743]:
                - generic [ref=e744]: K
                - generic [ref=e745]:
                  - generic [ref=e746]: Komlan M.
                  - generic [ref=e747]: Lomé · Responsable logistique
          - group "4/7" [ref=e748]:
            - figure "Y Yawa K. Bè · Peugeot 308" [ref=e750]:
              - generic [ref=e751]: “
              - blockquote [ref=e752]: Clé cassée dans le contact un dimanche soir. Ils ont répondu tout de suite sur WhatsApp et sont venus la même heure. Sauvés.
              - generic "5/5" [ref=e753]:
                - generic [ref=e754]: ★
                - generic [ref=e755]: ★
                - generic [ref=e756]: ★
                - generic [ref=e757]: ★
                - generic [ref=e758]: ★
              - generic [ref=e759]:
                - generic [ref=e760]: "Y"
                - generic [ref=e761]:
                  - generic [ref=e762]: Yawa K.
                  - generic [ref=e763]: Bè · Peugeot 308
          - group "5/7" [ref=e764]:
            - figure "E Edem T. Adidogomé · Nissan Note" [ref=e766]:
              - generic [ref=e767]: “
              - blockquote [ref=e768]: Devis clair envoyé avant toute intervention, prix honnête pour une clé à transpondeur — bien moins cher qu'au concessionnaire.
              - generic "5/5" [ref=e769]:
                - generic [ref=e770]: ★
                - generic [ref=e771]: ★
                - generic [ref=e772]: ★
                - generic [ref=e773]: ★
                - generic [ref=e774]: ★
              - generic [ref=e775]:
                - generic [ref=e776]: E
                - generic [ref=e777]:
                  - generic [ref=e778]: Edem T.
                  - generic [ref=e779]: Adidogomé · Nissan Note
          - group "6/7" [ref=e780]:
            - figure "A Ama S. Baguida · Toyota Hilux" [ref=e782]:
              - generic [ref=e783]: “
              - blockquote [ref=e784]: Notre camionnette de chantier ne pouvait plus démarrer un vendredi. Diagnostic sur place, pièce identifiée, réparée avant le week-end.
              - generic "5/5" [ref=e785]:
                - generic [ref=e786]: ★
                - generic [ref=e787]: ★
                - generic [ref=e788]: ★
                - generic [ref=e789]: ★
                - generic [ref=e790]: ★
              - generic [ref=e791]:
                - generic [ref=e792]: A
                - generic [ref=e793]:
                  - generic [ref=e794]: Ama S.
                  - generic [ref=e795]: Baguida · Toyota Hilux
          - group "7/7" [ref=e796]:
            - figure "K Koffi N. Hédzranawoé · Kia Picanto" [ref=e798]:
              - generic [ref=e799]: “
              - blockquote [ref=e800]: Accueil sérieux, explications en français et en anglais, aucun jargon pour me vendre plus cher. J'y retourne pour tout entretien clé.
              - generic "5/5" [ref=e801]:
                - generic [ref=e802]: ★
                - generic [ref=e803]: ★
                - generic [ref=e804]: ★
                - generic [ref=e805]: ★
                - generic [ref=e806]: ★
              - generic [ref=e807]:
                - generic [ref=e808]: K
                - generic [ref=e809]:
                  - generic [ref=e810]: Koffi N.
                  - generic [ref=e811]: Hédzranawoé · Kia Picanto
        - button "Témoignage précédent" [ref=e812] [cursor=pointer]
        - button "Témoignage suivant" [ref=e815] [cursor=pointer]
        - generic [ref=e818]:
          - button "Aller au témoignage 1" [ref=e819] [cursor=pointer]
          - button "Aller au témoignage 2" [ref=e821] [cursor=pointer]
          - button "Aller au témoignage 3" [ref=e822] [cursor=pointer]
          - button "Aller au témoignage 4" [ref=e823] [cursor=pointer]
          - button "Aller au témoignage 5" [ref=e824] [cursor=pointer]
          - button "Aller au témoignage 6" [ref=e825] [cursor=pointer]
          - button "Aller au témoignage 7" [ref=e826] [cursor=pointer]
        - paragraph [ref=e827]: Témoignage 1 sur 7, Kossi A.
    - generic [ref=e828]:
      - img "Gros plan sur un moteur" [ref=e832]
      - generic [ref=e835]:
        - generic [ref=e836]:
          - heading "Besoin d'une clé, d'un diagnostic ou d'une intervention rapide ?" [level=2] [ref=e837]:
            - generic [ref=e838]: Besoin
            - generic [ref=e840]: d'une
            - generic [ref=e842]: clé,
            - generic [ref=e844]: d'un
            - generic [ref=e846]: diagnostic
            - generic [ref=e848]: ou
            - generic [ref=e850]: d'une
            - generic [ref=e852]: intervention
            - generic [ref=e854]: rapide
            - generic [ref=e856]: "?"
          - paragraph [ref=e859]: Appelez-nous ou envoyez un message WhatsApp. Nous répondons en quelques minutes.
        - generic [ref=e860]:
          - link "+228 72 11 44 44" [ref=e862] [cursor=pointer]:
            - /url: tel:+22872114444
          - link "WhatsApp" [ref=e866] [cursor=pointer]:
            - /url: https://wa.me/22872114444
          - link "Devis gratuit" [ref=e871] [cursor=pointer]:
            - /url: /contact
  - contentinfo [ref=e874]:
    - generic [ref=e877]:
      - img "KEYPRO Service Center" [ref=e879]
      - generic [ref=e887]:
        - paragraph [ref=e888]: Recevez nos conseils entretien
        - paragraph [ref=e889]: Clés auto • Programmation • Diagnostic • Assistance mobile
      - generic [ref=e890]:
        - generic [ref=e891]: Votre e-mail
        - textbox "Votre e-mail" [ref=e892]
        - button "S’inscrire" [ref=e893] [cursor=pointer]
    - generic [ref=e894]:
      - generic [ref=e895]:
        - heading "À propos" [level=3] [ref=e896]
        - paragraph [ref=e897]: Centre technique spécialisé dans les clés automobiles, l’électronique embarquée et l’assistance mobile. Toutes marques.
        - generic [ref=e898]:
          - link "LinkedIn" [ref=e899] [cursor=pointer]:
            - /url: "#"
          - link "X" [ref=e902] [cursor=pointer]:
            - /url: "#"
          - link "YouTube" [ref=e905] [cursor=pointer]:
            - /url: "#"
          - link "Instagram" [ref=e908] [cursor=pointer]:
            - /url: "#"
          - link "Facebook" [ref=e911] [cursor=pointer]:
            - /url: "#"
      - generic [ref=e914]:
        - heading "Navigation" [level=3] [ref=e915]
        - list [ref=e916]:
          - listitem [ref=e917]:
            - link "Accueil" [ref=e918] [cursor=pointer]:
              - /url: /
          - listitem [ref=e921]:
            - link "Services" [ref=e922] [cursor=pointer]:
              - /url: /services
          - listitem [ref=e925]:
            - link "À propos" [ref=e926] [cursor=pointer]:
              - /url: /a-propos
          - listitem [ref=e929]:
            - link "Marques" [ref=e930] [cursor=pointer]:
              - /url: /marques
          - listitem [ref=e933]:
            - link "Galerie" [ref=e934] [cursor=pointer]:
              - /url: /galerie
          - listitem [ref=e937]:
            - link "Contact" [ref=e938] [cursor=pointer]:
              - /url: /contact
      - generic [ref=e941]:
        - heading "Contact" [level=3] [ref=e942]
        - list [ref=e943]:
          - listitem [ref=e944]:
            - generic [ref=e948]: Agoè-Nyivé, Lomé — Togo
          - listitem [ref=e949]:
            - generic [ref=e952]:
              - link "+228 72 11 44 44" [ref=e953] [cursor=pointer]:
                - /url: tel:+22872114444
              - link "+228 98 48 88 44" [ref=e954] [cursor=pointer]:
                - /url: tel:+22898488844
              - link "+228 22 46 66 26" [ref=e955] [cursor=pointer]:
                - /url: tel:+22822466626
          - listitem [ref=e956]:
            - link "garagelaredemption@gmail.com" [ref=e960] [cursor=pointer]:
              - /url: mailto:garagelaredemption@gmail.com
      - generic [ref=e961]:
        - heading "Horaires" [level=3] [ref=e962]
        - list [ref=e963]:
          - listitem [ref=e964]:
            - generic [ref=e965]: Lundi – Vendredi
            - generic [ref=e966]: 08h00 – 19h00
          - listitem [ref=e967]:
            - generic [ref=e968]: Samedi
            - generic [ref=e969]: 08h00 – 19h00
          - listitem [ref=e970]:
            - generic [ref=e971]: Dimanche
            - generic [ref=e972]: Urgences uniquement
    - generic [ref=e974]:
      - paragraph [ref=e975]: © 2026 KEYPRO SERVICE CENTER. Tous droits réservés.
      - navigation [ref=e976]:
        - link "Politique de confidentialité" [ref=e977] [cursor=pointer]:
          - /url: /politique-confidentialite
        - link "Mentions légales" [ref=e978] [cursor=pointer]:
          - /url: /mentions-legales
      - paragraph [ref=e979]: "Photos : Unsplash"
  - link "Discuter sur WhatsApp" [ref=e980] [cursor=pointer]:
    - /url: https://wa.me/22872114444?text=Bonjour%20KEYPRO%20Service%20Center%2C%20j'aimerais%20des%20informations%20sur%20vos%20services.
  - button "Open Next.js Dev Tools" [ref=e991] [cursor=pointer]
  - alert [ref=e995]
  - status [ref=e996]:
    - paragraph [ref=e997]:
      - text: Ce site utilise uniquement des cookies fonctionnels (langue, session d’administration) — aucun traceur publicitaire ni de mesure d’audience.
      - link "En savoir plus" [ref=e998] [cursor=pointer]:
        - /url: /politique-confidentialite
    - button "J’ai compris" [ref=e999] [cursor=pointer]
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
> 29 |     await expect(puces).toHaveCount(7);
     |                         ^ Error: expect(locator).toHaveCount(expected) failed
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
  61 |     await expect(page.getByText(/5\s*(sur|of)\s*7/i)).toBeVisible({ timeout: 5000 });
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