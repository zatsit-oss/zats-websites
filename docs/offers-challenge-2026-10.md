# Challenge de l'offre zatsit

Octobre 2026. Document de travail interne, pour décider de la forme de l'offre avant de réécrire la page `/offres/`.

## Pourquoi ce document

Les associés ne sont pas à l'aise avec les deux offres actuelles de la page `/offres/` :

- **Offre A, « Conseil éco-conception mesuré »** : diagnostic GreenScore, trajectoire de remédiation, refonte sur une architecture sobre.
- **Offre B, « Pratique IA souveraine et frugale »** : conseil embarqué pour cadrer le développement assisté par IA et dimensionner les modèles.

La page a d'abord été retravaillée sur la forme, après une critique de design Impeccable (17/28). Ce document porte sur le fond : est-ce que ces offres se vendent, et faut-il les restructurer ?

## Méthode

Trois relecteurs fictifs ont lu, chacun de leur côté, le texte complet de `/offres/`, le manifeste, les offres de l'accueil (`services.json`) et la page tech (`tech.json`). Ils avaient aussi le contexte de zatsit : 36 personnes, une activité surtout en régie, B Corp, EcoVadis argent, GreenScore, et une offre B qui n'a encore aucun client.

| Relecteur | Profil |
|---|---|
| Le CTO | CTO d'une ETI lilloise de 400 personnes (retail et logistique), 15 développeurs, un SI Java/Angular vieillissant, une facture cloud qui grimpe, des développeurs qui utilisent déjà Copilot et Claude sans règles |
| L'acheteur | Acheteur IT d'un grand compte régional (banque-assurance), avec des ESN référencées, des grilles tarifaires, des critères d'achat RSE et un DAF qui demande un retour sur investissement |
| Le concurrent | Directeur commercial d'une ESN lilloise de 200 personnes qui vend déjà de l'audit green IT et de l'accompagnement IA générative |

Ce sont des simulations, pas des entretiens. Leurs budgets et leurs durées sont des hypothèses d'acheteurs, pas des données du marché. Les citations ci-dessous reprennent leurs propos.

## Verdict

**Aucun des trois n'achèterait les deux offres en l'état.** Les trois arrivent, séparément, à la même recommandation : **une porte d'entrée unique et payante**, le diagnostic GreenScore au forfait, suivie de suites optionnelles.

- **Le CTO** : l'offre A est « pas en l'état, mais la plus proche d'un achat ». L'offre B, c'est « non ».
- **L'acheteur** : « A peut s'acheter après restructuration. B, en l'état, reste une intention. »
- **Le concurrent** : « Leur vrai fossé, c'est le dev augmenté pratiqué par des seniors. L'éco-conception devrait rester l'argument qui l'accompagne, pas le produit. »

## Ce qui tient

1. **Le dev augmenté pratiqué par des seniors.** C'est l'avantage le plus difficile à copier. Le concurrent : « la page, je la copie en une semaine. La pratique réelle, pas tout de suite », et ses juniors en régie ne l'ont pas.
2. **GreenScore.** Une mesure chiffrée, open source et vérifiable, face à des concurrents qui font souvent du déclaratif. C'est la seule brique de l'offre qui existe vraiment aujourd'hui. Limite relevée : l'outil ne note que le SI et les API, et un outil open source peut être repris par d'autres.
3. **Le positionnement d'abord technique, sans posture éco.** Il est rare et crédible. Le concurrent juge d'ailleurs le manifeste plus convaincant que la page offres.
4. **B Corp et EcoVadis argent.** Pour l'acheteur, c'est un vrai atout dans la grille d'achat RSE, et la page ne l'exploite pas. Pour le concurrent, ce n'est qu'un ticket d'entrée : il est certifié aussi.
5. **L'expérience de l'équipe**, mais seulement si l'on peut nommer les seniors. Sinon, l'argument ne passe pas à l'échelle.

