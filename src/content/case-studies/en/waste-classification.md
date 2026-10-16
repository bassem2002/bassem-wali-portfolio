---
projectSlug: waste-classification
locale: en
title: "Waste Classification — TensorFlow and ResNet50"
description: "Waste image classification notebook with pretrained ResNet50, data augmentation, DenseNet-inspired blocks and explicit reproducibility limitations."
draft: false
sources:
  - https://github.com/bassem2002/waste-classification-deep-learning
heroTechnologies: [python, tensorflow, keras, resnet50, scikit-learn]
overview: "This notebook explores waste image classification with TensorFlow/Keras. It combines ResNet50 features with custom DenseNet-inspired convolutional blocks. The case study focuses on how the experiment is constructed, its training steps and the conditions needed to reproduce it."
demonstratedSkills: [tensorflow, cnn, transfer-learning, data-augmentation, model-checkpointing]
diagrams:
  - id: data
    title: "Data preparation"
    description: "Images are read from Train and Test directories, resized and batched. The code reserves part of Train for validation. Augmentation is included in the model construction."
    steps: ["External images|Train and Test directories", "Preprocessing|Resizing and batching", "Data Augmentation|Rotation, zoom, flipping"]
  - id: model
    title: "Model construction"
    description: "ResNet50 is initialised with ImageNet weights. The notebook also loads external garbage_resnet.h5 weights, then reuses network sections with custom dense and transition blocks. This is feature fusion, not two independent production pipelines."
    steps: ["ResNet50|ImageNet weights", "External weights|garbage_resnet.h5", "Extraction and fusion|DenseNet-inspired blocks", "Classification head|Binary output"]
  - id: training
    title: "Training and validation"
    description: "The code compiles the model and defines training with validation monitoring. EarlyStopping monitors val_accuracy and ModelCheckpoint retains the best weights. The Test set is loaded, but no independent final result is established here."
    steps: ["Prepared model|Initialisation required", "Training|Train batches", "Validation|Monitoring val_accuracy", "Callbacks|Stopping and best weights"]
---

## Branch Fusion, Not a Complete DenseNet

The code freezes extract1 and combines ResNet50 stages with custom dense blocks. Concatenations and addition merge features before the sigmoid output. This is an experimental construction inspired by DenseNet concepts, not a complete pretrained DenseNet. Its architectural interest does not remove the need to prepare data, weights and model instantiation before evaluation.

## Technical Decisions

The general benefits below explain the observed choices. They do not measure how effective those choices are on this dataset.

### Reuse pretrained features

**Choice.** ResNet50 is initialised on ImageNet. Existing layers and weights are then used to build a model with a binary output.

**Benefit.** Transfer Learning reuses visual representations already learned. **Trade-off.** Their suitability for waste images needs evaluation, and the notebook also depends on an external weights file.

### Combine augmentation and custom blocks

**Choice.** Rotation, zoom and horizontal flipping are included in the model. Dense blocks, transition layers and feature fusion extend the ResNet50 extractions; one network section is explicitly frozen.

**Benefit.** Data Augmentation exposes training to image variations. The construction also supports exploring representation adaptation and Fine-Tuning of trainable sections. **Trade-off.** The added complexity requires experimental comparison. No advantage over a baseline is established here. The blocks are DenseNet-inspired, not a complete pretrained DenseNet.

### Monitor validation during training

**Choice.** Early Stopping and Model Checkpointing use validation accuracy to stop training and save the best weights.

**Benefit.** These callbacks guide the experiment and retain a state selected on validation data. **Trade-off.** They do not replace final evaluation on separate data or checks on dataset preparation.

## Experiments and Verification

The review covers code and recorded notebook experiments. It confirms dataset preparation, model construction, compilation and the training call with callbacks.

The notebook was not rerun while preparing the portfolio. Historical outputs are therefore not presented as reproduced results. This case study publishes no final metric, comparative performance or numerical accuracy.

No automated software tests were identified. The ML validation steps described here are distinct from unit tests of the program.

## Current Limitations

- Reproduction requires an external dataset and the `garbage_resnet.h5` weights file.
- The environment and paths were initially tied to Google Colab/Drive and need preparation or adaptation.
- The `p_m_dechets2` initialisation is commented out before compilation; a complete run requires restoring a consistent notebook state.
- Training and final evaluation were not independently reproduced during this preparation.
