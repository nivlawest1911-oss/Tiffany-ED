
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.EdintelMediaScalarFieldEnum = {
  id: 'id',
  fileName: 'fileName',
  url: 'url',
  mediaType: 'mediaType',
  size: 'size',
  uploadedAt: 'uploadedAt'
};

exports.Prisma.TierScalarFieldEnum = {
  id: 'id',
  name: 'name',
  signupPrice: 'signupPrice',
  description: 'description'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  name: 'name',
  role: 'role',
  district: 'district',
  school: 'school',
  schoolSite: 'schoolSite',
  position: 'position',
  organizationId: 'organizationId',
  stripeCustomerId: 'stripeCustomerId',
  subscriptionTier: 'subscriptionTier',
  subscriptionStatus: 'subscriptionStatus',
  usageTokens: 'usageTokens',
  xpPoints: 'xpPoints',
  trialStartedAt: 'trialStartedAt',
  trialEndsAt: 'trialEndsAt',
  isTrialConverted: 'isTrialConverted',
  tierId: 'tierId',
  googleId: 'googleId',
  avatarUrl: 'avatarUrl',
  passwordHash: 'passwordHash',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  lastLogin: 'lastLogin',
  subscriptionId: 'subscriptionId',
  lastPaymentAt: 'lastPaymentAt'
};

exports.Prisma.OrganizationScalarFieldEnum = {
  id: 'id',
  name: 'name',
  tier: 'tier',
  trialStartedAt: 'trialStartedAt',
  trialStartsAt: 'trialStartsAt',
  trialEndsAt: 'trialEndsAt',
  isTrialConverted: 'isTrialConverted',
  usageTokens: 'usageTokens',
  address: 'address',
  contactEmail: 'contactEmail',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AvatarSessionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  avatarName: 'avatarName',
  avatarRole: 'avatarRole',
  engine: 'engine',
  startedAt: 'startedAt',
  endedAt: 'endedAt',
  duration: 'duration',
  latencyAvg: 'latencyAvg',
  conversationLog: 'conversationLog',
  userSentiment: 'userSentiment',
  gcpSessionId: 'gcpSessionId',
  vertexAiModel: 'vertexAiModel',
  cloudRunEndpoint: 'cloudRunEndpoint',
  thoughtSignatures: 'thoughtSignatures'
};

exports.Prisma.EvidenceFolderScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  studentId: 'studentId',
  gradeLevel: 'gradeLevel',
  specialEdStatus: 'specialEdStatus',
  title: 'title',
  category: 'category',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  aiSummary: 'aiSummary',
  riskLevel: 'riskLevel',
  complianceScore: 'complianceScore'
};

exports.Prisma.ObservationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  evidenceFolderId: 'evidenceFolderId',
  avatarSessionId: 'avatarSessionId',
  observationType: 'observationType',
  observationDate: 'observationDate',
  duration: 'duration',
  description: 'description',
  context: 'context',
  interventions: 'interventions',
  aiAnalysis: 'aiAnalysis',
  suggestedActions: 'suggestedActions',
  legalCompliance: 'legalCompliance',
  hasAudio: 'hasAudio',
  hasVideo: 'hasVideo',
  hasImages: 'hasImages',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DocumentScalarFieldEnum = {
  id: 'id',
  evidenceFolderId: 'evidenceFolderId',
  fileName: 'fileName',
  fileType: 'fileType',
  fileSize: 'fileSize',
  gcpBucketPath: 'gcpBucketPath',
  gcpSignedUrl: 'gcpSignedUrl',
  urlExpiresAt: 'urlExpiresAt',
  encrypted: 'encrypted',
  accessLevel: 'accessLevel',
  uploadedAt: 'uploadedAt'
};

exports.Prisma.GenerationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  generatorId: 'generatorId',
  prompt: 'prompt',
  content: 'content',
  professorVideoUrl: 'professorVideoUrl',
  avatarEngine: 'avatarEngine',
  createdAt: 'createdAt'
};

exports.Prisma.AnalyticsEventScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  eventType: 'eventType',
  eventCategory: 'eventCategory',
  eventAction: 'eventAction',
  eventLabel: 'eventLabel',
  latency: 'latency',
  tokensUsed: 'tokensUsed',
  gcpCost: 'gcpCost',
  metadata: 'metadata',
  userAgent: 'userAgent',
  ipAddress: 'ipAddress',
  timestamp: 'timestamp'
};

exports.Prisma.SemanticCacheScalarFieldEnum = {
  id: 'id',
  query: 'query',
  response: 'response',
  hitCount: 'hitCount',
  lastHitAt: 'lastHitAt',
  createdAt: 'createdAt'
};

exports.Prisma.GraphNodeScalarFieldEnum = {
  id: 'id',
  label: 'label',
  name: 'name',
  properties: 'properties',
  createdAt: 'createdAt'
};

exports.Prisma.GraphEdgeScalarFieldEnum = {
  id: 'id',
  type: 'type',
  properties: 'properties',
  sourceId: 'sourceId',
  targetId: 'targetId',
  weight: 'weight',
  createdAt: 'createdAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};


exports.Prisma.ModelName = {
  EdintelMedia: 'EdintelMedia',
  Tier: 'Tier',
  User: 'User',
  Organization: 'Organization',
  AvatarSession: 'AvatarSession',
  EvidenceFolder: 'EvidenceFolder',
  Observation: 'Observation',
  Document: 'Document',
  Generation: 'Generation',
  AnalyticsEvent: 'AnalyticsEvent',
  SemanticCache: 'SemanticCache',
  GraphNode: 'GraphNode',
  GraphEdge: 'GraphEdge'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