## Ce qui ne tient pas

| Problème | Ce qu'ils en disent | Relevé par |
|---|---|---|
| **Aucune preuve** | « La sobriété devient un levier financier » est lu comme un slogan : aucun cas client, aucun chiffre en euros. Le DAF veut un état de référence chiffré et des économies mesurées sur 6 à 12 mois | les trois |
| **L'offre B n'a aucun client** | « Notre propre pratique interne comme preuve », « ce n'est pas une preuve, c'est un aveu » | les trois |
| **« Souveraine »** | Promis dans le titre, retiré dans la note. En banque-assurance, le mot engage la conformité et le règlement DORA : une promesse retirée ensuite, « c'est un litige ». Il contredit aussi le manifeste (« ni marchand de souverain de façade ») | les trois |
| **La mesure de la consommation IA** | « GreenScore étendu à la consommation IA » est présenté comme un moyen, alors que l'outil ne le fait pas encore : « montrez-moi l'outil qui fait ça aujourd'hui » | les trois |
| **La remédiation par refonte** | Pas de bornes, et le problème de « juge et partie » : celui qui diagnostique vend la refonte. Le concurrent : « combien de personnes zatsit peut-il sortir de la régie pour livrer au forfait ? » | les trois |
| **Rien n'est achetable** | Ni périmètre, ni durée, ni modèle de prix, ni critères de recette. L'acheteur ne peut pas en tirer un bon de commande | le CTO et l'acheteur |
| **Une note qui ne parle pas d'argent** | « Mon COMEX veut des euros, pas une lettre. » Le lien entre une meilleure note de A à E et une baisse de la facture n'est pas démontré | le CTO et l'acheteur |
| **Une méthode de notation maison** | Qui maintient GreenScore ? La notation est-elle publiée, validée par un tiers ? « Je ne veux pas piloter un indicateur que seul le fournisseur sait lire » | l'acheteur |
| **Trop de cibles** | Dix cibles pour deux offres, dont la banque et la santé, sans références dans ces secteurs réglementés | le concurrent |
| **Deux messages, deux acheteurs** | L'éco-conception parle à l'acheteur RSE, l'IA frugale au DSI : « le prospect ne sait plus quoi acheter » | le concurrent |
| **Deux créneaux faibles** | L'éco-conception est une commodité où les prix baissent, l'« IA frugale » un mot à la mode : « les CTO veulent de la productivité, pas de la frugalité » | le concurrent |

## Ce qui ferait signer

- **Un diagnostic au forfait, avec un vrai prix et un vrai livrable**, qui a de la valeur même sans suite. Sinon il est perçu comme de l'avant-vente payée ou un produit d'appel. Hypothèses des relecteurs : 3 à 4 semaines, entre 15 et 25 k€ ; un rapport court, le top 10 des gisements chiffrés en euros (gain, effort, risque), une restitution à la direction.
- **Un chiffrage en euros**, facture cloud et usage IA compris, en plus de la note de A à E.
- **Un ou deux cas clients** avec des chiffres avant/après en euros (et en CO2). Pour l'IA, un pilote documenté, même interne, présenté honnêtement comme tel.
- **Un catalogue achetable** : le diagnostic en tailles S, M ou L selon le nombre d'applications, des tarifs journaliers par profil, la remédiation sur devis par lots séparés.
- **Des noms** : l'équipe qui intervient, avec ses profils.
- **La méthode de notation GreenScore publiée.**
- **Un mode de contractualisation** compatible avec les marchés existants des grands comptes, en sous-traitance d'un titulaire si besoin.

La phrase du CTO qui résume le besoin : « En 4 semaines et pour 20 k€ au forfait, nous mesurons votre SI et l'usage IA de vos devs, et nous vous remettons la liste chiffrée en euros de ce que vous pouvez couper, que vous la réalisiez avec nous ou sans nous. »

## Pistes de restructuration

