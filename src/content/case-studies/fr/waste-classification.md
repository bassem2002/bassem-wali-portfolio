---
projectSlug: waste-classification
locale: fr
title: "Waste Classification — TensorFlow et ResNet50"
description: "Notebook de classification d’images de déchets : ResNet50 préentraîné, augmentation, blocs inspirés de DenseNet et limites de reproductibilité explicites."
draft: false
sources:
  - https://github.com/bassem2002/waste-classification-deep-learning
heroTechnologies: [python, tensorflow, keras, resnet50, scikit-learn]
overview: "Ce notebook explore la classification d’images de déchets avec TensorFlow/Keras. Il combine des caractéristiques issues de ResNet50 avec des blocs convolutifs personnalisés inspirés de DenseNet. L’intérêt présenté est la construction de cette expérimentation, ses étapes d’entraînement et les conditions nécessaires à sa reproduction."
demonstratedSkills: [tensorflow, cnn, transfer-learning, data-augmentation, model-checkpointing]
diagrams:
  - id: data
    title: "Préparation des données"
    description: "Les images sont lues depuis les répertoires Train et Test, redimensionnées et regroupées en lots. Le code réserve une partie de Train à la validation. L’augmentation est incluse dans la construction du modèle."
    steps: ["Images externes|Répertoires Train et Test", "Préparation|Redimensionnement et lots", "Augmentation|Rotation, zoom, miroir"]
  - id: model
    title: "Construction du modèle"
    description: "ResNet50 est initialisé avec des poids ImageNet. Le notebook charge aussi des poids externes garbage_resnet.h5, puis réutilise des portions du réseau avec des blocs denses et de transition personnalisés. Il s’agit d’une fusion de caractéristiques, pas de deux pipelines de production indépendants."
    steps: ["ResNet50|Poids ImageNet", "Poids externes|garbage_resnet.h5", "Extraction et fusion|Blocs inspirés de DenseNet", "Tête de classification|Sortie binaire"]
  - id: training
    title: "Entraînement et validation"
    description: "Le code compile le modèle et prévoit un entraînement suivi sur validation. EarlyStopping surveille val_accuracy et ModelCheckpoint conserve les meilleurs poids. Le jeu Test est chargé, sans résultat final indépendant établi ici."
    steps: ["Modèle préparé|Initialisation requise", "Entraînement|Lots de Train", "Validation|Suivi de val_accuracy", "Callbacks|Arrêt et meilleurs poids"]
---

## Une fusion de branches, pas un DenseNet complet

Le code gèle extract1 puis assemble des portions de ResNet50 et des blocs denses personnalisés. Concaténations et addition réunissent les caractéristiques avant la sortie sigmoid. Il s’agit d’une construction expérimentale inspirée de concepts DenseNet, et non du chargement d’un DenseNet complet préentraîné. Son intérêt architectural ne dispense pas de préparer les données, les poids et l’instanciation du modèle avant toute évaluation.

## Décisions techniques

Les bénéfices généraux ci-dessous expliquent les choix observés ; ils ne constituent pas une mesure de leur efficacité sur ce dataset.

### Réutiliser des caractéristiques préentraînées

**Choix.** ResNet50 est initialisé sur ImageNet, puis des couches et poids préexistants servent à construire un modèle adapté à une sortie binaire.

**Bénéfice.** Le transfert d’apprentissage réutilise des représentations visuelles déjà apprises. **Compromis.** Leur adéquation aux images de déchets doit être évaluée ; le notebook dépend aussi d’un fichier de poids externe.

### Combiner augmentation et blocs personnalisés

**Choix.** Rotation, zoom et retournement horizontal sont intégrés au modèle. Des blocs denses, des transitions et une fusion de caractéristiques prolongent les extractions issues de ResNet50 ; une portion du réseau est explicitement gelée.

**Bénéfice.** L’augmentation expose l’entraînement à des variations d’images, tandis que la construction permet d’explorer une adaptation des représentations et du fine-tuning sur les portions entraînables. **Compromis.** Cette complexité demande une comparaison expérimentale ; aucune supériorité face à un modèle de référence n’est établie ici. Les blocs sont inspirés de DenseNet, sans être présentés comme un DenseNet complet préentraîné.

### Suivre la validation pendant l’entraînement

**Choix.** Early Stopping et Model Checkpointing s’appuient sur l’accuracy de validation pour arrêter l’entraînement et sauvegarder les meilleurs poids.

**Bénéfice.** Ces callbacks encadrent l’expérience et conservent un état sélectionné sur validation. **Compromis.** Ils ne remplacent pas une évaluation finale sur des données distinctes ni une vérification de la préparation du dataset.

## Expérimentations et vérification

La revue porte sur le code et les expérimentations enregistrées dans le notebook. Elle confirme la préparation des jeux de données, la construction des modèles, la compilation et l’appel d’entraînement avec callbacks.

Le notebook n’a pas été réexécuté pendant la préparation du portfolio. Les sorties historiques ne sont donc pas présentées comme des résultats reproduits. Aucune métrique finale, performance comparative ou accuracy chiffrée n’est publiée dans cette étude.

Aucun test logiciel automatisé n’a été identifié. Les étapes de validation ML décrites ici sont distinctes de tests unitaires du programme.

## Limites actuelles

- Dataset externe et fichier de poids `garbage_resnet.h5` nécessaires à la reproduction.
- Environnement et chemins initialement liés à Google Colab/Drive à préparer ou adapter.
- Initialisation de `p_m_dechets2` commentée avant sa compilation : une exécution complète nécessite de remettre le notebook en état cohérent.
- Entraînement et évaluation finale non reproduits indépendamment pendant cette préparation.
