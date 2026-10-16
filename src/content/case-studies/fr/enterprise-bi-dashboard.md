---
projectSlug: enterprise-bi-dashboard
locale: fr
title: "Enterprise BI Dashboard — SSAS et MDX"
description: "Dashboard ASP.NET Core MVC : consommation d’un cube SSAS, service MDX centralisé, KPI, filtres et visualisations Chart.js, avec dépendances explicites."
draft: false
sources:
  - https://github.com/bassem2002/enterprise-bi-dashboard
heroTechnologies: [csharp, aspnet-core, ssas, mdx, adomd, chartjs]
overview: "Le projet apporte une interface web à la consultation d’un cube SSAS existant. Les utilisateurs explorent les ventes et achats selon les produits, clients, fournisseurs et dates. Le périmètre présenté porte sur la consommation et l’analyse OLAP : il ne couvre pas la construction complète d’un système décisionnel."
demonstratedSkills: [mdx, olap, ssas, kpi, mvc]
diagrams:
  - id: query
    title: "Accès aux mesures OLAP"
    description: "Le contrôleur MVC utilise ISsasService. Son implémentation SsasService construit les requêtes MDX et les exécute via ADOMD.NET sur le cube SSAS externe. L’interface est un contrat logiciel, pas un service réseau supplémentaire."
    steps: ["Navigateur|Dashboard web", "ASP.NET Core MVC|DashboardController", "ISsasService|Contrat du service", "SsasService|Construction MDX", "ADOMD.NET|Exécution des requêtes", "Cube SSAS|Multidimensionnel"]
  - id: visualization
    title: "Retour aux visualisations"
    description: "Les résultats du service sont exposés par les endpoints JSON du contrôleur, puis lus par le JavaScript du dashboard pour alimenter Chart.js. Les erreurs et absences de données disposent d’états dédiés."
    steps: ["Résultats du service|Mesures et dimensions", "Contrôleur MVC|Réponses JSON", "JavaScript du dashboard|Données des graphiques", "Chart.js|Visualisations"]
---

## Quand un filtre vise la hiérarchie de l’axe

Une requête OLAP doit tenir compte de la place de chaque hiérarchie. SsasService choisit les membres de ROWS en fonction du filtre de l’axe et construit le slicer séparément, afin de ne pas réintroduire la même hiérarchie aux deux endroits. Le détail intéressant se situe dans la construction de la requête, pas seulement dans son affichage Chart.js.

## Décisions techniques

Les bénéfices suivants sont ceux de l’organisation observée ; aucune motivation historique individuelle n’est supposée.

### Centraliser l’accès SSAS

**Choix.** `DashboardController` dépend de `ISsasService` ; `SsasService` regroupe la construction MDX, l’accès ADOMD.NET et la lecture des résultats.

**Bénéfice.** Le contrôleur ne porte pas les détails de chaque requête multidimensionnelle. **Compromis.** Le service reste fortement lié aux noms de dimensions, mesures et membres du cube attendu.

### Partager les filtres entre les analyses

**Choix.** Les endpoints reçoivent un modèle commun de filtres, utilisé pour sélectionner les données des KPI et vues analytiques.

**Bénéfice.** Une sélection peut s’appliquer à plusieurs lectures du dashboard. **Compromis.** Chaque requête MDX doit appliquer correctement les critères et tenir compte des membres disponibles dans le cube.

### Séparer mesures et représentation graphique

**Choix.** Le backend expose des réponses JSON consommées par Chart.js. Les valeurs viennent des résultats OLAP ; les états d’erreur ou de données absentes ne sont pas remplacés par des chiffres de démonstration.

**Bénéfice.** La présentation web reste distincte de l’accès au cube. **Compromis.** Le client doit gérer les chargements, erreurs et réponses vides ; la fraîcheur des graphiques dépend du traitement du cube externe.

## Lecture BI et dépendances

Les KPI synthétisent des mesures de ventes, achats et calculs OLAP. Les vues permettent d’étudier les produits, clients, fournisseurs et évolutions temporelles, avec des filtres communs.

SQL Server Analysis Services fournit ici le moteur multidimensionnel. Le dépôt ne permet pas de reconstituer à lui seul le Data Warehouse, l’ETL et le cube qui produisent ces mesures. Ni Power BI ni SSIS ne sont ajoutés à la stack présentée.

## Tests et vérification

Aucun projet de tests automatisés n’a été identifié pour la génération MDX, le mapping des résultats ou les contrôleurs. La consultation du code vérifie l’organisation des requêtes et des endpoints ; elle ne valide pas les résultats d’un cube en fonctionnement.

Le dashboard n’a pas été exécuté avec un cube SSAS pendant cette préparation. Aucun volume traité, temps de réponse ou résultat métier chiffré n’est revendiqué.

## Limites actuelles

- Définition complète du cube, Data Warehouse, ETL et scripts complets de déploiement du cube non inclus.
- Schéma, noms des membres et disponibilité du cube externe nécessaires au fonctionnement des analyses.
- Configuration de connexion et identité Windows à adapter à l’environnement d’exécution.
- Tests automatisés des requêtes et du mapping non identifiés ; résultats métier non reproduits dans cette étude.