### Piste 1 : une porte d'entrée, deux suites (proposée par les trois relecteurs)

1. **Diagnostic GreenScore** : un forfait court et payant, avec une note de A à E et des économies chiffrées.
2. Ensuite, au choix du client, sans obligation de passer par zatsit :
   - **Remise au juste dimensionnement** : des chantiers ciblés issus du diagnostic, menés par des seniors. C'est la régie existante, avec un objectif mesuré.
   - **Dev augmenté en équipe** : la méthode transmise à l'équipe du client, sur un pilote d'abord, sans promesse de gouvernance.

### Piste 2 : un angle unique et financier

« Payer moins de calcul, logiciel comme IA. » L'éco-conception devient l'argument qui accompagne, plus le produit. Le titre actuel, « Dimensionner au plus juste », le dit déjà, mais les offres ne le portent pas.

### Piste 3 : l'offre IA en pilote assumé

La première mission IA à prix de pilote, présentée comme telle, puis publiée en cas client. C'est la seule réponse durable à l'attaque « aucune preuve ».

## Piste 4 : une seule offre, le product engineering augmenté

C'est l'hypothèse soulevée après le challenge : ne pousser **qu'une seule offre**, fondée sur le product engineering et le forward deployed engineering, dont le green n'est qu'**une composante**.

### Ce qui va dans son sens

- **Elle s'appuie sur votre vrai avantage.** Les trois relecteurs placent le dev augmenté pratiqué par des seniors au-dessus de tout le reste, et l'éco-conception au rang d'argument d'accompagnement. Cette piste en tire directement la conclusion.
- **Elle colle à votre identité** : « des devs, des ops, des architectes », la technique d'abord, la sobriété comme conséquence. Le manifeste dit déjà exactement ça.
- **Elle est cohérente avec la page carrière**, qui décrit les mêmes rôles (Forward Deployed Engineer, Product Engineer, Tech Lead Agentic, Augmented Engineer, Platform Engineer). Le client achète ce que le candidat rejoint.
- **Elle colle à votre modèle réel.** Des seniors embarqués chez le client, c'est votre activité de régie, présentée pour ce qu'elle est et rendue plus lisible. Le reproche « combien de personnes pouvez-vous sortir de la régie pour un forfait ? » tombe, parce que l'offre ne promet plus de refonte au forfait.
- **Elle engage moins sur le green.** Plus de promesse d'économies d'énergie à démontrer en vitrine, plus de « souveraine », plus d'outil de mesure IA à livrer. La mesure GreenScore reste, mais comme une pratique d'ingénierie parmi d'autres.
- **Un seul message, un seul acheteur** : le DSI ou le CTO. Fin du problème « deux messages, deux acheteurs ».

### Les risques

- **Devenir une ESN de plus.** « Du product engineering avec des seniors », toutes les ESN le disent. Sans preuve, le différenciateur se réduit à un mot. Il faut le rendre visible : la méthode (spec-driven, contexte maîtrisé, modèle choisi selon la tâche, mesure), des noms, des exemples de livrables.
- **Perdre la porte d'entrée.** Les trois relecteurs voulaient un petit ticket au forfait, à risque faible. Une offre « équipe embarquée » est un engagement plus lourd à décider. Il faut garder une première marche courte et payante.
- **Perdre l'argument RSE auprès des acheteurs.** Pour l'acheteur grand compte, B Corp, EcoVadis et la mesure chiffrée comptent dans la grille d'achat. Le green doit rester visible comme preuve de rigueur, simplement plus comme produit.
- **« Forward Deployed Engineer » est un terme jeune**, popularisé par Palantir et les acteurs de l'IA. Il parle aux CTO au fait du sujet, beaucoup moins aux acheteurs. Il vaut mieux le présenter comme un rôle que comme le nom de l'offre.

### Une forme possible

