---
projectSlug: mindrawfx
locale: en
title: "MinDrawFX — JavaFX and Design Patterns"
description: "JavaFX 2D editor with reversible commands, shape decorators, Observer, factories, SQLite persistence and PNG export in an MVC architecture."
draft: false
sources:
  - https://github.com/bassem2002/MinDrawFX
heroTechnologies: [java, javafx, fxml, sqlite, jdbc]
overview: "MinDrawFX explores object-oriented architecture through a 2D drawing editor. Creating a shape, applying an effect, undoing an action and restoring a saved drawing involve different responsibilities. The code distributes them across a controller, commands, graphical objects, services and repositories."
demonstratedSkills: [oop, command-pattern, decorator-pattern, observer-pattern, repository-pattern]
diagrams:
  - id: persistence
    title: "Interface and persistence"
    description: "The FXML view connects to the JavaFX controller. Saving goes through ShapePersistenceService and the ShapeRepository contract; the SQLite implementation uses JDBC. Commands and decorators act on shapes alongside this persistence flow."
    steps: ["JavaFX and FXML|Drawing interface", "MainController|Interactions", "Services|Shapes and persistence", "ShapeRepository|SQLite implementation", "JDBC|Database access", "SQLite|Saved drawings"]
  - id: commands
    title: "Reversible actions"
    description: "The controller asks the manager to execute a command. The manager maintains Undo/Redo stacks, then notifies its observers. MainController receives those events to update history, displayed status and logging."
    steps: ["MainController|Drawing action", "CommandManager|Execution and Undo/Redo", "Command|Shape changes", "Observer|Interface updates"]
---

## The Action as an Object

Drawing and deleting a shape use Command objects. Their manager maintains the stacks needed for Undo/Redo and notifies observers. Effects belong to decorators, while saving uses ShapeRepository: these responsibilities work together without being treated as one mechanism.

## Design Patterns in Practice

### Command Pattern — make actions reversible

**Problem:** drawing and deletion need to be reversible. `DrawShapeCommand` and `DeleteShapeCommand` implement `execute` and `undo`. `CommandManager` maintains two stacks to undo and redo those actions.

### Decorator Pattern — add effects to shapes

**Problem:** shapes need different visual treatments. Decorators wrap a shape to add effects such as a shadow, glow or border. Effect handling is separate from the base shape classes.

### Observer Pattern — reflect changes in the interface

**Problem:** executed, undone and redone commands need to be reflected in the interface. `CommandManager` notifies its observers. `MainController` receives the event and updates history, status text and logging.

### Factory Pattern — isolate object creation

**Problem:** the selected tool must create the right shape type. Dedicated factories create circles, rectangles and lines. A repository factory also selects the persistence implementation.

### Repository — separate storage from manipulation

**Problem:** saving a drawing should not require the service to know JDBC operations. `ShapePersistenceService` depends on the `ShapeRepository` contract, implemented by `SQLiteShapeRepository` among others.

The repository also contains **Strategy** for choosing console or file logging, **Singleton** for shared access to the database connection and **Adapter** for converting a canvas snapshot to PNG. These roles are visible in the corresponding classes; their presence alone does not establish overall architectural quality.

## Technical Decisions

The trade-offs below follow from the code’s behaviour, without attributing historical motivations to an individual.

### Represent operations as commands

**Choice.** Each reversible action defines execution and undo behaviour. **Benefit.** History handles commands rather than conditions for each tool. **Trade-off.** A new action must define consistent reversal and retain the state it needs.

### Compose shapes and decorators

**Choice.** Effects use decorator objects. **Benefit.** Rendering can be extended without creating a variant of every shape. **Trade-off.** Decorator composition and order must remain understandable, particularly when manipulating shapes.

### Use a persistence contract

**Choice.** A service delegates saving and loading to a repository. **Benefit.** Storage details remain outside the controller. **Trade-off.** The saved format and reconstruction must preserve the drawing properties that matter; a contract alone does not guarantee that fidelity.

## Testing and Verification

No automated tests were identified in the reviewed repository. Code review confirms the classes and their interactions. It does not replace checking Undo/Redo, save/load and export scenarios in the application.

The JavaFX interface was not launched while preparing this case study. No execution result or coverage figure is claimed.

## Current Limitations

- The JavaFX runtime and dependencies require manual setup.
- No automated tests were identified for commands, persistence or rendering.
- Preservation of effects and properties after saving and loading was not validated by running the application in this study.
