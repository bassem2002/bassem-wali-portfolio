---
projectSlug: enterprise-bi-dashboard
locale: en
title: "Enterprise BI Dashboard — SSAS and MDX"
description: "ASP.NET Core MVC dashboard consuming an SSAS cube through a centralised MDX service, with KPIs, shared filters, Chart.js and explicit external dependencies."
draft: false
sources:
  - https://github.com/bassem2002/enterprise-bi-dashboard
heroTechnologies: [csharp, aspnet-core, ssas, mdx, adomd, chartjs]
overview: "This project provides a web interface for exploring an existing SSAS cube. Users analyse sales and purchasing by product, customer, supplier and date. Its scope is consuming and analysing OLAP data, rather than building an entire Business Intelligence system."
demonstratedSkills: [mdx, olap, ssas, kpi, mvc]
diagrams:
  - id: query
    title: "Querying OLAP measures"
    description: "The MVC controller uses ISsasService. Its SsasService implementation constructs MDX queries and executes them through ADOMD.NET against the external SSAS cube. The interface is a software contract, not another network service."
    steps: ["Browser|Web dashboard", "ASP.NET Core MVC|DashboardController", "ISsasService|Service contract", "SsasService|MDX construction", "ADOMD.NET|Query execution", "SSAS cube|Multidimensional"]
  - id: visualization
    title: "Returning data to the charts"
    description: "Service results are exposed through the controller’s JSON endpoints. Dashboard JavaScript consumes them to populate Chart.js visualisations. Errors and missing data have dedicated states."
    steps: ["Service results|Measures and dimensions", "MVC controller|JSON responses", "Dashboard JavaScript|Chart data", "Chart.js|Visualisations"]
---

## When a Filter Targets the Axis Hierarchy

An OLAP query must account for where each hierarchy appears. SsasService selects ROWS members using the axis filter and builds the slicer separately, avoiding the same hierarchy in both places. The engineering detail lies in query construction, not only in the Chart.js display.

## Technical Decisions

The benefits below follow from the code’s organisation; no individual historical motivation is assumed.

### Centralise SSAS access

**Choice.** `DashboardController` depends on `ISsasService`. `SsasService` brings together MDX construction, ADOMD.NET access and result reading.

**Benefit.** The controller does not need the details of each multidimensional query. **Trade-off.** The service remains closely tied to the expected cube’s dimension, measure and member names.

### Share filters across analyses

**Choice.** Endpoints receive a common filter model to select the data used by KPIs and analytical views.

**Benefit.** One selection can apply to several dashboard views. **Trade-off.** Each MDX query must apply the criteria correctly and account for the members available in the cube.

### Separate measures from chart rendering

**Choice.** The backend exposes JSON responses consumed by Chart.js. Values come from OLAP results; errors and missing data are not replaced with demonstration figures.

**Benefit.** Web presentation remains separate from cube access. **Trade-off.** The client must handle loading, errors and empty responses. Chart freshness depends on processing of the external cube.

## BI Analysis and Dependencies

KPIs summarise sales, purchasing and calculated OLAP measures. Analytical views cover products, customers, suppliers and changes over time, with shared filters.

SQL Server Analysis Services provides the multidimensional engine. The repository alone cannot recreate the Data Warehouse, ETL and cube that produce these measures. Power BI and SSIS are not included in the presented stack.

## Testing and Verification

No automated test project was identified for MDX generation, result mapping or controllers. Code review confirms the organisation of queries and endpoints; it does not validate results from a running cube.

The dashboard was not run against an SSAS cube during preparation. No data volume, response time or numerical business result is claimed.

## Current Limitations

- The complete cube definition, Data Warehouse, ETL and full cube deployment scripts are not included.
- Analysis requires the schema, member names and availability of the external cube.
- Connection configuration and Windows identity must be adapted to the execution environment.
- Automated query and mapping tests were not identified; business results were not reproduced in this study.