**Une offre : « Product engineering augmenté »** (nom à trouver). Des équipes de seniors qui conçoivent, livrent et font tourner des produits logiciels, avec une méthode de dev augmenté mesurée.

Trois façons d'entrer, de la plus légère à la plus engageante :

1. **Diagnostic** : un forfait court sur le système existant. Architecture, dette, coûts d'exécution (le cloud et l'IA compris), avec GreenScore comme instrument de mesure. Livrable : une liste chiffrée de ce qu'il faut corriger, que le client réalise avec zatsit ou sans.
2. **Équipe embarquée** : des Forward Deployed Engineers et des Product Engineers dans l'équipe du client, avec des objectifs mesurés.
3. **Mise en place du dev augmenté** : la méthode transmise à l'équipe du client, sur un pilote.

Le green n'a plus de section à lui. Il est présent à chaque étape sous forme de **mesure** : la note GreenScore du diagnostic, le dimensionnement juste des choix d'architecture et de modèles. On ne parle d'économies que lorsqu'elles sont chiffrées.

### Déclinaison en packages

Hypothèse retenue après le challenge : une offre unique de product engineering augmenté, découpée en **packages** achetables. Le green et le souverain ne sont plus des offres ni des titres : ce sont des **orientations** présentes dans chaque package, sous une forme conditionnelle et toujours au même endroit (« Mesuré » et « Souverain, quand ça tient »). C'est la réponse au reproche « souveraine » promis dans le titre puis retiré dans la note.

Trois garde-fous :

- quatre packages au plus, pour ne pas retomber dans l'effet « dix cibles » ;
- « maturité IA » est le mot le plus vendu du marché, chaque cabinet a son audit à questionnaire. Le nôtre lit le code, les specs, les tests, la CI et la facture. Le nom doit le dire : « audit maturité IA », pas « maturité » ;
- les orientations ne vont jamais dans les titres.

| Package | Pour qui | Forme | Livrable | Mesuré | Souverain, quand ça tient |
|---|---|---|---|---|---|
| **Audit maturité IA de votre SI et de vos équipes** | Un CTO dont les développeurs utilisent déjà des copilotes sans cadre | Forfait court, périmètre fixé ensemble | Un état des lieux par le code (specs, tests, CI, données), le coût actuel de l'usage de l'IA en euros, une feuille de route priorisée | Coût d'exécution, dimensionnement des modèles utilisés | Carte des données qui ne doivent pas sortir, options d'hébergement réelles |
| **Un projet SDD outillé de bout en bout** | Une équipe qui lance un produit ou une refonte ciblée | Pilote borné, seniors embarqués | Le dépôt lui-même : specs, contrats OpenAPI et AsyncAPI, harness, CI, GreenScore branché dès le premier commit. C'est la preuve que la méthode existe | GreenScore et architecture dimensionnée dès le départ | Modèle et hébergement choisis par tâche, en local quand c'est possible |
| **Désendettement d'une base de code existante** | Un SI vieillissant, de la dette, une facture cloud qui monte | Diagnostic au forfait, puis des chantiers par lots séparés et chiffrés | La liste chiffrée en euros de ce qu'il faut corriger (gain, effort, risque), réalisable avec ou sans zatsit | Note GreenScore avant et après, dépendances mortes et calcul inutile supprimés | Rapatriement des briques pour lesquelles ça a du sens |
| **Le dev augmenté dans votre équipe** | Une équipe qui veut la méthode, pas des bras en plus | Pilote avec une équipe, puis formations et BBL | La méthode installée : charte d'usage, specs, contextes cadrés, revue, tableau de bord des coûts | Consommation des agents suivie, un modèle par tâche | Charte d'usage des données et des modèles |

Ce que ça règle par rapport aux relecteurs :

