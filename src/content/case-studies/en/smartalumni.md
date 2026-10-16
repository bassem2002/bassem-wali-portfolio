---
projectSlug: smartalumni-iit
locale: en
title: "SmartAlumni IIT — Mentoring and CV Analysis"
description: "Spring Boot and Angular mentoring platform with Tika text extraction, DeepSeek-assisted CV analysis and rule-based weighted mentor matching."
draft: false
sources:
  - https://github.com/bassem2002/smartalumni-iit
heroTechnologies: [spring-boot, angular, postgresql, tika, deepseek]
overview: "SmartAlumni IIT connects students with Alumni through profiles, mentor discovery, requests and conversations. Two mechanisms support this workflow: AI-assisted CV analysis to help populate profiles, and mentor ranking based on explicit criteria."
demonstratedSkills: [spring-boot, angular, document-analysis, weighted-matching, mock-testing]
diagrams:
  - id: backend
    title: "Layered application"
    description: "Angular consumes Spring Boot REST controllers. Services handle application logic, while repositories access PostgreSQL. Document analysis takes place within the service layer."
    steps: ["Angular|Web interface", "Spring Boot|REST controllers", "Services|Application logic", "Repositories|Data access", "PostgreSQL|Profiles and conversations"]
  - id: cv
    title: "AI-assisted CV analysis"
    description: "Tika extracts document text before the DeepSeek call. If AI-assisted analysis fails, the service uses local rules, regular expressions and keywords as a fallback. Extracted information can be reviewed before profile validation."
    steps: ["CV or document|Uploaded file", "Apache Tika|Text extraction", "DeepSeek API|AI-assisted analysis", "Structured fields|Review and validation"]
  - id: matching
    title: "Mentor ranking"
    description: "The service compares profile data using weighted criteria and sorts mentors by score. This calculation is separate from the DeepSeek call and does not use a trained Machine Learning model."
    steps: ["Profile data|Student and mentors", "Weighted rules|Score calculation", "Ranked mentors|Recommendations"]
---

## From Text to Ranking

CV extraction and recommendations answer different questions. Tika and DeepSeek help turn a document into profile information, with review and fallback. RecommandationServiceImpl separately compares profiles through weighted rules. Correct extraction does not establish ranking relevance or the existence of a trained matching model.

## Technical Decisions

The benefits and trade-offs describe the technical consequences of the observed choices, without attributing them to an individual decision.

### Extract text before AI-assisted analysis

**Choice.** The CV service uses Apache Tika to extract text, then calls a dedicated DeepSeek extraction service.

**Benefit.** Document format handling remains separate from content interpretation. **Trade-off.** Field quality depends on both the extracted text and the external service response; review is still necessary.

### Provide a local fallback

**Choice.** If the analysis call fails, the service attempts local extraction using rules and keywords.

**Benefit.** It can still propose some information when the provider is unavailable. **Trade-off.** Explicit rules cover fewer ways of expressing information than open-ended analysis and can miss or misidentify document content.

### Keep mentor ranking explicit

**Choice.** The score combines study-field, domain, experience and complementary profile criteria before sorting candidates.

**Benefit.** Rankings can be traced to readable criteria and tested without training a model. **Trade-off.** Rules and weights require maintenance. This study does not establish a measure of recommendation relevance for users.

## Authentication and Access

Spring Security and JWT govern access. The configuration distinguishes public and authenticated endpoints, and restricts administration to the administrator role and recommendations to the student role. Student, Alumni and administrator profiles define the main workflows.

These controls do not amount to a complete security audit. Conversations, documents and profiles require appropriate configuration and validation before public use.

## Testing and Verification

The identified JUnit/Mockito tests cover `CVServiceImpl` and `RecommandationServiceImpl`. They examine CV processing with a mocked analysis dependency and the behaviour of the recommendation service.

These backend tests were not run while preparing this case study. No overall coverage of Angular workflows, authorisation or the DeepSeek provider is claimed.

## Current Limitations

- Matching is based on weighted rules, not a trained Machine Learning recommendation model.
- AI-assisted analysis depends on DeepSeek configuration and availability; the fallback has a narrower scope.
- Extracted CV information needs review. An AI API does not guarantee its accuracy.
- Identified tests focus on backend services. Ranking quality and complete workflows were not independently validated here.
