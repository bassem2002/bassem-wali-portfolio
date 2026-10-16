---
projectSlug: smartalumni-iit
locale: fr
title: "SmartAlumni IIT — mentorat et analyse de CV"
description: "Plateforme Spring Boot et Angular : mentorat Alumni–étudiants, extraction Tika, analyse assistée DeepSeek et classement des mentors par règles pondérées."
draft: false
sources:
  - https://github.com/bassem2002/smartalumni-iit
heroTechnologies: [spring-boot, angular, postgresql, tika, deepseek]
overview: "SmartAlumni IIT accompagne la mise en relation entre étudiants et Alumni : profils, recherche de mentors, demandes et conversations. Deux mécanismes complètent ce parcours : l’analyse assistée des CV pour renseigner le profil et le classement des mentors selon des critères explicites."
demonstratedSkills: [spring-boot, angular, document-analysis, weighted-matching, mock-testing]
diagrams:
  - id: backend
    title: "Application en couches"
    description: "Angular consomme les contrôleurs REST Spring Boot. Les services portent les traitements ; les repositories accèdent aux données PostgreSQL. L’analyse documentaire intervient dans les services."
    steps: ["Angular|Interface web", "Spring Boot|Contrôleurs REST", "Services|Logique applicative", "Repositories|Accès aux données", "PostgreSQL|Profils et échanges"]
  - id: cv
    title: "Analyse assistée du CV"
    description: "Tika extrait le texte du document avant l’appel DeepSeek. En cas d’échec de l’analyse assistée, le service utilise un fallback local par règles, expressions régulières et mots-clés. Les informations peuvent être relues avant validation du profil."
    steps: ["CV ou document|Fichier transmis", "Apache Tika|Extraction du texte", "DeepSeek API|Analyse assistée", "Champs structurés|Relecture et validation"]
  - id: matching
    title: "Classement des mentors"
    description: "Le service compare les données des profils selon des critères pondérés, puis trie les mentors par score. Ce calcul est distinct de l’appel DeepSeek et ne repose pas sur un modèle ML entraîné."
    steps: ["Données des profils|Étudiant et mentors", "Règles pondérées|Calcul du score", "Mentors classés|Recommandations"]
---

## Du texte au classement

L’extraction du CV et la recommandation répondent à deux questions différentes. Tika et DeepSeek aident à transformer un document en informations de profil, avec relecture et fallback. RecommandationServiceImpl compare ensuite les profils par règles pondérées. Un champ extrait correctement ne démontre ni la pertinence du classement ni l’existence d’un modèle de matching entraîné.

## Décisions techniques

Les bénéfices et compromis exposent les conséquences techniques des choix observés, sans les attribuer à une décision personnelle.

### Extraire le texte avant l’analyse assistée

**Choix.** Le service CV utilise Apache Tika pour obtenir le texte, puis appelle un service dédié à l’extraction via DeepSeek.

**Bénéfice.** Le traitement du format documentaire et l’interprétation du contenu restent distincts. **Compromis.** La qualité des champs dépend à la fois du texte extrait et de la réponse du service externe ; une relecture reste nécessaire.

### Prévoir un fallback local

**Choix.** Si l’appel d’analyse échoue, le service tente une extraction locale par règles et mots-clés.

**Bénéfice.** Une partie des informations peut encore être proposée lorsque le fournisseur est indisponible. **Compromis.** Des règles explicites couvrent moins de formulations qu’une analyse libre et peuvent manquer ou mal identifier des éléments du document.

### Garder un classement explicite des mentors

**Choix.** Le score combine des critères de filière, domaine, expérience et complément de profil, avant de trier les candidats.

**Bénéfice.** Le classement peut être relié à des critères lisibles et testé sans entraîner de modèle. **Compromis.** Les règles et poids sont à maintenir ; aucune mesure de pertinence utilisateur n’est établie dans cette étude.

## Authentification et accès

Spring Security et JWT encadrent les accès. La configuration distingue les endpoints publics et authentifiés, et réserve notamment l’administration au rôle administrateur et les recommandations au rôle étudiant. Les profils étudiant, Alumni et administrateur structurent les parcours.

La présence de ces contrôles ne constitue pas un audit de sécurité complet. Les conversations, documents et profils nécessitent une configuration et une validation adaptées avant une mise à disposition publique.

## Tests et vérification

Les tests JUnit/Mockito identifiés portent sur `CVServiceImpl` et `RecommandationServiceImpl`. Ils examinent notamment les traitements du CV avec dépendance d’analyse simulée et le comportement de la recommandation.

Ces tests backend n’ont pas été exécutés pendant la préparation de cette étude. Aucune couverture globale des parcours Angular, des autorisations ou du fournisseur DeepSeek n’est annoncée.

## Limites actuelles

- Le matching est un calcul par règles pondérées, sans modèle de recommandation ML entraîné.
- L’analyse assistée dépend de la configuration et de la disponibilité de DeepSeek ; le fallback a un périmètre plus limité.
- Les informations extraites d’un CV doivent être relues ; leur exactitude n’est pas garantie par la présence d’une API d’IA.
- Les tests identifiés sont concentrés sur les services backend ; la qualité du classement et les parcours complets n’ont pas été validés indépendamment ici.
