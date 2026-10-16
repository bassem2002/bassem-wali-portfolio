// Editorial translations of the verified French facts. IDs, stacks, repositories
// and relationships remain shared in projects.ts.
interface EnglishProjectDetails {
  problem: string; features: readonly string[]; limitations: readonly string[];
}
export const projectDetailsEn: Readonly<Record<string, EnglishProjectDetails>> = {
  rezouette: {
    problem: 'Bring connections to multiple social platforms and publication tracking into one interface.',
    features: [
      'Social account connections through OAuth 2.0, with PKCE for the relevant integrations.',
      'Content management and workflows for immediate or scheduled publication.',
      'Publication history and status tracking.',
      'NestJS backend, Prisma/PostgreSQL persistence and an Angular interface.',
      'Jest backend tests with mocked dependencies and external providers.',
    ],
    limitations: ['TikTok, LinkedIn and YouTube still require validation with real providers.', 'Application authentication and multi-role access control are not implemented.'],
  },
  smartalumni: {
    problem: 'Help an Alumni network support mentor discovery, mentorship requests and conversations.',
    features: [
      'Student, Alumni and administrator profiles with JWT authentication.',
      'Mentor search, mentorship requests and status management.',
      'Conversations and message history.',
      'Document text extraction with Apache Tika and AI-assisted analysis through DeepSeek API, with a local fallback.',
      'Mentor recommendations based on rules and weighted criteria.',
      'Administration features and JUnit/Mockito tests for CV and recommendation services.',
    ],
    limitations: ['Mentor matching uses rules; it is not a trained Machine Learning model.', 'AI-assisted analysis depends on an external service; tests focus on backend services.'],
  },
  'enterprise-bi-dashboard': {
    problem: 'Provide an interface for exploring and filtering multidimensional measures from an SSAS cube.',
    features: [
      'Sales and purchasing indicators, with calculated OLAP measures.',
      'Shared filters and analytical views by product, customer, supplier and date.',
      'MDX query construction in a centralised SSAS service using ADOMD.NET.',
      'JSON endpoints consumed by Chart.js visualisations.',
      'Error and empty states when the cube or a measure is unavailable.',
    ],
    limitations: ['The SSAS cube and warehouse deployment scripts are not included.', 'Analysis depends on the schema and availability of the external cube.'],
  },
  'min-draw-fx': {
    problem: 'Structure an extensible drawing editor by separating interactions, shapes, commands and persistence.',
    features: [
      'Create, select and delete rectangles, circles and lines.',
      'Undo and redo drawing commands.',
      'Apply effects to shapes through decorators.',
      'Save and load drawings with SQLite/JDBC.',
      'Export the JavaFX canvas as PNG.',
      'Command, Decorator, Observer and Factory in an MVC architecture with services and repositories.',
    ],
    limitations: ['JavaFX must be configured manually to run the application.', 'No automated tests were identified in the audited repository.'],
  },
  'waste-classification': {
    problem: 'Explore how pretrained convolutional networks and custom blocks can be adapted to image classification.',
    features: [
      'Feature extraction with ResNet50, adapted to binary classification.',
      'Image augmentation through rotation, zoom and horizontal flipping.',
      'DenseNet-inspired dense blocks and transition layers, with feature fusion.',
      'Training code with Early Stopping and checkpoints for the best weights.',
    ],
    limitations: ['An external dataset and some external weights are required.', 'The p_m_dechets2 initialisation is commented out; the notebook needs preparation for a complete run.'],
  },
  'housing-insurance': {
    problem: 'Compare classification approaches for identifying policies associated with claims while accounting for class imbalance.',
    features: [
      'Exploratory analysis, cleaning, imputation, encoding and feature preparation.',
      'Comparison of Random Forest and Gradient Boosting.',
      'Class rebalancing with SMOTE and SMOTETomek.',
      'A notebook, Python modules and a command-line interface.',
    ],
    limitations: ['The dataset is not distributed; historical results were not reproduced during the audit.', 'The decision threshold was selected on the test set, and notebook results differ from the CSV.'],
  },
  'english-french-seq2seq': {
    problem: 'Implement neural translation from sentence preparation to the generation of French tokens.',
    features: [
      'Vocabulary construction, tokenisation, padding and sequence preparation.',
      'An LSTM encoder and decoder in a Seq2Seq model.',
      'Training with teacher forcing and validation loss calculation.',
      'Generation with greedy decoding and model weight saving.',
    ],
    limitations: ['The translation dataset is not included.', 'Vocabularies are not saved with the weights; translation quality was not independently validated.'],
  },
  'smart-trade-manager': {
    problem: 'Combine product, supplier and shipment tracking with mobile tools for reading and translating documents.',
    features: [
      'Firebase authentication and synchronisation through Firebase Realtime Database.',
      'Screens for viewing and adding products, suppliers and shipments.',
      'Text recognition and QR/barcode scanning with Google ML Kit.',
      'Language identification and on-device translation.',
      'Local preferences and a French, English and Arabic interface.',
    ],
    limitations: ['Edit and delete operations are incomplete in some modules.', 'External Firebase configuration and native device capabilities are required.'],
  },
  shopflow: {
    problem: 'Organise customer, seller and administrator workflows around the catalogue and orders.',
    features: [
      'Administrator, seller and customer roles.',
      'Product catalogue with categories, variants, stock and reviews.',
      'Persistent cart, coupons and order creation.',
      'Order and stock processing within a Spring transaction.',
      'JWT authentication and Firebase Authentication integration.',
    ],
    limitations: ['No external payment service is integrated.', 'No business-logic tests are present; only a Spring context test was identified.'],
  },
  jobconnect: {
    problem: 'Connect applicants and recruiters while supporting administration of listings, accounts and applications.',
    features: [
      'Applicant, company/recruiter and administrator workflows.',
      'Job publication and moderation, applications and CV management.',
      'Search, saved jobs and notifications.',
      'Administration of users, categories, jobs and reports.',
    ],
    limitations: ['Authentication and profile tests come from Laravel Breeze.', 'Job, application and moderation workflows lack business-logic tests.'],
  },
  'restaurant-management': {
    problem: 'Connect the customer ordering workflow with catalogue administration and order tracking.',
    features: [
      'Registration, sign-in and roles with ASP.NET Core Identity and JWT.',
      'Catalogue and category management.',
      'Cart and ordering workflows in the Blazor client.',
      'Data access through repositories and Entity Framework Core.',
    ],
    limitations: ['The API address is configured for a local environment.', 'No dedicated automated test project was identified.'],
  },
  'school-management': {
    problem: 'Centralise learning resources and school organisation through interfaces tailored to each role.',
    features: [
      'JWT authentication and access for administrator, teacher and student roles.',
      'Management of groups, subjects, rooms and sessions.',
      'Role-specific calendars and dashboards.',
      'Document uploads with Multer and file type/size checks.',
      'React/Redux client state and backend authentication/authorisation tests.',
    ],
    limitations: ['Tests focus on backend security; full workflow coverage is not established.'],
  },
  'java-network-communication': {
    problem: 'Compare client/server communication and group broadcasting mechanisms through networking applications.',
    features: [
      'Multi-client server with public and private communications.',
      'File and media transfer.',
      'TCP, UDP and IPv4 multicast modules.',
      'JavaFX interfaces and concurrent connection handling.',
    ],
    limitations: ['Manual network configuration and startup are required.', 'No automated tests were identified.'],
  },
  eventplanner: {
    problem: 'Centralise event browsing and registration in an access-controlled web application.',
    features: [
      'Event, category and image management.',
      'Event browsing and registration management.',
      'User management and administrator/user access control.',
      'Blade views and Eloquent persistence in a Laravel MVC architecture.',
    ],
    limitations: ['A dedicated event approval workflow is not confirmed.', 'Only Laravel scaffold tests were identified.'],
  },
};
