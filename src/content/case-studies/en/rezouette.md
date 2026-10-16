---
projectSlug: rezouette
locale: en
title: "Rezouette — Full-Stack and OAuth"
description: "Social account management, publishing and scheduling with NestJS and Angular: layered architecture, OAuth, backend testing and integration status."
draft: false
sources:
  - https://github.com/bassem2002/rezouette-social-media-saas
heroTechnologies: [nestjs, angular, postgresql, prisma, oauth, pkce]
overview: "A project associated with the June–July 2026 internship at Systeo Digital. Rezouette brings social account connections and the publication lifecycle into one application. The technical challenge is to maintain a common workflow while handling each provider’s specific requirements."
demonstratedSkills: [rest, oauth, pkce, layered-architecture, mock-testing]
diagrams:
  - id: application
    title: "From interface to business logic"
    description: "Angular calls the NestJS REST controllers. Use cases coordinate operations through domain models and contracts. This diagram illustrates the application flow rather than every code dependency."
    steps: ["Angular|Web interface", "NestJS|REST controllers", "Application|Use cases", "Domain|Models and contracts"]
  - id: persistence
    title: "Persistence adapters"
    description: "Infrastructure implementations handle persistence through Prisma and PostgreSQL behind the contracts used by the application. These are layers within a single backend."
    steps: ["Infrastructure|Repositories", "Prisma|Data access", "PostgreSQL|Accounts and posts"]
  - id: providers
    title: "External integrations"
    description: "Use cases delegate external communication to OAuth adapters and social providers. Calls and responses depend on the permissions, tokens and validation requirements of each API."
    steps: ["Application|Connection and publishing", "Infrastructure|OAuth and providers", "Social APIs|External services"]
---

## Publication State Transitions

Processing due posts starts by reserving the state transition before a network call. Attempts retain their result and a failure does not interrupt the remaining batch. This separation makes the lifecycle visible in history; it does not establish distributed coordination across multiple instances.

## Technical Decisions

The benefits and trade-offs below explain choices visible in the code. They do not reconstruct the team’s original motivations.

### Separate use cases from adapters

**Choice.** The backend separates presentation, application, domain and infrastructure: a layered architecture inspired by Clean Architecture principles. External providers and persistence are implemented in the infrastructure layer.

**Benefit.** Publication workflows can be tested with mocked dependencies rather than live social API calls. **Trade-off.** Contracts and adapters add code and must remain consistent with API behaviour.

### Adapt authorisation to each provider

**Choice.** OAuth 2.0 handles external account authorisation. PKCE S256 is used for the relevant integrations, including TikTok and YouTube.

**Benefit.** PKCE links the authorisation code exchange to its verifier. **Trade-off.** Permissions, token lifetimes and approval processes vary by provider. This flow does not authenticate users within Rezouette itself.

### Separate scheduling from delivery

**Choice.** Scheduled posts are persisted. A scheduler identifies posts that are due and triggers the provider workflow.

**Benefit.** Publication can happen after the initial user request. **Trade-off.** Execution depends on the backend process and token status; coordination across multiple instances still needs preparation.

## Integration Status and Analytics

**Facebook Pages and Instagram Business** are described as operational for the documented workflows in the public repository. This case study did not reproduce those exchanges using real accounts and credentials.

**TikTok** has an implemented flow, but real-world validation is still pending. **LinkedIn and YouTube** have implementations and tests with mocks. Those tests do not establish production-validated integrations.

Analytics aggregate local publication history: publishing activity, platform distribution and post status. They do not represent real-time engagement metrics collected from every social network.

## Testing and Verification

Jest backend tests are present for use cases including OAuth, PKCE, publishing, scheduling and analytics, with mocked dependencies and external providers. They document expected behaviour when adapters return different responses.

The repository’s test suites were not run while preparing this case study. No test count, coverage figure or real-provider integration result is claimed. Automated Angular tests are not configured in the reviewed version.

## Current Limitations

- Real-world validation is still needed for TikTok, LinkedIn and YouTube.
- Application authentication and multi-role access control are not implemented; a demonstration identifier is used.
- Temporary OAuth state is held in memory, and scheduler coordination across instances still needs preparation.
- Token encryption at rest is not implemented in the documented version.
- Automated frontend testing and production deployment validation are not established.
