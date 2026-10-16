---
projectSlug: mindrawfx
locale: fr
title: "MinDrawFX — JavaFX et design patterns"
description: "Éditeur 2D JavaFX : commandes réversibles, décoration des formes, Observer, factories, persistance SQLite et export PNG dans une architecture MVC."
draft: false
sources:
  - https://github.com/bassem2002/MinDrawFX
heroTechnologies: [java, javafx, fxml, sqlite, jdbc]
overview: "MinDrawFX aborde l’architecture objet à travers un éditeur de dessin 2D. Créer une forme, lui appliquer un effet, annuler une action et retrouver un dessin sauvegardé mobilisent des responsabilités différentes. Le code les répartit entre contrôleur, commandes, objets graphiques, services et repositories."
demonstratedSkills: [oop, command-pattern, decorator-pattern, observer-pattern, repository-pattern]
diagrams:
  - id: persistence
    title: "Interface et persistance"
    description: "La vue FXML est reliée au contrôleur JavaFX. La sauvegarde passe par ShapePersistenceService et le contrat ShapeRepository ; l’implémentation SQLite utilise JDBC. Les commandes et décorateurs interviennent dans le fonctionnement des formes, en parallèle de ce flux de sauvegarde."
    steps: ["JavaFX et FXML|Interface de dessin", "MainController|Interactions", "Services|Formes et persistance", "ShapeRepository|Implémentation SQLite", "JDBC|Accès à la base", "SQLite|Dessins sauvegardés"]
  - id: commands
    title: "Actions réversibles"
    description: "Le contrôleur demande au gestionnaire d’exécuter une commande. Le gestionnaire maintient les piles Undo/Redo, puis notifie ses observateurs. MainController reçoit ces événements pour mettre à jour l’historique, le statut affiché et la journalisation."
    steps: ["MainController|Action de dessin", "CommandManager|Exécution et Undo/Redo", "Command|Modification des formes", "Observer|Mise à jour de l’interface"]
---

## L’action comme objet

Dessiner et supprimer une forme passent par des objets Command. Leur gestionnaire conserve les piles nécessaires à Undo/Redo et notifie les observateurs. Les effets appartiennent aux décorateurs, tandis que la sauvegarde passe par ShapeRepository : ces responsabilités se combinent sans être présentées comme un seul mécanisme.

## Design patterns en pratique

### Command — rendre les actions réversibles

**Problème :** les actions de dessin et de suppression doivent pouvoir être annulées. `DrawShapeCommand` et `DeleteShapeCommand` portent les opérations `execute` et `undo`. `CommandManager` gère deux piles pour annuler et rétablir ces actions.

### Decorator — ajouter un effet à une forme

**Problème :** plusieurs rendus doivent pouvoir enrichir les formes. Les décorateurs enveloppent une forme pour lui ajouter, par exemple, une ombre, une lueur ou un contour. Le traitement des effets est séparé des classes de formes de base.

### Observer — répercuter les changements

**Problème :** une commande exécutée, annulée ou rétablie doit être reflétée dans l’interface. `CommandManager` notifie ses observateurs ; `MainController` reçoit l’événement pour actualiser l’historique, le texte d’état et la journalisation.

### Factory — isoler la création

**Problème :** l’outil sélectionné doit produire le bon type de forme. Les factories dédiées créent cercles, rectangles et lignes. Une factory de repositories est également présente pour choisir l’implémentation de persistance.

### Repository — séparer stockage et manipulation

**Problème :** sauvegarder un dessin ne doit pas imposer au service de connaître les opérations JDBC. `ShapePersistenceService` dépend du contrat `ShapeRepository`, implémenté notamment par `SQLiteShapeRepository`.

Le dépôt contient aussi **Strategy** pour choisir une journalisation console ou fichier, **Singleton** pour l’accès partagé à la connexion de base de données et **Adapter** pour convertir le snapshot du canvas en image PNG. Ces rôles sont visibles dans les classes correspondantes ; leur présence ne prouve pas à elle seule la qualité globale de l’architecture.

## Décisions techniques

Les compromis suivants sont déduits du fonctionnement du code, sans attribuer de motivation historique personnelle.

### Représenter les opérations par des commandes

**Choix.** Chaque action réversible possède son comportement d’exécution et d’annulation. **Bénéfice.** L’historique manipule des commandes plutôt que des conditions pour chaque outil. **Compromis.** Une nouvelle action doit définir une annulation cohérente et gérer l’état nécessaire.

### Combiner formes et décorateurs

**Choix.** Les effets passent par des objets décorateurs. **Bénéfice.** Le rendu peut être enrichi sans multiplier les variantes de chaque forme. **Compromis.** La composition et l’ordre des décorateurs doivent rester compréhensibles, notamment lors des opérations sur les formes.

### Passer par un contrat de persistance

**Choix.** Un service délègue sauvegarde et chargement à un repository. **Bénéfice.** Les détails de stockage restent hors du contrôleur. **Compromis.** Le format enregistré et sa reconstruction doivent préserver les propriétés nécessaires du dessin ; la présence d’un contrat ne garantit pas cette fidélité.

## Tests et vérification

Aucun test automatisé n’a été identifié dans le dépôt examiné. La relecture confirme les classes et leurs interactions ; elle ne remplace pas une vérification des scénarios Undo/Redo, de sauvegarde/rechargement et d’export dans l’application.

L’interface JavaFX n’a pas été lancée pendant la préparation de cette étude. Aucun résultat d’exécution ou taux de couverture n’est annoncé.

## Limites actuelles

- Configuration manuelle du runtime JavaFX et des dépendances nécessaire au lancement.
- Tests automatisés non identifiés pour les commandes, la persistance et le rendu.
- Fidélité des effets et des propriétés après sauvegarde/rechargement non validée par exécution dans cette étude.
