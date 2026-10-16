# Audit visuel V2 — Modern Software / Product Engineer

Direction validée par le propriétaire avant implémentation, le 16 octobre 2026. Publication GitHub/Netlify suspendue. Inspection du code et des captures QA existantes desktop/mobile, clair/sombre ; aucune certification de modernité ou d'accessibilité déduite d'une capture.

| État actuel | Problème | Impact | Amélioration validée |
|---|---|---|---|
| Hero texte + portrait 160 px isolé | Identité et visuel détachés | Composition peu mémorable | Asymétrie 60/40, portrait dans une surface technique, projets/contact en CTA |
| Une grande carte et quatre cartes similaires | Différence de taille plutôt que de contenu | Projets interchangeables | Bento 7/5 puis 4/4/4, mécanismes spécifiques et highlights |
| Catalogue de cadres réguliers | Familles techniques peu différenciées | Parcours monotone | Cartes phares visuelles et cartes complémentaires compactes, filtres préservés |
| Études avec même enveloppe et longue introduction | Particularités trop tardives | Aspect documentaire | Défi central, récit et visuel spécifiques, composants accessibles partagés |
| Focus en quatre lignes | Technologies et preuves en annexes | Domaines peu présents | Quatre compositions avec mécanisme, stack et projets associés |
| Skills puis seconde liste de technologies | Répétition des capsules et liens | Densité élevée | Sept groupes compacts, Technologies ↔ Projets comme preuve principale |
| Expériences sobres et uniformes | Rôle/projet peu hiérarchisés | Stages sous-exposés | Timeline compacte ; aucune contribution personnelle inventée |
| Formation presque uniforme | ESIGELEC/IIT insuffisamment dominants | Parcours actuel dilué | Deux entrées principales, licence secondaire, bac tertiaire |
| About/Contact essentiellement textuels | Répétition de sections précédentes | Conclusion faible | Deux courts paragraphes personnels et conclusion visuelle avec contact direct |
| Séparateurs et numéros systématiques | Rythme de rapport | Lecture académique | Moins de cadres, variation de densité, titres orientés projets |
| Palette sombre uniformément bleu-gris | Peu de profondeur | Rendu plat | Fond navy presque noir, surfaces distinctes et accents localisés |
| Portrait mobile positionné près des liens | Blocs indépendants et espace réservé | Hero trop étiré | Portrait dans le flux naturel, disposition linéaire à 320 px |

## Composition et limites

Hero : Bassem Wali, Software Engineering & Full-Stack, BI et IA/ML, statut étudiant et IIT/échange ESIGELEC explicites. Portrait fourni préservé, sans retouche de la personne. Pas de CV en CTA principal tant qu'il est absent. Pas de statistiques fictives ni de score Lighthouse marketing.

Bento : Rezouette 7/12, SmartAlumni 5/12 ; BI, MinDrawFX et Waste 4/12 chacun. À petite largeur, ordre de lecture linéaire identique au DOM. Graphiques explicatifs SVG/CSS, pas de faux screenshots ni de KPI chiffré décoratif.

Récits : compte/OAuth/publication/état ; document/profil/matching ; filtre/MDX/cube/mesure ; action/commande/persistance ; image/caractéristiques/modèle/validation. SmartAlumni garde deux mécanismes distincts, sans attribuer le matching à DeepSeek.

Conserver Astro, routes, données séparées, FR/EN, filtres partageables, fallback sans JS, thème, liens SEO, CI et tests. CSS/SVG et JS natif léger ; aucun framework ou moteur d'animation ajouté. La police système reste retenue : la composition apporte le gain sans coût réseau de font. Hover/focus discrets, reduced-motion systématique. Les contrastes des textes, contrôles et focus doivent être revérifiés.

## Mise en œuvre et QA

Progression V2.1 données ; V2.2 Hero/fondations/navigation ; V2.3 Bento ; V2.4 Focus/Skills ; V2.5 parcours/About/Contact ; V2.6 catalogue ; V2.7 études ; V2.8 parité ; V2.9 QA. Résultats effectivement obtenus consignés dans development-report.md et les artefacts locaux .qa/v2/. Les mesures Phase 9 sont une baseline datée, pas une garantie après refonte.
