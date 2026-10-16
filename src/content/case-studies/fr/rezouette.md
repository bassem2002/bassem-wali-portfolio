---
projectSlug: rezouette
locale: fr
title: "Rezouette — Full-Stack et OAuth"
description: "Gestion de comptes sociaux, publication et planification avec NestJS et Angular : architecture en couches, OAuth, tests backend et état des intégrations."
draft: false
sources:
  - https://github.com/bassem2002/rezouette-social-media-saas
heroTechnologies: [nestjs, angular, postgresql, prisma, oauth, pkce]
overview: "Projet associé au stage Systeo Digital de juin–juillet 2026. Rezouette rassemble dans une application les connexions aux comptes sociaux et le cycle de vie des publications. L’enjeu technique est de conserver un workflow commun tout en traitant les contraintes propres à chaque fournisseur."
demonstratedSkills: [rest, oauth, pkce, layered-architecture, mock-testing]
diagrams:
  - id: application
    title: "Du navigateur au métier"
    description: "Angular appelle les contrôleurs REST NestJS. Les cas d’usage orchestrent les opérations à partir des modèles et contrats du domaine. Ce schéma montre le flux applicatif, sans prétendre décrire toutes les dépendances du code."
    steps: ["Angular|Interface web", "NestJS|Contrôleurs REST", "Application|Cas d’usage", "Domaine|Modèles et contrats"]
  - id: persistence
    title: "Adaptateurs de persistance"
    description: "Les implémentations d’infrastructure assurent la persistance via Prisma et PostgreSQL derrière les contrats utilisés par l’application. Il s’agit de couches d’un même backend."
    steps: ["Infrastructure|Repositories", "Prisma|Accès aux données", "PostgreSQL|Comptes et publications"]
  - id: providers
    title: "Intégrations externes"
    description: "Les cas d’usage délèguent les échanges aux adaptateurs OAuth et aux fournisseurs sociaux. Les appels et leurs réponses dépendent des permissions, jetons et validations propres à chaque API."
    steps: ["Application|Connexion et publication", "Infrastructure|OAuth et fournisseurs", "APIs sociales|Services externes"]
---

## Transitions de publication

Le traitement des publications dues commence par réserver la transition d’état avant l’appel réseau. Les tentatives gardent leur résultat et une erreur n’interrompt pas le reste du lot. Cette séparation rend le cycle observable dans l’historique ; elle ne constitue pas une garantie de coordination distribuée entre plusieurs instances.

## Décisions techniques

Les bénéfices et compromis ci-dessous décrivent les choix visibles dans le code ; ils ne reconstituent pas les motivations historiques de l’équipe.

### Séparer les cas d’usage des adaptateurs

**Choix.** Le backend distingue présentation, application, domaine et infrastructure : une architecture en couches inspirée des principes de Clean Architecture. Les fournisseurs externes et la persistance sont implémentés dans l’infrastructure.

**Bénéfice.** Les workflows de publication peuvent être testés avec des dépendances simulées, sans appeler un réseau social. **Compromis.** Les contrats et adaptateurs ajoutent du code et doivent rester cohérents avec les comportements des APIs.

### Adapter l’autorisation à chaque fournisseur

**Choix.** OAuth 2.0 gère l’autorisation des comptes externes ; PKCE S256 est utilisé pour les intégrations concernées, notamment TikTok et YouTube.

**Bénéfice.** PKCE associe l’échange du code d’autorisation à son vérificateur. **Compromis.** Les permissions, durées de vie des jetons et procédures de validation varient selon le fournisseur. Ce mécanisme n’assure pas l’authentification des utilisateurs de Rezouette.

### Séparer planification et diffusion

**Choix.** Les publications programmées sont persistées ; un ordonnanceur repère celles arrivées à échéance et déclenche le workflow du fournisseur.

**Bénéfice.** La diffusion peut intervenir après la requête initiale de l’utilisateur. **Compromis.** L’exécution dépend du processus backend et de l’état des jetons ; la coordination entre plusieurs instances reste à préparer.

## Intégrations et analytics

**Facebook Pages et Instagram Business** sont décrits comme opérationnels dans la version publique du dépôt pour les parcours documentés. Cette étude n’a pas reproduit ces échanges avec des comptes et identifiants réels.

**TikTok** dispose d’un flux implémenté, mais sa validation réelle reste en attente. **LinkedIn et YouTube** disposent d’implémentations et de tests avec mocks ; ceux-ci ne prouvent pas une intégration validée en production.

Les analytics agrègent l’historique local : activité de publication, répartition par plateforme et états des publications. Ils ne représentent pas des mesures d’engagement en temps réel collectées auprès de tous les réseaux.

## Tests et vérification

Des tests backend Jest sont présents pour les cas d’usage, notamment OAuth, PKCE, publication, planification et analytics, avec simulation des dépendances et fournisseurs externes. Ils permettent d’examiner le comportement attendu face aux réponses des adaptateurs.

Les suites du dépôt n’ont pas été exécutées pendant la préparation de cette étude. Aucun nombre de tests, taux de couverture ou résultat d’intégration réelle n’est revendiqué. Les tests Angular automatisés ne sont pas configurés dans la version examinée.

## Limites actuelles

- Validation réelle encore nécessaire pour TikTok, LinkedIn et YouTube.
- Authentification applicative et gestion multi-rôles non implémentées ; un identifiant de démonstration est utilisé.
- États OAuth temporaires en mémoire et coordination de l’ordonnanceur entre instances à préparer.
- Chiffrement des jetons au repos non implémenté dans la version documentée.
- Tests frontend automatisés et validation d’un déploiement de production non établis.