- le petit ticket d'entrée existe deux fois (audit maturité IA et diagnostic de désendettement), et les deux chiffrent en euros ;
- le projet SDD est la preuve que l'offre B n'avait pas : un dépôt livré se montre, c'est plus fort qu'un cas client raconté ;
- « juge et partie » est désamorcé : les diagnostics se réalisent avec ou sans zatsit, et c'est écrit ;
- la page porte une section « Ce que nous ne vendons pas », qui dit noir sur blanc ce que les relecteurs reprochaient aux anciennes offres de promettre (souveraineté garantie, économies avant mesure, refonte au forfait sans diagnostic, mesure IA par GreenScore pas encore livrée).

Reste à régler : un cas réel à montrer, et la méthode de notation GreenScore publiée.

**Mise en œuvre** : la page `/offres/` a été réécrite sur cette base (branche `feat/header-us`, PR #44). Les textes de la page vivent dans `corporate/src/content/offers/offers.json`.

### Comment les textes ont été écrits

Une première version, jugée « scolaire » et monotone, a été jetée. La seconde suit la direction « pipeline » : la méthode en cinq phases (Spec, Code, Test, Déploiement, Mesure) traverse la page, chaque package montre le tronçon qu'il couvre, les refus sont une bande inversée, les preuves quatre faits en gros caractères.

Les textes ont été produits en trois temps :

1. un rédacteur a écrit trois variantes par bloc, avec interdiction d'ajouter un chiffre, un client, une durée ou un prix hors de `offers.json` ;
2. le CTO et le concurrent fictifs ont voté bloc par bloc et signalé les lignes qu'ils attaqueraient ;
3. l'assemblage retient les votes convergents (hero, méthode, audit maturité IA, pilote SDD, refus, CTA), tranche les trois désaccords avec l'avis du rédacteur, et corrige les drapeaux : promesses intenables retirées (« sans dette », « pas une réplique de trop », « votre équipe sait s'en servir sans nous »), « vos agents » remplacé par « vos outils IA », le coût de l'IA limité à « ce qui se trace », l'étiquette « Souverain, quand ça tient » devenue « Souverain, si possible » pour ne plus contredire le refus sur la souveraineté.

**GreenScore retiré des promesses (décision du 5 octobre)** : le projet est en pause et n'a pas de cas d'usage démontrable. La page garde la mesure comme principe (coût d'exécution, consommation, dépendances, factures et appels d'API) sans nommer l'outil, et la preuve « open source » renvoie à l'organisation GitHub plutôt qu'au seul dépôt GreenScore. Les deux offres de l'accueil (`services.json`) et le portail sustainability le citent encore : à traiter séparément.

Lignes à surveiller, relevées par le concurrent : la page se définit beaucoup par ce qu'elle n'est pas (« pas un questionnaire », « pas sur la plaquette »), « vibe-coding » vieillira, et « forfait court » sans ordre de grandeur reste le premier frein à l'achat. Le sixième refus (la stratégie IA, c'est aiko) est gardé sous sa forme la plus sobre : à confirmer par les associés.

### Mon avis

C'est la piste la plus simple et la plus cohérente avec ce que vous êtes et ce que vous vendez déjà. Elle reprend la conclusion des trois relecteurs, en allant un cran plus loin. À deux conditions :

1. **Garder le diagnostic comme première marche**, pour conserver le ticket d'entrée court que les trois relecteurs réclament.
2. **Prouver la méthode** avec au moins un cas réel, même interne : avant/après, temps de livraison, coûts. Sans preuve, « product engineering augmenté » est aussi déclaratif que l'éco-conception aujourd'hui.

## Deuxième lecture (6 octobre 2026)

La page reconstruite a été relue par les trois mêmes acheteurs fictifs, avec leur premier verdict sous les yeux, et par une critique Impeccable (revue de design et détecteur, en deux agents isolés).

### Impeccable : 20/28 (71 %, « Bon »), contre 17/28

Quatre des cinq problèmes de l'ancienne page sont réglés : un appel à l'action en haut de page, plus de GreenScore affirmé sans preuve, plus d'intitulé qui se contredit, plus de cadrage éco-posture, plus de cartes identiques qui se soulèvent au survol. Verdict de spécificité : « un concurrent ne pourrait pas publier cette page telle quelle » ; le pipeline est l'architecture de l'information, pas une décoration ; le dépôt commenté du pilote SDD est « la meilleure preuve par la forme » ; la bande des refus change de registre et construit la confiance. Les deux restes de gabarit : le hero (moitié droite vide à 1 440 px) et la rangée de preuves.

Points relevés et corrigés le jour même (forme seulement) : les libellés du pipeline se chevauchaient sur mobile (le rail devient vertical sous 640 px) ; « SDD » n'était jamais développé ; le bouton « Voir les quatre packages » atterrissait sur la bande méthode ; les preuves promettaient d'être vérifiables et une seule portait un lien (deux le sont maintenant : l'équipe, B Corp) ; les liens dans les paragraphes gris ne se distinguaient que par la couleur ; sur mobile, les rôles précédaient le titre du package ; le hero est resserré pour que la bande méthode entre dans le premier écran.

Non traités, à décider : les numéros 01 à 04 suggèrent un ordre que le texte dément (« nous nommons le package ») ; la carte « Mesuré / Souverain, si possible » est la dernière chose identique sur les quatre packages ; le dégradé du titre en sombre finit sur un rouge hors charte (convention de tout le site) ; le badge Website Carbon appelle un tiers sur chaque page.

### Les trois acheteurs

Tous les trois changent d'avis.

- **Le CTO** : « je lui écris pour le 01 et le 03, ce que je n'aurais pas fait il y a deux jours, mais le premier mail portera sur le prix. » Devis demandé pour l'audit maturité IA et le Désendettement (« Ma facture cloud monte. Mon code, lui, n'a pas changé : c'est mon COMEX qui parle »). Pas encore pour le pilote SDD (sur du legacy Java/Angular, le code généré depuis OpenAPI est « un pari ») ni pour le dev augmenté (il dépend du 01, et « si les chiffres du pilote le justifient » suppose un état de référence qu'il n'a pas). Objections levées : souveraineté, mesure IA assumée comme absente, juge et partie, euros, un seul acheteur. Nouvelles : les intitulés de rôles (« jargon de scale-up californienne, mes achats ne sauront pas quel TJM mettre en face »), « harness/ » incompris, « 0,04 g » hors sujet pour un vendeur de dimensionnement de SI.
- **L'acheteur** : « l'ancienne page était une intention ; celle-ci est un catalogue où trois packages sur quatre sont consultables sur devis. » Le Désendettement est le plus achetable (sa structure de marché), l'audit maturité IA presque (il manque une unité d'œuvre et une clause d'accès au code), le pilote SDD a le livrable le plus clair mais ni durée, ni taille d'équipe, ni définition de « fini », ni propriété intellectuelle, ni l'endroit où tournent les agents et avec quels modèles ; le dev augmenté n'est pas achetable (pas de livrable daté, recette par des chiffres que personne ne définit). La bande des refus est « rassurante, et rare » ; il reprendrait le refus sur la souveraineté au contrat. Le DAF, lui, sans prix du diagnostic, « ne sait pas ce qu'il risque pour savoir ce qu'il gagne ». Pour entrer au panel : fourchette et durée du diagnostic en S/M/L, TJM par rôle, grille de recette par package, clause type sur les données envoyées aux modèles, un dépôt pilote public ou un cas interne chiffré, fiche de capacité.
- **Le concurrent** : « l'ancienne page, je la copiais en une semaine ; celle-ci, je copie la maquette mais pas les refus sans perdre ma marge. » Dur à contrer, dans l'ordre : le dépôt comme livrable (« je peux copier l'arbre, pas le remplir »), la bande des refus (« ces refus leur coûtent du chiffre, donc ils sont crédibles »), « réalisable avec nous ou sans nous », les cinq phases cohérentes avec le manifeste et les rôles recrutés. Encore attaquable : « Un forfait court » trois fois sans durée ni prix ; « Nous pratiquons le second chez nous » (la preuve interne, mieux habillée) ; « Souverain, si possible » répété quatre fois (« Souverain, si possible. Rapide, si possible. Facturé, sûrement. ») ; 34 marqueurs de négation et quatre titres sur huit à la négative (« ça finit par sonner comme un doute sur soi »). La ligne qu'il redoute reste « Un diagnostic qui ne sert qu'à vendre la suite s'appelle de l'avant-vente ».

### Ce qui revient chez les trois

1. **Ni durée ni prix.** Le premier frein à l'achat. Le CTO suggère un ordre de grandeur sur l'audit maturité IA et le diagnostic de désendettement. Décision des associés : la page n'en affiche volontairement aucun pour l'instant.
2. **Aucun client nommé.** L'aveu est élégant, il reste un aveu. Un dépôt pilote public ou un cas interne chiffré suffirait.
3. **Le jargon des rôles** (Forward Deployed Engineer, Product Engineer) et « harness/ ».
4. **Le refus aiko** : apprécié par le CTO (« un prestataire qui dit ce qu'il ne fait pas »), gênant devant un board pour l'acheteur et le concurrent (un seul interlocuteur attendu, soupçon d'avant-vente de groupe, « dans notre groupe » à 36 personnes). Sans un mot de plus ou un lien, il ne sert qu'à ceux qui connaissent déjà aiko.
5. **36 personnes surtout en régie** : combien de seniors libérables pour un pilote ? C'est la première question de référencement.

### Rôles, état au 8 octobre 2026

La page carrière compte cinq rôles, chacun sur son tronçon du cycle de vie (cadrage, conception, implémentation, tests, déploiement, run) :

| Rôle | Tronçon couvert |
|---|---|
| Forward Deployed Engineer | cadrage, conception, implémentation |
| Product Engineer | conception à run |
| Tech Lead Agentic | cadrage, conception, implémentation, tests |
| Augmented Engineer | conception, implémentation, tests |
| Platform Engineer | conception, déploiement, run |

Le cinquième rôle a d'abord été nommé « Développeur augmenté », puis renommé parce que « augmenté » est déjà le mot de toute la page ; « Tech Lead AI Driven » a été écarté (l'expression de toutes les ESN cette année, et « driven » dit que l'IA conduit, à l'inverse de « Ce que l'IA ne décide pas »). Les intitulés sont en anglais, dans la série des autres. Sur la page offres, le bloc « Qui vient chez vous » utilise les mêmes noms.

## Décisions à prendre

| # | Décision | Options |
|---|---|---|
| 1 | Structure de l'offre | Piste 4 retenue (une offre, quatre packages) ; confirmée par la deuxième lecture, les trois acheteurs changent d'avis |
| 2 | Le diagnostic chiffre-t-il en euros ? | Oui (la condition posée par les trois relecteurs) ou une note de A à E seulement |
| 3 | Preuve | Quel cas réel montrer, même interne, avec des chiffres avant/après ? |
| 4 | Offre IA | Pilote assumé, intégrée comme mode d'entrée, ou retirée en attendant un premier client |
| 5 | « Souveraine » | Retiré des titres (recommandé par les trois relecteurs) |
| 6 | Prix et durée | Afficher une fourchette ou une durée pour le diagnostic (premier frein à l'achat pour les trois relecteurs), ou assumer de n'en afficher aucune |
| 7 | GreenScore | Publier la méthode de notation et le lien vers le repo |

## Ensuite

Une fois la structure choisie, réécrire `/offres/` (et son résumé dans `src/consts.ts`) à partir de ce document, puis faire relire la nouvelle version par les trois mêmes relecteurs pour mesurer l'écart.
