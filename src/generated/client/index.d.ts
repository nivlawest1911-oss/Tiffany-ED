
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model EdintelMedia
 * 
 */
export type EdintelMedia = $Result.DefaultSelection<Prisma.$EdintelMediaPayload>
/**
 * Model Tier
 * 
 */
export type Tier = $Result.DefaultSelection<Prisma.$TierPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Organization
 * 
 */
export type Organization = $Result.DefaultSelection<Prisma.$OrganizationPayload>
/**
 * Model AvatarSession
 * 
 */
export type AvatarSession = $Result.DefaultSelection<Prisma.$AvatarSessionPayload>
/**
 * Model EvidenceFolder
 * 
 */
export type EvidenceFolder = $Result.DefaultSelection<Prisma.$EvidenceFolderPayload>
/**
 * Model Observation
 * 
 */
export type Observation = $Result.DefaultSelection<Prisma.$ObservationPayload>
/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model Generation
 * 
 */
export type Generation = $Result.DefaultSelection<Prisma.$GenerationPayload>
/**
 * Model AnalyticsEvent
 * 
 */
export type AnalyticsEvent = $Result.DefaultSelection<Prisma.$AnalyticsEventPayload>
/**
 * Model SemanticCache
 * 
 */
export type SemanticCache = $Result.DefaultSelection<Prisma.$SemanticCachePayload>
/**
 * Model GraphNode
 * 
 */
export type GraphNode = $Result.DefaultSelection<Prisma.$GraphNodePayload>
/**
 * Model GraphEdge
 * 
 */
export type GraphEdge = $Result.DefaultSelection<Prisma.$GraphEdgePayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more EdintelMedias
 * const edintelMedias = await prisma.edintelMedia.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more EdintelMedias
   * const edintelMedias = await prisma.edintelMedia.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.edintelMedia`: Exposes CRUD operations for the **EdintelMedia** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EdintelMedias
    * const edintelMedias = await prisma.edintelMedia.findMany()
    * ```
    */
  get edintelMedia(): Prisma.EdintelMediaDelegate<ExtArgs>;

  /**
   * `prisma.tier`: Exposes CRUD operations for the **Tier** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tiers
    * const tiers = await prisma.tier.findMany()
    * ```
    */
  get tier(): Prisma.TierDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.organization`: Exposes CRUD operations for the **Organization** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Organizations
    * const organizations = await prisma.organization.findMany()
    * ```
    */
  get organization(): Prisma.OrganizationDelegate<ExtArgs>;

  /**
   * `prisma.avatarSession`: Exposes CRUD operations for the **AvatarSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AvatarSessions
    * const avatarSessions = await prisma.avatarSession.findMany()
    * ```
    */
  get avatarSession(): Prisma.AvatarSessionDelegate<ExtArgs>;

  /**
   * `prisma.evidenceFolder`: Exposes CRUD operations for the **EvidenceFolder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EvidenceFolders
    * const evidenceFolders = await prisma.evidenceFolder.findMany()
    * ```
    */
  get evidenceFolder(): Prisma.EvidenceFolderDelegate<ExtArgs>;

  /**
   * `prisma.observation`: Exposes CRUD operations for the **Observation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Observations
    * const observations = await prisma.observation.findMany()
    * ```
    */
  get observation(): Prisma.ObservationDelegate<ExtArgs>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs>;

  /**
   * `prisma.generation`: Exposes CRUD operations for the **Generation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Generations
    * const generations = await prisma.generation.findMany()
    * ```
    */
  get generation(): Prisma.GenerationDelegate<ExtArgs>;

  /**
   * `prisma.analyticsEvent`: Exposes CRUD operations for the **AnalyticsEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AnalyticsEvents
    * const analyticsEvents = await prisma.analyticsEvent.findMany()
    * ```
    */
  get analyticsEvent(): Prisma.AnalyticsEventDelegate<ExtArgs>;

  /**
   * `prisma.semanticCache`: Exposes CRUD operations for the **SemanticCache** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SemanticCaches
    * const semanticCaches = await prisma.semanticCache.findMany()
    * ```
    */
  get semanticCache(): Prisma.SemanticCacheDelegate<ExtArgs>;

  /**
   * `prisma.graphNode`: Exposes CRUD operations for the **GraphNode** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GraphNodes
    * const graphNodes = await prisma.graphNode.findMany()
    * ```
    */
  get graphNode(): Prisma.GraphNodeDelegate<ExtArgs>;

  /**
   * `prisma.graphEdge`: Exposes CRUD operations for the **GraphEdge** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GraphEdges
    * const graphEdges = await prisma.graphEdge.findMany()
    * ```
    */
  get graphEdge(): Prisma.GraphEdgeDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "edintelMedia" | "tier" | "user" | "organization" | "avatarSession" | "evidenceFolder" | "observation" | "document" | "generation" | "analyticsEvent" | "semanticCache" | "graphNode" | "graphEdge"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      EdintelMedia: {
        payload: Prisma.$EdintelMediaPayload<ExtArgs>
        fields: Prisma.EdintelMediaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EdintelMediaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EdintelMediaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EdintelMediaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EdintelMediaPayload>
          }
          findFirst: {
            args: Prisma.EdintelMediaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EdintelMediaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EdintelMediaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EdintelMediaPayload>
          }
          findMany: {
            args: Prisma.EdintelMediaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EdintelMediaPayload>[]
          }
          create: {
            args: Prisma.EdintelMediaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EdintelMediaPayload>
          }
          createMany: {
            args: Prisma.EdintelMediaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EdintelMediaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EdintelMediaPayload>[]
          }
          delete: {
            args: Prisma.EdintelMediaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EdintelMediaPayload>
          }
          update: {
            args: Prisma.EdintelMediaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EdintelMediaPayload>
          }
          deleteMany: {
            args: Prisma.EdintelMediaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EdintelMediaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EdintelMediaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EdintelMediaPayload>
          }
          aggregate: {
            args: Prisma.EdintelMediaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEdintelMedia>
          }
          groupBy: {
            args: Prisma.EdintelMediaGroupByArgs<ExtArgs>
            result: $Utils.Optional<EdintelMediaGroupByOutputType>[]
          }
          count: {
            args: Prisma.EdintelMediaCountArgs<ExtArgs>
            result: $Utils.Optional<EdintelMediaCountAggregateOutputType> | number
          }
        }
      }
      Tier: {
        payload: Prisma.$TierPayload<ExtArgs>
        fields: Prisma.TierFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TierFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TierPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TierFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TierPayload>
          }
          findFirst: {
            args: Prisma.TierFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TierPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TierFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TierPayload>
          }
          findMany: {
            args: Prisma.TierFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TierPayload>[]
          }
          create: {
            args: Prisma.TierCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TierPayload>
          }
          createMany: {
            args: Prisma.TierCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TierCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TierPayload>[]
          }
          delete: {
            args: Prisma.TierDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TierPayload>
          }
          update: {
            args: Prisma.TierUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TierPayload>
          }
          deleteMany: {
            args: Prisma.TierDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TierUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TierUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TierPayload>
          }
          aggregate: {
            args: Prisma.TierAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTier>
          }
          groupBy: {
            args: Prisma.TierGroupByArgs<ExtArgs>
            result: $Utils.Optional<TierGroupByOutputType>[]
          }
          count: {
            args: Prisma.TierCountArgs<ExtArgs>
            result: $Utils.Optional<TierCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Organization: {
        payload: Prisma.$OrganizationPayload<ExtArgs>
        fields: Prisma.OrganizationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrganizationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrganizationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findFirst: {
            args: Prisma.OrganizationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrganizationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          findMany: {
            args: Prisma.OrganizationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          create: {
            args: Prisma.OrganizationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          createMany: {
            args: Prisma.OrganizationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrganizationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>[]
          }
          delete: {
            args: Prisma.OrganizationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          update: {
            args: Prisma.OrganizationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          deleteMany: {
            args: Prisma.OrganizationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrganizationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrganizationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrganizationPayload>
          }
          aggregate: {
            args: Prisma.OrganizationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrganization>
          }
          groupBy: {
            args: Prisma.OrganizationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrganizationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrganizationCountArgs<ExtArgs>
            result: $Utils.Optional<OrganizationCountAggregateOutputType> | number
          }
        }
      }
      AvatarSession: {
        payload: Prisma.$AvatarSessionPayload<ExtArgs>
        fields: Prisma.AvatarSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AvatarSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AvatarSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarSessionPayload>
          }
          findFirst: {
            args: Prisma.AvatarSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AvatarSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarSessionPayload>
          }
          findMany: {
            args: Prisma.AvatarSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarSessionPayload>[]
          }
          create: {
            args: Prisma.AvatarSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarSessionPayload>
          }
          createMany: {
            args: Prisma.AvatarSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AvatarSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarSessionPayload>[]
          }
          delete: {
            args: Prisma.AvatarSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarSessionPayload>
          }
          update: {
            args: Prisma.AvatarSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarSessionPayload>
          }
          deleteMany: {
            args: Prisma.AvatarSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AvatarSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AvatarSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AvatarSessionPayload>
          }
          aggregate: {
            args: Prisma.AvatarSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAvatarSession>
          }
          groupBy: {
            args: Prisma.AvatarSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AvatarSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AvatarSessionCountArgs<ExtArgs>
            result: $Utils.Optional<AvatarSessionCountAggregateOutputType> | number
          }
        }
      }
      EvidenceFolder: {
        payload: Prisma.$EvidenceFolderPayload<ExtArgs>
        fields: Prisma.EvidenceFolderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EvidenceFolderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvidenceFolderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EvidenceFolderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvidenceFolderPayload>
          }
          findFirst: {
            args: Prisma.EvidenceFolderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvidenceFolderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EvidenceFolderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvidenceFolderPayload>
          }
          findMany: {
            args: Prisma.EvidenceFolderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvidenceFolderPayload>[]
          }
          create: {
            args: Prisma.EvidenceFolderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvidenceFolderPayload>
          }
          createMany: {
            args: Prisma.EvidenceFolderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EvidenceFolderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvidenceFolderPayload>[]
          }
          delete: {
            args: Prisma.EvidenceFolderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvidenceFolderPayload>
          }
          update: {
            args: Prisma.EvidenceFolderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvidenceFolderPayload>
          }
          deleteMany: {
            args: Prisma.EvidenceFolderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EvidenceFolderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EvidenceFolderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvidenceFolderPayload>
          }
          aggregate: {
            args: Prisma.EvidenceFolderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvidenceFolder>
          }
          groupBy: {
            args: Prisma.EvidenceFolderGroupByArgs<ExtArgs>
            result: $Utils.Optional<EvidenceFolderGroupByOutputType>[]
          }
          count: {
            args: Prisma.EvidenceFolderCountArgs<ExtArgs>
            result: $Utils.Optional<EvidenceFolderCountAggregateOutputType> | number
          }
        }
      }
      Observation: {
        payload: Prisma.$ObservationPayload<ExtArgs>
        fields: Prisma.ObservationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ObservationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObservationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ObservationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObservationPayload>
          }
          findFirst: {
            args: Prisma.ObservationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObservationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ObservationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObservationPayload>
          }
          findMany: {
            args: Prisma.ObservationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObservationPayload>[]
          }
          create: {
            args: Prisma.ObservationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObservationPayload>
          }
          createMany: {
            args: Prisma.ObservationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ObservationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObservationPayload>[]
          }
          delete: {
            args: Prisma.ObservationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObservationPayload>
          }
          update: {
            args: Prisma.ObservationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObservationPayload>
          }
          deleteMany: {
            args: Prisma.ObservationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ObservationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ObservationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ObservationPayload>
          }
          aggregate: {
            args: Prisma.ObservationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateObservation>
          }
          groupBy: {
            args: Prisma.ObservationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ObservationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ObservationCountArgs<ExtArgs>
            result: $Utils.Optional<ObservationCountAggregateOutputType> | number
          }
        }
      }
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      Generation: {
        payload: Prisma.$GenerationPayload<ExtArgs>
        fields: Prisma.GenerationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GenerationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenerationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GenerationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenerationPayload>
          }
          findFirst: {
            args: Prisma.GenerationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenerationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GenerationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenerationPayload>
          }
          findMany: {
            args: Prisma.GenerationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenerationPayload>[]
          }
          create: {
            args: Prisma.GenerationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenerationPayload>
          }
          createMany: {
            args: Prisma.GenerationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GenerationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenerationPayload>[]
          }
          delete: {
            args: Prisma.GenerationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenerationPayload>
          }
          update: {
            args: Prisma.GenerationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenerationPayload>
          }
          deleteMany: {
            args: Prisma.GenerationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GenerationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GenerationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GenerationPayload>
          }
          aggregate: {
            args: Prisma.GenerationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGeneration>
          }
          groupBy: {
            args: Prisma.GenerationGroupByArgs<ExtArgs>
            result: $Utils.Optional<GenerationGroupByOutputType>[]
          }
          count: {
            args: Prisma.GenerationCountArgs<ExtArgs>
            result: $Utils.Optional<GenerationCountAggregateOutputType> | number
          }
        }
      }
      AnalyticsEvent: {
        payload: Prisma.$AnalyticsEventPayload<ExtArgs>
        fields: Prisma.AnalyticsEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AnalyticsEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AnalyticsEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          findFirst: {
            args: Prisma.AnalyticsEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AnalyticsEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          findMany: {
            args: Prisma.AnalyticsEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>[]
          }
          create: {
            args: Prisma.AnalyticsEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          createMany: {
            args: Prisma.AnalyticsEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AnalyticsEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>[]
          }
          delete: {
            args: Prisma.AnalyticsEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          update: {
            args: Prisma.AnalyticsEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          deleteMany: {
            args: Prisma.AnalyticsEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AnalyticsEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AnalyticsEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AnalyticsEventPayload>
          }
          aggregate: {
            args: Prisma.AnalyticsEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAnalyticsEvent>
          }
          groupBy: {
            args: Prisma.AnalyticsEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<AnalyticsEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.AnalyticsEventCountArgs<ExtArgs>
            result: $Utils.Optional<AnalyticsEventCountAggregateOutputType> | number
          }
        }
      }
      SemanticCache: {
        payload: Prisma.$SemanticCachePayload<ExtArgs>
        fields: Prisma.SemanticCacheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SemanticCacheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemanticCachePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SemanticCacheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemanticCachePayload>
          }
          findFirst: {
            args: Prisma.SemanticCacheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemanticCachePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SemanticCacheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemanticCachePayload>
          }
          findMany: {
            args: Prisma.SemanticCacheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemanticCachePayload>[]
          }
          create: {
            args: Prisma.SemanticCacheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemanticCachePayload>
          }
          createMany: {
            args: Prisma.SemanticCacheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SemanticCacheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemanticCachePayload>[]
          }
          delete: {
            args: Prisma.SemanticCacheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemanticCachePayload>
          }
          update: {
            args: Prisma.SemanticCacheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemanticCachePayload>
          }
          deleteMany: {
            args: Prisma.SemanticCacheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SemanticCacheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SemanticCacheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SemanticCachePayload>
          }
          aggregate: {
            args: Prisma.SemanticCacheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSemanticCache>
          }
          groupBy: {
            args: Prisma.SemanticCacheGroupByArgs<ExtArgs>
            result: $Utils.Optional<SemanticCacheGroupByOutputType>[]
          }
          count: {
            args: Prisma.SemanticCacheCountArgs<ExtArgs>
            result: $Utils.Optional<SemanticCacheCountAggregateOutputType> | number
          }
        }
      }
      GraphNode: {
        payload: Prisma.$GraphNodePayload<ExtArgs>
        fields: Prisma.GraphNodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GraphNodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphNodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GraphNodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphNodePayload>
          }
          findFirst: {
            args: Prisma.GraphNodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphNodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GraphNodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphNodePayload>
          }
          findMany: {
            args: Prisma.GraphNodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphNodePayload>[]
          }
          create: {
            args: Prisma.GraphNodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphNodePayload>
          }
          createMany: {
            args: Prisma.GraphNodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GraphNodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphNodePayload>[]
          }
          delete: {
            args: Prisma.GraphNodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphNodePayload>
          }
          update: {
            args: Prisma.GraphNodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphNodePayload>
          }
          deleteMany: {
            args: Prisma.GraphNodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GraphNodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GraphNodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphNodePayload>
          }
          aggregate: {
            args: Prisma.GraphNodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGraphNode>
          }
          groupBy: {
            args: Prisma.GraphNodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<GraphNodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.GraphNodeCountArgs<ExtArgs>
            result: $Utils.Optional<GraphNodeCountAggregateOutputType> | number
          }
        }
      }
      GraphEdge: {
        payload: Prisma.$GraphEdgePayload<ExtArgs>
        fields: Prisma.GraphEdgeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GraphEdgeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphEdgePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GraphEdgeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphEdgePayload>
          }
          findFirst: {
            args: Prisma.GraphEdgeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphEdgePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GraphEdgeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphEdgePayload>
          }
          findMany: {
            args: Prisma.GraphEdgeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphEdgePayload>[]
          }
          create: {
            args: Prisma.GraphEdgeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphEdgePayload>
          }
          createMany: {
            args: Prisma.GraphEdgeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GraphEdgeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphEdgePayload>[]
          }
          delete: {
            args: Prisma.GraphEdgeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphEdgePayload>
          }
          update: {
            args: Prisma.GraphEdgeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphEdgePayload>
          }
          deleteMany: {
            args: Prisma.GraphEdgeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GraphEdgeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GraphEdgeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GraphEdgePayload>
          }
          aggregate: {
            args: Prisma.GraphEdgeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGraphEdge>
          }
          groupBy: {
            args: Prisma.GraphEdgeGroupByArgs<ExtArgs>
            result: $Utils.Optional<GraphEdgeGroupByOutputType>[]
          }
          count: {
            args: Prisma.GraphEdgeCountArgs<ExtArgs>
            result: $Utils.Optional<GraphEdgeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type TierCountOutputType
   */

  export type TierCountOutputType = {
    users: number
  }

  export type TierCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | TierCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * TierCountOutputType without action
   */
  export type TierCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TierCountOutputType
     */
    select?: TierCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TierCountOutputType without action
   */
  export type TierCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    generations: number
    observations: number
    evidenceFolders: number
    avatarSessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    generations?: boolean | UserCountOutputTypeCountGenerationsArgs
    observations?: boolean | UserCountOutputTypeCountObservationsArgs
    evidenceFolders?: boolean | UserCountOutputTypeCountEvidenceFoldersArgs
    avatarSessions?: boolean | UserCountOutputTypeCountAvatarSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGenerationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GenerationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountObservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ObservationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEvidenceFoldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvidenceFolderWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAvatarSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvatarSessionWhereInput
  }


  /**
   * Count Type OrganizationCountOutputType
   */

  export type OrganizationCountOutputType = {
    users: number
  }

  export type OrganizationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | OrganizationCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes
  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrganizationCountOutputType
     */
    select?: OrganizationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrganizationCountOutputType without action
   */
  export type OrganizationCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type AvatarSessionCountOutputType
   */

  export type AvatarSessionCountOutputType = {
    observations: number
  }

  export type AvatarSessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    observations?: boolean | AvatarSessionCountOutputTypeCountObservationsArgs
  }

  // Custom InputTypes
  /**
   * AvatarSessionCountOutputType without action
   */
  export type AvatarSessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarSessionCountOutputType
     */
    select?: AvatarSessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AvatarSessionCountOutputType without action
   */
  export type AvatarSessionCountOutputTypeCountObservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ObservationWhereInput
  }


  /**
   * Count Type EvidenceFolderCountOutputType
   */

  export type EvidenceFolderCountOutputType = {
    observations: number
    documents: number
  }

  export type EvidenceFolderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    observations?: boolean | EvidenceFolderCountOutputTypeCountObservationsArgs
    documents?: boolean | EvidenceFolderCountOutputTypeCountDocumentsArgs
  }

  // Custom InputTypes
  /**
   * EvidenceFolderCountOutputType without action
   */
  export type EvidenceFolderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvidenceFolderCountOutputType
     */
    select?: EvidenceFolderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EvidenceFolderCountOutputType without action
   */
  export type EvidenceFolderCountOutputTypeCountObservationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ObservationWhereInput
  }

  /**
   * EvidenceFolderCountOutputType without action
   */
  export type EvidenceFolderCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }


  /**
   * Count Type GraphNodeCountOutputType
   */

  export type GraphNodeCountOutputType = {
    outbound: number
    inbound: number
  }

  export type GraphNodeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    outbound?: boolean | GraphNodeCountOutputTypeCountOutboundArgs
    inbound?: boolean | GraphNodeCountOutputTypeCountInboundArgs
  }

  // Custom InputTypes
  /**
   * GraphNodeCountOutputType without action
   */
  export type GraphNodeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNodeCountOutputType
     */
    select?: GraphNodeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GraphNodeCountOutputType without action
   */
  export type GraphNodeCountOutputTypeCountOutboundArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GraphEdgeWhereInput
  }

  /**
   * GraphNodeCountOutputType without action
   */
  export type GraphNodeCountOutputTypeCountInboundArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GraphEdgeWhereInput
  }


  /**
   * Models
   */

  /**
   * Model EdintelMedia
   */

  export type AggregateEdintelMedia = {
    _count: EdintelMediaCountAggregateOutputType | null
    _avg: EdintelMediaAvgAggregateOutputType | null
    _sum: EdintelMediaSumAggregateOutputType | null
    _min: EdintelMediaMinAggregateOutputType | null
    _max: EdintelMediaMaxAggregateOutputType | null
  }

  export type EdintelMediaAvgAggregateOutputType = {
    size: number | null
  }

  export type EdintelMediaSumAggregateOutputType = {
    size: number | null
  }

  export type EdintelMediaMinAggregateOutputType = {
    id: string | null
    fileName: string | null
    url: string | null
    mediaType: string | null
    size: number | null
    uploadedAt: Date | null
  }

  export type EdintelMediaMaxAggregateOutputType = {
    id: string | null
    fileName: string | null
    url: string | null
    mediaType: string | null
    size: number | null
    uploadedAt: Date | null
  }

  export type EdintelMediaCountAggregateOutputType = {
    id: number
    fileName: number
    url: number
    mediaType: number
    size: number
    uploadedAt: number
    _all: number
  }


  export type EdintelMediaAvgAggregateInputType = {
    size?: true
  }

  export type EdintelMediaSumAggregateInputType = {
    size?: true
  }

  export type EdintelMediaMinAggregateInputType = {
    id?: true
    fileName?: true
    url?: true
    mediaType?: true
    size?: true
    uploadedAt?: true
  }

  export type EdintelMediaMaxAggregateInputType = {
    id?: true
    fileName?: true
    url?: true
    mediaType?: true
    size?: true
    uploadedAt?: true
  }

  export type EdintelMediaCountAggregateInputType = {
    id?: true
    fileName?: true
    url?: true
    mediaType?: true
    size?: true
    uploadedAt?: true
    _all?: true
  }

  export type EdintelMediaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EdintelMedia to aggregate.
     */
    where?: EdintelMediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EdintelMedias to fetch.
     */
    orderBy?: EdintelMediaOrderByWithRelationInput | EdintelMediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EdintelMediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EdintelMedias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EdintelMedias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EdintelMedias
    **/
    _count?: true | EdintelMediaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EdintelMediaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EdintelMediaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EdintelMediaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EdintelMediaMaxAggregateInputType
  }

  export type GetEdintelMediaAggregateType<T extends EdintelMediaAggregateArgs> = {
        [P in keyof T & keyof AggregateEdintelMedia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEdintelMedia[P]>
      : GetScalarType<T[P], AggregateEdintelMedia[P]>
  }




  export type EdintelMediaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EdintelMediaWhereInput
    orderBy?: EdintelMediaOrderByWithAggregationInput | EdintelMediaOrderByWithAggregationInput[]
    by: EdintelMediaScalarFieldEnum[] | EdintelMediaScalarFieldEnum
    having?: EdintelMediaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EdintelMediaCountAggregateInputType | true
    _avg?: EdintelMediaAvgAggregateInputType
    _sum?: EdintelMediaSumAggregateInputType
    _min?: EdintelMediaMinAggregateInputType
    _max?: EdintelMediaMaxAggregateInputType
  }

  export type EdintelMediaGroupByOutputType = {
    id: string
    fileName: string
    url: string
    mediaType: string
    size: number
    uploadedAt: Date
    _count: EdintelMediaCountAggregateOutputType | null
    _avg: EdintelMediaAvgAggregateOutputType | null
    _sum: EdintelMediaSumAggregateOutputType | null
    _min: EdintelMediaMinAggregateOutputType | null
    _max: EdintelMediaMaxAggregateOutputType | null
  }

  type GetEdintelMediaGroupByPayload<T extends EdintelMediaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EdintelMediaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EdintelMediaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EdintelMediaGroupByOutputType[P]>
            : GetScalarType<T[P], EdintelMediaGroupByOutputType[P]>
        }
      >
    >


  export type EdintelMediaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    url?: boolean
    mediaType?: boolean
    size?: boolean
    uploadedAt?: boolean
  }, ExtArgs["result"]["edintelMedia"]>

  export type EdintelMediaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fileName?: boolean
    url?: boolean
    mediaType?: boolean
    size?: boolean
    uploadedAt?: boolean
  }, ExtArgs["result"]["edintelMedia"]>

  export type EdintelMediaSelectScalar = {
    id?: boolean
    fileName?: boolean
    url?: boolean
    mediaType?: boolean
    size?: boolean
    uploadedAt?: boolean
  }


  export type $EdintelMediaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EdintelMedia"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fileName: string
      url: string
      mediaType: string
      size: number
      uploadedAt: Date
    }, ExtArgs["result"]["edintelMedia"]>
    composites: {}
  }

  type EdintelMediaGetPayload<S extends boolean | null | undefined | EdintelMediaDefaultArgs> = $Result.GetResult<Prisma.$EdintelMediaPayload, S>

  type EdintelMediaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EdintelMediaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EdintelMediaCountAggregateInputType | true
    }

  export interface EdintelMediaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EdintelMedia'], meta: { name: 'EdintelMedia' } }
    /**
     * Find zero or one EdintelMedia that matches the filter.
     * @param {EdintelMediaFindUniqueArgs} args - Arguments to find a EdintelMedia
     * @example
     * // Get one EdintelMedia
     * const edintelMedia = await prisma.edintelMedia.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EdintelMediaFindUniqueArgs>(args: SelectSubset<T, EdintelMediaFindUniqueArgs<ExtArgs>>): Prisma__EdintelMediaClient<$Result.GetResult<Prisma.$EdintelMediaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one EdintelMedia that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EdintelMediaFindUniqueOrThrowArgs} args - Arguments to find a EdintelMedia
     * @example
     * // Get one EdintelMedia
     * const edintelMedia = await prisma.edintelMedia.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EdintelMediaFindUniqueOrThrowArgs>(args: SelectSubset<T, EdintelMediaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EdintelMediaClient<$Result.GetResult<Prisma.$EdintelMediaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first EdintelMedia that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EdintelMediaFindFirstArgs} args - Arguments to find a EdintelMedia
     * @example
     * // Get one EdintelMedia
     * const edintelMedia = await prisma.edintelMedia.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EdintelMediaFindFirstArgs>(args?: SelectSubset<T, EdintelMediaFindFirstArgs<ExtArgs>>): Prisma__EdintelMediaClient<$Result.GetResult<Prisma.$EdintelMediaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first EdintelMedia that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EdintelMediaFindFirstOrThrowArgs} args - Arguments to find a EdintelMedia
     * @example
     * // Get one EdintelMedia
     * const edintelMedia = await prisma.edintelMedia.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EdintelMediaFindFirstOrThrowArgs>(args?: SelectSubset<T, EdintelMediaFindFirstOrThrowArgs<ExtArgs>>): Prisma__EdintelMediaClient<$Result.GetResult<Prisma.$EdintelMediaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more EdintelMedias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EdintelMediaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EdintelMedias
     * const edintelMedias = await prisma.edintelMedia.findMany()
     * 
     * // Get first 10 EdintelMedias
     * const edintelMedias = await prisma.edintelMedia.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const edintelMediaWithIdOnly = await prisma.edintelMedia.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EdintelMediaFindManyArgs>(args?: SelectSubset<T, EdintelMediaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EdintelMediaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a EdintelMedia.
     * @param {EdintelMediaCreateArgs} args - Arguments to create a EdintelMedia.
     * @example
     * // Create one EdintelMedia
     * const EdintelMedia = await prisma.edintelMedia.create({
     *   data: {
     *     // ... data to create a EdintelMedia
     *   }
     * })
     * 
     */
    create<T extends EdintelMediaCreateArgs>(args: SelectSubset<T, EdintelMediaCreateArgs<ExtArgs>>): Prisma__EdintelMediaClient<$Result.GetResult<Prisma.$EdintelMediaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many EdintelMedias.
     * @param {EdintelMediaCreateManyArgs} args - Arguments to create many EdintelMedias.
     * @example
     * // Create many EdintelMedias
     * const edintelMedia = await prisma.edintelMedia.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EdintelMediaCreateManyArgs>(args?: SelectSubset<T, EdintelMediaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EdintelMedias and returns the data saved in the database.
     * @param {EdintelMediaCreateManyAndReturnArgs} args - Arguments to create many EdintelMedias.
     * @example
     * // Create many EdintelMedias
     * const edintelMedia = await prisma.edintelMedia.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EdintelMedias and only return the `id`
     * const edintelMediaWithIdOnly = await prisma.edintelMedia.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EdintelMediaCreateManyAndReturnArgs>(args?: SelectSubset<T, EdintelMediaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EdintelMediaPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a EdintelMedia.
     * @param {EdintelMediaDeleteArgs} args - Arguments to delete one EdintelMedia.
     * @example
     * // Delete one EdintelMedia
     * const EdintelMedia = await prisma.edintelMedia.delete({
     *   where: {
     *     // ... filter to delete one EdintelMedia
     *   }
     * })
     * 
     */
    delete<T extends EdintelMediaDeleteArgs>(args: SelectSubset<T, EdintelMediaDeleteArgs<ExtArgs>>): Prisma__EdintelMediaClient<$Result.GetResult<Prisma.$EdintelMediaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one EdintelMedia.
     * @param {EdintelMediaUpdateArgs} args - Arguments to update one EdintelMedia.
     * @example
     * // Update one EdintelMedia
     * const edintelMedia = await prisma.edintelMedia.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EdintelMediaUpdateArgs>(args: SelectSubset<T, EdintelMediaUpdateArgs<ExtArgs>>): Prisma__EdintelMediaClient<$Result.GetResult<Prisma.$EdintelMediaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more EdintelMedias.
     * @param {EdintelMediaDeleteManyArgs} args - Arguments to filter EdintelMedias to delete.
     * @example
     * // Delete a few EdintelMedias
     * const { count } = await prisma.edintelMedia.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EdintelMediaDeleteManyArgs>(args?: SelectSubset<T, EdintelMediaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EdintelMedias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EdintelMediaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EdintelMedias
     * const edintelMedia = await prisma.edintelMedia.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EdintelMediaUpdateManyArgs>(args: SelectSubset<T, EdintelMediaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EdintelMedia.
     * @param {EdintelMediaUpsertArgs} args - Arguments to update or create a EdintelMedia.
     * @example
     * // Update or create a EdintelMedia
     * const edintelMedia = await prisma.edintelMedia.upsert({
     *   create: {
     *     // ... data to create a EdintelMedia
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EdintelMedia we want to update
     *   }
     * })
     */
    upsert<T extends EdintelMediaUpsertArgs>(args: SelectSubset<T, EdintelMediaUpsertArgs<ExtArgs>>): Prisma__EdintelMediaClient<$Result.GetResult<Prisma.$EdintelMediaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of EdintelMedias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EdintelMediaCountArgs} args - Arguments to filter EdintelMedias to count.
     * @example
     * // Count the number of EdintelMedias
     * const count = await prisma.edintelMedia.count({
     *   where: {
     *     // ... the filter for the EdintelMedias we want to count
     *   }
     * })
    **/
    count<T extends EdintelMediaCountArgs>(
      args?: Subset<T, EdintelMediaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EdintelMediaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EdintelMedia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EdintelMediaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EdintelMediaAggregateArgs>(args: Subset<T, EdintelMediaAggregateArgs>): Prisma.PrismaPromise<GetEdintelMediaAggregateType<T>>

    /**
     * Group by EdintelMedia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EdintelMediaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EdintelMediaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EdintelMediaGroupByArgs['orderBy'] }
        : { orderBy?: EdintelMediaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EdintelMediaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEdintelMediaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EdintelMedia model
   */
  readonly fields: EdintelMediaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EdintelMedia.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EdintelMediaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EdintelMedia model
   */ 
  interface EdintelMediaFieldRefs {
    readonly id: FieldRef<"EdintelMedia", 'String'>
    readonly fileName: FieldRef<"EdintelMedia", 'String'>
    readonly url: FieldRef<"EdintelMedia", 'String'>
    readonly mediaType: FieldRef<"EdintelMedia", 'String'>
    readonly size: FieldRef<"EdintelMedia", 'Int'>
    readonly uploadedAt: FieldRef<"EdintelMedia", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EdintelMedia findUnique
   */
  export type EdintelMediaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EdintelMedia
     */
    select?: EdintelMediaSelect<ExtArgs> | null
    /**
     * Filter, which EdintelMedia to fetch.
     */
    where: EdintelMediaWhereUniqueInput
  }

  /**
   * EdintelMedia findUniqueOrThrow
   */
  export type EdintelMediaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EdintelMedia
     */
    select?: EdintelMediaSelect<ExtArgs> | null
    /**
     * Filter, which EdintelMedia to fetch.
     */
    where: EdintelMediaWhereUniqueInput
  }

  /**
   * EdintelMedia findFirst
   */
  export type EdintelMediaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EdintelMedia
     */
    select?: EdintelMediaSelect<ExtArgs> | null
    /**
     * Filter, which EdintelMedia to fetch.
     */
    where?: EdintelMediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EdintelMedias to fetch.
     */
    orderBy?: EdintelMediaOrderByWithRelationInput | EdintelMediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EdintelMedias.
     */
    cursor?: EdintelMediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EdintelMedias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EdintelMedias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EdintelMedias.
     */
    distinct?: EdintelMediaScalarFieldEnum | EdintelMediaScalarFieldEnum[]
  }

  /**
   * EdintelMedia findFirstOrThrow
   */
  export type EdintelMediaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EdintelMedia
     */
    select?: EdintelMediaSelect<ExtArgs> | null
    /**
     * Filter, which EdintelMedia to fetch.
     */
    where?: EdintelMediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EdintelMedias to fetch.
     */
    orderBy?: EdintelMediaOrderByWithRelationInput | EdintelMediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EdintelMedias.
     */
    cursor?: EdintelMediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EdintelMedias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EdintelMedias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EdintelMedias.
     */
    distinct?: EdintelMediaScalarFieldEnum | EdintelMediaScalarFieldEnum[]
  }

  /**
   * EdintelMedia findMany
   */
  export type EdintelMediaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EdintelMedia
     */
    select?: EdintelMediaSelect<ExtArgs> | null
    /**
     * Filter, which EdintelMedias to fetch.
     */
    where?: EdintelMediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EdintelMedias to fetch.
     */
    orderBy?: EdintelMediaOrderByWithRelationInput | EdintelMediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EdintelMedias.
     */
    cursor?: EdintelMediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EdintelMedias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EdintelMedias.
     */
    skip?: number
    distinct?: EdintelMediaScalarFieldEnum | EdintelMediaScalarFieldEnum[]
  }

  /**
   * EdintelMedia create
   */
  export type EdintelMediaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EdintelMedia
     */
    select?: EdintelMediaSelect<ExtArgs> | null
    /**
     * The data needed to create a EdintelMedia.
     */
    data: XOR<EdintelMediaCreateInput, EdintelMediaUncheckedCreateInput>
  }

  /**
   * EdintelMedia createMany
   */
  export type EdintelMediaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EdintelMedias.
     */
    data: EdintelMediaCreateManyInput | EdintelMediaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EdintelMedia createManyAndReturn
   */
  export type EdintelMediaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EdintelMedia
     */
    select?: EdintelMediaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many EdintelMedias.
     */
    data: EdintelMediaCreateManyInput | EdintelMediaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EdintelMedia update
   */
  export type EdintelMediaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EdintelMedia
     */
    select?: EdintelMediaSelect<ExtArgs> | null
    /**
     * The data needed to update a EdintelMedia.
     */
    data: XOR<EdintelMediaUpdateInput, EdintelMediaUncheckedUpdateInput>
    /**
     * Choose, which EdintelMedia to update.
     */
    where: EdintelMediaWhereUniqueInput
  }

  /**
   * EdintelMedia updateMany
   */
  export type EdintelMediaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EdintelMedias.
     */
    data: XOR<EdintelMediaUpdateManyMutationInput, EdintelMediaUncheckedUpdateManyInput>
    /**
     * Filter which EdintelMedias to update
     */
    where?: EdintelMediaWhereInput
  }

  /**
   * EdintelMedia upsert
   */
  export type EdintelMediaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EdintelMedia
     */
    select?: EdintelMediaSelect<ExtArgs> | null
    /**
     * The filter to search for the EdintelMedia to update in case it exists.
     */
    where: EdintelMediaWhereUniqueInput
    /**
     * In case the EdintelMedia found by the `where` argument doesn't exist, create a new EdintelMedia with this data.
     */
    create: XOR<EdintelMediaCreateInput, EdintelMediaUncheckedCreateInput>
    /**
     * In case the EdintelMedia was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EdintelMediaUpdateInput, EdintelMediaUncheckedUpdateInput>
  }

  /**
   * EdintelMedia delete
   */
  export type EdintelMediaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EdintelMedia
     */
    select?: EdintelMediaSelect<ExtArgs> | null
    /**
     * Filter which EdintelMedia to delete.
     */
    where: EdintelMediaWhereUniqueInput
  }

  /**
   * EdintelMedia deleteMany
   */
  export type EdintelMediaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EdintelMedias to delete
     */
    where?: EdintelMediaWhereInput
  }

  /**
   * EdintelMedia without action
   */
  export type EdintelMediaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EdintelMedia
     */
    select?: EdintelMediaSelect<ExtArgs> | null
  }


  /**
   * Model Tier
   */

  export type AggregateTier = {
    _count: TierCountAggregateOutputType | null
    _avg: TierAvgAggregateOutputType | null
    _sum: TierSumAggregateOutputType | null
    _min: TierMinAggregateOutputType | null
    _max: TierMaxAggregateOutputType | null
  }

  export type TierAvgAggregateOutputType = {
    signupPrice: number | null
  }

  export type TierSumAggregateOutputType = {
    signupPrice: number | null
  }

  export type TierMinAggregateOutputType = {
    id: string | null
    name: string | null
    signupPrice: number | null
    description: string | null
  }

  export type TierMaxAggregateOutputType = {
    id: string | null
    name: string | null
    signupPrice: number | null
    description: string | null
  }

  export type TierCountAggregateOutputType = {
    id: number
    name: number
    signupPrice: number
    description: number
    _all: number
  }


  export type TierAvgAggregateInputType = {
    signupPrice?: true
  }

  export type TierSumAggregateInputType = {
    signupPrice?: true
  }

  export type TierMinAggregateInputType = {
    id?: true
    name?: true
    signupPrice?: true
    description?: true
  }

  export type TierMaxAggregateInputType = {
    id?: true
    name?: true
    signupPrice?: true
    description?: true
  }

  export type TierCountAggregateInputType = {
    id?: true
    name?: true
    signupPrice?: true
    description?: true
    _all?: true
  }

  export type TierAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tier to aggregate.
     */
    where?: TierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tiers to fetch.
     */
    orderBy?: TierOrderByWithRelationInput | TierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tiers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tiers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tiers
    **/
    _count?: true | TierCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TierAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TierSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TierMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TierMaxAggregateInputType
  }

  export type GetTierAggregateType<T extends TierAggregateArgs> = {
        [P in keyof T & keyof AggregateTier]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTier[P]>
      : GetScalarType<T[P], AggregateTier[P]>
  }




  export type TierGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TierWhereInput
    orderBy?: TierOrderByWithAggregationInput | TierOrderByWithAggregationInput[]
    by: TierScalarFieldEnum[] | TierScalarFieldEnum
    having?: TierScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TierCountAggregateInputType | true
    _avg?: TierAvgAggregateInputType
    _sum?: TierSumAggregateInputType
    _min?: TierMinAggregateInputType
    _max?: TierMaxAggregateInputType
  }

  export type TierGroupByOutputType = {
    id: string
    name: string
    signupPrice: number
    description: string | null
    _count: TierCountAggregateOutputType | null
    _avg: TierAvgAggregateOutputType | null
    _sum: TierSumAggregateOutputType | null
    _min: TierMinAggregateOutputType | null
    _max: TierMaxAggregateOutputType | null
  }

  type GetTierGroupByPayload<T extends TierGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TierGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TierGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TierGroupByOutputType[P]>
            : GetScalarType<T[P], TierGroupByOutputType[P]>
        }
      >
    >


  export type TierSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    signupPrice?: boolean
    description?: boolean
    users?: boolean | Tier$usersArgs<ExtArgs>
    _count?: boolean | TierCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tier"]>

  export type TierSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    signupPrice?: boolean
    description?: boolean
  }, ExtArgs["result"]["tier"]>

  export type TierSelectScalar = {
    id?: boolean
    name?: boolean
    signupPrice?: boolean
    description?: boolean
  }

  export type TierInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Tier$usersArgs<ExtArgs>
    _count?: boolean | TierCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TierIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TierPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tier"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      signupPrice: number
      description: string | null
    }, ExtArgs["result"]["tier"]>
    composites: {}
  }

  type TierGetPayload<S extends boolean | null | undefined | TierDefaultArgs> = $Result.GetResult<Prisma.$TierPayload, S>

  type TierCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TierFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TierCountAggregateInputType | true
    }

  export interface TierDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tier'], meta: { name: 'Tier' } }
    /**
     * Find zero or one Tier that matches the filter.
     * @param {TierFindUniqueArgs} args - Arguments to find a Tier
     * @example
     * // Get one Tier
     * const tier = await prisma.tier.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TierFindUniqueArgs>(args: SelectSubset<T, TierFindUniqueArgs<ExtArgs>>): Prisma__TierClient<$Result.GetResult<Prisma.$TierPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Tier that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TierFindUniqueOrThrowArgs} args - Arguments to find a Tier
     * @example
     * // Get one Tier
     * const tier = await prisma.tier.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TierFindUniqueOrThrowArgs>(args: SelectSubset<T, TierFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TierClient<$Result.GetResult<Prisma.$TierPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Tier that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TierFindFirstArgs} args - Arguments to find a Tier
     * @example
     * // Get one Tier
     * const tier = await prisma.tier.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TierFindFirstArgs>(args?: SelectSubset<T, TierFindFirstArgs<ExtArgs>>): Prisma__TierClient<$Result.GetResult<Prisma.$TierPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Tier that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TierFindFirstOrThrowArgs} args - Arguments to find a Tier
     * @example
     * // Get one Tier
     * const tier = await prisma.tier.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TierFindFirstOrThrowArgs>(args?: SelectSubset<T, TierFindFirstOrThrowArgs<ExtArgs>>): Prisma__TierClient<$Result.GetResult<Prisma.$TierPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Tiers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TierFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tiers
     * const tiers = await prisma.tier.findMany()
     * 
     * // Get first 10 Tiers
     * const tiers = await prisma.tier.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tierWithIdOnly = await prisma.tier.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TierFindManyArgs>(args?: SelectSubset<T, TierFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TierPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Tier.
     * @param {TierCreateArgs} args - Arguments to create a Tier.
     * @example
     * // Create one Tier
     * const Tier = await prisma.tier.create({
     *   data: {
     *     // ... data to create a Tier
     *   }
     * })
     * 
     */
    create<T extends TierCreateArgs>(args: SelectSubset<T, TierCreateArgs<ExtArgs>>): Prisma__TierClient<$Result.GetResult<Prisma.$TierPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Tiers.
     * @param {TierCreateManyArgs} args - Arguments to create many Tiers.
     * @example
     * // Create many Tiers
     * const tier = await prisma.tier.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TierCreateManyArgs>(args?: SelectSubset<T, TierCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tiers and returns the data saved in the database.
     * @param {TierCreateManyAndReturnArgs} args - Arguments to create many Tiers.
     * @example
     * // Create many Tiers
     * const tier = await prisma.tier.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tiers and only return the `id`
     * const tierWithIdOnly = await prisma.tier.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TierCreateManyAndReturnArgs>(args?: SelectSubset<T, TierCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TierPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Tier.
     * @param {TierDeleteArgs} args - Arguments to delete one Tier.
     * @example
     * // Delete one Tier
     * const Tier = await prisma.tier.delete({
     *   where: {
     *     // ... filter to delete one Tier
     *   }
     * })
     * 
     */
    delete<T extends TierDeleteArgs>(args: SelectSubset<T, TierDeleteArgs<ExtArgs>>): Prisma__TierClient<$Result.GetResult<Prisma.$TierPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Tier.
     * @param {TierUpdateArgs} args - Arguments to update one Tier.
     * @example
     * // Update one Tier
     * const tier = await prisma.tier.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TierUpdateArgs>(args: SelectSubset<T, TierUpdateArgs<ExtArgs>>): Prisma__TierClient<$Result.GetResult<Prisma.$TierPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Tiers.
     * @param {TierDeleteManyArgs} args - Arguments to filter Tiers to delete.
     * @example
     * // Delete a few Tiers
     * const { count } = await prisma.tier.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TierDeleteManyArgs>(args?: SelectSubset<T, TierDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tiers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TierUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tiers
     * const tier = await prisma.tier.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TierUpdateManyArgs>(args: SelectSubset<T, TierUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tier.
     * @param {TierUpsertArgs} args - Arguments to update or create a Tier.
     * @example
     * // Update or create a Tier
     * const tier = await prisma.tier.upsert({
     *   create: {
     *     // ... data to create a Tier
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tier we want to update
     *   }
     * })
     */
    upsert<T extends TierUpsertArgs>(args: SelectSubset<T, TierUpsertArgs<ExtArgs>>): Prisma__TierClient<$Result.GetResult<Prisma.$TierPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Tiers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TierCountArgs} args - Arguments to filter Tiers to count.
     * @example
     * // Count the number of Tiers
     * const count = await prisma.tier.count({
     *   where: {
     *     // ... the filter for the Tiers we want to count
     *   }
     * })
    **/
    count<T extends TierCountArgs>(
      args?: Subset<T, TierCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TierCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TierAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TierAggregateArgs>(args: Subset<T, TierAggregateArgs>): Prisma.PrismaPromise<GetTierAggregateType<T>>

    /**
     * Group by Tier.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TierGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TierGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TierGroupByArgs['orderBy'] }
        : { orderBy?: TierGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TierGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTierGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tier model
   */
  readonly fields: TierFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tier.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TierClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Tier$usersArgs<ExtArgs> = {}>(args?: Subset<T, Tier$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tier model
   */ 
  interface TierFieldRefs {
    readonly id: FieldRef<"Tier", 'String'>
    readonly name: FieldRef<"Tier", 'String'>
    readonly signupPrice: FieldRef<"Tier", 'Float'>
    readonly description: FieldRef<"Tier", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Tier findUnique
   */
  export type TierFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TierInclude<ExtArgs> | null
    /**
     * Filter, which Tier to fetch.
     */
    where: TierWhereUniqueInput
  }

  /**
   * Tier findUniqueOrThrow
   */
  export type TierFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TierInclude<ExtArgs> | null
    /**
     * Filter, which Tier to fetch.
     */
    where: TierWhereUniqueInput
  }

  /**
   * Tier findFirst
   */
  export type TierFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TierInclude<ExtArgs> | null
    /**
     * Filter, which Tier to fetch.
     */
    where?: TierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tiers to fetch.
     */
    orderBy?: TierOrderByWithRelationInput | TierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tiers.
     */
    cursor?: TierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tiers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tiers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tiers.
     */
    distinct?: TierScalarFieldEnum | TierScalarFieldEnum[]
  }

  /**
   * Tier findFirstOrThrow
   */
  export type TierFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TierInclude<ExtArgs> | null
    /**
     * Filter, which Tier to fetch.
     */
    where?: TierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tiers to fetch.
     */
    orderBy?: TierOrderByWithRelationInput | TierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tiers.
     */
    cursor?: TierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tiers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tiers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tiers.
     */
    distinct?: TierScalarFieldEnum | TierScalarFieldEnum[]
  }

  /**
   * Tier findMany
   */
  export type TierFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TierInclude<ExtArgs> | null
    /**
     * Filter, which Tiers to fetch.
     */
    where?: TierWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tiers to fetch.
     */
    orderBy?: TierOrderByWithRelationInput | TierOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tiers.
     */
    cursor?: TierWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tiers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tiers.
     */
    skip?: number
    distinct?: TierScalarFieldEnum | TierScalarFieldEnum[]
  }

  /**
   * Tier create
   */
  export type TierCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TierInclude<ExtArgs> | null
    /**
     * The data needed to create a Tier.
     */
    data: XOR<TierCreateInput, TierUncheckedCreateInput>
  }

  /**
   * Tier createMany
   */
  export type TierCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tiers.
     */
    data: TierCreateManyInput | TierCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tier createManyAndReturn
   */
  export type TierCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Tiers.
     */
    data: TierCreateManyInput | TierCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tier update
   */
  export type TierUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TierInclude<ExtArgs> | null
    /**
     * The data needed to update a Tier.
     */
    data: XOR<TierUpdateInput, TierUncheckedUpdateInput>
    /**
     * Choose, which Tier to update.
     */
    where: TierWhereUniqueInput
  }

  /**
   * Tier updateMany
   */
  export type TierUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tiers.
     */
    data: XOR<TierUpdateManyMutationInput, TierUncheckedUpdateManyInput>
    /**
     * Filter which Tiers to update
     */
    where?: TierWhereInput
  }

  /**
   * Tier upsert
   */
  export type TierUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TierInclude<ExtArgs> | null
    /**
     * The filter to search for the Tier to update in case it exists.
     */
    where: TierWhereUniqueInput
    /**
     * In case the Tier found by the `where` argument doesn't exist, create a new Tier with this data.
     */
    create: XOR<TierCreateInput, TierUncheckedCreateInput>
    /**
     * In case the Tier was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TierUpdateInput, TierUncheckedUpdateInput>
  }

  /**
   * Tier delete
   */
  export type TierDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TierInclude<ExtArgs> | null
    /**
     * Filter which Tier to delete.
     */
    where: TierWhereUniqueInput
  }

  /**
   * Tier deleteMany
   */
  export type TierDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tiers to delete
     */
    where?: TierWhereInput
  }

  /**
   * Tier.users
   */
  export type Tier$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Tier without action
   */
  export type TierDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TierInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    usageTokens: number | null
    xpPoints: number | null
  }

  export type UserSumAggregateOutputType = {
    usageTokens: number | null
    xpPoints: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    role: string | null
    district: string | null
    school: string | null
    schoolSite: string | null
    position: string | null
    organizationId: string | null
    stripeCustomerId: string | null
    subscriptionTier: string | null
    subscriptionStatus: string | null
    usageTokens: number | null
    xpPoints: number | null
    trialStartedAt: Date | null
    trialEndsAt: Date | null
    isTrialConverted: boolean | null
    tierId: string | null
    googleId: string | null
    avatarUrl: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
    lastLogin: Date | null
    subscriptionId: string | null
    lastPaymentAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    role: string | null
    district: string | null
    school: string | null
    schoolSite: string | null
    position: string | null
    organizationId: string | null
    stripeCustomerId: string | null
    subscriptionTier: string | null
    subscriptionStatus: string | null
    usageTokens: number | null
    xpPoints: number | null
    trialStartedAt: Date | null
    trialEndsAt: Date | null
    isTrialConverted: boolean | null
    tierId: string | null
    googleId: string | null
    avatarUrl: string | null
    passwordHash: string | null
    createdAt: Date | null
    updatedAt: Date | null
    lastLogin: Date | null
    subscriptionId: string | null
    lastPaymentAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    role: number
    district: number
    school: number
    schoolSite: number
    position: number
    organizationId: number
    stripeCustomerId: number
    subscriptionTier: number
    subscriptionStatus: number
    usageTokens: number
    xpPoints: number
    trialStartedAt: number
    trialEndsAt: number
    isTrialConverted: number
    tierId: number
    googleId: number
    avatarUrl: number
    passwordHash: number
    createdAt: number
    updatedAt: number
    lastLogin: number
    subscriptionId: number
    lastPaymentAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    usageTokens?: true
    xpPoints?: true
  }

  export type UserSumAggregateInputType = {
    usageTokens?: true
    xpPoints?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    district?: true
    school?: true
    schoolSite?: true
    position?: true
    organizationId?: true
    stripeCustomerId?: true
    subscriptionTier?: true
    subscriptionStatus?: true
    usageTokens?: true
    xpPoints?: true
    trialStartedAt?: true
    trialEndsAt?: true
    isTrialConverted?: true
    tierId?: true
    googleId?: true
    avatarUrl?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    lastLogin?: true
    subscriptionId?: true
    lastPaymentAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    district?: true
    school?: true
    schoolSite?: true
    position?: true
    organizationId?: true
    stripeCustomerId?: true
    subscriptionTier?: true
    subscriptionStatus?: true
    usageTokens?: true
    xpPoints?: true
    trialStartedAt?: true
    trialEndsAt?: true
    isTrialConverted?: true
    tierId?: true
    googleId?: true
    avatarUrl?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    lastLogin?: true
    subscriptionId?: true
    lastPaymentAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    role?: true
    district?: true
    school?: true
    schoolSite?: true
    position?: true
    organizationId?: true
    stripeCustomerId?: true
    subscriptionTier?: true
    subscriptionStatus?: true
    usageTokens?: true
    xpPoints?: true
    trialStartedAt?: true
    trialEndsAt?: true
    isTrialConverted?: true
    tierId?: true
    googleId?: true
    avatarUrl?: true
    passwordHash?: true
    createdAt?: true
    updatedAt?: true
    lastLogin?: true
    subscriptionId?: true
    lastPaymentAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    role: string
    district: string | null
    school: string | null
    schoolSite: string | null
    position: string | null
    organizationId: string | null
    stripeCustomerId: string | null
    subscriptionTier: string
    subscriptionStatus: string
    usageTokens: number
    xpPoints: number
    trialStartedAt: Date
    trialEndsAt: Date | null
    isTrialConverted: boolean
    tierId: string | null
    googleId: string | null
    avatarUrl: string | null
    passwordHash: string | null
    createdAt: Date
    updatedAt: Date
    lastLogin: Date | null
    subscriptionId: string | null
    lastPaymentAt: Date | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    district?: boolean
    school?: boolean
    schoolSite?: boolean
    position?: boolean
    organizationId?: boolean
    stripeCustomerId?: boolean
    subscriptionTier?: boolean
    subscriptionStatus?: boolean
    usageTokens?: boolean
    xpPoints?: boolean
    trialStartedAt?: boolean
    trialEndsAt?: boolean
    isTrialConverted?: boolean
    tierId?: boolean
    googleId?: boolean
    avatarUrl?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLogin?: boolean
    subscriptionId?: boolean
    lastPaymentAt?: boolean
    organization?: boolean | User$organizationArgs<ExtArgs>
    tier?: boolean | User$tierArgs<ExtArgs>
    generations?: boolean | User$generationsArgs<ExtArgs>
    observations?: boolean | User$observationsArgs<ExtArgs>
    evidenceFolders?: boolean | User$evidenceFoldersArgs<ExtArgs>
    avatarSessions?: boolean | User$avatarSessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    district?: boolean
    school?: boolean
    schoolSite?: boolean
    position?: boolean
    organizationId?: boolean
    stripeCustomerId?: boolean
    subscriptionTier?: boolean
    subscriptionStatus?: boolean
    usageTokens?: boolean
    xpPoints?: boolean
    trialStartedAt?: boolean
    trialEndsAt?: boolean
    isTrialConverted?: boolean
    tierId?: boolean
    googleId?: boolean
    avatarUrl?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLogin?: boolean
    subscriptionId?: boolean
    lastPaymentAt?: boolean
    organization?: boolean | User$organizationArgs<ExtArgs>
    tier?: boolean | User$tierArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    role?: boolean
    district?: boolean
    school?: boolean
    schoolSite?: boolean
    position?: boolean
    organizationId?: boolean
    stripeCustomerId?: boolean
    subscriptionTier?: boolean
    subscriptionStatus?: boolean
    usageTokens?: boolean
    xpPoints?: boolean
    trialStartedAt?: boolean
    trialEndsAt?: boolean
    isTrialConverted?: boolean
    tierId?: boolean
    googleId?: boolean
    avatarUrl?: boolean
    passwordHash?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLogin?: boolean
    subscriptionId?: boolean
    lastPaymentAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | User$organizationArgs<ExtArgs>
    tier?: boolean | User$tierArgs<ExtArgs>
    generations?: boolean | User$generationsArgs<ExtArgs>
    observations?: boolean | User$observationsArgs<ExtArgs>
    evidenceFolders?: boolean | User$evidenceFoldersArgs<ExtArgs>
    avatarSessions?: boolean | User$avatarSessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organization?: boolean | User$organizationArgs<ExtArgs>
    tier?: boolean | User$tierArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      organization: Prisma.$OrganizationPayload<ExtArgs> | null
      tier: Prisma.$TierPayload<ExtArgs> | null
      generations: Prisma.$GenerationPayload<ExtArgs>[]
      observations: Prisma.$ObservationPayload<ExtArgs>[]
      evidenceFolders: Prisma.$EvidenceFolderPayload<ExtArgs>[]
      avatarSessions: Prisma.$AvatarSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string | null
      role: string
      district: string | null
      school: string | null
      schoolSite: string | null
      position: string | null
      organizationId: string | null
      stripeCustomerId: string | null
      subscriptionTier: string
      subscriptionStatus: string
      usageTokens: number
      xpPoints: number
      trialStartedAt: Date
      trialEndsAt: Date | null
      isTrialConverted: boolean
      tierId: string | null
      googleId: string | null
      avatarUrl: string | null
      passwordHash: string | null
      createdAt: Date
      updatedAt: Date
      lastLogin: Date | null
      subscriptionId: string | null
      lastPaymentAt: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organization<T extends User$organizationArgs<ExtArgs> = {}>(args?: Subset<T, User$organizationArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    tier<T extends User$tierArgs<ExtArgs> = {}>(args?: Subset<T, User$tierArgs<ExtArgs>>): Prisma__TierClient<$Result.GetResult<Prisma.$TierPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    generations<T extends User$generationsArgs<ExtArgs> = {}>(args?: Subset<T, User$generationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GenerationPayload<ExtArgs>, T, "findMany"> | Null>
    observations<T extends User$observationsArgs<ExtArgs> = {}>(args?: Subset<T, User$observationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "findMany"> | Null>
    evidenceFolders<T extends User$evidenceFoldersArgs<ExtArgs> = {}>(args?: Subset<T, User$evidenceFoldersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvidenceFolderPayload<ExtArgs>, T, "findMany"> | Null>
    avatarSessions<T extends User$avatarSessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$avatarSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvatarSessionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly district: FieldRef<"User", 'String'>
    readonly school: FieldRef<"User", 'String'>
    readonly schoolSite: FieldRef<"User", 'String'>
    readonly position: FieldRef<"User", 'String'>
    readonly organizationId: FieldRef<"User", 'String'>
    readonly stripeCustomerId: FieldRef<"User", 'String'>
    readonly subscriptionTier: FieldRef<"User", 'String'>
    readonly subscriptionStatus: FieldRef<"User", 'String'>
    readonly usageTokens: FieldRef<"User", 'Int'>
    readonly xpPoints: FieldRef<"User", 'Int'>
    readonly trialStartedAt: FieldRef<"User", 'DateTime'>
    readonly trialEndsAt: FieldRef<"User", 'DateTime'>
    readonly isTrialConverted: FieldRef<"User", 'Boolean'>
    readonly tierId: FieldRef<"User", 'String'>
    readonly googleId: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly lastLogin: FieldRef<"User", 'DateTime'>
    readonly subscriptionId: FieldRef<"User", 'String'>
    readonly lastPaymentAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.organization
   */
  export type User$organizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    where?: OrganizationWhereInput
  }

  /**
   * User.tier
   */
  export type User$tierArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tier
     */
    select?: TierSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TierInclude<ExtArgs> | null
    where?: TierWhereInput
  }

  /**
   * User.generations
   */
  export type User$generationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Generation
     */
    select?: GenerationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenerationInclude<ExtArgs> | null
    where?: GenerationWhereInput
    orderBy?: GenerationOrderByWithRelationInput | GenerationOrderByWithRelationInput[]
    cursor?: GenerationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GenerationScalarFieldEnum | GenerationScalarFieldEnum[]
  }

  /**
   * User.observations
   */
  export type User$observationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
    where?: ObservationWhereInput
    orderBy?: ObservationOrderByWithRelationInput | ObservationOrderByWithRelationInput[]
    cursor?: ObservationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ObservationScalarFieldEnum | ObservationScalarFieldEnum[]
  }

  /**
   * User.evidenceFolders
   */
  export type User$evidenceFoldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvidenceFolder
     */
    select?: EvidenceFolderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceFolderInclude<ExtArgs> | null
    where?: EvidenceFolderWhereInput
    orderBy?: EvidenceFolderOrderByWithRelationInput | EvidenceFolderOrderByWithRelationInput[]
    cursor?: EvidenceFolderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EvidenceFolderScalarFieldEnum | EvidenceFolderScalarFieldEnum[]
  }

  /**
   * User.avatarSessions
   */
  export type User$avatarSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarSession
     */
    select?: AvatarSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarSessionInclude<ExtArgs> | null
    where?: AvatarSessionWhereInput
    orderBy?: AvatarSessionOrderByWithRelationInput | AvatarSessionOrderByWithRelationInput[]
    cursor?: AvatarSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AvatarSessionScalarFieldEnum | AvatarSessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Organization
   */

  export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null
    _avg: OrganizationAvgAggregateOutputType | null
    _sum: OrganizationSumAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  export type OrganizationAvgAggregateOutputType = {
    usageTokens: number | null
  }

  export type OrganizationSumAggregateOutputType = {
    usageTokens: number | null
  }

  export type OrganizationMinAggregateOutputType = {
    id: string | null
    name: string | null
    tier: string | null
    trialStartedAt: Date | null
    trialStartsAt: Date | null
    trialEndsAt: Date | null
    isTrialConverted: boolean | null
    usageTokens: number | null
    address: string | null
    contactEmail: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    tier: string | null
    trialStartedAt: Date | null
    trialStartsAt: Date | null
    trialEndsAt: Date | null
    isTrialConverted: boolean | null
    usageTokens: number | null
    address: string | null
    contactEmail: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrganizationCountAggregateOutputType = {
    id: number
    name: number
    tier: number
    trialStartedAt: number
    trialStartsAt: number
    trialEndsAt: number
    isTrialConverted: number
    usageTokens: number
    address: number
    contactEmail: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrganizationAvgAggregateInputType = {
    usageTokens?: true
  }

  export type OrganizationSumAggregateInputType = {
    usageTokens?: true
  }

  export type OrganizationMinAggregateInputType = {
    id?: true
    name?: true
    tier?: true
    trialStartedAt?: true
    trialStartsAt?: true
    trialEndsAt?: true
    isTrialConverted?: true
    usageTokens?: true
    address?: true
    contactEmail?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationMaxAggregateInputType = {
    id?: true
    name?: true
    tier?: true
    trialStartedAt?: true
    trialStartsAt?: true
    trialEndsAt?: true
    isTrialConverted?: true
    usageTokens?: true
    address?: true
    contactEmail?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrganizationCountAggregateInputType = {
    id?: true
    name?: true
    tier?: true
    trialStartedAt?: true
    trialStartsAt?: true
    trialEndsAt?: true
    isTrialConverted?: true
    usageTokens?: true
    address?: true
    contactEmail?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrganizationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organization to aggregate.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Organizations
    **/
    _count?: true | OrganizationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrganizationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrganizationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrganizationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrganizationMaxAggregateInputType
  }

  export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
        [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrganization[P]>
      : GetScalarType<T[P], AggregateOrganization[P]>
  }




  export type OrganizationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrganizationWhereInput
    orderBy?: OrganizationOrderByWithAggregationInput | OrganizationOrderByWithAggregationInput[]
    by: OrganizationScalarFieldEnum[] | OrganizationScalarFieldEnum
    having?: OrganizationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrganizationCountAggregateInputType | true
    _avg?: OrganizationAvgAggregateInputType
    _sum?: OrganizationSumAggregateInputType
    _min?: OrganizationMinAggregateInputType
    _max?: OrganizationMaxAggregateInputType
  }

  export type OrganizationGroupByOutputType = {
    id: string
    name: string
    tier: string
    trialStartedAt: Date
    trialStartsAt: Date
    trialEndsAt: Date
    isTrialConverted: boolean
    usageTokens: number
    address: string | null
    contactEmail: string | null
    createdAt: Date
    updatedAt: Date
    _count: OrganizationCountAggregateOutputType | null
    _avg: OrganizationAvgAggregateOutputType | null
    _sum: OrganizationSumAggregateOutputType | null
    _min: OrganizationMinAggregateOutputType | null
    _max: OrganizationMaxAggregateOutputType | null
  }

  type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrganizationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
            : GetScalarType<T[P], OrganizationGroupByOutputType[P]>
        }
      >
    >


  export type OrganizationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tier?: boolean
    trialStartedAt?: boolean
    trialStartsAt?: boolean
    trialEndsAt?: boolean
    isTrialConverted?: boolean
    usageTokens?: boolean
    address?: boolean
    contactEmail?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | Organization$usersArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tier?: boolean
    trialStartedAt?: boolean
    trialStartsAt?: boolean
    trialEndsAt?: boolean
    isTrialConverted?: boolean
    usageTokens?: boolean
    address?: boolean
    contactEmail?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["organization"]>

  export type OrganizationSelectScalar = {
    id?: boolean
    name?: boolean
    tier?: boolean
    trialStartedAt?: boolean
    trialStartsAt?: boolean
    trialEndsAt?: boolean
    isTrialConverted?: boolean
    usageTokens?: boolean
    address?: boolean
    contactEmail?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrganizationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | Organization$usersArgs<ExtArgs>
    _count?: boolean | OrganizationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OrganizationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $OrganizationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Organization"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      tier: string
      trialStartedAt: Date
      trialStartsAt: Date
      trialEndsAt: Date
      isTrialConverted: boolean
      usageTokens: number
      address: string | null
      contactEmail: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["organization"]>
    composites: {}
  }

  type OrganizationGetPayload<S extends boolean | null | undefined | OrganizationDefaultArgs> = $Result.GetResult<Prisma.$OrganizationPayload, S>

  type OrganizationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OrganizationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OrganizationCountAggregateInputType | true
    }

  export interface OrganizationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Organization'], meta: { name: 'Organization' } }
    /**
     * Find zero or one Organization that matches the filter.
     * @param {OrganizationFindUniqueArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrganizationFindUniqueArgs>(args: SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Organization that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OrganizationFindUniqueOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs>(args: SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Organization that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrganizationFindFirstArgs>(args?: SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Organization that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindFirstOrThrowArgs} args - Arguments to find a Organization
     * @example
     * // Get one Organization
     * const organization = await prisma.organization.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs>(args?: SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Organizations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Organizations
     * const organizations = await prisma.organization.findMany()
     * 
     * // Get first 10 Organizations
     * const organizations = await prisma.organization.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const organizationWithIdOnly = await prisma.organization.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrganizationFindManyArgs>(args?: SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Organization.
     * @param {OrganizationCreateArgs} args - Arguments to create a Organization.
     * @example
     * // Create one Organization
     * const Organization = await prisma.organization.create({
     *   data: {
     *     // ... data to create a Organization
     *   }
     * })
     * 
     */
    create<T extends OrganizationCreateArgs>(args: SelectSubset<T, OrganizationCreateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Organizations.
     * @param {OrganizationCreateManyArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrganizationCreateManyArgs>(args?: SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Organizations and returns the data saved in the database.
     * @param {OrganizationCreateManyAndReturnArgs} args - Arguments to create many Organizations.
     * @example
     * // Create many Organizations
     * const organization = await prisma.organization.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Organizations and only return the `id`
     * const organizationWithIdOnly = await prisma.organization.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrganizationCreateManyAndReturnArgs>(args?: SelectSubset<T, OrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Organization.
     * @param {OrganizationDeleteArgs} args - Arguments to delete one Organization.
     * @example
     * // Delete one Organization
     * const Organization = await prisma.organization.delete({
     *   where: {
     *     // ... filter to delete one Organization
     *   }
     * })
     * 
     */
    delete<T extends OrganizationDeleteArgs>(args: SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Organization.
     * @param {OrganizationUpdateArgs} args - Arguments to update one Organization.
     * @example
     * // Update one Organization
     * const organization = await prisma.organization.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrganizationUpdateArgs>(args: SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Organizations.
     * @param {OrganizationDeleteManyArgs} args - Arguments to filter Organizations to delete.
     * @example
     * // Delete a few Organizations
     * const { count } = await prisma.organization.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrganizationDeleteManyArgs>(args?: SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Organizations
     * const organization = await prisma.organization.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrganizationUpdateManyArgs>(args: SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Organization.
     * @param {OrganizationUpsertArgs} args - Arguments to update or create a Organization.
     * @example
     * // Update or create a Organization
     * const organization = await prisma.organization.upsert({
     *   create: {
     *     // ... data to create a Organization
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Organization we want to update
     *   }
     * })
     */
    upsert<T extends OrganizationUpsertArgs>(args: SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>): Prisma__OrganizationClient<$Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Organizations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationCountArgs} args - Arguments to filter Organizations to count.
     * @example
     * // Count the number of Organizations
     * const count = await prisma.organization.count({
     *   where: {
     *     // ... the filter for the Organizations we want to count
     *   }
     * })
    **/
    count<T extends OrganizationCountArgs>(
      args?: Subset<T, OrganizationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrganizationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrganizationAggregateArgs>(args: Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>

    /**
     * Group by Organization.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrganizationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrganizationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrganizationGroupByArgs['orderBy'] }
        : { orderBy?: OrganizationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Organization model
   */
  readonly fields: OrganizationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Organization.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrganizationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends Organization$usersArgs<ExtArgs> = {}>(args?: Subset<T, Organization$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Organization model
   */ 
  interface OrganizationFieldRefs {
    readonly id: FieldRef<"Organization", 'String'>
    readonly name: FieldRef<"Organization", 'String'>
    readonly tier: FieldRef<"Organization", 'String'>
    readonly trialStartedAt: FieldRef<"Organization", 'DateTime'>
    readonly trialStartsAt: FieldRef<"Organization", 'DateTime'>
    readonly trialEndsAt: FieldRef<"Organization", 'DateTime'>
    readonly isTrialConverted: FieldRef<"Organization", 'Boolean'>
    readonly usageTokens: FieldRef<"Organization", 'Int'>
    readonly address: FieldRef<"Organization", 'String'>
    readonly contactEmail: FieldRef<"Organization", 'String'>
    readonly createdAt: FieldRef<"Organization", 'DateTime'>
    readonly updatedAt: FieldRef<"Organization", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Organization findUnique
   */
  export type OrganizationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findUniqueOrThrow
   */
  export type OrganizationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization findFirst
   */
  export type OrganizationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findFirstOrThrow
   */
  export type OrganizationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organization to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Organizations.
     */
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization findMany
   */
  export type OrganizationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter, which Organizations to fetch.
     */
    where?: OrganizationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Organizations to fetch.
     */
    orderBy?: OrganizationOrderByWithRelationInput | OrganizationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Organizations.
     */
    cursor?: OrganizationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Organizations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Organizations.
     */
    skip?: number
    distinct?: OrganizationScalarFieldEnum | OrganizationScalarFieldEnum[]
  }

  /**
   * Organization create
   */
  export type OrganizationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to create a Organization.
     */
    data: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
  }

  /**
   * Organization createMany
   */
  export type OrganizationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization createManyAndReturn
   */
  export type OrganizationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Organizations.
     */
    data: OrganizationCreateManyInput | OrganizationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Organization update
   */
  export type OrganizationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The data needed to update a Organization.
     */
    data: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
    /**
     * Choose, which Organization to update.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization updateMany
   */
  export type OrganizationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Organizations.
     */
    data: XOR<OrganizationUpdateManyMutationInput, OrganizationUncheckedUpdateManyInput>
    /**
     * Filter which Organizations to update
     */
    where?: OrganizationWhereInput
  }

  /**
   * Organization upsert
   */
  export type OrganizationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * The filter to search for the Organization to update in case it exists.
     */
    where: OrganizationWhereUniqueInput
    /**
     * In case the Organization found by the `where` argument doesn't exist, create a new Organization with this data.
     */
    create: XOR<OrganizationCreateInput, OrganizationUncheckedCreateInput>
    /**
     * In case the Organization was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrganizationUpdateInput, OrganizationUncheckedUpdateInput>
  }

  /**
   * Organization delete
   */
  export type OrganizationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
    /**
     * Filter which Organization to delete.
     */
    where: OrganizationWhereUniqueInput
  }

  /**
   * Organization deleteMany
   */
  export type OrganizationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Organizations to delete
     */
    where?: OrganizationWhereInput
  }

  /**
   * Organization.users
   */
  export type Organization$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Organization without action
   */
  export type OrganizationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Organization
     */
    select?: OrganizationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrganizationInclude<ExtArgs> | null
  }


  /**
   * Model AvatarSession
   */

  export type AggregateAvatarSession = {
    _count: AvatarSessionCountAggregateOutputType | null
    _avg: AvatarSessionAvgAggregateOutputType | null
    _sum: AvatarSessionSumAggregateOutputType | null
    _min: AvatarSessionMinAggregateOutputType | null
    _max: AvatarSessionMaxAggregateOutputType | null
  }

  export type AvatarSessionAvgAggregateOutputType = {
    duration: number | null
    latencyAvg: number | null
  }

  export type AvatarSessionSumAggregateOutputType = {
    duration: number | null
    latencyAvg: number | null
  }

  export type AvatarSessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    avatarName: string | null
    avatarRole: string | null
    engine: string | null
    startedAt: Date | null
    endedAt: Date | null
    duration: number | null
    latencyAvg: number | null
    userSentiment: string | null
    gcpSessionId: string | null
    vertexAiModel: string | null
    cloudRunEndpoint: string | null
  }

  export type AvatarSessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    avatarName: string | null
    avatarRole: string | null
    engine: string | null
    startedAt: Date | null
    endedAt: Date | null
    duration: number | null
    latencyAvg: number | null
    userSentiment: string | null
    gcpSessionId: string | null
    vertexAiModel: string | null
    cloudRunEndpoint: string | null
  }

  export type AvatarSessionCountAggregateOutputType = {
    id: number
    userId: number
    avatarName: number
    avatarRole: number
    engine: number
    startedAt: number
    endedAt: number
    duration: number
    latencyAvg: number
    conversationLog: number
    userSentiment: number
    gcpSessionId: number
    vertexAiModel: number
    cloudRunEndpoint: number
    thoughtSignatures: number
    _all: number
  }


  export type AvatarSessionAvgAggregateInputType = {
    duration?: true
    latencyAvg?: true
  }

  export type AvatarSessionSumAggregateInputType = {
    duration?: true
    latencyAvg?: true
  }

  export type AvatarSessionMinAggregateInputType = {
    id?: true
    userId?: true
    avatarName?: true
    avatarRole?: true
    engine?: true
    startedAt?: true
    endedAt?: true
    duration?: true
    latencyAvg?: true
    userSentiment?: true
    gcpSessionId?: true
    vertexAiModel?: true
    cloudRunEndpoint?: true
  }

  export type AvatarSessionMaxAggregateInputType = {
    id?: true
    userId?: true
    avatarName?: true
    avatarRole?: true
    engine?: true
    startedAt?: true
    endedAt?: true
    duration?: true
    latencyAvg?: true
    userSentiment?: true
    gcpSessionId?: true
    vertexAiModel?: true
    cloudRunEndpoint?: true
  }

  export type AvatarSessionCountAggregateInputType = {
    id?: true
    userId?: true
    avatarName?: true
    avatarRole?: true
    engine?: true
    startedAt?: true
    endedAt?: true
    duration?: true
    latencyAvg?: true
    conversationLog?: true
    userSentiment?: true
    gcpSessionId?: true
    vertexAiModel?: true
    cloudRunEndpoint?: true
    thoughtSignatures?: true
    _all?: true
  }

  export type AvatarSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvatarSession to aggregate.
     */
    where?: AvatarSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvatarSessions to fetch.
     */
    orderBy?: AvatarSessionOrderByWithRelationInput | AvatarSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AvatarSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvatarSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvatarSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AvatarSessions
    **/
    _count?: true | AvatarSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AvatarSessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AvatarSessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AvatarSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AvatarSessionMaxAggregateInputType
  }

  export type GetAvatarSessionAggregateType<T extends AvatarSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateAvatarSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAvatarSession[P]>
      : GetScalarType<T[P], AggregateAvatarSession[P]>
  }




  export type AvatarSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AvatarSessionWhereInput
    orderBy?: AvatarSessionOrderByWithAggregationInput | AvatarSessionOrderByWithAggregationInput[]
    by: AvatarSessionScalarFieldEnum[] | AvatarSessionScalarFieldEnum
    having?: AvatarSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AvatarSessionCountAggregateInputType | true
    _avg?: AvatarSessionAvgAggregateInputType
    _sum?: AvatarSessionSumAggregateInputType
    _min?: AvatarSessionMinAggregateInputType
    _max?: AvatarSessionMaxAggregateInputType
  }

  export type AvatarSessionGroupByOutputType = {
    id: string
    userId: string
    avatarName: string
    avatarRole: string
    engine: string
    startedAt: Date
    endedAt: Date | null
    duration: number | null
    latencyAvg: number | null
    conversationLog: JsonValue
    userSentiment: string | null
    gcpSessionId: string | null
    vertexAiModel: string
    cloudRunEndpoint: string | null
    thoughtSignatures: JsonValue | null
    _count: AvatarSessionCountAggregateOutputType | null
    _avg: AvatarSessionAvgAggregateOutputType | null
    _sum: AvatarSessionSumAggregateOutputType | null
    _min: AvatarSessionMinAggregateOutputType | null
    _max: AvatarSessionMaxAggregateOutputType | null
  }

  type GetAvatarSessionGroupByPayload<T extends AvatarSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AvatarSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AvatarSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AvatarSessionGroupByOutputType[P]>
            : GetScalarType<T[P], AvatarSessionGroupByOutputType[P]>
        }
      >
    >


  export type AvatarSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    avatarName?: boolean
    avatarRole?: boolean
    engine?: boolean
    startedAt?: boolean
    endedAt?: boolean
    duration?: boolean
    latencyAvg?: boolean
    conversationLog?: boolean
    userSentiment?: boolean
    gcpSessionId?: boolean
    vertexAiModel?: boolean
    cloudRunEndpoint?: boolean
    thoughtSignatures?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    observations?: boolean | AvatarSession$observationsArgs<ExtArgs>
    _count?: boolean | AvatarSessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["avatarSession"]>

  export type AvatarSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    avatarName?: boolean
    avatarRole?: boolean
    engine?: boolean
    startedAt?: boolean
    endedAt?: boolean
    duration?: boolean
    latencyAvg?: boolean
    conversationLog?: boolean
    userSentiment?: boolean
    gcpSessionId?: boolean
    vertexAiModel?: boolean
    cloudRunEndpoint?: boolean
    thoughtSignatures?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["avatarSession"]>

  export type AvatarSessionSelectScalar = {
    id?: boolean
    userId?: boolean
    avatarName?: boolean
    avatarRole?: boolean
    engine?: boolean
    startedAt?: boolean
    endedAt?: boolean
    duration?: boolean
    latencyAvg?: boolean
    conversationLog?: boolean
    userSentiment?: boolean
    gcpSessionId?: boolean
    vertexAiModel?: boolean
    cloudRunEndpoint?: boolean
    thoughtSignatures?: boolean
  }

  export type AvatarSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    observations?: boolean | AvatarSession$observationsArgs<ExtArgs>
    _count?: boolean | AvatarSessionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AvatarSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AvatarSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AvatarSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      observations: Prisma.$ObservationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      avatarName: string
      avatarRole: string
      engine: string
      startedAt: Date
      endedAt: Date | null
      duration: number | null
      latencyAvg: number | null
      conversationLog: Prisma.JsonValue
      userSentiment: string | null
      gcpSessionId: string | null
      vertexAiModel: string
      cloudRunEndpoint: string | null
      thoughtSignatures: Prisma.JsonValue | null
    }, ExtArgs["result"]["avatarSession"]>
    composites: {}
  }

  type AvatarSessionGetPayload<S extends boolean | null | undefined | AvatarSessionDefaultArgs> = $Result.GetResult<Prisma.$AvatarSessionPayload, S>

  type AvatarSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AvatarSessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AvatarSessionCountAggregateInputType | true
    }

  export interface AvatarSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AvatarSession'], meta: { name: 'AvatarSession' } }
    /**
     * Find zero or one AvatarSession that matches the filter.
     * @param {AvatarSessionFindUniqueArgs} args - Arguments to find a AvatarSession
     * @example
     * // Get one AvatarSession
     * const avatarSession = await prisma.avatarSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AvatarSessionFindUniqueArgs>(args: SelectSubset<T, AvatarSessionFindUniqueArgs<ExtArgs>>): Prisma__AvatarSessionClient<$Result.GetResult<Prisma.$AvatarSessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AvatarSession that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AvatarSessionFindUniqueOrThrowArgs} args - Arguments to find a AvatarSession
     * @example
     * // Get one AvatarSession
     * const avatarSession = await prisma.avatarSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AvatarSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, AvatarSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AvatarSessionClient<$Result.GetResult<Prisma.$AvatarSessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AvatarSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarSessionFindFirstArgs} args - Arguments to find a AvatarSession
     * @example
     * // Get one AvatarSession
     * const avatarSession = await prisma.avatarSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AvatarSessionFindFirstArgs>(args?: SelectSubset<T, AvatarSessionFindFirstArgs<ExtArgs>>): Prisma__AvatarSessionClient<$Result.GetResult<Prisma.$AvatarSessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AvatarSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarSessionFindFirstOrThrowArgs} args - Arguments to find a AvatarSession
     * @example
     * // Get one AvatarSession
     * const avatarSession = await prisma.avatarSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AvatarSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, AvatarSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AvatarSessionClient<$Result.GetResult<Prisma.$AvatarSessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AvatarSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AvatarSessions
     * const avatarSessions = await prisma.avatarSession.findMany()
     * 
     * // Get first 10 AvatarSessions
     * const avatarSessions = await prisma.avatarSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const avatarSessionWithIdOnly = await prisma.avatarSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AvatarSessionFindManyArgs>(args?: SelectSubset<T, AvatarSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvatarSessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AvatarSession.
     * @param {AvatarSessionCreateArgs} args - Arguments to create a AvatarSession.
     * @example
     * // Create one AvatarSession
     * const AvatarSession = await prisma.avatarSession.create({
     *   data: {
     *     // ... data to create a AvatarSession
     *   }
     * })
     * 
     */
    create<T extends AvatarSessionCreateArgs>(args: SelectSubset<T, AvatarSessionCreateArgs<ExtArgs>>): Prisma__AvatarSessionClient<$Result.GetResult<Prisma.$AvatarSessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AvatarSessions.
     * @param {AvatarSessionCreateManyArgs} args - Arguments to create many AvatarSessions.
     * @example
     * // Create many AvatarSessions
     * const avatarSession = await prisma.avatarSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AvatarSessionCreateManyArgs>(args?: SelectSubset<T, AvatarSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AvatarSessions and returns the data saved in the database.
     * @param {AvatarSessionCreateManyAndReturnArgs} args - Arguments to create many AvatarSessions.
     * @example
     * // Create many AvatarSessions
     * const avatarSession = await prisma.avatarSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AvatarSessions and only return the `id`
     * const avatarSessionWithIdOnly = await prisma.avatarSession.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AvatarSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, AvatarSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AvatarSessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AvatarSession.
     * @param {AvatarSessionDeleteArgs} args - Arguments to delete one AvatarSession.
     * @example
     * // Delete one AvatarSession
     * const AvatarSession = await prisma.avatarSession.delete({
     *   where: {
     *     // ... filter to delete one AvatarSession
     *   }
     * })
     * 
     */
    delete<T extends AvatarSessionDeleteArgs>(args: SelectSubset<T, AvatarSessionDeleteArgs<ExtArgs>>): Prisma__AvatarSessionClient<$Result.GetResult<Prisma.$AvatarSessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AvatarSession.
     * @param {AvatarSessionUpdateArgs} args - Arguments to update one AvatarSession.
     * @example
     * // Update one AvatarSession
     * const avatarSession = await prisma.avatarSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AvatarSessionUpdateArgs>(args: SelectSubset<T, AvatarSessionUpdateArgs<ExtArgs>>): Prisma__AvatarSessionClient<$Result.GetResult<Prisma.$AvatarSessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AvatarSessions.
     * @param {AvatarSessionDeleteManyArgs} args - Arguments to filter AvatarSessions to delete.
     * @example
     * // Delete a few AvatarSessions
     * const { count } = await prisma.avatarSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AvatarSessionDeleteManyArgs>(args?: SelectSubset<T, AvatarSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AvatarSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AvatarSessions
     * const avatarSession = await prisma.avatarSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AvatarSessionUpdateManyArgs>(args: SelectSubset<T, AvatarSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AvatarSession.
     * @param {AvatarSessionUpsertArgs} args - Arguments to update or create a AvatarSession.
     * @example
     * // Update or create a AvatarSession
     * const avatarSession = await prisma.avatarSession.upsert({
     *   create: {
     *     // ... data to create a AvatarSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AvatarSession we want to update
     *   }
     * })
     */
    upsert<T extends AvatarSessionUpsertArgs>(args: SelectSubset<T, AvatarSessionUpsertArgs<ExtArgs>>): Prisma__AvatarSessionClient<$Result.GetResult<Prisma.$AvatarSessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AvatarSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarSessionCountArgs} args - Arguments to filter AvatarSessions to count.
     * @example
     * // Count the number of AvatarSessions
     * const count = await prisma.avatarSession.count({
     *   where: {
     *     // ... the filter for the AvatarSessions we want to count
     *   }
     * })
    **/
    count<T extends AvatarSessionCountArgs>(
      args?: Subset<T, AvatarSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AvatarSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AvatarSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AvatarSessionAggregateArgs>(args: Subset<T, AvatarSessionAggregateArgs>): Prisma.PrismaPromise<GetAvatarSessionAggregateType<T>>

    /**
     * Group by AvatarSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AvatarSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AvatarSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AvatarSessionGroupByArgs['orderBy'] }
        : { orderBy?: AvatarSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AvatarSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAvatarSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AvatarSession model
   */
  readonly fields: AvatarSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AvatarSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AvatarSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    observations<T extends AvatarSession$observationsArgs<ExtArgs> = {}>(args?: Subset<T, AvatarSession$observationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AvatarSession model
   */ 
  interface AvatarSessionFieldRefs {
    readonly id: FieldRef<"AvatarSession", 'String'>
    readonly userId: FieldRef<"AvatarSession", 'String'>
    readonly avatarName: FieldRef<"AvatarSession", 'String'>
    readonly avatarRole: FieldRef<"AvatarSession", 'String'>
    readonly engine: FieldRef<"AvatarSession", 'String'>
    readonly startedAt: FieldRef<"AvatarSession", 'DateTime'>
    readonly endedAt: FieldRef<"AvatarSession", 'DateTime'>
    readonly duration: FieldRef<"AvatarSession", 'Int'>
    readonly latencyAvg: FieldRef<"AvatarSession", 'Float'>
    readonly conversationLog: FieldRef<"AvatarSession", 'Json'>
    readonly userSentiment: FieldRef<"AvatarSession", 'String'>
    readonly gcpSessionId: FieldRef<"AvatarSession", 'String'>
    readonly vertexAiModel: FieldRef<"AvatarSession", 'String'>
    readonly cloudRunEndpoint: FieldRef<"AvatarSession", 'String'>
    readonly thoughtSignatures: FieldRef<"AvatarSession", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * AvatarSession findUnique
   */
  export type AvatarSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarSession
     */
    select?: AvatarSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarSessionInclude<ExtArgs> | null
    /**
     * Filter, which AvatarSession to fetch.
     */
    where: AvatarSessionWhereUniqueInput
  }

  /**
   * AvatarSession findUniqueOrThrow
   */
  export type AvatarSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarSession
     */
    select?: AvatarSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarSessionInclude<ExtArgs> | null
    /**
     * Filter, which AvatarSession to fetch.
     */
    where: AvatarSessionWhereUniqueInput
  }

  /**
   * AvatarSession findFirst
   */
  export type AvatarSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarSession
     */
    select?: AvatarSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarSessionInclude<ExtArgs> | null
    /**
     * Filter, which AvatarSession to fetch.
     */
    where?: AvatarSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvatarSessions to fetch.
     */
    orderBy?: AvatarSessionOrderByWithRelationInput | AvatarSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvatarSessions.
     */
    cursor?: AvatarSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvatarSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvatarSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvatarSessions.
     */
    distinct?: AvatarSessionScalarFieldEnum | AvatarSessionScalarFieldEnum[]
  }

  /**
   * AvatarSession findFirstOrThrow
   */
  export type AvatarSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarSession
     */
    select?: AvatarSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarSessionInclude<ExtArgs> | null
    /**
     * Filter, which AvatarSession to fetch.
     */
    where?: AvatarSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvatarSessions to fetch.
     */
    orderBy?: AvatarSessionOrderByWithRelationInput | AvatarSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AvatarSessions.
     */
    cursor?: AvatarSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvatarSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvatarSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AvatarSessions.
     */
    distinct?: AvatarSessionScalarFieldEnum | AvatarSessionScalarFieldEnum[]
  }

  /**
   * AvatarSession findMany
   */
  export type AvatarSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarSession
     */
    select?: AvatarSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarSessionInclude<ExtArgs> | null
    /**
     * Filter, which AvatarSessions to fetch.
     */
    where?: AvatarSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AvatarSessions to fetch.
     */
    orderBy?: AvatarSessionOrderByWithRelationInput | AvatarSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AvatarSessions.
     */
    cursor?: AvatarSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AvatarSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AvatarSessions.
     */
    skip?: number
    distinct?: AvatarSessionScalarFieldEnum | AvatarSessionScalarFieldEnum[]
  }

  /**
   * AvatarSession create
   */
  export type AvatarSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarSession
     */
    select?: AvatarSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a AvatarSession.
     */
    data: XOR<AvatarSessionCreateInput, AvatarSessionUncheckedCreateInput>
  }

  /**
   * AvatarSession createMany
   */
  export type AvatarSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AvatarSessions.
     */
    data: AvatarSessionCreateManyInput | AvatarSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AvatarSession createManyAndReturn
   */
  export type AvatarSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarSession
     */
    select?: AvatarSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AvatarSessions.
     */
    data: AvatarSessionCreateManyInput | AvatarSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AvatarSession update
   */
  export type AvatarSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarSession
     */
    select?: AvatarSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a AvatarSession.
     */
    data: XOR<AvatarSessionUpdateInput, AvatarSessionUncheckedUpdateInput>
    /**
     * Choose, which AvatarSession to update.
     */
    where: AvatarSessionWhereUniqueInput
  }

  /**
   * AvatarSession updateMany
   */
  export type AvatarSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AvatarSessions.
     */
    data: XOR<AvatarSessionUpdateManyMutationInput, AvatarSessionUncheckedUpdateManyInput>
    /**
     * Filter which AvatarSessions to update
     */
    where?: AvatarSessionWhereInput
  }

  /**
   * AvatarSession upsert
   */
  export type AvatarSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarSession
     */
    select?: AvatarSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the AvatarSession to update in case it exists.
     */
    where: AvatarSessionWhereUniqueInput
    /**
     * In case the AvatarSession found by the `where` argument doesn't exist, create a new AvatarSession with this data.
     */
    create: XOR<AvatarSessionCreateInput, AvatarSessionUncheckedCreateInput>
    /**
     * In case the AvatarSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AvatarSessionUpdateInput, AvatarSessionUncheckedUpdateInput>
  }

  /**
   * AvatarSession delete
   */
  export type AvatarSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarSession
     */
    select?: AvatarSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarSessionInclude<ExtArgs> | null
    /**
     * Filter which AvatarSession to delete.
     */
    where: AvatarSessionWhereUniqueInput
  }

  /**
   * AvatarSession deleteMany
   */
  export type AvatarSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AvatarSessions to delete
     */
    where?: AvatarSessionWhereInput
  }

  /**
   * AvatarSession.observations
   */
  export type AvatarSession$observationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
    where?: ObservationWhereInput
    orderBy?: ObservationOrderByWithRelationInput | ObservationOrderByWithRelationInput[]
    cursor?: ObservationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ObservationScalarFieldEnum | ObservationScalarFieldEnum[]
  }

  /**
   * AvatarSession without action
   */
  export type AvatarSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarSession
     */
    select?: AvatarSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarSessionInclude<ExtArgs> | null
  }


  /**
   * Model EvidenceFolder
   */

  export type AggregateEvidenceFolder = {
    _count: EvidenceFolderCountAggregateOutputType | null
    _avg: EvidenceFolderAvgAggregateOutputType | null
    _sum: EvidenceFolderSumAggregateOutputType | null
    _min: EvidenceFolderMinAggregateOutputType | null
    _max: EvidenceFolderMaxAggregateOutputType | null
  }

  export type EvidenceFolderAvgAggregateOutputType = {
    complianceScore: number | null
  }

  export type EvidenceFolderSumAggregateOutputType = {
    complianceScore: number | null
  }

  export type EvidenceFolderMinAggregateOutputType = {
    id: string | null
    userId: string | null
    studentId: string | null
    gradeLevel: string | null
    specialEdStatus: string | null
    title: string | null
    category: string | null
    createdAt: Date | null
    updatedAt: Date | null
    aiSummary: string | null
    riskLevel: string | null
    complianceScore: number | null
  }

  export type EvidenceFolderMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    studentId: string | null
    gradeLevel: string | null
    specialEdStatus: string | null
    title: string | null
    category: string | null
    createdAt: Date | null
    updatedAt: Date | null
    aiSummary: string | null
    riskLevel: string | null
    complianceScore: number | null
  }

  export type EvidenceFolderCountAggregateOutputType = {
    id: number
    userId: number
    studentId: number
    gradeLevel: number
    specialEdStatus: number
    title: number
    category: number
    createdAt: number
    updatedAt: number
    aiSummary: number
    riskLevel: number
    complianceScore: number
    _all: number
  }


  export type EvidenceFolderAvgAggregateInputType = {
    complianceScore?: true
  }

  export type EvidenceFolderSumAggregateInputType = {
    complianceScore?: true
  }

  export type EvidenceFolderMinAggregateInputType = {
    id?: true
    userId?: true
    studentId?: true
    gradeLevel?: true
    specialEdStatus?: true
    title?: true
    category?: true
    createdAt?: true
    updatedAt?: true
    aiSummary?: true
    riskLevel?: true
    complianceScore?: true
  }

  export type EvidenceFolderMaxAggregateInputType = {
    id?: true
    userId?: true
    studentId?: true
    gradeLevel?: true
    specialEdStatus?: true
    title?: true
    category?: true
    createdAt?: true
    updatedAt?: true
    aiSummary?: true
    riskLevel?: true
    complianceScore?: true
  }

  export type EvidenceFolderCountAggregateInputType = {
    id?: true
    userId?: true
    studentId?: true
    gradeLevel?: true
    specialEdStatus?: true
    title?: true
    category?: true
    createdAt?: true
    updatedAt?: true
    aiSummary?: true
    riskLevel?: true
    complianceScore?: true
    _all?: true
  }

  export type EvidenceFolderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EvidenceFolder to aggregate.
     */
    where?: EvidenceFolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvidenceFolders to fetch.
     */
    orderBy?: EvidenceFolderOrderByWithRelationInput | EvidenceFolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EvidenceFolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvidenceFolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvidenceFolders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EvidenceFolders
    **/
    _count?: true | EvidenceFolderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EvidenceFolderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EvidenceFolderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EvidenceFolderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EvidenceFolderMaxAggregateInputType
  }

  export type GetEvidenceFolderAggregateType<T extends EvidenceFolderAggregateArgs> = {
        [P in keyof T & keyof AggregateEvidenceFolder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvidenceFolder[P]>
      : GetScalarType<T[P], AggregateEvidenceFolder[P]>
  }




  export type EvidenceFolderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvidenceFolderWhereInput
    orderBy?: EvidenceFolderOrderByWithAggregationInput | EvidenceFolderOrderByWithAggregationInput[]
    by: EvidenceFolderScalarFieldEnum[] | EvidenceFolderScalarFieldEnum
    having?: EvidenceFolderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EvidenceFolderCountAggregateInputType | true
    _avg?: EvidenceFolderAvgAggregateInputType
    _sum?: EvidenceFolderSumAggregateInputType
    _min?: EvidenceFolderMinAggregateInputType
    _max?: EvidenceFolderMaxAggregateInputType
  }

  export type EvidenceFolderGroupByOutputType = {
    id: string
    userId: string
    studentId: string
    gradeLevel: string | null
    specialEdStatus: string | null
    title: string
    category: string
    createdAt: Date
    updatedAt: Date
    aiSummary: string | null
    riskLevel: string | null
    complianceScore: number | null
    _count: EvidenceFolderCountAggregateOutputType | null
    _avg: EvidenceFolderAvgAggregateOutputType | null
    _sum: EvidenceFolderSumAggregateOutputType | null
    _min: EvidenceFolderMinAggregateOutputType | null
    _max: EvidenceFolderMaxAggregateOutputType | null
  }

  type GetEvidenceFolderGroupByPayload<T extends EvidenceFolderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EvidenceFolderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EvidenceFolderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EvidenceFolderGroupByOutputType[P]>
            : GetScalarType<T[P], EvidenceFolderGroupByOutputType[P]>
        }
      >
    >


  export type EvidenceFolderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    studentId?: boolean
    gradeLevel?: boolean
    specialEdStatus?: boolean
    title?: boolean
    category?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    aiSummary?: boolean
    riskLevel?: boolean
    complianceScore?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    observations?: boolean | EvidenceFolder$observationsArgs<ExtArgs>
    documents?: boolean | EvidenceFolder$documentsArgs<ExtArgs>
    _count?: boolean | EvidenceFolderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["evidenceFolder"]>

  export type EvidenceFolderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    studentId?: boolean
    gradeLevel?: boolean
    specialEdStatus?: boolean
    title?: boolean
    category?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    aiSummary?: boolean
    riskLevel?: boolean
    complianceScore?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["evidenceFolder"]>

  export type EvidenceFolderSelectScalar = {
    id?: boolean
    userId?: boolean
    studentId?: boolean
    gradeLevel?: boolean
    specialEdStatus?: boolean
    title?: boolean
    category?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    aiSummary?: boolean
    riskLevel?: boolean
    complianceScore?: boolean
  }

  export type EvidenceFolderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    observations?: boolean | EvidenceFolder$observationsArgs<ExtArgs>
    documents?: boolean | EvidenceFolder$documentsArgs<ExtArgs>
    _count?: boolean | EvidenceFolderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EvidenceFolderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $EvidenceFolderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EvidenceFolder"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      observations: Prisma.$ObservationPayload<ExtArgs>[]
      documents: Prisma.$DocumentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      studentId: string
      gradeLevel: string | null
      specialEdStatus: string | null
      title: string
      category: string
      createdAt: Date
      updatedAt: Date
      aiSummary: string | null
      riskLevel: string | null
      complianceScore: number | null
    }, ExtArgs["result"]["evidenceFolder"]>
    composites: {}
  }

  type EvidenceFolderGetPayload<S extends boolean | null | undefined | EvidenceFolderDefaultArgs> = $Result.GetResult<Prisma.$EvidenceFolderPayload, S>

  type EvidenceFolderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EvidenceFolderFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EvidenceFolderCountAggregateInputType | true
    }

  export interface EvidenceFolderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EvidenceFolder'], meta: { name: 'EvidenceFolder' } }
    /**
     * Find zero or one EvidenceFolder that matches the filter.
     * @param {EvidenceFolderFindUniqueArgs} args - Arguments to find a EvidenceFolder
     * @example
     * // Get one EvidenceFolder
     * const evidenceFolder = await prisma.evidenceFolder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EvidenceFolderFindUniqueArgs>(args: SelectSubset<T, EvidenceFolderFindUniqueArgs<ExtArgs>>): Prisma__EvidenceFolderClient<$Result.GetResult<Prisma.$EvidenceFolderPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one EvidenceFolder that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EvidenceFolderFindUniqueOrThrowArgs} args - Arguments to find a EvidenceFolder
     * @example
     * // Get one EvidenceFolder
     * const evidenceFolder = await prisma.evidenceFolder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EvidenceFolderFindUniqueOrThrowArgs>(args: SelectSubset<T, EvidenceFolderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EvidenceFolderClient<$Result.GetResult<Prisma.$EvidenceFolderPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first EvidenceFolder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvidenceFolderFindFirstArgs} args - Arguments to find a EvidenceFolder
     * @example
     * // Get one EvidenceFolder
     * const evidenceFolder = await prisma.evidenceFolder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EvidenceFolderFindFirstArgs>(args?: SelectSubset<T, EvidenceFolderFindFirstArgs<ExtArgs>>): Prisma__EvidenceFolderClient<$Result.GetResult<Prisma.$EvidenceFolderPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first EvidenceFolder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvidenceFolderFindFirstOrThrowArgs} args - Arguments to find a EvidenceFolder
     * @example
     * // Get one EvidenceFolder
     * const evidenceFolder = await prisma.evidenceFolder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EvidenceFolderFindFirstOrThrowArgs>(args?: SelectSubset<T, EvidenceFolderFindFirstOrThrowArgs<ExtArgs>>): Prisma__EvidenceFolderClient<$Result.GetResult<Prisma.$EvidenceFolderPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more EvidenceFolders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvidenceFolderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EvidenceFolders
     * const evidenceFolders = await prisma.evidenceFolder.findMany()
     * 
     * // Get first 10 EvidenceFolders
     * const evidenceFolders = await prisma.evidenceFolder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const evidenceFolderWithIdOnly = await prisma.evidenceFolder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EvidenceFolderFindManyArgs>(args?: SelectSubset<T, EvidenceFolderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvidenceFolderPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a EvidenceFolder.
     * @param {EvidenceFolderCreateArgs} args - Arguments to create a EvidenceFolder.
     * @example
     * // Create one EvidenceFolder
     * const EvidenceFolder = await prisma.evidenceFolder.create({
     *   data: {
     *     // ... data to create a EvidenceFolder
     *   }
     * })
     * 
     */
    create<T extends EvidenceFolderCreateArgs>(args: SelectSubset<T, EvidenceFolderCreateArgs<ExtArgs>>): Prisma__EvidenceFolderClient<$Result.GetResult<Prisma.$EvidenceFolderPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many EvidenceFolders.
     * @param {EvidenceFolderCreateManyArgs} args - Arguments to create many EvidenceFolders.
     * @example
     * // Create many EvidenceFolders
     * const evidenceFolder = await prisma.evidenceFolder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EvidenceFolderCreateManyArgs>(args?: SelectSubset<T, EvidenceFolderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EvidenceFolders and returns the data saved in the database.
     * @param {EvidenceFolderCreateManyAndReturnArgs} args - Arguments to create many EvidenceFolders.
     * @example
     * // Create many EvidenceFolders
     * const evidenceFolder = await prisma.evidenceFolder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EvidenceFolders and only return the `id`
     * const evidenceFolderWithIdOnly = await prisma.evidenceFolder.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EvidenceFolderCreateManyAndReturnArgs>(args?: SelectSubset<T, EvidenceFolderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvidenceFolderPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a EvidenceFolder.
     * @param {EvidenceFolderDeleteArgs} args - Arguments to delete one EvidenceFolder.
     * @example
     * // Delete one EvidenceFolder
     * const EvidenceFolder = await prisma.evidenceFolder.delete({
     *   where: {
     *     // ... filter to delete one EvidenceFolder
     *   }
     * })
     * 
     */
    delete<T extends EvidenceFolderDeleteArgs>(args: SelectSubset<T, EvidenceFolderDeleteArgs<ExtArgs>>): Prisma__EvidenceFolderClient<$Result.GetResult<Prisma.$EvidenceFolderPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one EvidenceFolder.
     * @param {EvidenceFolderUpdateArgs} args - Arguments to update one EvidenceFolder.
     * @example
     * // Update one EvidenceFolder
     * const evidenceFolder = await prisma.evidenceFolder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EvidenceFolderUpdateArgs>(args: SelectSubset<T, EvidenceFolderUpdateArgs<ExtArgs>>): Prisma__EvidenceFolderClient<$Result.GetResult<Prisma.$EvidenceFolderPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more EvidenceFolders.
     * @param {EvidenceFolderDeleteManyArgs} args - Arguments to filter EvidenceFolders to delete.
     * @example
     * // Delete a few EvidenceFolders
     * const { count } = await prisma.evidenceFolder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EvidenceFolderDeleteManyArgs>(args?: SelectSubset<T, EvidenceFolderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EvidenceFolders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvidenceFolderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EvidenceFolders
     * const evidenceFolder = await prisma.evidenceFolder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EvidenceFolderUpdateManyArgs>(args: SelectSubset<T, EvidenceFolderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EvidenceFolder.
     * @param {EvidenceFolderUpsertArgs} args - Arguments to update or create a EvidenceFolder.
     * @example
     * // Update or create a EvidenceFolder
     * const evidenceFolder = await prisma.evidenceFolder.upsert({
     *   create: {
     *     // ... data to create a EvidenceFolder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EvidenceFolder we want to update
     *   }
     * })
     */
    upsert<T extends EvidenceFolderUpsertArgs>(args: SelectSubset<T, EvidenceFolderUpsertArgs<ExtArgs>>): Prisma__EvidenceFolderClient<$Result.GetResult<Prisma.$EvidenceFolderPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of EvidenceFolders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvidenceFolderCountArgs} args - Arguments to filter EvidenceFolders to count.
     * @example
     * // Count the number of EvidenceFolders
     * const count = await prisma.evidenceFolder.count({
     *   where: {
     *     // ... the filter for the EvidenceFolders we want to count
     *   }
     * })
    **/
    count<T extends EvidenceFolderCountArgs>(
      args?: Subset<T, EvidenceFolderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EvidenceFolderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EvidenceFolder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvidenceFolderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EvidenceFolderAggregateArgs>(args: Subset<T, EvidenceFolderAggregateArgs>): Prisma.PrismaPromise<GetEvidenceFolderAggregateType<T>>

    /**
     * Group by EvidenceFolder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvidenceFolderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EvidenceFolderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EvidenceFolderGroupByArgs['orderBy'] }
        : { orderBy?: EvidenceFolderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EvidenceFolderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEvidenceFolderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EvidenceFolder model
   */
  readonly fields: EvidenceFolderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EvidenceFolder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EvidenceFolderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    observations<T extends EvidenceFolder$observationsArgs<ExtArgs> = {}>(args?: Subset<T, EvidenceFolder$observationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "findMany"> | Null>
    documents<T extends EvidenceFolder$documentsArgs<ExtArgs> = {}>(args?: Subset<T, EvidenceFolder$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EvidenceFolder model
   */ 
  interface EvidenceFolderFieldRefs {
    readonly id: FieldRef<"EvidenceFolder", 'String'>
    readonly userId: FieldRef<"EvidenceFolder", 'String'>
    readonly studentId: FieldRef<"EvidenceFolder", 'String'>
    readonly gradeLevel: FieldRef<"EvidenceFolder", 'String'>
    readonly specialEdStatus: FieldRef<"EvidenceFolder", 'String'>
    readonly title: FieldRef<"EvidenceFolder", 'String'>
    readonly category: FieldRef<"EvidenceFolder", 'String'>
    readonly createdAt: FieldRef<"EvidenceFolder", 'DateTime'>
    readonly updatedAt: FieldRef<"EvidenceFolder", 'DateTime'>
    readonly aiSummary: FieldRef<"EvidenceFolder", 'String'>
    readonly riskLevel: FieldRef<"EvidenceFolder", 'String'>
    readonly complianceScore: FieldRef<"EvidenceFolder", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * EvidenceFolder findUnique
   */
  export type EvidenceFolderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvidenceFolder
     */
    select?: EvidenceFolderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceFolderInclude<ExtArgs> | null
    /**
     * Filter, which EvidenceFolder to fetch.
     */
    where: EvidenceFolderWhereUniqueInput
  }

  /**
   * EvidenceFolder findUniqueOrThrow
   */
  export type EvidenceFolderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvidenceFolder
     */
    select?: EvidenceFolderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceFolderInclude<ExtArgs> | null
    /**
     * Filter, which EvidenceFolder to fetch.
     */
    where: EvidenceFolderWhereUniqueInput
  }

  /**
   * EvidenceFolder findFirst
   */
  export type EvidenceFolderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvidenceFolder
     */
    select?: EvidenceFolderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceFolderInclude<ExtArgs> | null
    /**
     * Filter, which EvidenceFolder to fetch.
     */
    where?: EvidenceFolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvidenceFolders to fetch.
     */
    orderBy?: EvidenceFolderOrderByWithRelationInput | EvidenceFolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EvidenceFolders.
     */
    cursor?: EvidenceFolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvidenceFolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvidenceFolders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EvidenceFolders.
     */
    distinct?: EvidenceFolderScalarFieldEnum | EvidenceFolderScalarFieldEnum[]
  }

  /**
   * EvidenceFolder findFirstOrThrow
   */
  export type EvidenceFolderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvidenceFolder
     */
    select?: EvidenceFolderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceFolderInclude<ExtArgs> | null
    /**
     * Filter, which EvidenceFolder to fetch.
     */
    where?: EvidenceFolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvidenceFolders to fetch.
     */
    orderBy?: EvidenceFolderOrderByWithRelationInput | EvidenceFolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EvidenceFolders.
     */
    cursor?: EvidenceFolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvidenceFolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvidenceFolders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EvidenceFolders.
     */
    distinct?: EvidenceFolderScalarFieldEnum | EvidenceFolderScalarFieldEnum[]
  }

  /**
   * EvidenceFolder findMany
   */
  export type EvidenceFolderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvidenceFolder
     */
    select?: EvidenceFolderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceFolderInclude<ExtArgs> | null
    /**
     * Filter, which EvidenceFolders to fetch.
     */
    where?: EvidenceFolderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvidenceFolders to fetch.
     */
    orderBy?: EvidenceFolderOrderByWithRelationInput | EvidenceFolderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EvidenceFolders.
     */
    cursor?: EvidenceFolderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvidenceFolders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvidenceFolders.
     */
    skip?: number
    distinct?: EvidenceFolderScalarFieldEnum | EvidenceFolderScalarFieldEnum[]
  }

  /**
   * EvidenceFolder create
   */
  export type EvidenceFolderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvidenceFolder
     */
    select?: EvidenceFolderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceFolderInclude<ExtArgs> | null
    /**
     * The data needed to create a EvidenceFolder.
     */
    data: XOR<EvidenceFolderCreateInput, EvidenceFolderUncheckedCreateInput>
  }

  /**
   * EvidenceFolder createMany
   */
  export type EvidenceFolderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EvidenceFolders.
     */
    data: EvidenceFolderCreateManyInput | EvidenceFolderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EvidenceFolder createManyAndReturn
   */
  export type EvidenceFolderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvidenceFolder
     */
    select?: EvidenceFolderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many EvidenceFolders.
     */
    data: EvidenceFolderCreateManyInput | EvidenceFolderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceFolderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EvidenceFolder update
   */
  export type EvidenceFolderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvidenceFolder
     */
    select?: EvidenceFolderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceFolderInclude<ExtArgs> | null
    /**
     * The data needed to update a EvidenceFolder.
     */
    data: XOR<EvidenceFolderUpdateInput, EvidenceFolderUncheckedUpdateInput>
    /**
     * Choose, which EvidenceFolder to update.
     */
    where: EvidenceFolderWhereUniqueInput
  }

  /**
   * EvidenceFolder updateMany
   */
  export type EvidenceFolderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EvidenceFolders.
     */
    data: XOR<EvidenceFolderUpdateManyMutationInput, EvidenceFolderUncheckedUpdateManyInput>
    /**
     * Filter which EvidenceFolders to update
     */
    where?: EvidenceFolderWhereInput
  }

  /**
   * EvidenceFolder upsert
   */
  export type EvidenceFolderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvidenceFolder
     */
    select?: EvidenceFolderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceFolderInclude<ExtArgs> | null
    /**
     * The filter to search for the EvidenceFolder to update in case it exists.
     */
    where: EvidenceFolderWhereUniqueInput
    /**
     * In case the EvidenceFolder found by the `where` argument doesn't exist, create a new EvidenceFolder with this data.
     */
    create: XOR<EvidenceFolderCreateInput, EvidenceFolderUncheckedCreateInput>
    /**
     * In case the EvidenceFolder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EvidenceFolderUpdateInput, EvidenceFolderUncheckedUpdateInput>
  }

  /**
   * EvidenceFolder delete
   */
  export type EvidenceFolderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvidenceFolder
     */
    select?: EvidenceFolderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceFolderInclude<ExtArgs> | null
    /**
     * Filter which EvidenceFolder to delete.
     */
    where: EvidenceFolderWhereUniqueInput
  }

  /**
   * EvidenceFolder deleteMany
   */
  export type EvidenceFolderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EvidenceFolders to delete
     */
    where?: EvidenceFolderWhereInput
  }

  /**
   * EvidenceFolder.observations
   */
  export type EvidenceFolder$observationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
    where?: ObservationWhereInput
    orderBy?: ObservationOrderByWithRelationInput | ObservationOrderByWithRelationInput[]
    cursor?: ObservationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ObservationScalarFieldEnum | ObservationScalarFieldEnum[]
  }

  /**
   * EvidenceFolder.documents
   */
  export type EvidenceFolder$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * EvidenceFolder without action
   */
  export type EvidenceFolderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvidenceFolder
     */
    select?: EvidenceFolderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceFolderInclude<ExtArgs> | null
  }


  /**
   * Model Observation
   */

  export type AggregateObservation = {
    _count: ObservationCountAggregateOutputType | null
    _avg: ObservationAvgAggregateOutputType | null
    _sum: ObservationSumAggregateOutputType | null
    _min: ObservationMinAggregateOutputType | null
    _max: ObservationMaxAggregateOutputType | null
  }

  export type ObservationAvgAggregateOutputType = {
    duration: number | null
  }

  export type ObservationSumAggregateOutputType = {
    duration: number | null
  }

  export type ObservationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    evidenceFolderId: string | null
    avatarSessionId: string | null
    observationType: string | null
    observationDate: Date | null
    duration: number | null
    description: string | null
    context: string | null
    interventions: string | null
    aiAnalysis: string | null
    legalCompliance: boolean | null
    hasAudio: boolean | null
    hasVideo: boolean | null
    hasImages: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ObservationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    evidenceFolderId: string | null
    avatarSessionId: string | null
    observationType: string | null
    observationDate: Date | null
    duration: number | null
    description: string | null
    context: string | null
    interventions: string | null
    aiAnalysis: string | null
    legalCompliance: boolean | null
    hasAudio: boolean | null
    hasVideo: boolean | null
    hasImages: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ObservationCountAggregateOutputType = {
    id: number
    userId: number
    evidenceFolderId: number
    avatarSessionId: number
    observationType: number
    observationDate: number
    duration: number
    description: number
    context: number
    interventions: number
    aiAnalysis: number
    suggestedActions: number
    legalCompliance: number
    hasAudio: number
    hasVideo: number
    hasImages: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ObservationAvgAggregateInputType = {
    duration?: true
  }

  export type ObservationSumAggregateInputType = {
    duration?: true
  }

  export type ObservationMinAggregateInputType = {
    id?: true
    userId?: true
    evidenceFolderId?: true
    avatarSessionId?: true
    observationType?: true
    observationDate?: true
    duration?: true
    description?: true
    context?: true
    interventions?: true
    aiAnalysis?: true
    legalCompliance?: true
    hasAudio?: true
    hasVideo?: true
    hasImages?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ObservationMaxAggregateInputType = {
    id?: true
    userId?: true
    evidenceFolderId?: true
    avatarSessionId?: true
    observationType?: true
    observationDate?: true
    duration?: true
    description?: true
    context?: true
    interventions?: true
    aiAnalysis?: true
    legalCompliance?: true
    hasAudio?: true
    hasVideo?: true
    hasImages?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ObservationCountAggregateInputType = {
    id?: true
    userId?: true
    evidenceFolderId?: true
    avatarSessionId?: true
    observationType?: true
    observationDate?: true
    duration?: true
    description?: true
    context?: true
    interventions?: true
    aiAnalysis?: true
    suggestedActions?: true
    legalCompliance?: true
    hasAudio?: true
    hasVideo?: true
    hasImages?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ObservationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Observation to aggregate.
     */
    where?: ObservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Observations to fetch.
     */
    orderBy?: ObservationOrderByWithRelationInput | ObservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ObservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Observations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Observations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Observations
    **/
    _count?: true | ObservationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ObservationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ObservationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ObservationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ObservationMaxAggregateInputType
  }

  export type GetObservationAggregateType<T extends ObservationAggregateArgs> = {
        [P in keyof T & keyof AggregateObservation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateObservation[P]>
      : GetScalarType<T[P], AggregateObservation[P]>
  }




  export type ObservationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ObservationWhereInput
    orderBy?: ObservationOrderByWithAggregationInput | ObservationOrderByWithAggregationInput[]
    by: ObservationScalarFieldEnum[] | ObservationScalarFieldEnum
    having?: ObservationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ObservationCountAggregateInputType | true
    _avg?: ObservationAvgAggregateInputType
    _sum?: ObservationSumAggregateInputType
    _min?: ObservationMinAggregateInputType
    _max?: ObservationMaxAggregateInputType
  }

  export type ObservationGroupByOutputType = {
    id: string
    userId: string
    evidenceFolderId: string | null
    avatarSessionId: string | null
    observationType: string
    observationDate: Date
    duration: number | null
    description: string
    context: string | null
    interventions: string | null
    aiAnalysis: string | null
    suggestedActions: JsonValue | null
    legalCompliance: boolean
    hasAudio: boolean
    hasVideo: boolean
    hasImages: boolean
    createdAt: Date
    updatedAt: Date
    _count: ObservationCountAggregateOutputType | null
    _avg: ObservationAvgAggregateOutputType | null
    _sum: ObservationSumAggregateOutputType | null
    _min: ObservationMinAggregateOutputType | null
    _max: ObservationMaxAggregateOutputType | null
  }

  type GetObservationGroupByPayload<T extends ObservationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ObservationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ObservationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ObservationGroupByOutputType[P]>
            : GetScalarType<T[P], ObservationGroupByOutputType[P]>
        }
      >
    >


  export type ObservationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    evidenceFolderId?: boolean
    avatarSessionId?: boolean
    observationType?: boolean
    observationDate?: boolean
    duration?: boolean
    description?: boolean
    context?: boolean
    interventions?: boolean
    aiAnalysis?: boolean
    suggestedActions?: boolean
    legalCompliance?: boolean
    hasAudio?: boolean
    hasVideo?: boolean
    hasImages?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    evidenceFolder?: boolean | Observation$evidenceFolderArgs<ExtArgs>
    avatarSession?: boolean | Observation$avatarSessionArgs<ExtArgs>
  }, ExtArgs["result"]["observation"]>

  export type ObservationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    evidenceFolderId?: boolean
    avatarSessionId?: boolean
    observationType?: boolean
    observationDate?: boolean
    duration?: boolean
    description?: boolean
    context?: boolean
    interventions?: boolean
    aiAnalysis?: boolean
    suggestedActions?: boolean
    legalCompliance?: boolean
    hasAudio?: boolean
    hasVideo?: boolean
    hasImages?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    evidenceFolder?: boolean | Observation$evidenceFolderArgs<ExtArgs>
    avatarSession?: boolean | Observation$avatarSessionArgs<ExtArgs>
  }, ExtArgs["result"]["observation"]>

  export type ObservationSelectScalar = {
    id?: boolean
    userId?: boolean
    evidenceFolderId?: boolean
    avatarSessionId?: boolean
    observationType?: boolean
    observationDate?: boolean
    duration?: boolean
    description?: boolean
    context?: boolean
    interventions?: boolean
    aiAnalysis?: boolean
    suggestedActions?: boolean
    legalCompliance?: boolean
    hasAudio?: boolean
    hasVideo?: boolean
    hasImages?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ObservationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    evidenceFolder?: boolean | Observation$evidenceFolderArgs<ExtArgs>
    avatarSession?: boolean | Observation$avatarSessionArgs<ExtArgs>
  }
  export type ObservationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    evidenceFolder?: boolean | Observation$evidenceFolderArgs<ExtArgs>
    avatarSession?: boolean | Observation$avatarSessionArgs<ExtArgs>
  }

  export type $ObservationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Observation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      evidenceFolder: Prisma.$EvidenceFolderPayload<ExtArgs> | null
      avatarSession: Prisma.$AvatarSessionPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      evidenceFolderId: string | null
      avatarSessionId: string | null
      observationType: string
      observationDate: Date
      duration: number | null
      description: string
      context: string | null
      interventions: string | null
      aiAnalysis: string | null
      suggestedActions: Prisma.JsonValue | null
      legalCompliance: boolean
      hasAudio: boolean
      hasVideo: boolean
      hasImages: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["observation"]>
    composites: {}
  }

  type ObservationGetPayload<S extends boolean | null | undefined | ObservationDefaultArgs> = $Result.GetResult<Prisma.$ObservationPayload, S>

  type ObservationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ObservationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ObservationCountAggregateInputType | true
    }

  export interface ObservationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Observation'], meta: { name: 'Observation' } }
    /**
     * Find zero or one Observation that matches the filter.
     * @param {ObservationFindUniqueArgs} args - Arguments to find a Observation
     * @example
     * // Get one Observation
     * const observation = await prisma.observation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ObservationFindUniqueArgs>(args: SelectSubset<T, ObservationFindUniqueArgs<ExtArgs>>): Prisma__ObservationClient<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Observation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ObservationFindUniqueOrThrowArgs} args - Arguments to find a Observation
     * @example
     * // Get one Observation
     * const observation = await prisma.observation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ObservationFindUniqueOrThrowArgs>(args: SelectSubset<T, ObservationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ObservationClient<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Observation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObservationFindFirstArgs} args - Arguments to find a Observation
     * @example
     * // Get one Observation
     * const observation = await prisma.observation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ObservationFindFirstArgs>(args?: SelectSubset<T, ObservationFindFirstArgs<ExtArgs>>): Prisma__ObservationClient<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Observation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObservationFindFirstOrThrowArgs} args - Arguments to find a Observation
     * @example
     * // Get one Observation
     * const observation = await prisma.observation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ObservationFindFirstOrThrowArgs>(args?: SelectSubset<T, ObservationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ObservationClient<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Observations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObservationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Observations
     * const observations = await prisma.observation.findMany()
     * 
     * // Get first 10 Observations
     * const observations = await prisma.observation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const observationWithIdOnly = await prisma.observation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ObservationFindManyArgs>(args?: SelectSubset<T, ObservationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Observation.
     * @param {ObservationCreateArgs} args - Arguments to create a Observation.
     * @example
     * // Create one Observation
     * const Observation = await prisma.observation.create({
     *   data: {
     *     // ... data to create a Observation
     *   }
     * })
     * 
     */
    create<T extends ObservationCreateArgs>(args: SelectSubset<T, ObservationCreateArgs<ExtArgs>>): Prisma__ObservationClient<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Observations.
     * @param {ObservationCreateManyArgs} args - Arguments to create many Observations.
     * @example
     * // Create many Observations
     * const observation = await prisma.observation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ObservationCreateManyArgs>(args?: SelectSubset<T, ObservationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Observations and returns the data saved in the database.
     * @param {ObservationCreateManyAndReturnArgs} args - Arguments to create many Observations.
     * @example
     * // Create many Observations
     * const observation = await prisma.observation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Observations and only return the `id`
     * const observationWithIdOnly = await prisma.observation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ObservationCreateManyAndReturnArgs>(args?: SelectSubset<T, ObservationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Observation.
     * @param {ObservationDeleteArgs} args - Arguments to delete one Observation.
     * @example
     * // Delete one Observation
     * const Observation = await prisma.observation.delete({
     *   where: {
     *     // ... filter to delete one Observation
     *   }
     * })
     * 
     */
    delete<T extends ObservationDeleteArgs>(args: SelectSubset<T, ObservationDeleteArgs<ExtArgs>>): Prisma__ObservationClient<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Observation.
     * @param {ObservationUpdateArgs} args - Arguments to update one Observation.
     * @example
     * // Update one Observation
     * const observation = await prisma.observation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ObservationUpdateArgs>(args: SelectSubset<T, ObservationUpdateArgs<ExtArgs>>): Prisma__ObservationClient<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Observations.
     * @param {ObservationDeleteManyArgs} args - Arguments to filter Observations to delete.
     * @example
     * // Delete a few Observations
     * const { count } = await prisma.observation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ObservationDeleteManyArgs>(args?: SelectSubset<T, ObservationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Observations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObservationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Observations
     * const observation = await prisma.observation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ObservationUpdateManyArgs>(args: SelectSubset<T, ObservationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Observation.
     * @param {ObservationUpsertArgs} args - Arguments to update or create a Observation.
     * @example
     * // Update or create a Observation
     * const observation = await prisma.observation.upsert({
     *   create: {
     *     // ... data to create a Observation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Observation we want to update
     *   }
     * })
     */
    upsert<T extends ObservationUpsertArgs>(args: SelectSubset<T, ObservationUpsertArgs<ExtArgs>>): Prisma__ObservationClient<$Result.GetResult<Prisma.$ObservationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Observations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObservationCountArgs} args - Arguments to filter Observations to count.
     * @example
     * // Count the number of Observations
     * const count = await prisma.observation.count({
     *   where: {
     *     // ... the filter for the Observations we want to count
     *   }
     * })
    **/
    count<T extends ObservationCountArgs>(
      args?: Subset<T, ObservationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ObservationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Observation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObservationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ObservationAggregateArgs>(args: Subset<T, ObservationAggregateArgs>): Prisma.PrismaPromise<GetObservationAggregateType<T>>

    /**
     * Group by Observation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ObservationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ObservationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ObservationGroupByArgs['orderBy'] }
        : { orderBy?: ObservationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ObservationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetObservationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Observation model
   */
  readonly fields: ObservationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Observation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ObservationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    evidenceFolder<T extends Observation$evidenceFolderArgs<ExtArgs> = {}>(args?: Subset<T, Observation$evidenceFolderArgs<ExtArgs>>): Prisma__EvidenceFolderClient<$Result.GetResult<Prisma.$EvidenceFolderPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    avatarSession<T extends Observation$avatarSessionArgs<ExtArgs> = {}>(args?: Subset<T, Observation$avatarSessionArgs<ExtArgs>>): Prisma__AvatarSessionClient<$Result.GetResult<Prisma.$AvatarSessionPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Observation model
   */ 
  interface ObservationFieldRefs {
    readonly id: FieldRef<"Observation", 'String'>
    readonly userId: FieldRef<"Observation", 'String'>
    readonly evidenceFolderId: FieldRef<"Observation", 'String'>
    readonly avatarSessionId: FieldRef<"Observation", 'String'>
    readonly observationType: FieldRef<"Observation", 'String'>
    readonly observationDate: FieldRef<"Observation", 'DateTime'>
    readonly duration: FieldRef<"Observation", 'Int'>
    readonly description: FieldRef<"Observation", 'String'>
    readonly context: FieldRef<"Observation", 'String'>
    readonly interventions: FieldRef<"Observation", 'String'>
    readonly aiAnalysis: FieldRef<"Observation", 'String'>
    readonly suggestedActions: FieldRef<"Observation", 'Json'>
    readonly legalCompliance: FieldRef<"Observation", 'Boolean'>
    readonly hasAudio: FieldRef<"Observation", 'Boolean'>
    readonly hasVideo: FieldRef<"Observation", 'Boolean'>
    readonly hasImages: FieldRef<"Observation", 'Boolean'>
    readonly createdAt: FieldRef<"Observation", 'DateTime'>
    readonly updatedAt: FieldRef<"Observation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Observation findUnique
   */
  export type ObservationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
    /**
     * Filter, which Observation to fetch.
     */
    where: ObservationWhereUniqueInput
  }

  /**
   * Observation findUniqueOrThrow
   */
  export type ObservationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
    /**
     * Filter, which Observation to fetch.
     */
    where: ObservationWhereUniqueInput
  }

  /**
   * Observation findFirst
   */
  export type ObservationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
    /**
     * Filter, which Observation to fetch.
     */
    where?: ObservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Observations to fetch.
     */
    orderBy?: ObservationOrderByWithRelationInput | ObservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Observations.
     */
    cursor?: ObservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Observations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Observations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Observations.
     */
    distinct?: ObservationScalarFieldEnum | ObservationScalarFieldEnum[]
  }

  /**
   * Observation findFirstOrThrow
   */
  export type ObservationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
    /**
     * Filter, which Observation to fetch.
     */
    where?: ObservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Observations to fetch.
     */
    orderBy?: ObservationOrderByWithRelationInput | ObservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Observations.
     */
    cursor?: ObservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Observations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Observations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Observations.
     */
    distinct?: ObservationScalarFieldEnum | ObservationScalarFieldEnum[]
  }

  /**
   * Observation findMany
   */
  export type ObservationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
    /**
     * Filter, which Observations to fetch.
     */
    where?: ObservationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Observations to fetch.
     */
    orderBy?: ObservationOrderByWithRelationInput | ObservationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Observations.
     */
    cursor?: ObservationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Observations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Observations.
     */
    skip?: number
    distinct?: ObservationScalarFieldEnum | ObservationScalarFieldEnum[]
  }

  /**
   * Observation create
   */
  export type ObservationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
    /**
     * The data needed to create a Observation.
     */
    data: XOR<ObservationCreateInput, ObservationUncheckedCreateInput>
  }

  /**
   * Observation createMany
   */
  export type ObservationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Observations.
     */
    data: ObservationCreateManyInput | ObservationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Observation createManyAndReturn
   */
  export type ObservationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Observations.
     */
    data: ObservationCreateManyInput | ObservationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Observation update
   */
  export type ObservationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
    /**
     * The data needed to update a Observation.
     */
    data: XOR<ObservationUpdateInput, ObservationUncheckedUpdateInput>
    /**
     * Choose, which Observation to update.
     */
    where: ObservationWhereUniqueInput
  }

  /**
   * Observation updateMany
   */
  export type ObservationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Observations.
     */
    data: XOR<ObservationUpdateManyMutationInput, ObservationUncheckedUpdateManyInput>
    /**
     * Filter which Observations to update
     */
    where?: ObservationWhereInput
  }

  /**
   * Observation upsert
   */
  export type ObservationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
    /**
     * The filter to search for the Observation to update in case it exists.
     */
    where: ObservationWhereUniqueInput
    /**
     * In case the Observation found by the `where` argument doesn't exist, create a new Observation with this data.
     */
    create: XOR<ObservationCreateInput, ObservationUncheckedCreateInput>
    /**
     * In case the Observation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ObservationUpdateInput, ObservationUncheckedUpdateInput>
  }

  /**
   * Observation delete
   */
  export type ObservationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
    /**
     * Filter which Observation to delete.
     */
    where: ObservationWhereUniqueInput
  }

  /**
   * Observation deleteMany
   */
  export type ObservationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Observations to delete
     */
    where?: ObservationWhereInput
  }

  /**
   * Observation.evidenceFolder
   */
  export type Observation$evidenceFolderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvidenceFolder
     */
    select?: EvidenceFolderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvidenceFolderInclude<ExtArgs> | null
    where?: EvidenceFolderWhereInput
  }

  /**
   * Observation.avatarSession
   */
  export type Observation$avatarSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvatarSession
     */
    select?: AvatarSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AvatarSessionInclude<ExtArgs> | null
    where?: AvatarSessionWhereInput
  }

  /**
   * Observation without action
   */
  export type ObservationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Observation
     */
    select?: ObservationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ObservationInclude<ExtArgs> | null
  }


  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentAvgAggregateOutputType = {
    fileSize: number | null
  }

  export type DocumentSumAggregateOutputType = {
    fileSize: number | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    evidenceFolderId: string | null
    fileName: string | null
    fileType: string | null
    fileSize: number | null
    gcpBucketPath: string | null
    gcpSignedUrl: string | null
    urlExpiresAt: Date | null
    encrypted: boolean | null
    accessLevel: string | null
    uploadedAt: Date | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    evidenceFolderId: string | null
    fileName: string | null
    fileType: string | null
    fileSize: number | null
    gcpBucketPath: string | null
    gcpSignedUrl: string | null
    urlExpiresAt: Date | null
    encrypted: boolean | null
    accessLevel: string | null
    uploadedAt: Date | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    evidenceFolderId: number
    fileName: number
    fileType: number
    fileSize: number
    gcpBucketPath: number
    gcpSignedUrl: number
    urlExpiresAt: number
    encrypted: number
    accessLevel: number
    uploadedAt: number
    _all: number
  }


  export type DocumentAvgAggregateInputType = {
    fileSize?: true
  }

  export type DocumentSumAggregateInputType = {
    fileSize?: true
  }

  export type DocumentMinAggregateInputType = {
    id?: true
    evidenceFolderId?: true
    fileName?: true
    fileType?: true
    fileSize?: true
    gcpBucketPath?: true
    gcpSignedUrl?: true
    urlExpiresAt?: true
    encrypted?: true
    accessLevel?: true
    uploadedAt?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    evidenceFolderId?: true
    fileName?: true
    fileType?: true
    fileSize?: true
    gcpBucketPath?: true
    gcpSignedUrl?: true
    urlExpiresAt?: true
    encrypted?: true
    accessLevel?: true
    uploadedAt?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    evidenceFolderId?: true
    fileName?: true
    fileType?: true
    fileSize?: true
    gcpBucketPath?: true
    gcpSignedUrl?: true
    urlExpiresAt?: true
    encrypted?: true
    accessLevel?: true
    uploadedAt?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _avg?: DocumentAvgAggregateInputType
    _sum?: DocumentSumAggregateInputType
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    evidenceFolderId: string
    fileName: string
    fileType: string
    fileSize: number
    gcpBucketPath: string
    gcpSignedUrl: string | null
    urlExpiresAt: Date | null
    encrypted: boolean
    accessLevel: string
    uploadedAt: Date
    _count: DocumentCountAggregateOutputType | null
    _avg: DocumentAvgAggregateOutputType | null
    _sum: DocumentSumAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    evidenceFolderId?: boolean
    fileName?: boolean
    fileType?: boolean
    fileSize?: boolean
    gcpBucketPath?: boolean
    gcpSignedUrl?: boolean
    urlExpiresAt?: boolean
    encrypted?: boolean
    accessLevel?: boolean
    uploadedAt?: boolean
    evidenceFolder?: boolean | EvidenceFolderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    evidenceFolderId?: boolean
    fileName?: boolean
    fileType?: boolean
    fileSize?: boolean
    gcpBucketPath?: boolean
    gcpSignedUrl?: boolean
    urlExpiresAt?: boolean
    encrypted?: boolean
    accessLevel?: boolean
    uploadedAt?: boolean
    evidenceFolder?: boolean | EvidenceFolderDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    evidenceFolderId?: boolean
    fileName?: boolean
    fileType?: boolean
    fileSize?: boolean
    gcpBucketPath?: boolean
    gcpSignedUrl?: boolean
    urlExpiresAt?: boolean
    encrypted?: boolean
    accessLevel?: boolean
    uploadedAt?: boolean
  }

  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    evidenceFolder?: boolean | EvidenceFolderDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    evidenceFolder?: boolean | EvidenceFolderDefaultArgs<ExtArgs>
  }

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      evidenceFolder: Prisma.$EvidenceFolderPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      evidenceFolderId: string
      fileName: string
      fileType: string
      fileSize: number
      gcpBucketPath: string
      gcpSignedUrl: string | null
      urlExpiresAt: Date | null
      encrypted: boolean
      accessLevel: string
      uploadedAt: Date
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    evidenceFolder<T extends EvidenceFolderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EvidenceFolderDefaultArgs<ExtArgs>>): Prisma__EvidenceFolderClient<$Result.GetResult<Prisma.$EvidenceFolderPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Document model
   */ 
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly evidenceFolderId: FieldRef<"Document", 'String'>
    readonly fileName: FieldRef<"Document", 'String'>
    readonly fileType: FieldRef<"Document", 'String'>
    readonly fileSize: FieldRef<"Document", 'Int'>
    readonly gcpBucketPath: FieldRef<"Document", 'String'>
    readonly gcpSignedUrl: FieldRef<"Document", 'String'>
    readonly urlExpiresAt: FieldRef<"Document", 'DateTime'>
    readonly encrypted: FieldRef<"Document", 'Boolean'>
    readonly accessLevel: FieldRef<"Document", 'String'>
    readonly uploadedAt: FieldRef<"Document", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Model Generation
   */

  export type AggregateGeneration = {
    _count: GenerationCountAggregateOutputType | null
    _min: GenerationMinAggregateOutputType | null
    _max: GenerationMaxAggregateOutputType | null
  }

  export type GenerationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    generatorId: string | null
    prompt: string | null
    content: string | null
    professorVideoUrl: string | null
    avatarEngine: string | null
    createdAt: Date | null
  }

  export type GenerationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    generatorId: string | null
    prompt: string | null
    content: string | null
    professorVideoUrl: string | null
    avatarEngine: string | null
    createdAt: Date | null
  }

  export type GenerationCountAggregateOutputType = {
    id: number
    userId: number
    generatorId: number
    prompt: number
    content: number
    professorVideoUrl: number
    avatarEngine: number
    createdAt: number
    _all: number
  }


  export type GenerationMinAggregateInputType = {
    id?: true
    userId?: true
    generatorId?: true
    prompt?: true
    content?: true
    professorVideoUrl?: true
    avatarEngine?: true
    createdAt?: true
  }

  export type GenerationMaxAggregateInputType = {
    id?: true
    userId?: true
    generatorId?: true
    prompt?: true
    content?: true
    professorVideoUrl?: true
    avatarEngine?: true
    createdAt?: true
  }

  export type GenerationCountAggregateInputType = {
    id?: true
    userId?: true
    generatorId?: true
    prompt?: true
    content?: true
    professorVideoUrl?: true
    avatarEngine?: true
    createdAt?: true
    _all?: true
  }

  export type GenerationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Generation to aggregate.
     */
    where?: GenerationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Generations to fetch.
     */
    orderBy?: GenerationOrderByWithRelationInput | GenerationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GenerationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Generations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Generations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Generations
    **/
    _count?: true | GenerationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GenerationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GenerationMaxAggregateInputType
  }

  export type GetGenerationAggregateType<T extends GenerationAggregateArgs> = {
        [P in keyof T & keyof AggregateGeneration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGeneration[P]>
      : GetScalarType<T[P], AggregateGeneration[P]>
  }




  export type GenerationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GenerationWhereInput
    orderBy?: GenerationOrderByWithAggregationInput | GenerationOrderByWithAggregationInput[]
    by: GenerationScalarFieldEnum[] | GenerationScalarFieldEnum
    having?: GenerationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GenerationCountAggregateInputType | true
    _min?: GenerationMinAggregateInputType
    _max?: GenerationMaxAggregateInputType
  }

  export type GenerationGroupByOutputType = {
    id: string
    userId: string
    generatorId: string
    prompt: string
    content: string
    professorVideoUrl: string | null
    avatarEngine: string | null
    createdAt: Date
    _count: GenerationCountAggregateOutputType | null
    _min: GenerationMinAggregateOutputType | null
    _max: GenerationMaxAggregateOutputType | null
  }

  type GetGenerationGroupByPayload<T extends GenerationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GenerationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GenerationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GenerationGroupByOutputType[P]>
            : GetScalarType<T[P], GenerationGroupByOutputType[P]>
        }
      >
    >


  export type GenerationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    generatorId?: boolean
    prompt?: boolean
    content?: boolean
    professorVideoUrl?: boolean
    avatarEngine?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["generation"]>

  export type GenerationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    generatorId?: boolean
    prompt?: boolean
    content?: boolean
    professorVideoUrl?: boolean
    avatarEngine?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["generation"]>

  export type GenerationSelectScalar = {
    id?: boolean
    userId?: boolean
    generatorId?: boolean
    prompt?: boolean
    content?: boolean
    professorVideoUrl?: boolean
    avatarEngine?: boolean
    createdAt?: boolean
  }

  export type GenerationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GenerationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GenerationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Generation"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      generatorId: string
      prompt: string
      content: string
      professorVideoUrl: string | null
      avatarEngine: string | null
      createdAt: Date
    }, ExtArgs["result"]["generation"]>
    composites: {}
  }

  type GenerationGetPayload<S extends boolean | null | undefined | GenerationDefaultArgs> = $Result.GetResult<Prisma.$GenerationPayload, S>

  type GenerationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GenerationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GenerationCountAggregateInputType | true
    }

  export interface GenerationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Generation'], meta: { name: 'Generation' } }
    /**
     * Find zero or one Generation that matches the filter.
     * @param {GenerationFindUniqueArgs} args - Arguments to find a Generation
     * @example
     * // Get one Generation
     * const generation = await prisma.generation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GenerationFindUniqueArgs>(args: SelectSubset<T, GenerationFindUniqueArgs<ExtArgs>>): Prisma__GenerationClient<$Result.GetResult<Prisma.$GenerationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Generation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GenerationFindUniqueOrThrowArgs} args - Arguments to find a Generation
     * @example
     * // Get one Generation
     * const generation = await prisma.generation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GenerationFindUniqueOrThrowArgs>(args: SelectSubset<T, GenerationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GenerationClient<$Result.GetResult<Prisma.$GenerationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Generation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenerationFindFirstArgs} args - Arguments to find a Generation
     * @example
     * // Get one Generation
     * const generation = await prisma.generation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GenerationFindFirstArgs>(args?: SelectSubset<T, GenerationFindFirstArgs<ExtArgs>>): Prisma__GenerationClient<$Result.GetResult<Prisma.$GenerationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Generation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenerationFindFirstOrThrowArgs} args - Arguments to find a Generation
     * @example
     * // Get one Generation
     * const generation = await prisma.generation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GenerationFindFirstOrThrowArgs>(args?: SelectSubset<T, GenerationFindFirstOrThrowArgs<ExtArgs>>): Prisma__GenerationClient<$Result.GetResult<Prisma.$GenerationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Generations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenerationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Generations
     * const generations = await prisma.generation.findMany()
     * 
     * // Get first 10 Generations
     * const generations = await prisma.generation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const generationWithIdOnly = await prisma.generation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GenerationFindManyArgs>(args?: SelectSubset<T, GenerationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GenerationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Generation.
     * @param {GenerationCreateArgs} args - Arguments to create a Generation.
     * @example
     * // Create one Generation
     * const Generation = await prisma.generation.create({
     *   data: {
     *     // ... data to create a Generation
     *   }
     * })
     * 
     */
    create<T extends GenerationCreateArgs>(args: SelectSubset<T, GenerationCreateArgs<ExtArgs>>): Prisma__GenerationClient<$Result.GetResult<Prisma.$GenerationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Generations.
     * @param {GenerationCreateManyArgs} args - Arguments to create many Generations.
     * @example
     * // Create many Generations
     * const generation = await prisma.generation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GenerationCreateManyArgs>(args?: SelectSubset<T, GenerationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Generations and returns the data saved in the database.
     * @param {GenerationCreateManyAndReturnArgs} args - Arguments to create many Generations.
     * @example
     * // Create many Generations
     * const generation = await prisma.generation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Generations and only return the `id`
     * const generationWithIdOnly = await prisma.generation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GenerationCreateManyAndReturnArgs>(args?: SelectSubset<T, GenerationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GenerationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Generation.
     * @param {GenerationDeleteArgs} args - Arguments to delete one Generation.
     * @example
     * // Delete one Generation
     * const Generation = await prisma.generation.delete({
     *   where: {
     *     // ... filter to delete one Generation
     *   }
     * })
     * 
     */
    delete<T extends GenerationDeleteArgs>(args: SelectSubset<T, GenerationDeleteArgs<ExtArgs>>): Prisma__GenerationClient<$Result.GetResult<Prisma.$GenerationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Generation.
     * @param {GenerationUpdateArgs} args - Arguments to update one Generation.
     * @example
     * // Update one Generation
     * const generation = await prisma.generation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GenerationUpdateArgs>(args: SelectSubset<T, GenerationUpdateArgs<ExtArgs>>): Prisma__GenerationClient<$Result.GetResult<Prisma.$GenerationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Generations.
     * @param {GenerationDeleteManyArgs} args - Arguments to filter Generations to delete.
     * @example
     * // Delete a few Generations
     * const { count } = await prisma.generation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GenerationDeleteManyArgs>(args?: SelectSubset<T, GenerationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Generations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenerationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Generations
     * const generation = await prisma.generation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GenerationUpdateManyArgs>(args: SelectSubset<T, GenerationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Generation.
     * @param {GenerationUpsertArgs} args - Arguments to update or create a Generation.
     * @example
     * // Update or create a Generation
     * const generation = await prisma.generation.upsert({
     *   create: {
     *     // ... data to create a Generation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Generation we want to update
     *   }
     * })
     */
    upsert<T extends GenerationUpsertArgs>(args: SelectSubset<T, GenerationUpsertArgs<ExtArgs>>): Prisma__GenerationClient<$Result.GetResult<Prisma.$GenerationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Generations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenerationCountArgs} args - Arguments to filter Generations to count.
     * @example
     * // Count the number of Generations
     * const count = await prisma.generation.count({
     *   where: {
     *     // ... the filter for the Generations we want to count
     *   }
     * })
    **/
    count<T extends GenerationCountArgs>(
      args?: Subset<T, GenerationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GenerationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Generation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenerationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GenerationAggregateArgs>(args: Subset<T, GenerationAggregateArgs>): Prisma.PrismaPromise<GetGenerationAggregateType<T>>

    /**
     * Group by Generation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GenerationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GenerationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GenerationGroupByArgs['orderBy'] }
        : { orderBy?: GenerationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GenerationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGenerationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Generation model
   */
  readonly fields: GenerationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Generation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GenerationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Generation model
   */ 
  interface GenerationFieldRefs {
    readonly id: FieldRef<"Generation", 'String'>
    readonly userId: FieldRef<"Generation", 'String'>
    readonly generatorId: FieldRef<"Generation", 'String'>
    readonly prompt: FieldRef<"Generation", 'String'>
    readonly content: FieldRef<"Generation", 'String'>
    readonly professorVideoUrl: FieldRef<"Generation", 'String'>
    readonly avatarEngine: FieldRef<"Generation", 'String'>
    readonly createdAt: FieldRef<"Generation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Generation findUnique
   */
  export type GenerationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Generation
     */
    select?: GenerationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenerationInclude<ExtArgs> | null
    /**
     * Filter, which Generation to fetch.
     */
    where: GenerationWhereUniqueInput
  }

  /**
   * Generation findUniqueOrThrow
   */
  export type GenerationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Generation
     */
    select?: GenerationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenerationInclude<ExtArgs> | null
    /**
     * Filter, which Generation to fetch.
     */
    where: GenerationWhereUniqueInput
  }

  /**
   * Generation findFirst
   */
  export type GenerationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Generation
     */
    select?: GenerationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenerationInclude<ExtArgs> | null
    /**
     * Filter, which Generation to fetch.
     */
    where?: GenerationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Generations to fetch.
     */
    orderBy?: GenerationOrderByWithRelationInput | GenerationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Generations.
     */
    cursor?: GenerationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Generations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Generations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Generations.
     */
    distinct?: GenerationScalarFieldEnum | GenerationScalarFieldEnum[]
  }

  /**
   * Generation findFirstOrThrow
   */
  export type GenerationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Generation
     */
    select?: GenerationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenerationInclude<ExtArgs> | null
    /**
     * Filter, which Generation to fetch.
     */
    where?: GenerationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Generations to fetch.
     */
    orderBy?: GenerationOrderByWithRelationInput | GenerationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Generations.
     */
    cursor?: GenerationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Generations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Generations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Generations.
     */
    distinct?: GenerationScalarFieldEnum | GenerationScalarFieldEnum[]
  }

  /**
   * Generation findMany
   */
  export type GenerationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Generation
     */
    select?: GenerationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenerationInclude<ExtArgs> | null
    /**
     * Filter, which Generations to fetch.
     */
    where?: GenerationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Generations to fetch.
     */
    orderBy?: GenerationOrderByWithRelationInput | GenerationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Generations.
     */
    cursor?: GenerationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Generations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Generations.
     */
    skip?: number
    distinct?: GenerationScalarFieldEnum | GenerationScalarFieldEnum[]
  }

  /**
   * Generation create
   */
  export type GenerationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Generation
     */
    select?: GenerationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenerationInclude<ExtArgs> | null
    /**
     * The data needed to create a Generation.
     */
    data: XOR<GenerationCreateInput, GenerationUncheckedCreateInput>
  }

  /**
   * Generation createMany
   */
  export type GenerationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Generations.
     */
    data: GenerationCreateManyInput | GenerationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Generation createManyAndReturn
   */
  export type GenerationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Generation
     */
    select?: GenerationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Generations.
     */
    data: GenerationCreateManyInput | GenerationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenerationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Generation update
   */
  export type GenerationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Generation
     */
    select?: GenerationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenerationInclude<ExtArgs> | null
    /**
     * The data needed to update a Generation.
     */
    data: XOR<GenerationUpdateInput, GenerationUncheckedUpdateInput>
    /**
     * Choose, which Generation to update.
     */
    where: GenerationWhereUniqueInput
  }

  /**
   * Generation updateMany
   */
  export type GenerationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Generations.
     */
    data: XOR<GenerationUpdateManyMutationInput, GenerationUncheckedUpdateManyInput>
    /**
     * Filter which Generations to update
     */
    where?: GenerationWhereInput
  }

  /**
   * Generation upsert
   */
  export type GenerationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Generation
     */
    select?: GenerationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenerationInclude<ExtArgs> | null
    /**
     * The filter to search for the Generation to update in case it exists.
     */
    where: GenerationWhereUniqueInput
    /**
     * In case the Generation found by the `where` argument doesn't exist, create a new Generation with this data.
     */
    create: XOR<GenerationCreateInput, GenerationUncheckedCreateInput>
    /**
     * In case the Generation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GenerationUpdateInput, GenerationUncheckedUpdateInput>
  }

  /**
   * Generation delete
   */
  export type GenerationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Generation
     */
    select?: GenerationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenerationInclude<ExtArgs> | null
    /**
     * Filter which Generation to delete.
     */
    where: GenerationWhereUniqueInput
  }

  /**
   * Generation deleteMany
   */
  export type GenerationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Generations to delete
     */
    where?: GenerationWhereInput
  }

  /**
   * Generation without action
   */
  export type GenerationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Generation
     */
    select?: GenerationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GenerationInclude<ExtArgs> | null
  }


  /**
   * Model AnalyticsEvent
   */

  export type AggregateAnalyticsEvent = {
    _count: AnalyticsEventCountAggregateOutputType | null
    _avg: AnalyticsEventAvgAggregateOutputType | null
    _sum: AnalyticsEventSumAggregateOutputType | null
    _min: AnalyticsEventMinAggregateOutputType | null
    _max: AnalyticsEventMaxAggregateOutputType | null
  }

  export type AnalyticsEventAvgAggregateOutputType = {
    latency: number | null
    tokensUsed: number | null
    gcpCost: number | null
  }

  export type AnalyticsEventSumAggregateOutputType = {
    latency: number | null
    tokensUsed: number | null
    gcpCost: number | null
  }

  export type AnalyticsEventMinAggregateOutputType = {
    id: string | null
    userId: string | null
    eventType: string | null
    eventCategory: string | null
    eventAction: string | null
    eventLabel: string | null
    latency: number | null
    tokensUsed: number | null
    gcpCost: number | null
    userAgent: string | null
    ipAddress: string | null
    timestamp: Date | null
  }

  export type AnalyticsEventMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    eventType: string | null
    eventCategory: string | null
    eventAction: string | null
    eventLabel: string | null
    latency: number | null
    tokensUsed: number | null
    gcpCost: number | null
    userAgent: string | null
    ipAddress: string | null
    timestamp: Date | null
  }

  export type AnalyticsEventCountAggregateOutputType = {
    id: number
    userId: number
    eventType: number
    eventCategory: number
    eventAction: number
    eventLabel: number
    latency: number
    tokensUsed: number
    gcpCost: number
    metadata: number
    userAgent: number
    ipAddress: number
    timestamp: number
    _all: number
  }


  export type AnalyticsEventAvgAggregateInputType = {
    latency?: true
    tokensUsed?: true
    gcpCost?: true
  }

  export type AnalyticsEventSumAggregateInputType = {
    latency?: true
    tokensUsed?: true
    gcpCost?: true
  }

  export type AnalyticsEventMinAggregateInputType = {
    id?: true
    userId?: true
    eventType?: true
    eventCategory?: true
    eventAction?: true
    eventLabel?: true
    latency?: true
    tokensUsed?: true
    gcpCost?: true
    userAgent?: true
    ipAddress?: true
    timestamp?: true
  }

  export type AnalyticsEventMaxAggregateInputType = {
    id?: true
    userId?: true
    eventType?: true
    eventCategory?: true
    eventAction?: true
    eventLabel?: true
    latency?: true
    tokensUsed?: true
    gcpCost?: true
    userAgent?: true
    ipAddress?: true
    timestamp?: true
  }

  export type AnalyticsEventCountAggregateInputType = {
    id?: true
    userId?: true
    eventType?: true
    eventCategory?: true
    eventAction?: true
    eventLabel?: true
    latency?: true
    tokensUsed?: true
    gcpCost?: true
    metadata?: true
    userAgent?: true
    ipAddress?: true
    timestamp?: true
    _all?: true
  }

  export type AnalyticsEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnalyticsEvent to aggregate.
     */
    where?: AnalyticsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsEvents to fetch.
     */
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AnalyticsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AnalyticsEvents
    **/
    _count?: true | AnalyticsEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AnalyticsEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AnalyticsEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AnalyticsEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AnalyticsEventMaxAggregateInputType
  }

  export type GetAnalyticsEventAggregateType<T extends AnalyticsEventAggregateArgs> = {
        [P in keyof T & keyof AggregateAnalyticsEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAnalyticsEvent[P]>
      : GetScalarType<T[P], AggregateAnalyticsEvent[P]>
  }




  export type AnalyticsEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AnalyticsEventWhereInput
    orderBy?: AnalyticsEventOrderByWithAggregationInput | AnalyticsEventOrderByWithAggregationInput[]
    by: AnalyticsEventScalarFieldEnum[] | AnalyticsEventScalarFieldEnum
    having?: AnalyticsEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AnalyticsEventCountAggregateInputType | true
    _avg?: AnalyticsEventAvgAggregateInputType
    _sum?: AnalyticsEventSumAggregateInputType
    _min?: AnalyticsEventMinAggregateInputType
    _max?: AnalyticsEventMaxAggregateInputType
  }

  export type AnalyticsEventGroupByOutputType = {
    id: string
    userId: string | null
    eventType: string
    eventCategory: string
    eventAction: string
    eventLabel: string | null
    latency: number | null
    tokensUsed: number | null
    gcpCost: number | null
    metadata: JsonValue | null
    userAgent: string | null
    ipAddress: string | null
    timestamp: Date
    _count: AnalyticsEventCountAggregateOutputType | null
    _avg: AnalyticsEventAvgAggregateOutputType | null
    _sum: AnalyticsEventSumAggregateOutputType | null
    _min: AnalyticsEventMinAggregateOutputType | null
    _max: AnalyticsEventMaxAggregateOutputType | null
  }

  type GetAnalyticsEventGroupByPayload<T extends AnalyticsEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AnalyticsEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AnalyticsEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AnalyticsEventGroupByOutputType[P]>
            : GetScalarType<T[P], AnalyticsEventGroupByOutputType[P]>
        }
      >
    >


  export type AnalyticsEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    eventType?: boolean
    eventCategory?: boolean
    eventAction?: boolean
    eventLabel?: boolean
    latency?: boolean
    tokensUsed?: boolean
    gcpCost?: boolean
    metadata?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["analyticsEvent"]>

  export type AnalyticsEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    eventType?: boolean
    eventCategory?: boolean
    eventAction?: boolean
    eventLabel?: boolean
    latency?: boolean
    tokensUsed?: boolean
    gcpCost?: boolean
    metadata?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["analyticsEvent"]>

  export type AnalyticsEventSelectScalar = {
    id?: boolean
    userId?: boolean
    eventType?: boolean
    eventCategory?: boolean
    eventAction?: boolean
    eventLabel?: boolean
    latency?: boolean
    tokensUsed?: boolean
    gcpCost?: boolean
    metadata?: boolean
    userAgent?: boolean
    ipAddress?: boolean
    timestamp?: boolean
  }


  export type $AnalyticsEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AnalyticsEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      eventType: string
      eventCategory: string
      eventAction: string
      eventLabel: string | null
      latency: number | null
      tokensUsed: number | null
      gcpCost: number | null
      metadata: Prisma.JsonValue | null
      userAgent: string | null
      ipAddress: string | null
      timestamp: Date
    }, ExtArgs["result"]["analyticsEvent"]>
    composites: {}
  }

  type AnalyticsEventGetPayload<S extends boolean | null | undefined | AnalyticsEventDefaultArgs> = $Result.GetResult<Prisma.$AnalyticsEventPayload, S>

  type AnalyticsEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AnalyticsEventFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AnalyticsEventCountAggregateInputType | true
    }

  export interface AnalyticsEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AnalyticsEvent'], meta: { name: 'AnalyticsEvent' } }
    /**
     * Find zero or one AnalyticsEvent that matches the filter.
     * @param {AnalyticsEventFindUniqueArgs} args - Arguments to find a AnalyticsEvent
     * @example
     * // Get one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AnalyticsEventFindUniqueArgs>(args: SelectSubset<T, AnalyticsEventFindUniqueArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AnalyticsEvent that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AnalyticsEventFindUniqueOrThrowArgs} args - Arguments to find a AnalyticsEvent
     * @example
     * // Get one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AnalyticsEventFindUniqueOrThrowArgs>(args: SelectSubset<T, AnalyticsEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AnalyticsEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventFindFirstArgs} args - Arguments to find a AnalyticsEvent
     * @example
     * // Get one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AnalyticsEventFindFirstArgs>(args?: SelectSubset<T, AnalyticsEventFindFirstArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AnalyticsEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventFindFirstOrThrowArgs} args - Arguments to find a AnalyticsEvent
     * @example
     * // Get one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AnalyticsEventFindFirstOrThrowArgs>(args?: SelectSubset<T, AnalyticsEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AnalyticsEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AnalyticsEvents
     * const analyticsEvents = await prisma.analyticsEvent.findMany()
     * 
     * // Get first 10 AnalyticsEvents
     * const analyticsEvents = await prisma.analyticsEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const analyticsEventWithIdOnly = await prisma.analyticsEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AnalyticsEventFindManyArgs>(args?: SelectSubset<T, AnalyticsEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AnalyticsEvent.
     * @param {AnalyticsEventCreateArgs} args - Arguments to create a AnalyticsEvent.
     * @example
     * // Create one AnalyticsEvent
     * const AnalyticsEvent = await prisma.analyticsEvent.create({
     *   data: {
     *     // ... data to create a AnalyticsEvent
     *   }
     * })
     * 
     */
    create<T extends AnalyticsEventCreateArgs>(args: SelectSubset<T, AnalyticsEventCreateArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AnalyticsEvents.
     * @param {AnalyticsEventCreateManyArgs} args - Arguments to create many AnalyticsEvents.
     * @example
     * // Create many AnalyticsEvents
     * const analyticsEvent = await prisma.analyticsEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AnalyticsEventCreateManyArgs>(args?: SelectSubset<T, AnalyticsEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AnalyticsEvents and returns the data saved in the database.
     * @param {AnalyticsEventCreateManyAndReturnArgs} args - Arguments to create many AnalyticsEvents.
     * @example
     * // Create many AnalyticsEvents
     * const analyticsEvent = await prisma.analyticsEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AnalyticsEvents and only return the `id`
     * const analyticsEventWithIdOnly = await prisma.analyticsEvent.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AnalyticsEventCreateManyAndReturnArgs>(args?: SelectSubset<T, AnalyticsEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AnalyticsEvent.
     * @param {AnalyticsEventDeleteArgs} args - Arguments to delete one AnalyticsEvent.
     * @example
     * // Delete one AnalyticsEvent
     * const AnalyticsEvent = await prisma.analyticsEvent.delete({
     *   where: {
     *     // ... filter to delete one AnalyticsEvent
     *   }
     * })
     * 
     */
    delete<T extends AnalyticsEventDeleteArgs>(args: SelectSubset<T, AnalyticsEventDeleteArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AnalyticsEvent.
     * @param {AnalyticsEventUpdateArgs} args - Arguments to update one AnalyticsEvent.
     * @example
     * // Update one AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AnalyticsEventUpdateArgs>(args: SelectSubset<T, AnalyticsEventUpdateArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AnalyticsEvents.
     * @param {AnalyticsEventDeleteManyArgs} args - Arguments to filter AnalyticsEvents to delete.
     * @example
     * // Delete a few AnalyticsEvents
     * const { count } = await prisma.analyticsEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AnalyticsEventDeleteManyArgs>(args?: SelectSubset<T, AnalyticsEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AnalyticsEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AnalyticsEvents
     * const analyticsEvent = await prisma.analyticsEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AnalyticsEventUpdateManyArgs>(args: SelectSubset<T, AnalyticsEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AnalyticsEvent.
     * @param {AnalyticsEventUpsertArgs} args - Arguments to update or create a AnalyticsEvent.
     * @example
     * // Update or create a AnalyticsEvent
     * const analyticsEvent = await prisma.analyticsEvent.upsert({
     *   create: {
     *     // ... data to create a AnalyticsEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AnalyticsEvent we want to update
     *   }
     * })
     */
    upsert<T extends AnalyticsEventUpsertArgs>(args: SelectSubset<T, AnalyticsEventUpsertArgs<ExtArgs>>): Prisma__AnalyticsEventClient<$Result.GetResult<Prisma.$AnalyticsEventPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AnalyticsEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventCountArgs} args - Arguments to filter AnalyticsEvents to count.
     * @example
     * // Count the number of AnalyticsEvents
     * const count = await prisma.analyticsEvent.count({
     *   where: {
     *     // ... the filter for the AnalyticsEvents we want to count
     *   }
     * })
    **/
    count<T extends AnalyticsEventCountArgs>(
      args?: Subset<T, AnalyticsEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AnalyticsEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AnalyticsEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AnalyticsEventAggregateArgs>(args: Subset<T, AnalyticsEventAggregateArgs>): Prisma.PrismaPromise<GetAnalyticsEventAggregateType<T>>

    /**
     * Group by AnalyticsEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AnalyticsEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AnalyticsEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AnalyticsEventGroupByArgs['orderBy'] }
        : { orderBy?: AnalyticsEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AnalyticsEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAnalyticsEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AnalyticsEvent model
   */
  readonly fields: AnalyticsEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AnalyticsEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AnalyticsEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AnalyticsEvent model
   */ 
  interface AnalyticsEventFieldRefs {
    readonly id: FieldRef<"AnalyticsEvent", 'String'>
    readonly userId: FieldRef<"AnalyticsEvent", 'String'>
    readonly eventType: FieldRef<"AnalyticsEvent", 'String'>
    readonly eventCategory: FieldRef<"AnalyticsEvent", 'String'>
    readonly eventAction: FieldRef<"AnalyticsEvent", 'String'>
    readonly eventLabel: FieldRef<"AnalyticsEvent", 'String'>
    readonly latency: FieldRef<"AnalyticsEvent", 'Float'>
    readonly tokensUsed: FieldRef<"AnalyticsEvent", 'Int'>
    readonly gcpCost: FieldRef<"AnalyticsEvent", 'Float'>
    readonly metadata: FieldRef<"AnalyticsEvent", 'Json'>
    readonly userAgent: FieldRef<"AnalyticsEvent", 'String'>
    readonly ipAddress: FieldRef<"AnalyticsEvent", 'String'>
    readonly timestamp: FieldRef<"AnalyticsEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AnalyticsEvent findUnique
   */
  export type AnalyticsEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvent to fetch.
     */
    where: AnalyticsEventWhereUniqueInput
  }

  /**
   * AnalyticsEvent findUniqueOrThrow
   */
  export type AnalyticsEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvent to fetch.
     */
    where: AnalyticsEventWhereUniqueInput
  }

  /**
   * AnalyticsEvent findFirst
   */
  export type AnalyticsEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvent to fetch.
     */
    where?: AnalyticsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsEvents to fetch.
     */
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnalyticsEvents.
     */
    cursor?: AnalyticsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalyticsEvents.
     */
    distinct?: AnalyticsEventScalarFieldEnum | AnalyticsEventScalarFieldEnum[]
  }

  /**
   * AnalyticsEvent findFirstOrThrow
   */
  export type AnalyticsEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvent to fetch.
     */
    where?: AnalyticsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsEvents to fetch.
     */
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AnalyticsEvents.
     */
    cursor?: AnalyticsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AnalyticsEvents.
     */
    distinct?: AnalyticsEventScalarFieldEnum | AnalyticsEventScalarFieldEnum[]
  }

  /**
   * AnalyticsEvent findMany
   */
  export type AnalyticsEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Filter, which AnalyticsEvents to fetch.
     */
    where?: AnalyticsEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AnalyticsEvents to fetch.
     */
    orderBy?: AnalyticsEventOrderByWithRelationInput | AnalyticsEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AnalyticsEvents.
     */
    cursor?: AnalyticsEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AnalyticsEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AnalyticsEvents.
     */
    skip?: number
    distinct?: AnalyticsEventScalarFieldEnum | AnalyticsEventScalarFieldEnum[]
  }

  /**
   * AnalyticsEvent create
   */
  export type AnalyticsEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * The data needed to create a AnalyticsEvent.
     */
    data: XOR<AnalyticsEventCreateInput, AnalyticsEventUncheckedCreateInput>
  }

  /**
   * AnalyticsEvent createMany
   */
  export type AnalyticsEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AnalyticsEvents.
     */
    data: AnalyticsEventCreateManyInput | AnalyticsEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnalyticsEvent createManyAndReturn
   */
  export type AnalyticsEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AnalyticsEvents.
     */
    data: AnalyticsEventCreateManyInput | AnalyticsEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AnalyticsEvent update
   */
  export type AnalyticsEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * The data needed to update a AnalyticsEvent.
     */
    data: XOR<AnalyticsEventUpdateInput, AnalyticsEventUncheckedUpdateInput>
    /**
     * Choose, which AnalyticsEvent to update.
     */
    where: AnalyticsEventWhereUniqueInput
  }

  /**
   * AnalyticsEvent updateMany
   */
  export type AnalyticsEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AnalyticsEvents.
     */
    data: XOR<AnalyticsEventUpdateManyMutationInput, AnalyticsEventUncheckedUpdateManyInput>
    /**
     * Filter which AnalyticsEvents to update
     */
    where?: AnalyticsEventWhereInput
  }

  /**
   * AnalyticsEvent upsert
   */
  export type AnalyticsEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * The filter to search for the AnalyticsEvent to update in case it exists.
     */
    where: AnalyticsEventWhereUniqueInput
    /**
     * In case the AnalyticsEvent found by the `where` argument doesn't exist, create a new AnalyticsEvent with this data.
     */
    create: XOR<AnalyticsEventCreateInput, AnalyticsEventUncheckedCreateInput>
    /**
     * In case the AnalyticsEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AnalyticsEventUpdateInput, AnalyticsEventUncheckedUpdateInput>
  }

  /**
   * AnalyticsEvent delete
   */
  export type AnalyticsEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
    /**
     * Filter which AnalyticsEvent to delete.
     */
    where: AnalyticsEventWhereUniqueInput
  }

  /**
   * AnalyticsEvent deleteMany
   */
  export type AnalyticsEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AnalyticsEvents to delete
     */
    where?: AnalyticsEventWhereInput
  }

  /**
   * AnalyticsEvent without action
   */
  export type AnalyticsEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AnalyticsEvent
     */
    select?: AnalyticsEventSelect<ExtArgs> | null
  }


  /**
   * Model SemanticCache
   */

  export type AggregateSemanticCache = {
    _count: SemanticCacheCountAggregateOutputType | null
    _avg: SemanticCacheAvgAggregateOutputType | null
    _sum: SemanticCacheSumAggregateOutputType | null
    _min: SemanticCacheMinAggregateOutputType | null
    _max: SemanticCacheMaxAggregateOutputType | null
  }

  export type SemanticCacheAvgAggregateOutputType = {
    hitCount: number | null
  }

  export type SemanticCacheSumAggregateOutputType = {
    hitCount: number | null
  }

  export type SemanticCacheMinAggregateOutputType = {
    id: string | null
    query: string | null
    response: string | null
    hitCount: number | null
    lastHitAt: Date | null
    createdAt: Date | null
  }

  export type SemanticCacheMaxAggregateOutputType = {
    id: string | null
    query: string | null
    response: string | null
    hitCount: number | null
    lastHitAt: Date | null
    createdAt: Date | null
  }

  export type SemanticCacheCountAggregateOutputType = {
    id: number
    query: number
    response: number
    hitCount: number
    lastHitAt: number
    createdAt: number
    _all: number
  }


  export type SemanticCacheAvgAggregateInputType = {
    hitCount?: true
  }

  export type SemanticCacheSumAggregateInputType = {
    hitCount?: true
  }

  export type SemanticCacheMinAggregateInputType = {
    id?: true
    query?: true
    response?: true
    hitCount?: true
    lastHitAt?: true
    createdAt?: true
  }

  export type SemanticCacheMaxAggregateInputType = {
    id?: true
    query?: true
    response?: true
    hitCount?: true
    lastHitAt?: true
    createdAt?: true
  }

  export type SemanticCacheCountAggregateInputType = {
    id?: true
    query?: true
    response?: true
    hitCount?: true
    lastHitAt?: true
    createdAt?: true
    _all?: true
  }

  export type SemanticCacheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SemanticCache to aggregate.
     */
    where?: SemanticCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SemanticCaches to fetch.
     */
    orderBy?: SemanticCacheOrderByWithRelationInput | SemanticCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SemanticCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SemanticCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SemanticCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SemanticCaches
    **/
    _count?: true | SemanticCacheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SemanticCacheAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SemanticCacheSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SemanticCacheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SemanticCacheMaxAggregateInputType
  }

  export type GetSemanticCacheAggregateType<T extends SemanticCacheAggregateArgs> = {
        [P in keyof T & keyof AggregateSemanticCache]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSemanticCache[P]>
      : GetScalarType<T[P], AggregateSemanticCache[P]>
  }




  export type SemanticCacheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SemanticCacheWhereInput
    orderBy?: SemanticCacheOrderByWithAggregationInput | SemanticCacheOrderByWithAggregationInput[]
    by: SemanticCacheScalarFieldEnum[] | SemanticCacheScalarFieldEnum
    having?: SemanticCacheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SemanticCacheCountAggregateInputType | true
    _avg?: SemanticCacheAvgAggregateInputType
    _sum?: SemanticCacheSumAggregateInputType
    _min?: SemanticCacheMinAggregateInputType
    _max?: SemanticCacheMaxAggregateInputType
  }

  export type SemanticCacheGroupByOutputType = {
    id: string
    query: string
    response: string
    hitCount: number
    lastHitAt: Date
    createdAt: Date
    _count: SemanticCacheCountAggregateOutputType | null
    _avg: SemanticCacheAvgAggregateOutputType | null
    _sum: SemanticCacheSumAggregateOutputType | null
    _min: SemanticCacheMinAggregateOutputType | null
    _max: SemanticCacheMaxAggregateOutputType | null
  }

  type GetSemanticCacheGroupByPayload<T extends SemanticCacheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SemanticCacheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SemanticCacheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SemanticCacheGroupByOutputType[P]>
            : GetScalarType<T[P], SemanticCacheGroupByOutputType[P]>
        }
      >
    >


  export type SemanticCacheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    query?: boolean
    response?: boolean
    hitCount?: boolean
    lastHitAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["semanticCache"]>

  export type SemanticCacheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    query?: boolean
    response?: boolean
    hitCount?: boolean
    lastHitAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["semanticCache"]>

  export type SemanticCacheSelectScalar = {
    id?: boolean
    query?: boolean
    response?: boolean
    hitCount?: boolean
    lastHitAt?: boolean
    createdAt?: boolean
  }


  export type $SemanticCachePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SemanticCache"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      query: string
      response: string
      hitCount: number
      lastHitAt: Date
      createdAt: Date
    }, ExtArgs["result"]["semanticCache"]>
    composites: {}
  }

  type SemanticCacheGetPayload<S extends boolean | null | undefined | SemanticCacheDefaultArgs> = $Result.GetResult<Prisma.$SemanticCachePayload, S>

  type SemanticCacheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SemanticCacheFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SemanticCacheCountAggregateInputType | true
    }

  export interface SemanticCacheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SemanticCache'], meta: { name: 'SemanticCache' } }
    /**
     * Find zero or one SemanticCache that matches the filter.
     * @param {SemanticCacheFindUniqueArgs} args - Arguments to find a SemanticCache
     * @example
     * // Get one SemanticCache
     * const semanticCache = await prisma.semanticCache.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SemanticCacheFindUniqueArgs>(args: SelectSubset<T, SemanticCacheFindUniqueArgs<ExtArgs>>): Prisma__SemanticCacheClient<$Result.GetResult<Prisma.$SemanticCachePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SemanticCache that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SemanticCacheFindUniqueOrThrowArgs} args - Arguments to find a SemanticCache
     * @example
     * // Get one SemanticCache
     * const semanticCache = await prisma.semanticCache.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SemanticCacheFindUniqueOrThrowArgs>(args: SelectSubset<T, SemanticCacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SemanticCacheClient<$Result.GetResult<Prisma.$SemanticCachePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SemanticCache that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SemanticCacheFindFirstArgs} args - Arguments to find a SemanticCache
     * @example
     * // Get one SemanticCache
     * const semanticCache = await prisma.semanticCache.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SemanticCacheFindFirstArgs>(args?: SelectSubset<T, SemanticCacheFindFirstArgs<ExtArgs>>): Prisma__SemanticCacheClient<$Result.GetResult<Prisma.$SemanticCachePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SemanticCache that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SemanticCacheFindFirstOrThrowArgs} args - Arguments to find a SemanticCache
     * @example
     * // Get one SemanticCache
     * const semanticCache = await prisma.semanticCache.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SemanticCacheFindFirstOrThrowArgs>(args?: SelectSubset<T, SemanticCacheFindFirstOrThrowArgs<ExtArgs>>): Prisma__SemanticCacheClient<$Result.GetResult<Prisma.$SemanticCachePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SemanticCaches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SemanticCacheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SemanticCaches
     * const semanticCaches = await prisma.semanticCache.findMany()
     * 
     * // Get first 10 SemanticCaches
     * const semanticCaches = await prisma.semanticCache.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const semanticCacheWithIdOnly = await prisma.semanticCache.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SemanticCacheFindManyArgs>(args?: SelectSubset<T, SemanticCacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SemanticCachePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SemanticCache.
     * @param {SemanticCacheCreateArgs} args - Arguments to create a SemanticCache.
     * @example
     * // Create one SemanticCache
     * const SemanticCache = await prisma.semanticCache.create({
     *   data: {
     *     // ... data to create a SemanticCache
     *   }
     * })
     * 
     */
    create<T extends SemanticCacheCreateArgs>(args: SelectSubset<T, SemanticCacheCreateArgs<ExtArgs>>): Prisma__SemanticCacheClient<$Result.GetResult<Prisma.$SemanticCachePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SemanticCaches.
     * @param {SemanticCacheCreateManyArgs} args - Arguments to create many SemanticCaches.
     * @example
     * // Create many SemanticCaches
     * const semanticCache = await prisma.semanticCache.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SemanticCacheCreateManyArgs>(args?: SelectSubset<T, SemanticCacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SemanticCaches and returns the data saved in the database.
     * @param {SemanticCacheCreateManyAndReturnArgs} args - Arguments to create many SemanticCaches.
     * @example
     * // Create many SemanticCaches
     * const semanticCache = await prisma.semanticCache.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SemanticCaches and only return the `id`
     * const semanticCacheWithIdOnly = await prisma.semanticCache.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SemanticCacheCreateManyAndReturnArgs>(args?: SelectSubset<T, SemanticCacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SemanticCachePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SemanticCache.
     * @param {SemanticCacheDeleteArgs} args - Arguments to delete one SemanticCache.
     * @example
     * // Delete one SemanticCache
     * const SemanticCache = await prisma.semanticCache.delete({
     *   where: {
     *     // ... filter to delete one SemanticCache
     *   }
     * })
     * 
     */
    delete<T extends SemanticCacheDeleteArgs>(args: SelectSubset<T, SemanticCacheDeleteArgs<ExtArgs>>): Prisma__SemanticCacheClient<$Result.GetResult<Prisma.$SemanticCachePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SemanticCache.
     * @param {SemanticCacheUpdateArgs} args - Arguments to update one SemanticCache.
     * @example
     * // Update one SemanticCache
     * const semanticCache = await prisma.semanticCache.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SemanticCacheUpdateArgs>(args: SelectSubset<T, SemanticCacheUpdateArgs<ExtArgs>>): Prisma__SemanticCacheClient<$Result.GetResult<Prisma.$SemanticCachePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SemanticCaches.
     * @param {SemanticCacheDeleteManyArgs} args - Arguments to filter SemanticCaches to delete.
     * @example
     * // Delete a few SemanticCaches
     * const { count } = await prisma.semanticCache.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SemanticCacheDeleteManyArgs>(args?: SelectSubset<T, SemanticCacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SemanticCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SemanticCacheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SemanticCaches
     * const semanticCache = await prisma.semanticCache.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SemanticCacheUpdateManyArgs>(args: SelectSubset<T, SemanticCacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SemanticCache.
     * @param {SemanticCacheUpsertArgs} args - Arguments to update or create a SemanticCache.
     * @example
     * // Update or create a SemanticCache
     * const semanticCache = await prisma.semanticCache.upsert({
     *   create: {
     *     // ... data to create a SemanticCache
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SemanticCache we want to update
     *   }
     * })
     */
    upsert<T extends SemanticCacheUpsertArgs>(args: SelectSubset<T, SemanticCacheUpsertArgs<ExtArgs>>): Prisma__SemanticCacheClient<$Result.GetResult<Prisma.$SemanticCachePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SemanticCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SemanticCacheCountArgs} args - Arguments to filter SemanticCaches to count.
     * @example
     * // Count the number of SemanticCaches
     * const count = await prisma.semanticCache.count({
     *   where: {
     *     // ... the filter for the SemanticCaches we want to count
     *   }
     * })
    **/
    count<T extends SemanticCacheCountArgs>(
      args?: Subset<T, SemanticCacheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SemanticCacheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SemanticCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SemanticCacheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SemanticCacheAggregateArgs>(args: Subset<T, SemanticCacheAggregateArgs>): Prisma.PrismaPromise<GetSemanticCacheAggregateType<T>>

    /**
     * Group by SemanticCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SemanticCacheGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SemanticCacheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SemanticCacheGroupByArgs['orderBy'] }
        : { orderBy?: SemanticCacheGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SemanticCacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSemanticCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SemanticCache model
   */
  readonly fields: SemanticCacheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SemanticCache.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SemanticCacheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SemanticCache model
   */ 
  interface SemanticCacheFieldRefs {
    readonly id: FieldRef<"SemanticCache", 'String'>
    readonly query: FieldRef<"SemanticCache", 'String'>
    readonly response: FieldRef<"SemanticCache", 'String'>
    readonly hitCount: FieldRef<"SemanticCache", 'Int'>
    readonly lastHitAt: FieldRef<"SemanticCache", 'DateTime'>
    readonly createdAt: FieldRef<"SemanticCache", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SemanticCache findUnique
   */
  export type SemanticCacheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SemanticCache
     */
    select?: SemanticCacheSelect<ExtArgs> | null
    /**
     * Filter, which SemanticCache to fetch.
     */
    where: SemanticCacheWhereUniqueInput
  }

  /**
   * SemanticCache findUniqueOrThrow
   */
  export type SemanticCacheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SemanticCache
     */
    select?: SemanticCacheSelect<ExtArgs> | null
    /**
     * Filter, which SemanticCache to fetch.
     */
    where: SemanticCacheWhereUniqueInput
  }

  /**
   * SemanticCache findFirst
   */
  export type SemanticCacheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SemanticCache
     */
    select?: SemanticCacheSelect<ExtArgs> | null
    /**
     * Filter, which SemanticCache to fetch.
     */
    where?: SemanticCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SemanticCaches to fetch.
     */
    orderBy?: SemanticCacheOrderByWithRelationInput | SemanticCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SemanticCaches.
     */
    cursor?: SemanticCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SemanticCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SemanticCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SemanticCaches.
     */
    distinct?: SemanticCacheScalarFieldEnum | SemanticCacheScalarFieldEnum[]
  }

  /**
   * SemanticCache findFirstOrThrow
   */
  export type SemanticCacheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SemanticCache
     */
    select?: SemanticCacheSelect<ExtArgs> | null
    /**
     * Filter, which SemanticCache to fetch.
     */
    where?: SemanticCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SemanticCaches to fetch.
     */
    orderBy?: SemanticCacheOrderByWithRelationInput | SemanticCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SemanticCaches.
     */
    cursor?: SemanticCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SemanticCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SemanticCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SemanticCaches.
     */
    distinct?: SemanticCacheScalarFieldEnum | SemanticCacheScalarFieldEnum[]
  }

  /**
   * SemanticCache findMany
   */
  export type SemanticCacheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SemanticCache
     */
    select?: SemanticCacheSelect<ExtArgs> | null
    /**
     * Filter, which SemanticCaches to fetch.
     */
    where?: SemanticCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SemanticCaches to fetch.
     */
    orderBy?: SemanticCacheOrderByWithRelationInput | SemanticCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SemanticCaches.
     */
    cursor?: SemanticCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SemanticCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SemanticCaches.
     */
    skip?: number
    distinct?: SemanticCacheScalarFieldEnum | SemanticCacheScalarFieldEnum[]
  }

  /**
   * SemanticCache create
   */
  export type SemanticCacheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SemanticCache
     */
    select?: SemanticCacheSelect<ExtArgs> | null
    /**
     * The data needed to create a SemanticCache.
     */
    data: XOR<SemanticCacheCreateInput, SemanticCacheUncheckedCreateInput>
  }

  /**
   * SemanticCache createMany
   */
  export type SemanticCacheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SemanticCaches.
     */
    data: SemanticCacheCreateManyInput | SemanticCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SemanticCache createManyAndReturn
   */
  export type SemanticCacheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SemanticCache
     */
    select?: SemanticCacheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SemanticCaches.
     */
    data: SemanticCacheCreateManyInput | SemanticCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SemanticCache update
   */
  export type SemanticCacheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SemanticCache
     */
    select?: SemanticCacheSelect<ExtArgs> | null
    /**
     * The data needed to update a SemanticCache.
     */
    data: XOR<SemanticCacheUpdateInput, SemanticCacheUncheckedUpdateInput>
    /**
     * Choose, which SemanticCache to update.
     */
    where: SemanticCacheWhereUniqueInput
  }

  /**
   * SemanticCache updateMany
   */
  export type SemanticCacheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SemanticCaches.
     */
    data: XOR<SemanticCacheUpdateManyMutationInput, SemanticCacheUncheckedUpdateManyInput>
    /**
     * Filter which SemanticCaches to update
     */
    where?: SemanticCacheWhereInput
  }

  /**
   * SemanticCache upsert
   */
  export type SemanticCacheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SemanticCache
     */
    select?: SemanticCacheSelect<ExtArgs> | null
    /**
     * The filter to search for the SemanticCache to update in case it exists.
     */
    where: SemanticCacheWhereUniqueInput
    /**
     * In case the SemanticCache found by the `where` argument doesn't exist, create a new SemanticCache with this data.
     */
    create: XOR<SemanticCacheCreateInput, SemanticCacheUncheckedCreateInput>
    /**
     * In case the SemanticCache was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SemanticCacheUpdateInput, SemanticCacheUncheckedUpdateInput>
  }

  /**
   * SemanticCache delete
   */
  export type SemanticCacheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SemanticCache
     */
    select?: SemanticCacheSelect<ExtArgs> | null
    /**
     * Filter which SemanticCache to delete.
     */
    where: SemanticCacheWhereUniqueInput
  }

  /**
   * SemanticCache deleteMany
   */
  export type SemanticCacheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SemanticCaches to delete
     */
    where?: SemanticCacheWhereInput
  }

  /**
   * SemanticCache without action
   */
  export type SemanticCacheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SemanticCache
     */
    select?: SemanticCacheSelect<ExtArgs> | null
  }


  /**
   * Model GraphNode
   */

  export type AggregateGraphNode = {
    _count: GraphNodeCountAggregateOutputType | null
    _min: GraphNodeMinAggregateOutputType | null
    _max: GraphNodeMaxAggregateOutputType | null
  }

  export type GraphNodeMinAggregateOutputType = {
    id: string | null
    label: string | null
    name: string | null
    createdAt: Date | null
  }

  export type GraphNodeMaxAggregateOutputType = {
    id: string | null
    label: string | null
    name: string | null
    createdAt: Date | null
  }

  export type GraphNodeCountAggregateOutputType = {
    id: number
    label: number
    name: number
    properties: number
    createdAt: number
    _all: number
  }


  export type GraphNodeMinAggregateInputType = {
    id?: true
    label?: true
    name?: true
    createdAt?: true
  }

  export type GraphNodeMaxAggregateInputType = {
    id?: true
    label?: true
    name?: true
    createdAt?: true
  }

  export type GraphNodeCountAggregateInputType = {
    id?: true
    label?: true
    name?: true
    properties?: true
    createdAt?: true
    _all?: true
  }

  export type GraphNodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GraphNode to aggregate.
     */
    where?: GraphNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GraphNodes to fetch.
     */
    orderBy?: GraphNodeOrderByWithRelationInput | GraphNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GraphNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GraphNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GraphNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GraphNodes
    **/
    _count?: true | GraphNodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GraphNodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GraphNodeMaxAggregateInputType
  }

  export type GetGraphNodeAggregateType<T extends GraphNodeAggregateArgs> = {
        [P in keyof T & keyof AggregateGraphNode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGraphNode[P]>
      : GetScalarType<T[P], AggregateGraphNode[P]>
  }




  export type GraphNodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GraphNodeWhereInput
    orderBy?: GraphNodeOrderByWithAggregationInput | GraphNodeOrderByWithAggregationInput[]
    by: GraphNodeScalarFieldEnum[] | GraphNodeScalarFieldEnum
    having?: GraphNodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GraphNodeCountAggregateInputType | true
    _min?: GraphNodeMinAggregateInputType
    _max?: GraphNodeMaxAggregateInputType
  }

  export type GraphNodeGroupByOutputType = {
    id: string
    label: string
    name: string
    properties: JsonValue | null
    createdAt: Date
    _count: GraphNodeCountAggregateOutputType | null
    _min: GraphNodeMinAggregateOutputType | null
    _max: GraphNodeMaxAggregateOutputType | null
  }

  type GetGraphNodeGroupByPayload<T extends GraphNodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GraphNodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GraphNodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GraphNodeGroupByOutputType[P]>
            : GetScalarType<T[P], GraphNodeGroupByOutputType[P]>
        }
      >
    >


  export type GraphNodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    label?: boolean
    name?: boolean
    properties?: boolean
    createdAt?: boolean
    outbound?: boolean | GraphNode$outboundArgs<ExtArgs>
    inbound?: boolean | GraphNode$inboundArgs<ExtArgs>
    _count?: boolean | GraphNodeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["graphNode"]>

  export type GraphNodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    label?: boolean
    name?: boolean
    properties?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["graphNode"]>

  export type GraphNodeSelectScalar = {
    id?: boolean
    label?: boolean
    name?: boolean
    properties?: boolean
    createdAt?: boolean
  }

  export type GraphNodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    outbound?: boolean | GraphNode$outboundArgs<ExtArgs>
    inbound?: boolean | GraphNode$inboundArgs<ExtArgs>
    _count?: boolean | GraphNodeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GraphNodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GraphNodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GraphNode"
    objects: {
      outbound: Prisma.$GraphEdgePayload<ExtArgs>[]
      inbound: Prisma.$GraphEdgePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      label: string
      name: string
      properties: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["graphNode"]>
    composites: {}
  }

  type GraphNodeGetPayload<S extends boolean | null | undefined | GraphNodeDefaultArgs> = $Result.GetResult<Prisma.$GraphNodePayload, S>

  type GraphNodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GraphNodeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GraphNodeCountAggregateInputType | true
    }

  export interface GraphNodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GraphNode'], meta: { name: 'GraphNode' } }
    /**
     * Find zero or one GraphNode that matches the filter.
     * @param {GraphNodeFindUniqueArgs} args - Arguments to find a GraphNode
     * @example
     * // Get one GraphNode
     * const graphNode = await prisma.graphNode.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GraphNodeFindUniqueArgs>(args: SelectSubset<T, GraphNodeFindUniqueArgs<ExtArgs>>): Prisma__GraphNodeClient<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GraphNode that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GraphNodeFindUniqueOrThrowArgs} args - Arguments to find a GraphNode
     * @example
     * // Get one GraphNode
     * const graphNode = await prisma.graphNode.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GraphNodeFindUniqueOrThrowArgs>(args: SelectSubset<T, GraphNodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GraphNodeClient<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GraphNode that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphNodeFindFirstArgs} args - Arguments to find a GraphNode
     * @example
     * // Get one GraphNode
     * const graphNode = await prisma.graphNode.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GraphNodeFindFirstArgs>(args?: SelectSubset<T, GraphNodeFindFirstArgs<ExtArgs>>): Prisma__GraphNodeClient<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GraphNode that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphNodeFindFirstOrThrowArgs} args - Arguments to find a GraphNode
     * @example
     * // Get one GraphNode
     * const graphNode = await prisma.graphNode.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GraphNodeFindFirstOrThrowArgs>(args?: SelectSubset<T, GraphNodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__GraphNodeClient<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GraphNodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphNodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GraphNodes
     * const graphNodes = await prisma.graphNode.findMany()
     * 
     * // Get first 10 GraphNodes
     * const graphNodes = await prisma.graphNode.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const graphNodeWithIdOnly = await prisma.graphNode.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GraphNodeFindManyArgs>(args?: SelectSubset<T, GraphNodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GraphNode.
     * @param {GraphNodeCreateArgs} args - Arguments to create a GraphNode.
     * @example
     * // Create one GraphNode
     * const GraphNode = await prisma.graphNode.create({
     *   data: {
     *     // ... data to create a GraphNode
     *   }
     * })
     * 
     */
    create<T extends GraphNodeCreateArgs>(args: SelectSubset<T, GraphNodeCreateArgs<ExtArgs>>): Prisma__GraphNodeClient<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GraphNodes.
     * @param {GraphNodeCreateManyArgs} args - Arguments to create many GraphNodes.
     * @example
     * // Create many GraphNodes
     * const graphNode = await prisma.graphNode.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GraphNodeCreateManyArgs>(args?: SelectSubset<T, GraphNodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GraphNodes and returns the data saved in the database.
     * @param {GraphNodeCreateManyAndReturnArgs} args - Arguments to create many GraphNodes.
     * @example
     * // Create many GraphNodes
     * const graphNode = await prisma.graphNode.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GraphNodes and only return the `id`
     * const graphNodeWithIdOnly = await prisma.graphNode.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GraphNodeCreateManyAndReturnArgs>(args?: SelectSubset<T, GraphNodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GraphNode.
     * @param {GraphNodeDeleteArgs} args - Arguments to delete one GraphNode.
     * @example
     * // Delete one GraphNode
     * const GraphNode = await prisma.graphNode.delete({
     *   where: {
     *     // ... filter to delete one GraphNode
     *   }
     * })
     * 
     */
    delete<T extends GraphNodeDeleteArgs>(args: SelectSubset<T, GraphNodeDeleteArgs<ExtArgs>>): Prisma__GraphNodeClient<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GraphNode.
     * @param {GraphNodeUpdateArgs} args - Arguments to update one GraphNode.
     * @example
     * // Update one GraphNode
     * const graphNode = await prisma.graphNode.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GraphNodeUpdateArgs>(args: SelectSubset<T, GraphNodeUpdateArgs<ExtArgs>>): Prisma__GraphNodeClient<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GraphNodes.
     * @param {GraphNodeDeleteManyArgs} args - Arguments to filter GraphNodes to delete.
     * @example
     * // Delete a few GraphNodes
     * const { count } = await prisma.graphNode.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GraphNodeDeleteManyArgs>(args?: SelectSubset<T, GraphNodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GraphNodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphNodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GraphNodes
     * const graphNode = await prisma.graphNode.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GraphNodeUpdateManyArgs>(args: SelectSubset<T, GraphNodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GraphNode.
     * @param {GraphNodeUpsertArgs} args - Arguments to update or create a GraphNode.
     * @example
     * // Update or create a GraphNode
     * const graphNode = await prisma.graphNode.upsert({
     *   create: {
     *     // ... data to create a GraphNode
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GraphNode we want to update
     *   }
     * })
     */
    upsert<T extends GraphNodeUpsertArgs>(args: SelectSubset<T, GraphNodeUpsertArgs<ExtArgs>>): Prisma__GraphNodeClient<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GraphNodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphNodeCountArgs} args - Arguments to filter GraphNodes to count.
     * @example
     * // Count the number of GraphNodes
     * const count = await prisma.graphNode.count({
     *   where: {
     *     // ... the filter for the GraphNodes we want to count
     *   }
     * })
    **/
    count<T extends GraphNodeCountArgs>(
      args?: Subset<T, GraphNodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GraphNodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GraphNode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphNodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GraphNodeAggregateArgs>(args: Subset<T, GraphNodeAggregateArgs>): Prisma.PrismaPromise<GetGraphNodeAggregateType<T>>

    /**
     * Group by GraphNode.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphNodeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GraphNodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GraphNodeGroupByArgs['orderBy'] }
        : { orderBy?: GraphNodeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GraphNodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGraphNodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GraphNode model
   */
  readonly fields: GraphNodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GraphNode.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GraphNodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    outbound<T extends GraphNode$outboundArgs<ExtArgs> = {}>(args?: Subset<T, GraphNode$outboundArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "findMany"> | Null>
    inbound<T extends GraphNode$inboundArgs<ExtArgs> = {}>(args?: Subset<T, GraphNode$inboundArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GraphNode model
   */ 
  interface GraphNodeFieldRefs {
    readonly id: FieldRef<"GraphNode", 'String'>
    readonly label: FieldRef<"GraphNode", 'String'>
    readonly name: FieldRef<"GraphNode", 'String'>
    readonly properties: FieldRef<"GraphNode", 'Json'>
    readonly createdAt: FieldRef<"GraphNode", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GraphNode findUnique
   */
  export type GraphNodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
    /**
     * Filter, which GraphNode to fetch.
     */
    where: GraphNodeWhereUniqueInput
  }

  /**
   * GraphNode findUniqueOrThrow
   */
  export type GraphNodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
    /**
     * Filter, which GraphNode to fetch.
     */
    where: GraphNodeWhereUniqueInput
  }

  /**
   * GraphNode findFirst
   */
  export type GraphNodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
    /**
     * Filter, which GraphNode to fetch.
     */
    where?: GraphNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GraphNodes to fetch.
     */
    orderBy?: GraphNodeOrderByWithRelationInput | GraphNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GraphNodes.
     */
    cursor?: GraphNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GraphNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GraphNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GraphNodes.
     */
    distinct?: GraphNodeScalarFieldEnum | GraphNodeScalarFieldEnum[]
  }

  /**
   * GraphNode findFirstOrThrow
   */
  export type GraphNodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
    /**
     * Filter, which GraphNode to fetch.
     */
    where?: GraphNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GraphNodes to fetch.
     */
    orderBy?: GraphNodeOrderByWithRelationInput | GraphNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GraphNodes.
     */
    cursor?: GraphNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GraphNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GraphNodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GraphNodes.
     */
    distinct?: GraphNodeScalarFieldEnum | GraphNodeScalarFieldEnum[]
  }

  /**
   * GraphNode findMany
   */
  export type GraphNodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
    /**
     * Filter, which GraphNodes to fetch.
     */
    where?: GraphNodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GraphNodes to fetch.
     */
    orderBy?: GraphNodeOrderByWithRelationInput | GraphNodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GraphNodes.
     */
    cursor?: GraphNodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GraphNodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GraphNodes.
     */
    skip?: number
    distinct?: GraphNodeScalarFieldEnum | GraphNodeScalarFieldEnum[]
  }

  /**
   * GraphNode create
   */
  export type GraphNodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
    /**
     * The data needed to create a GraphNode.
     */
    data: XOR<GraphNodeCreateInput, GraphNodeUncheckedCreateInput>
  }

  /**
   * GraphNode createMany
   */
  export type GraphNodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GraphNodes.
     */
    data: GraphNodeCreateManyInput | GraphNodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GraphNode createManyAndReturn
   */
  export type GraphNodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GraphNodes.
     */
    data: GraphNodeCreateManyInput | GraphNodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GraphNode update
   */
  export type GraphNodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
    /**
     * The data needed to update a GraphNode.
     */
    data: XOR<GraphNodeUpdateInput, GraphNodeUncheckedUpdateInput>
    /**
     * Choose, which GraphNode to update.
     */
    where: GraphNodeWhereUniqueInput
  }

  /**
   * GraphNode updateMany
   */
  export type GraphNodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GraphNodes.
     */
    data: XOR<GraphNodeUpdateManyMutationInput, GraphNodeUncheckedUpdateManyInput>
    /**
     * Filter which GraphNodes to update
     */
    where?: GraphNodeWhereInput
  }

  /**
   * GraphNode upsert
   */
  export type GraphNodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
    /**
     * The filter to search for the GraphNode to update in case it exists.
     */
    where: GraphNodeWhereUniqueInput
    /**
     * In case the GraphNode found by the `where` argument doesn't exist, create a new GraphNode with this data.
     */
    create: XOR<GraphNodeCreateInput, GraphNodeUncheckedCreateInput>
    /**
     * In case the GraphNode was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GraphNodeUpdateInput, GraphNodeUncheckedUpdateInput>
  }

  /**
   * GraphNode delete
   */
  export type GraphNodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
    /**
     * Filter which GraphNode to delete.
     */
    where: GraphNodeWhereUniqueInput
  }

  /**
   * GraphNode deleteMany
   */
  export type GraphNodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GraphNodes to delete
     */
    where?: GraphNodeWhereInput
  }

  /**
   * GraphNode.outbound
   */
  export type GraphNode$outboundArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    where?: GraphEdgeWhereInput
    orderBy?: GraphEdgeOrderByWithRelationInput | GraphEdgeOrderByWithRelationInput[]
    cursor?: GraphEdgeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GraphEdgeScalarFieldEnum | GraphEdgeScalarFieldEnum[]
  }

  /**
   * GraphNode.inbound
   */
  export type GraphNode$inboundArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    where?: GraphEdgeWhereInput
    orderBy?: GraphEdgeOrderByWithRelationInput | GraphEdgeOrderByWithRelationInput[]
    cursor?: GraphEdgeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: GraphEdgeScalarFieldEnum | GraphEdgeScalarFieldEnum[]
  }

  /**
   * GraphNode without action
   */
  export type GraphNodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphNode
     */
    select?: GraphNodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphNodeInclude<ExtArgs> | null
  }


  /**
   * Model GraphEdge
   */

  export type AggregateGraphEdge = {
    _count: GraphEdgeCountAggregateOutputType | null
    _avg: GraphEdgeAvgAggregateOutputType | null
    _sum: GraphEdgeSumAggregateOutputType | null
    _min: GraphEdgeMinAggregateOutputType | null
    _max: GraphEdgeMaxAggregateOutputType | null
  }

  export type GraphEdgeAvgAggregateOutputType = {
    weight: number | null
  }

  export type GraphEdgeSumAggregateOutputType = {
    weight: number | null
  }

  export type GraphEdgeMinAggregateOutputType = {
    id: string | null
    type: string | null
    sourceId: string | null
    targetId: string | null
    weight: number | null
    createdAt: Date | null
  }

  export type GraphEdgeMaxAggregateOutputType = {
    id: string | null
    type: string | null
    sourceId: string | null
    targetId: string | null
    weight: number | null
    createdAt: Date | null
  }

  export type GraphEdgeCountAggregateOutputType = {
    id: number
    type: number
    properties: number
    sourceId: number
    targetId: number
    weight: number
    createdAt: number
    _all: number
  }


  export type GraphEdgeAvgAggregateInputType = {
    weight?: true
  }

  export type GraphEdgeSumAggregateInputType = {
    weight?: true
  }

  export type GraphEdgeMinAggregateInputType = {
    id?: true
    type?: true
    sourceId?: true
    targetId?: true
    weight?: true
    createdAt?: true
  }

  export type GraphEdgeMaxAggregateInputType = {
    id?: true
    type?: true
    sourceId?: true
    targetId?: true
    weight?: true
    createdAt?: true
  }

  export type GraphEdgeCountAggregateInputType = {
    id?: true
    type?: true
    properties?: true
    sourceId?: true
    targetId?: true
    weight?: true
    createdAt?: true
    _all?: true
  }

  export type GraphEdgeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GraphEdge to aggregate.
     */
    where?: GraphEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GraphEdges to fetch.
     */
    orderBy?: GraphEdgeOrderByWithRelationInput | GraphEdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GraphEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GraphEdges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GraphEdges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GraphEdges
    **/
    _count?: true | GraphEdgeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GraphEdgeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GraphEdgeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GraphEdgeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GraphEdgeMaxAggregateInputType
  }

  export type GetGraphEdgeAggregateType<T extends GraphEdgeAggregateArgs> = {
        [P in keyof T & keyof AggregateGraphEdge]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGraphEdge[P]>
      : GetScalarType<T[P], AggregateGraphEdge[P]>
  }




  export type GraphEdgeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GraphEdgeWhereInput
    orderBy?: GraphEdgeOrderByWithAggregationInput | GraphEdgeOrderByWithAggregationInput[]
    by: GraphEdgeScalarFieldEnum[] | GraphEdgeScalarFieldEnum
    having?: GraphEdgeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GraphEdgeCountAggregateInputType | true
    _avg?: GraphEdgeAvgAggregateInputType
    _sum?: GraphEdgeSumAggregateInputType
    _min?: GraphEdgeMinAggregateInputType
    _max?: GraphEdgeMaxAggregateInputType
  }

  export type GraphEdgeGroupByOutputType = {
    id: string
    type: string
    properties: JsonValue | null
    sourceId: string
    targetId: string
    weight: number
    createdAt: Date
    _count: GraphEdgeCountAggregateOutputType | null
    _avg: GraphEdgeAvgAggregateOutputType | null
    _sum: GraphEdgeSumAggregateOutputType | null
    _min: GraphEdgeMinAggregateOutputType | null
    _max: GraphEdgeMaxAggregateOutputType | null
  }

  type GetGraphEdgeGroupByPayload<T extends GraphEdgeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GraphEdgeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GraphEdgeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GraphEdgeGroupByOutputType[P]>
            : GetScalarType<T[P], GraphEdgeGroupByOutputType[P]>
        }
      >
    >


  export type GraphEdgeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    properties?: boolean
    sourceId?: boolean
    targetId?: boolean
    weight?: boolean
    createdAt?: boolean
    source?: boolean | GraphNodeDefaultArgs<ExtArgs>
    target?: boolean | GraphNodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["graphEdge"]>

  export type GraphEdgeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    properties?: boolean
    sourceId?: boolean
    targetId?: boolean
    weight?: boolean
    createdAt?: boolean
    source?: boolean | GraphNodeDefaultArgs<ExtArgs>
    target?: boolean | GraphNodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["graphEdge"]>

  export type GraphEdgeSelectScalar = {
    id?: boolean
    type?: boolean
    properties?: boolean
    sourceId?: boolean
    targetId?: boolean
    weight?: boolean
    createdAt?: boolean
  }

  export type GraphEdgeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | GraphNodeDefaultArgs<ExtArgs>
    target?: boolean | GraphNodeDefaultArgs<ExtArgs>
  }
  export type GraphEdgeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    source?: boolean | GraphNodeDefaultArgs<ExtArgs>
    target?: boolean | GraphNodeDefaultArgs<ExtArgs>
  }

  export type $GraphEdgePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GraphEdge"
    objects: {
      source: Prisma.$GraphNodePayload<ExtArgs>
      target: Prisma.$GraphNodePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      properties: Prisma.JsonValue | null
      sourceId: string
      targetId: string
      weight: number
      createdAt: Date
    }, ExtArgs["result"]["graphEdge"]>
    composites: {}
  }

  type GraphEdgeGetPayload<S extends boolean | null | undefined | GraphEdgeDefaultArgs> = $Result.GetResult<Prisma.$GraphEdgePayload, S>

  type GraphEdgeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GraphEdgeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GraphEdgeCountAggregateInputType | true
    }

  export interface GraphEdgeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GraphEdge'], meta: { name: 'GraphEdge' } }
    /**
     * Find zero or one GraphEdge that matches the filter.
     * @param {GraphEdgeFindUniqueArgs} args - Arguments to find a GraphEdge
     * @example
     * // Get one GraphEdge
     * const graphEdge = await prisma.graphEdge.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GraphEdgeFindUniqueArgs>(args: SelectSubset<T, GraphEdgeFindUniqueArgs<ExtArgs>>): Prisma__GraphEdgeClient<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GraphEdge that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GraphEdgeFindUniqueOrThrowArgs} args - Arguments to find a GraphEdge
     * @example
     * // Get one GraphEdge
     * const graphEdge = await prisma.graphEdge.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GraphEdgeFindUniqueOrThrowArgs>(args: SelectSubset<T, GraphEdgeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GraphEdgeClient<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GraphEdge that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphEdgeFindFirstArgs} args - Arguments to find a GraphEdge
     * @example
     * // Get one GraphEdge
     * const graphEdge = await prisma.graphEdge.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GraphEdgeFindFirstArgs>(args?: SelectSubset<T, GraphEdgeFindFirstArgs<ExtArgs>>): Prisma__GraphEdgeClient<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GraphEdge that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphEdgeFindFirstOrThrowArgs} args - Arguments to find a GraphEdge
     * @example
     * // Get one GraphEdge
     * const graphEdge = await prisma.graphEdge.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GraphEdgeFindFirstOrThrowArgs>(args?: SelectSubset<T, GraphEdgeFindFirstOrThrowArgs<ExtArgs>>): Prisma__GraphEdgeClient<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GraphEdges that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphEdgeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GraphEdges
     * const graphEdges = await prisma.graphEdge.findMany()
     * 
     * // Get first 10 GraphEdges
     * const graphEdges = await prisma.graphEdge.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const graphEdgeWithIdOnly = await prisma.graphEdge.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GraphEdgeFindManyArgs>(args?: SelectSubset<T, GraphEdgeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GraphEdge.
     * @param {GraphEdgeCreateArgs} args - Arguments to create a GraphEdge.
     * @example
     * // Create one GraphEdge
     * const GraphEdge = await prisma.graphEdge.create({
     *   data: {
     *     // ... data to create a GraphEdge
     *   }
     * })
     * 
     */
    create<T extends GraphEdgeCreateArgs>(args: SelectSubset<T, GraphEdgeCreateArgs<ExtArgs>>): Prisma__GraphEdgeClient<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GraphEdges.
     * @param {GraphEdgeCreateManyArgs} args - Arguments to create many GraphEdges.
     * @example
     * // Create many GraphEdges
     * const graphEdge = await prisma.graphEdge.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GraphEdgeCreateManyArgs>(args?: SelectSubset<T, GraphEdgeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GraphEdges and returns the data saved in the database.
     * @param {GraphEdgeCreateManyAndReturnArgs} args - Arguments to create many GraphEdges.
     * @example
     * // Create many GraphEdges
     * const graphEdge = await prisma.graphEdge.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GraphEdges and only return the `id`
     * const graphEdgeWithIdOnly = await prisma.graphEdge.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GraphEdgeCreateManyAndReturnArgs>(args?: SelectSubset<T, GraphEdgeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GraphEdge.
     * @param {GraphEdgeDeleteArgs} args - Arguments to delete one GraphEdge.
     * @example
     * // Delete one GraphEdge
     * const GraphEdge = await prisma.graphEdge.delete({
     *   where: {
     *     // ... filter to delete one GraphEdge
     *   }
     * })
     * 
     */
    delete<T extends GraphEdgeDeleteArgs>(args: SelectSubset<T, GraphEdgeDeleteArgs<ExtArgs>>): Prisma__GraphEdgeClient<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GraphEdge.
     * @param {GraphEdgeUpdateArgs} args - Arguments to update one GraphEdge.
     * @example
     * // Update one GraphEdge
     * const graphEdge = await prisma.graphEdge.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GraphEdgeUpdateArgs>(args: SelectSubset<T, GraphEdgeUpdateArgs<ExtArgs>>): Prisma__GraphEdgeClient<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GraphEdges.
     * @param {GraphEdgeDeleteManyArgs} args - Arguments to filter GraphEdges to delete.
     * @example
     * // Delete a few GraphEdges
     * const { count } = await prisma.graphEdge.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GraphEdgeDeleteManyArgs>(args?: SelectSubset<T, GraphEdgeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GraphEdges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphEdgeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GraphEdges
     * const graphEdge = await prisma.graphEdge.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GraphEdgeUpdateManyArgs>(args: SelectSubset<T, GraphEdgeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GraphEdge.
     * @param {GraphEdgeUpsertArgs} args - Arguments to update or create a GraphEdge.
     * @example
     * // Update or create a GraphEdge
     * const graphEdge = await prisma.graphEdge.upsert({
     *   create: {
     *     // ... data to create a GraphEdge
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GraphEdge we want to update
     *   }
     * })
     */
    upsert<T extends GraphEdgeUpsertArgs>(args: SelectSubset<T, GraphEdgeUpsertArgs<ExtArgs>>): Prisma__GraphEdgeClient<$Result.GetResult<Prisma.$GraphEdgePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GraphEdges.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphEdgeCountArgs} args - Arguments to filter GraphEdges to count.
     * @example
     * // Count the number of GraphEdges
     * const count = await prisma.graphEdge.count({
     *   where: {
     *     // ... the filter for the GraphEdges we want to count
     *   }
     * })
    **/
    count<T extends GraphEdgeCountArgs>(
      args?: Subset<T, GraphEdgeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GraphEdgeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GraphEdge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphEdgeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GraphEdgeAggregateArgs>(args: Subset<T, GraphEdgeAggregateArgs>): Prisma.PrismaPromise<GetGraphEdgeAggregateType<T>>

    /**
     * Group by GraphEdge.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GraphEdgeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GraphEdgeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GraphEdgeGroupByArgs['orderBy'] }
        : { orderBy?: GraphEdgeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GraphEdgeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGraphEdgeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GraphEdge model
   */
  readonly fields: GraphEdgeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GraphEdge.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GraphEdgeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    source<T extends GraphNodeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GraphNodeDefaultArgs<ExtArgs>>): Prisma__GraphNodeClient<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    target<T extends GraphNodeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GraphNodeDefaultArgs<ExtArgs>>): Prisma__GraphNodeClient<$Result.GetResult<Prisma.$GraphNodePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GraphEdge model
   */ 
  interface GraphEdgeFieldRefs {
    readonly id: FieldRef<"GraphEdge", 'String'>
    readonly type: FieldRef<"GraphEdge", 'String'>
    readonly properties: FieldRef<"GraphEdge", 'Json'>
    readonly sourceId: FieldRef<"GraphEdge", 'String'>
    readonly targetId: FieldRef<"GraphEdge", 'String'>
    readonly weight: FieldRef<"GraphEdge", 'Float'>
    readonly createdAt: FieldRef<"GraphEdge", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GraphEdge findUnique
   */
  export type GraphEdgeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    /**
     * Filter, which GraphEdge to fetch.
     */
    where: GraphEdgeWhereUniqueInput
  }

  /**
   * GraphEdge findUniqueOrThrow
   */
  export type GraphEdgeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    /**
     * Filter, which GraphEdge to fetch.
     */
    where: GraphEdgeWhereUniqueInput
  }

  /**
   * GraphEdge findFirst
   */
  export type GraphEdgeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    /**
     * Filter, which GraphEdge to fetch.
     */
    where?: GraphEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GraphEdges to fetch.
     */
    orderBy?: GraphEdgeOrderByWithRelationInput | GraphEdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GraphEdges.
     */
    cursor?: GraphEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GraphEdges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GraphEdges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GraphEdges.
     */
    distinct?: GraphEdgeScalarFieldEnum | GraphEdgeScalarFieldEnum[]
  }

  /**
   * GraphEdge findFirstOrThrow
   */
  export type GraphEdgeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    /**
     * Filter, which GraphEdge to fetch.
     */
    where?: GraphEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GraphEdges to fetch.
     */
    orderBy?: GraphEdgeOrderByWithRelationInput | GraphEdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GraphEdges.
     */
    cursor?: GraphEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GraphEdges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GraphEdges.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GraphEdges.
     */
    distinct?: GraphEdgeScalarFieldEnum | GraphEdgeScalarFieldEnum[]
  }

  /**
   * GraphEdge findMany
   */
  export type GraphEdgeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    /**
     * Filter, which GraphEdges to fetch.
     */
    where?: GraphEdgeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GraphEdges to fetch.
     */
    orderBy?: GraphEdgeOrderByWithRelationInput | GraphEdgeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GraphEdges.
     */
    cursor?: GraphEdgeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GraphEdges from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GraphEdges.
     */
    skip?: number
    distinct?: GraphEdgeScalarFieldEnum | GraphEdgeScalarFieldEnum[]
  }

  /**
   * GraphEdge create
   */
  export type GraphEdgeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    /**
     * The data needed to create a GraphEdge.
     */
    data: XOR<GraphEdgeCreateInput, GraphEdgeUncheckedCreateInput>
  }

  /**
   * GraphEdge createMany
   */
  export type GraphEdgeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GraphEdges.
     */
    data: GraphEdgeCreateManyInput | GraphEdgeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GraphEdge createManyAndReturn
   */
  export type GraphEdgeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GraphEdges.
     */
    data: GraphEdgeCreateManyInput | GraphEdgeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GraphEdge update
   */
  export type GraphEdgeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    /**
     * The data needed to update a GraphEdge.
     */
    data: XOR<GraphEdgeUpdateInput, GraphEdgeUncheckedUpdateInput>
    /**
     * Choose, which GraphEdge to update.
     */
    where: GraphEdgeWhereUniqueInput
  }

  /**
   * GraphEdge updateMany
   */
  export type GraphEdgeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GraphEdges.
     */
    data: XOR<GraphEdgeUpdateManyMutationInput, GraphEdgeUncheckedUpdateManyInput>
    /**
     * Filter which GraphEdges to update
     */
    where?: GraphEdgeWhereInput
  }

  /**
   * GraphEdge upsert
   */
  export type GraphEdgeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    /**
     * The filter to search for the GraphEdge to update in case it exists.
     */
    where: GraphEdgeWhereUniqueInput
    /**
     * In case the GraphEdge found by the `where` argument doesn't exist, create a new GraphEdge with this data.
     */
    create: XOR<GraphEdgeCreateInput, GraphEdgeUncheckedCreateInput>
    /**
     * In case the GraphEdge was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GraphEdgeUpdateInput, GraphEdgeUncheckedUpdateInput>
  }

  /**
   * GraphEdge delete
   */
  export type GraphEdgeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
    /**
     * Filter which GraphEdge to delete.
     */
    where: GraphEdgeWhereUniqueInput
  }

  /**
   * GraphEdge deleteMany
   */
  export type GraphEdgeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GraphEdges to delete
     */
    where?: GraphEdgeWhereInput
  }

  /**
   * GraphEdge without action
   */
  export type GraphEdgeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GraphEdge
     */
    select?: GraphEdgeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GraphEdgeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const EdintelMediaScalarFieldEnum: {
    id: 'id',
    fileName: 'fileName',
    url: 'url',
    mediaType: 'mediaType',
    size: 'size',
    uploadedAt: 'uploadedAt'
  };

  export type EdintelMediaScalarFieldEnum = (typeof EdintelMediaScalarFieldEnum)[keyof typeof EdintelMediaScalarFieldEnum]


  export const TierScalarFieldEnum: {
    id: 'id',
    name: 'name',
    signupPrice: 'signupPrice',
    description: 'description'
  };

  export type TierScalarFieldEnum = (typeof TierScalarFieldEnum)[keyof typeof TierScalarFieldEnum]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const OrganizationScalarFieldEnum: {
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

  export type OrganizationScalarFieldEnum = (typeof OrganizationScalarFieldEnum)[keyof typeof OrganizationScalarFieldEnum]


  export const AvatarSessionScalarFieldEnum: {
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

  export type AvatarSessionScalarFieldEnum = (typeof AvatarSessionScalarFieldEnum)[keyof typeof AvatarSessionScalarFieldEnum]


  export const EvidenceFolderScalarFieldEnum: {
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

  export type EvidenceFolderScalarFieldEnum = (typeof EvidenceFolderScalarFieldEnum)[keyof typeof EvidenceFolderScalarFieldEnum]


  export const ObservationScalarFieldEnum: {
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

  export type ObservationScalarFieldEnum = (typeof ObservationScalarFieldEnum)[keyof typeof ObservationScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
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

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const GenerationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    generatorId: 'generatorId',
    prompt: 'prompt',
    content: 'content',
    professorVideoUrl: 'professorVideoUrl',
    avatarEngine: 'avatarEngine',
    createdAt: 'createdAt'
  };

  export type GenerationScalarFieldEnum = (typeof GenerationScalarFieldEnum)[keyof typeof GenerationScalarFieldEnum]


  export const AnalyticsEventScalarFieldEnum: {
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

  export type AnalyticsEventScalarFieldEnum = (typeof AnalyticsEventScalarFieldEnum)[keyof typeof AnalyticsEventScalarFieldEnum]


  export const SemanticCacheScalarFieldEnum: {
    id: 'id',
    query: 'query',
    response: 'response',
    hitCount: 'hitCount',
    lastHitAt: 'lastHitAt',
    createdAt: 'createdAt'
  };

  export type SemanticCacheScalarFieldEnum = (typeof SemanticCacheScalarFieldEnum)[keyof typeof SemanticCacheScalarFieldEnum]


  export const GraphNodeScalarFieldEnum: {
    id: 'id',
    label: 'label',
    name: 'name',
    properties: 'properties',
    createdAt: 'createdAt'
  };

  export type GraphNodeScalarFieldEnum = (typeof GraphNodeScalarFieldEnum)[keyof typeof GraphNodeScalarFieldEnum]


  export const GraphEdgeScalarFieldEnum: {
    id: 'id',
    type: 'type',
    properties: 'properties',
    sourceId: 'sourceId',
    targetId: 'targetId',
    weight: 'weight',
    createdAt: 'createdAt'
  };

  export type GraphEdgeScalarFieldEnum = (typeof GraphEdgeScalarFieldEnum)[keyof typeof GraphEdgeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    
  /**
   * Deep Input Types
   */


  export type EdintelMediaWhereInput = {
    AND?: EdintelMediaWhereInput | EdintelMediaWhereInput[]
    OR?: EdintelMediaWhereInput[]
    NOT?: EdintelMediaWhereInput | EdintelMediaWhereInput[]
    id?: StringFilter<"EdintelMedia"> | string
    fileName?: StringFilter<"EdintelMedia"> | string
    url?: StringFilter<"EdintelMedia"> | string
    mediaType?: StringFilter<"EdintelMedia"> | string
    size?: IntFilter<"EdintelMedia"> | number
    uploadedAt?: DateTimeFilter<"EdintelMedia"> | Date | string
  }

  export type EdintelMediaOrderByWithRelationInput = {
    id?: SortOrder
    fileName?: SortOrder
    url?: SortOrder
    mediaType?: SortOrder
    size?: SortOrder
    uploadedAt?: SortOrder
  }

  export type EdintelMediaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    url?: string
    AND?: EdintelMediaWhereInput | EdintelMediaWhereInput[]
    OR?: EdintelMediaWhereInput[]
    NOT?: EdintelMediaWhereInput | EdintelMediaWhereInput[]
    fileName?: StringFilter<"EdintelMedia"> | string
    mediaType?: StringFilter<"EdintelMedia"> | string
    size?: IntFilter<"EdintelMedia"> | number
    uploadedAt?: DateTimeFilter<"EdintelMedia"> | Date | string
  }, "id" | "url">

  export type EdintelMediaOrderByWithAggregationInput = {
    id?: SortOrder
    fileName?: SortOrder
    url?: SortOrder
    mediaType?: SortOrder
    size?: SortOrder
    uploadedAt?: SortOrder
    _count?: EdintelMediaCountOrderByAggregateInput
    _avg?: EdintelMediaAvgOrderByAggregateInput
    _max?: EdintelMediaMaxOrderByAggregateInput
    _min?: EdintelMediaMinOrderByAggregateInput
    _sum?: EdintelMediaSumOrderByAggregateInput
  }

  export type EdintelMediaScalarWhereWithAggregatesInput = {
    AND?: EdintelMediaScalarWhereWithAggregatesInput | EdintelMediaScalarWhereWithAggregatesInput[]
    OR?: EdintelMediaScalarWhereWithAggregatesInput[]
    NOT?: EdintelMediaScalarWhereWithAggregatesInput | EdintelMediaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EdintelMedia"> | string
    fileName?: StringWithAggregatesFilter<"EdintelMedia"> | string
    url?: StringWithAggregatesFilter<"EdintelMedia"> | string
    mediaType?: StringWithAggregatesFilter<"EdintelMedia"> | string
    size?: IntWithAggregatesFilter<"EdintelMedia"> | number
    uploadedAt?: DateTimeWithAggregatesFilter<"EdintelMedia"> | Date | string
  }

  export type TierWhereInput = {
    AND?: TierWhereInput | TierWhereInput[]
    OR?: TierWhereInput[]
    NOT?: TierWhereInput | TierWhereInput[]
    id?: StringFilter<"Tier"> | string
    name?: StringFilter<"Tier"> | string
    signupPrice?: FloatFilter<"Tier"> | number
    description?: StringNullableFilter<"Tier"> | string | null
    users?: UserListRelationFilter
  }

  export type TierOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    signupPrice?: SortOrder
    description?: SortOrderInput | SortOrder
    users?: UserOrderByRelationAggregateInput
  }

  export type TierWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: TierWhereInput | TierWhereInput[]
    OR?: TierWhereInput[]
    NOT?: TierWhereInput | TierWhereInput[]
    signupPrice?: FloatFilter<"Tier"> | number
    description?: StringNullableFilter<"Tier"> | string | null
    users?: UserListRelationFilter
  }, "id" | "name">

  export type TierOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    signupPrice?: SortOrder
    description?: SortOrderInput | SortOrder
    _count?: TierCountOrderByAggregateInput
    _avg?: TierAvgOrderByAggregateInput
    _max?: TierMaxOrderByAggregateInput
    _min?: TierMinOrderByAggregateInput
    _sum?: TierSumOrderByAggregateInput
  }

  export type TierScalarWhereWithAggregatesInput = {
    AND?: TierScalarWhereWithAggregatesInput | TierScalarWhereWithAggregatesInput[]
    OR?: TierScalarWhereWithAggregatesInput[]
    NOT?: TierScalarWhereWithAggregatesInput | TierScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Tier"> | string
    name?: StringWithAggregatesFilter<"Tier"> | string
    signupPrice?: FloatWithAggregatesFilter<"Tier"> | number
    description?: StringNullableWithAggregatesFilter<"Tier"> | string | null
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    district?: StringNullableFilter<"User"> | string | null
    school?: StringNullableFilter<"User"> | string | null
    schoolSite?: StringNullableFilter<"User"> | string | null
    position?: StringNullableFilter<"User"> | string | null
    organizationId?: StringNullableFilter<"User"> | string | null
    stripeCustomerId?: StringNullableFilter<"User"> | string | null
    subscriptionTier?: StringFilter<"User"> | string
    subscriptionStatus?: StringFilter<"User"> | string
    usageTokens?: IntFilter<"User"> | number
    xpPoints?: IntFilter<"User"> | number
    trialStartedAt?: DateTimeFilter<"User"> | Date | string
    trialEndsAt?: DateTimeNullableFilter<"User"> | Date | string | null
    isTrialConverted?: BoolFilter<"User"> | boolean
    tierId?: StringNullableFilter<"User"> | string | null
    googleId?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    subscriptionId?: StringNullableFilter<"User"> | string | null
    lastPaymentAt?: DateTimeNullableFilter<"User"> | Date | string | null
    organization?: XOR<OrganizationNullableRelationFilter, OrganizationWhereInput> | null
    tier?: XOR<TierNullableRelationFilter, TierWhereInput> | null
    generations?: GenerationListRelationFilter
    observations?: ObservationListRelationFilter
    evidenceFolders?: EvidenceFolderListRelationFilter
    avatarSessions?: AvatarSessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    district?: SortOrderInput | SortOrder
    school?: SortOrderInput | SortOrder
    schoolSite?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    organizationId?: SortOrderInput | SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    subscriptionTier?: SortOrder
    subscriptionStatus?: SortOrder
    usageTokens?: SortOrder
    xpPoints?: SortOrder
    trialStartedAt?: SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    isTrialConverted?: SortOrder
    tierId?: SortOrderInput | SortOrder
    googleId?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    subscriptionId?: SortOrderInput | SortOrder
    lastPaymentAt?: SortOrderInput | SortOrder
    organization?: OrganizationOrderByWithRelationInput
    tier?: TierOrderByWithRelationInput
    generations?: GenerationOrderByRelationAggregateInput
    observations?: ObservationOrderByRelationAggregateInput
    evidenceFolders?: EvidenceFolderOrderByRelationAggregateInput
    avatarSessions?: AvatarSessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    stripeCustomerId?: string
    googleId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    district?: StringNullableFilter<"User"> | string | null
    school?: StringNullableFilter<"User"> | string | null
    schoolSite?: StringNullableFilter<"User"> | string | null
    position?: StringNullableFilter<"User"> | string | null
    organizationId?: StringNullableFilter<"User"> | string | null
    subscriptionTier?: StringFilter<"User"> | string
    subscriptionStatus?: StringFilter<"User"> | string
    usageTokens?: IntFilter<"User"> | number
    xpPoints?: IntFilter<"User"> | number
    trialStartedAt?: DateTimeFilter<"User"> | Date | string
    trialEndsAt?: DateTimeNullableFilter<"User"> | Date | string | null
    isTrialConverted?: BoolFilter<"User"> | boolean
    tierId?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    subscriptionId?: StringNullableFilter<"User"> | string | null
    lastPaymentAt?: DateTimeNullableFilter<"User"> | Date | string | null
    organization?: XOR<OrganizationNullableRelationFilter, OrganizationWhereInput> | null
    tier?: XOR<TierNullableRelationFilter, TierWhereInput> | null
    generations?: GenerationListRelationFilter
    observations?: ObservationListRelationFilter
    evidenceFolders?: EvidenceFolderListRelationFilter
    avatarSessions?: AvatarSessionListRelationFilter
  }, "id" | "email" | "stripeCustomerId" | "googleId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    role?: SortOrder
    district?: SortOrderInput | SortOrder
    school?: SortOrderInput | SortOrder
    schoolSite?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    organizationId?: SortOrderInput | SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    subscriptionTier?: SortOrder
    subscriptionStatus?: SortOrder
    usageTokens?: SortOrder
    xpPoints?: SortOrder
    trialStartedAt?: SortOrder
    trialEndsAt?: SortOrderInput | SortOrder
    isTrialConverted?: SortOrder
    tierId?: SortOrderInput | SortOrder
    googleId?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    passwordHash?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    subscriptionId?: SortOrderInput | SortOrder
    lastPaymentAt?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    district?: StringNullableWithAggregatesFilter<"User"> | string | null
    school?: StringNullableWithAggregatesFilter<"User"> | string | null
    schoolSite?: StringNullableWithAggregatesFilter<"User"> | string | null
    position?: StringNullableWithAggregatesFilter<"User"> | string | null
    organizationId?: StringNullableWithAggregatesFilter<"User"> | string | null
    stripeCustomerId?: StringNullableWithAggregatesFilter<"User"> | string | null
    subscriptionTier?: StringWithAggregatesFilter<"User"> | string
    subscriptionStatus?: StringWithAggregatesFilter<"User"> | string
    usageTokens?: IntWithAggregatesFilter<"User"> | number
    xpPoints?: IntWithAggregatesFilter<"User"> | number
    trialStartedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    trialEndsAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    isTrialConverted?: BoolWithAggregatesFilter<"User"> | boolean
    tierId?: StringNullableWithAggregatesFilter<"User"> | string | null
    googleId?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    subscriptionId?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastPaymentAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type OrganizationWhereInput = {
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    id?: StringFilter<"Organization"> | string
    name?: StringFilter<"Organization"> | string
    tier?: StringFilter<"Organization"> | string
    trialStartedAt?: DateTimeFilter<"Organization"> | Date | string
    trialStartsAt?: DateTimeFilter<"Organization"> | Date | string
    trialEndsAt?: DateTimeFilter<"Organization"> | Date | string
    isTrialConverted?: BoolFilter<"Organization"> | boolean
    usageTokens?: IntFilter<"Organization"> | number
    address?: StringNullableFilter<"Organization"> | string | null
    contactEmail?: StringNullableFilter<"Organization"> | string | null
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    users?: UserListRelationFilter
  }

  export type OrganizationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    tier?: SortOrder
    trialStartedAt?: SortOrder
    trialStartsAt?: SortOrder
    trialEndsAt?: SortOrder
    isTrialConverted?: SortOrder
    usageTokens?: SortOrder
    address?: SortOrderInput | SortOrder
    contactEmail?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
  }

  export type OrganizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrganizationWhereInput | OrganizationWhereInput[]
    OR?: OrganizationWhereInput[]
    NOT?: OrganizationWhereInput | OrganizationWhereInput[]
    name?: StringFilter<"Organization"> | string
    tier?: StringFilter<"Organization"> | string
    trialStartedAt?: DateTimeFilter<"Organization"> | Date | string
    trialStartsAt?: DateTimeFilter<"Organization"> | Date | string
    trialEndsAt?: DateTimeFilter<"Organization"> | Date | string
    isTrialConverted?: BoolFilter<"Organization"> | boolean
    usageTokens?: IntFilter<"Organization"> | number
    address?: StringNullableFilter<"Organization"> | string | null
    contactEmail?: StringNullableFilter<"Organization"> | string | null
    createdAt?: DateTimeFilter<"Organization"> | Date | string
    updatedAt?: DateTimeFilter<"Organization"> | Date | string
    users?: UserListRelationFilter
  }, "id">

  export type OrganizationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    tier?: SortOrder
    trialStartedAt?: SortOrder
    trialStartsAt?: SortOrder
    trialEndsAt?: SortOrder
    isTrialConverted?: SortOrder
    usageTokens?: SortOrder
    address?: SortOrderInput | SortOrder
    contactEmail?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrganizationCountOrderByAggregateInput
    _avg?: OrganizationAvgOrderByAggregateInput
    _max?: OrganizationMaxOrderByAggregateInput
    _min?: OrganizationMinOrderByAggregateInput
    _sum?: OrganizationSumOrderByAggregateInput
  }

  export type OrganizationScalarWhereWithAggregatesInput = {
    AND?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    OR?: OrganizationScalarWhereWithAggregatesInput[]
    NOT?: OrganizationScalarWhereWithAggregatesInput | OrganizationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Organization"> | string
    name?: StringWithAggregatesFilter<"Organization"> | string
    tier?: StringWithAggregatesFilter<"Organization"> | string
    trialStartedAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    trialStartsAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    trialEndsAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    isTrialConverted?: BoolWithAggregatesFilter<"Organization"> | boolean
    usageTokens?: IntWithAggregatesFilter<"Organization"> | number
    address?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    contactEmail?: StringNullableWithAggregatesFilter<"Organization"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Organization"> | Date | string
  }

  export type AvatarSessionWhereInput = {
    AND?: AvatarSessionWhereInput | AvatarSessionWhereInput[]
    OR?: AvatarSessionWhereInput[]
    NOT?: AvatarSessionWhereInput | AvatarSessionWhereInput[]
    id?: StringFilter<"AvatarSession"> | string
    userId?: StringFilter<"AvatarSession"> | string
    avatarName?: StringFilter<"AvatarSession"> | string
    avatarRole?: StringFilter<"AvatarSession"> | string
    engine?: StringFilter<"AvatarSession"> | string
    startedAt?: DateTimeFilter<"AvatarSession"> | Date | string
    endedAt?: DateTimeNullableFilter<"AvatarSession"> | Date | string | null
    duration?: IntNullableFilter<"AvatarSession"> | number | null
    latencyAvg?: FloatNullableFilter<"AvatarSession"> | number | null
    conversationLog?: JsonFilter<"AvatarSession">
    userSentiment?: StringNullableFilter<"AvatarSession"> | string | null
    gcpSessionId?: StringNullableFilter<"AvatarSession"> | string | null
    vertexAiModel?: StringFilter<"AvatarSession"> | string
    cloudRunEndpoint?: StringNullableFilter<"AvatarSession"> | string | null
    thoughtSignatures?: JsonNullableFilter<"AvatarSession">
    user?: XOR<UserRelationFilter, UserWhereInput>
    observations?: ObservationListRelationFilter
  }

  export type AvatarSessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    avatarName?: SortOrder
    avatarRole?: SortOrder
    engine?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    latencyAvg?: SortOrderInput | SortOrder
    conversationLog?: SortOrder
    userSentiment?: SortOrderInput | SortOrder
    gcpSessionId?: SortOrderInput | SortOrder
    vertexAiModel?: SortOrder
    cloudRunEndpoint?: SortOrderInput | SortOrder
    thoughtSignatures?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    observations?: ObservationOrderByRelationAggregateInput
  }

  export type AvatarSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    gcpSessionId?: string
    AND?: AvatarSessionWhereInput | AvatarSessionWhereInput[]
    OR?: AvatarSessionWhereInput[]
    NOT?: AvatarSessionWhereInput | AvatarSessionWhereInput[]
    userId?: StringFilter<"AvatarSession"> | string
    avatarName?: StringFilter<"AvatarSession"> | string
    avatarRole?: StringFilter<"AvatarSession"> | string
    engine?: StringFilter<"AvatarSession"> | string
    startedAt?: DateTimeFilter<"AvatarSession"> | Date | string
    endedAt?: DateTimeNullableFilter<"AvatarSession"> | Date | string | null
    duration?: IntNullableFilter<"AvatarSession"> | number | null
    latencyAvg?: FloatNullableFilter<"AvatarSession"> | number | null
    conversationLog?: JsonFilter<"AvatarSession">
    userSentiment?: StringNullableFilter<"AvatarSession"> | string | null
    vertexAiModel?: StringFilter<"AvatarSession"> | string
    cloudRunEndpoint?: StringNullableFilter<"AvatarSession"> | string | null
    thoughtSignatures?: JsonNullableFilter<"AvatarSession">
    user?: XOR<UserRelationFilter, UserWhereInput>
    observations?: ObservationListRelationFilter
  }, "id" | "gcpSessionId">

  export type AvatarSessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    avatarName?: SortOrder
    avatarRole?: SortOrder
    engine?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    latencyAvg?: SortOrderInput | SortOrder
    conversationLog?: SortOrder
    userSentiment?: SortOrderInput | SortOrder
    gcpSessionId?: SortOrderInput | SortOrder
    vertexAiModel?: SortOrder
    cloudRunEndpoint?: SortOrderInput | SortOrder
    thoughtSignatures?: SortOrderInput | SortOrder
    _count?: AvatarSessionCountOrderByAggregateInput
    _avg?: AvatarSessionAvgOrderByAggregateInput
    _max?: AvatarSessionMaxOrderByAggregateInput
    _min?: AvatarSessionMinOrderByAggregateInput
    _sum?: AvatarSessionSumOrderByAggregateInput
  }

  export type AvatarSessionScalarWhereWithAggregatesInput = {
    AND?: AvatarSessionScalarWhereWithAggregatesInput | AvatarSessionScalarWhereWithAggregatesInput[]
    OR?: AvatarSessionScalarWhereWithAggregatesInput[]
    NOT?: AvatarSessionScalarWhereWithAggregatesInput | AvatarSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AvatarSession"> | string
    userId?: StringWithAggregatesFilter<"AvatarSession"> | string
    avatarName?: StringWithAggregatesFilter<"AvatarSession"> | string
    avatarRole?: StringWithAggregatesFilter<"AvatarSession"> | string
    engine?: StringWithAggregatesFilter<"AvatarSession"> | string
    startedAt?: DateTimeWithAggregatesFilter<"AvatarSession"> | Date | string
    endedAt?: DateTimeNullableWithAggregatesFilter<"AvatarSession"> | Date | string | null
    duration?: IntNullableWithAggregatesFilter<"AvatarSession"> | number | null
    latencyAvg?: FloatNullableWithAggregatesFilter<"AvatarSession"> | number | null
    conversationLog?: JsonWithAggregatesFilter<"AvatarSession">
    userSentiment?: StringNullableWithAggregatesFilter<"AvatarSession"> | string | null
    gcpSessionId?: StringNullableWithAggregatesFilter<"AvatarSession"> | string | null
    vertexAiModel?: StringWithAggregatesFilter<"AvatarSession"> | string
    cloudRunEndpoint?: StringNullableWithAggregatesFilter<"AvatarSession"> | string | null
    thoughtSignatures?: JsonNullableWithAggregatesFilter<"AvatarSession">
  }

  export type EvidenceFolderWhereInput = {
    AND?: EvidenceFolderWhereInput | EvidenceFolderWhereInput[]
    OR?: EvidenceFolderWhereInput[]
    NOT?: EvidenceFolderWhereInput | EvidenceFolderWhereInput[]
    id?: StringFilter<"EvidenceFolder"> | string
    userId?: StringFilter<"EvidenceFolder"> | string
    studentId?: StringFilter<"EvidenceFolder"> | string
    gradeLevel?: StringNullableFilter<"EvidenceFolder"> | string | null
    specialEdStatus?: StringNullableFilter<"EvidenceFolder"> | string | null
    title?: StringFilter<"EvidenceFolder"> | string
    category?: StringFilter<"EvidenceFolder"> | string
    createdAt?: DateTimeFilter<"EvidenceFolder"> | Date | string
    updatedAt?: DateTimeFilter<"EvidenceFolder"> | Date | string
    aiSummary?: StringNullableFilter<"EvidenceFolder"> | string | null
    riskLevel?: StringNullableFilter<"EvidenceFolder"> | string | null
    complianceScore?: FloatNullableFilter<"EvidenceFolder"> | number | null
    user?: XOR<UserRelationFilter, UserWhereInput>
    observations?: ObservationListRelationFilter
    documents?: DocumentListRelationFilter
  }

  export type EvidenceFolderOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    studentId?: SortOrder
    gradeLevel?: SortOrderInput | SortOrder
    specialEdStatus?: SortOrderInput | SortOrder
    title?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    aiSummary?: SortOrderInput | SortOrder
    riskLevel?: SortOrderInput | SortOrder
    complianceScore?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    observations?: ObservationOrderByRelationAggregateInput
    documents?: DocumentOrderByRelationAggregateInput
  }

  export type EvidenceFolderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EvidenceFolderWhereInput | EvidenceFolderWhereInput[]
    OR?: EvidenceFolderWhereInput[]
    NOT?: EvidenceFolderWhereInput | EvidenceFolderWhereInput[]
    userId?: StringFilter<"EvidenceFolder"> | string
    studentId?: StringFilter<"EvidenceFolder"> | string
    gradeLevel?: StringNullableFilter<"EvidenceFolder"> | string | null
    specialEdStatus?: StringNullableFilter<"EvidenceFolder"> | string | null
    title?: StringFilter<"EvidenceFolder"> | string
    category?: StringFilter<"EvidenceFolder"> | string
    createdAt?: DateTimeFilter<"EvidenceFolder"> | Date | string
    updatedAt?: DateTimeFilter<"EvidenceFolder"> | Date | string
    aiSummary?: StringNullableFilter<"EvidenceFolder"> | string | null
    riskLevel?: StringNullableFilter<"EvidenceFolder"> | string | null
    complianceScore?: FloatNullableFilter<"EvidenceFolder"> | number | null
    user?: XOR<UserRelationFilter, UserWhereInput>
    observations?: ObservationListRelationFilter
    documents?: DocumentListRelationFilter
  }, "id">

  export type EvidenceFolderOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    studentId?: SortOrder
    gradeLevel?: SortOrderInput | SortOrder
    specialEdStatus?: SortOrderInput | SortOrder
    title?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    aiSummary?: SortOrderInput | SortOrder
    riskLevel?: SortOrderInput | SortOrder
    complianceScore?: SortOrderInput | SortOrder
    _count?: EvidenceFolderCountOrderByAggregateInput
    _avg?: EvidenceFolderAvgOrderByAggregateInput
    _max?: EvidenceFolderMaxOrderByAggregateInput
    _min?: EvidenceFolderMinOrderByAggregateInput
    _sum?: EvidenceFolderSumOrderByAggregateInput
  }

  export type EvidenceFolderScalarWhereWithAggregatesInput = {
    AND?: EvidenceFolderScalarWhereWithAggregatesInput | EvidenceFolderScalarWhereWithAggregatesInput[]
    OR?: EvidenceFolderScalarWhereWithAggregatesInput[]
    NOT?: EvidenceFolderScalarWhereWithAggregatesInput | EvidenceFolderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EvidenceFolder"> | string
    userId?: StringWithAggregatesFilter<"EvidenceFolder"> | string
    studentId?: StringWithAggregatesFilter<"EvidenceFolder"> | string
    gradeLevel?: StringNullableWithAggregatesFilter<"EvidenceFolder"> | string | null
    specialEdStatus?: StringNullableWithAggregatesFilter<"EvidenceFolder"> | string | null
    title?: StringWithAggregatesFilter<"EvidenceFolder"> | string
    category?: StringWithAggregatesFilter<"EvidenceFolder"> | string
    createdAt?: DateTimeWithAggregatesFilter<"EvidenceFolder"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"EvidenceFolder"> | Date | string
    aiSummary?: StringNullableWithAggregatesFilter<"EvidenceFolder"> | string | null
    riskLevel?: StringNullableWithAggregatesFilter<"EvidenceFolder"> | string | null
    complianceScore?: FloatNullableWithAggregatesFilter<"EvidenceFolder"> | number | null
  }

  export type ObservationWhereInput = {
    AND?: ObservationWhereInput | ObservationWhereInput[]
    OR?: ObservationWhereInput[]
    NOT?: ObservationWhereInput | ObservationWhereInput[]
    id?: StringFilter<"Observation"> | string
    userId?: StringFilter<"Observation"> | string
    evidenceFolderId?: StringNullableFilter<"Observation"> | string | null
    avatarSessionId?: StringNullableFilter<"Observation"> | string | null
    observationType?: StringFilter<"Observation"> | string
    observationDate?: DateTimeFilter<"Observation"> | Date | string
    duration?: IntNullableFilter<"Observation"> | number | null
    description?: StringFilter<"Observation"> | string
    context?: StringNullableFilter<"Observation"> | string | null
    interventions?: StringNullableFilter<"Observation"> | string | null
    aiAnalysis?: StringNullableFilter<"Observation"> | string | null
    suggestedActions?: JsonNullableFilter<"Observation">
    legalCompliance?: BoolFilter<"Observation"> | boolean
    hasAudio?: BoolFilter<"Observation"> | boolean
    hasVideo?: BoolFilter<"Observation"> | boolean
    hasImages?: BoolFilter<"Observation"> | boolean
    createdAt?: DateTimeFilter<"Observation"> | Date | string
    updatedAt?: DateTimeFilter<"Observation"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    evidenceFolder?: XOR<EvidenceFolderNullableRelationFilter, EvidenceFolderWhereInput> | null
    avatarSession?: XOR<AvatarSessionNullableRelationFilter, AvatarSessionWhereInput> | null
  }

  export type ObservationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    evidenceFolderId?: SortOrderInput | SortOrder
    avatarSessionId?: SortOrderInput | SortOrder
    observationType?: SortOrder
    observationDate?: SortOrder
    duration?: SortOrderInput | SortOrder
    description?: SortOrder
    context?: SortOrderInput | SortOrder
    interventions?: SortOrderInput | SortOrder
    aiAnalysis?: SortOrderInput | SortOrder
    suggestedActions?: SortOrderInput | SortOrder
    legalCompliance?: SortOrder
    hasAudio?: SortOrder
    hasVideo?: SortOrder
    hasImages?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    evidenceFolder?: EvidenceFolderOrderByWithRelationInput
    avatarSession?: AvatarSessionOrderByWithRelationInput
  }

  export type ObservationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ObservationWhereInput | ObservationWhereInput[]
    OR?: ObservationWhereInput[]
    NOT?: ObservationWhereInput | ObservationWhereInput[]
    userId?: StringFilter<"Observation"> | string
    evidenceFolderId?: StringNullableFilter<"Observation"> | string | null
    avatarSessionId?: StringNullableFilter<"Observation"> | string | null
    observationType?: StringFilter<"Observation"> | string
    observationDate?: DateTimeFilter<"Observation"> | Date | string
    duration?: IntNullableFilter<"Observation"> | number | null
    description?: StringFilter<"Observation"> | string
    context?: StringNullableFilter<"Observation"> | string | null
    interventions?: StringNullableFilter<"Observation"> | string | null
    aiAnalysis?: StringNullableFilter<"Observation"> | string | null
    suggestedActions?: JsonNullableFilter<"Observation">
    legalCompliance?: BoolFilter<"Observation"> | boolean
    hasAudio?: BoolFilter<"Observation"> | boolean
    hasVideo?: BoolFilter<"Observation"> | boolean
    hasImages?: BoolFilter<"Observation"> | boolean
    createdAt?: DateTimeFilter<"Observation"> | Date | string
    updatedAt?: DateTimeFilter<"Observation"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    evidenceFolder?: XOR<EvidenceFolderNullableRelationFilter, EvidenceFolderWhereInput> | null
    avatarSession?: XOR<AvatarSessionNullableRelationFilter, AvatarSessionWhereInput> | null
  }, "id">

  export type ObservationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    evidenceFolderId?: SortOrderInput | SortOrder
    avatarSessionId?: SortOrderInput | SortOrder
    observationType?: SortOrder
    observationDate?: SortOrder
    duration?: SortOrderInput | SortOrder
    description?: SortOrder
    context?: SortOrderInput | SortOrder
    interventions?: SortOrderInput | SortOrder
    aiAnalysis?: SortOrderInput | SortOrder
    suggestedActions?: SortOrderInput | SortOrder
    legalCompliance?: SortOrder
    hasAudio?: SortOrder
    hasVideo?: SortOrder
    hasImages?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ObservationCountOrderByAggregateInput
    _avg?: ObservationAvgOrderByAggregateInput
    _max?: ObservationMaxOrderByAggregateInput
    _min?: ObservationMinOrderByAggregateInput
    _sum?: ObservationSumOrderByAggregateInput
  }

  export type ObservationScalarWhereWithAggregatesInput = {
    AND?: ObservationScalarWhereWithAggregatesInput | ObservationScalarWhereWithAggregatesInput[]
    OR?: ObservationScalarWhereWithAggregatesInput[]
    NOT?: ObservationScalarWhereWithAggregatesInput | ObservationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Observation"> | string
    userId?: StringWithAggregatesFilter<"Observation"> | string
    evidenceFolderId?: StringNullableWithAggregatesFilter<"Observation"> | string | null
    avatarSessionId?: StringNullableWithAggregatesFilter<"Observation"> | string | null
    observationType?: StringWithAggregatesFilter<"Observation"> | string
    observationDate?: DateTimeWithAggregatesFilter<"Observation"> | Date | string
    duration?: IntNullableWithAggregatesFilter<"Observation"> | number | null
    description?: StringWithAggregatesFilter<"Observation"> | string
    context?: StringNullableWithAggregatesFilter<"Observation"> | string | null
    interventions?: StringNullableWithAggregatesFilter<"Observation"> | string | null
    aiAnalysis?: StringNullableWithAggregatesFilter<"Observation"> | string | null
    suggestedActions?: JsonNullableWithAggregatesFilter<"Observation">
    legalCompliance?: BoolWithAggregatesFilter<"Observation"> | boolean
    hasAudio?: BoolWithAggregatesFilter<"Observation"> | boolean
    hasVideo?: BoolWithAggregatesFilter<"Observation"> | boolean
    hasImages?: BoolWithAggregatesFilter<"Observation"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Observation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Observation"> | Date | string
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    evidenceFolderId?: StringFilter<"Document"> | string
    fileName?: StringFilter<"Document"> | string
    fileType?: StringFilter<"Document"> | string
    fileSize?: IntFilter<"Document"> | number
    gcpBucketPath?: StringFilter<"Document"> | string
    gcpSignedUrl?: StringNullableFilter<"Document"> | string | null
    urlExpiresAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    encrypted?: BoolFilter<"Document"> | boolean
    accessLevel?: StringFilter<"Document"> | string
    uploadedAt?: DateTimeFilter<"Document"> | Date | string
    evidenceFolder?: XOR<EvidenceFolderRelationFilter, EvidenceFolderWhereInput>
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    evidenceFolderId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    gcpBucketPath?: SortOrder
    gcpSignedUrl?: SortOrderInput | SortOrder
    urlExpiresAt?: SortOrderInput | SortOrder
    encrypted?: SortOrder
    accessLevel?: SortOrder
    uploadedAt?: SortOrder
    evidenceFolder?: EvidenceFolderOrderByWithRelationInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    evidenceFolderId?: StringFilter<"Document"> | string
    fileName?: StringFilter<"Document"> | string
    fileType?: StringFilter<"Document"> | string
    fileSize?: IntFilter<"Document"> | number
    gcpBucketPath?: StringFilter<"Document"> | string
    gcpSignedUrl?: StringNullableFilter<"Document"> | string | null
    urlExpiresAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    encrypted?: BoolFilter<"Document"> | boolean
    accessLevel?: StringFilter<"Document"> | string
    uploadedAt?: DateTimeFilter<"Document"> | Date | string
    evidenceFolder?: XOR<EvidenceFolderRelationFilter, EvidenceFolderWhereInput>
  }, "id">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    evidenceFolderId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    gcpBucketPath?: SortOrder
    gcpSignedUrl?: SortOrderInput | SortOrder
    urlExpiresAt?: SortOrderInput | SortOrder
    encrypted?: SortOrder
    accessLevel?: SortOrder
    uploadedAt?: SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _avg?: DocumentAvgOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
    _sum?: DocumentSumOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    evidenceFolderId?: StringWithAggregatesFilter<"Document"> | string
    fileName?: StringWithAggregatesFilter<"Document"> | string
    fileType?: StringWithAggregatesFilter<"Document"> | string
    fileSize?: IntWithAggregatesFilter<"Document"> | number
    gcpBucketPath?: StringWithAggregatesFilter<"Document"> | string
    gcpSignedUrl?: StringNullableWithAggregatesFilter<"Document"> | string | null
    urlExpiresAt?: DateTimeNullableWithAggregatesFilter<"Document"> | Date | string | null
    encrypted?: BoolWithAggregatesFilter<"Document"> | boolean
    accessLevel?: StringWithAggregatesFilter<"Document"> | string
    uploadedAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
  }

  export type GenerationWhereInput = {
    AND?: GenerationWhereInput | GenerationWhereInput[]
    OR?: GenerationWhereInput[]
    NOT?: GenerationWhereInput | GenerationWhereInput[]
    id?: StringFilter<"Generation"> | string
    userId?: StringFilter<"Generation"> | string
    generatorId?: StringFilter<"Generation"> | string
    prompt?: StringFilter<"Generation"> | string
    content?: StringFilter<"Generation"> | string
    professorVideoUrl?: StringNullableFilter<"Generation"> | string | null
    avatarEngine?: StringNullableFilter<"Generation"> | string | null
    createdAt?: DateTimeFilter<"Generation"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type GenerationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    generatorId?: SortOrder
    prompt?: SortOrder
    content?: SortOrder
    professorVideoUrl?: SortOrderInput | SortOrder
    avatarEngine?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type GenerationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GenerationWhereInput | GenerationWhereInput[]
    OR?: GenerationWhereInput[]
    NOT?: GenerationWhereInput | GenerationWhereInput[]
    userId?: StringFilter<"Generation"> | string
    generatorId?: StringFilter<"Generation"> | string
    prompt?: StringFilter<"Generation"> | string
    content?: StringFilter<"Generation"> | string
    professorVideoUrl?: StringNullableFilter<"Generation"> | string | null
    avatarEngine?: StringNullableFilter<"Generation"> | string | null
    createdAt?: DateTimeFilter<"Generation"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type GenerationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    generatorId?: SortOrder
    prompt?: SortOrder
    content?: SortOrder
    professorVideoUrl?: SortOrderInput | SortOrder
    avatarEngine?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: GenerationCountOrderByAggregateInput
    _max?: GenerationMaxOrderByAggregateInput
    _min?: GenerationMinOrderByAggregateInput
  }

  export type GenerationScalarWhereWithAggregatesInput = {
    AND?: GenerationScalarWhereWithAggregatesInput | GenerationScalarWhereWithAggregatesInput[]
    OR?: GenerationScalarWhereWithAggregatesInput[]
    NOT?: GenerationScalarWhereWithAggregatesInput | GenerationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Generation"> | string
    userId?: StringWithAggregatesFilter<"Generation"> | string
    generatorId?: StringWithAggregatesFilter<"Generation"> | string
    prompt?: StringWithAggregatesFilter<"Generation"> | string
    content?: StringWithAggregatesFilter<"Generation"> | string
    professorVideoUrl?: StringNullableWithAggregatesFilter<"Generation"> | string | null
    avatarEngine?: StringNullableWithAggregatesFilter<"Generation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Generation"> | Date | string
  }

  export type AnalyticsEventWhereInput = {
    AND?: AnalyticsEventWhereInput | AnalyticsEventWhereInput[]
    OR?: AnalyticsEventWhereInput[]
    NOT?: AnalyticsEventWhereInput | AnalyticsEventWhereInput[]
    id?: StringFilter<"AnalyticsEvent"> | string
    userId?: StringNullableFilter<"AnalyticsEvent"> | string | null
    eventType?: StringFilter<"AnalyticsEvent"> | string
    eventCategory?: StringFilter<"AnalyticsEvent"> | string
    eventAction?: StringFilter<"AnalyticsEvent"> | string
    eventLabel?: StringNullableFilter<"AnalyticsEvent"> | string | null
    latency?: FloatNullableFilter<"AnalyticsEvent"> | number | null
    tokensUsed?: IntNullableFilter<"AnalyticsEvent"> | number | null
    gcpCost?: FloatNullableFilter<"AnalyticsEvent"> | number | null
    metadata?: JsonNullableFilter<"AnalyticsEvent">
    userAgent?: StringNullableFilter<"AnalyticsEvent"> | string | null
    ipAddress?: StringNullableFilter<"AnalyticsEvent"> | string | null
    timestamp?: DateTimeFilter<"AnalyticsEvent"> | Date | string
  }

  export type AnalyticsEventOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    eventType?: SortOrder
    eventCategory?: SortOrder
    eventAction?: SortOrder
    eventLabel?: SortOrderInput | SortOrder
    latency?: SortOrderInput | SortOrder
    tokensUsed?: SortOrderInput | SortOrder
    gcpCost?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    timestamp?: SortOrder
  }

  export type AnalyticsEventWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AnalyticsEventWhereInput | AnalyticsEventWhereInput[]
    OR?: AnalyticsEventWhereInput[]
    NOT?: AnalyticsEventWhereInput | AnalyticsEventWhereInput[]
    userId?: StringNullableFilter<"AnalyticsEvent"> | string | null
    eventType?: StringFilter<"AnalyticsEvent"> | string
    eventCategory?: StringFilter<"AnalyticsEvent"> | string
    eventAction?: StringFilter<"AnalyticsEvent"> | string
    eventLabel?: StringNullableFilter<"AnalyticsEvent"> | string | null
    latency?: FloatNullableFilter<"AnalyticsEvent"> | number | null
    tokensUsed?: IntNullableFilter<"AnalyticsEvent"> | number | null
    gcpCost?: FloatNullableFilter<"AnalyticsEvent"> | number | null
    metadata?: JsonNullableFilter<"AnalyticsEvent">
    userAgent?: StringNullableFilter<"AnalyticsEvent"> | string | null
    ipAddress?: StringNullableFilter<"AnalyticsEvent"> | string | null
    timestamp?: DateTimeFilter<"AnalyticsEvent"> | Date | string
  }, "id">

  export type AnalyticsEventOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    eventType?: SortOrder
    eventCategory?: SortOrder
    eventAction?: SortOrder
    eventLabel?: SortOrderInput | SortOrder
    latency?: SortOrderInput | SortOrder
    tokensUsed?: SortOrderInput | SortOrder
    gcpCost?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    timestamp?: SortOrder
    _count?: AnalyticsEventCountOrderByAggregateInput
    _avg?: AnalyticsEventAvgOrderByAggregateInput
    _max?: AnalyticsEventMaxOrderByAggregateInput
    _min?: AnalyticsEventMinOrderByAggregateInput
    _sum?: AnalyticsEventSumOrderByAggregateInput
  }

  export type AnalyticsEventScalarWhereWithAggregatesInput = {
    AND?: AnalyticsEventScalarWhereWithAggregatesInput | AnalyticsEventScalarWhereWithAggregatesInput[]
    OR?: AnalyticsEventScalarWhereWithAggregatesInput[]
    NOT?: AnalyticsEventScalarWhereWithAggregatesInput | AnalyticsEventScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AnalyticsEvent"> | string
    userId?: StringNullableWithAggregatesFilter<"AnalyticsEvent"> | string | null
    eventType?: StringWithAggregatesFilter<"AnalyticsEvent"> | string
    eventCategory?: StringWithAggregatesFilter<"AnalyticsEvent"> | string
    eventAction?: StringWithAggregatesFilter<"AnalyticsEvent"> | string
    eventLabel?: StringNullableWithAggregatesFilter<"AnalyticsEvent"> | string | null
    latency?: FloatNullableWithAggregatesFilter<"AnalyticsEvent"> | number | null
    tokensUsed?: IntNullableWithAggregatesFilter<"AnalyticsEvent"> | number | null
    gcpCost?: FloatNullableWithAggregatesFilter<"AnalyticsEvent"> | number | null
    metadata?: JsonNullableWithAggregatesFilter<"AnalyticsEvent">
    userAgent?: StringNullableWithAggregatesFilter<"AnalyticsEvent"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"AnalyticsEvent"> | string | null
    timestamp?: DateTimeWithAggregatesFilter<"AnalyticsEvent"> | Date | string
  }

  export type SemanticCacheWhereInput = {
    AND?: SemanticCacheWhereInput | SemanticCacheWhereInput[]
    OR?: SemanticCacheWhereInput[]
    NOT?: SemanticCacheWhereInput | SemanticCacheWhereInput[]
    id?: StringFilter<"SemanticCache"> | string
    query?: StringFilter<"SemanticCache"> | string
    response?: StringFilter<"SemanticCache"> | string
    hitCount?: IntFilter<"SemanticCache"> | number
    lastHitAt?: DateTimeFilter<"SemanticCache"> | Date | string
    createdAt?: DateTimeFilter<"SemanticCache"> | Date | string
  }

  export type SemanticCacheOrderByWithRelationInput = {
    id?: SortOrder
    query?: SortOrder
    response?: SortOrder
    hitCount?: SortOrder
    lastHitAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SemanticCacheWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SemanticCacheWhereInput | SemanticCacheWhereInput[]
    OR?: SemanticCacheWhereInput[]
    NOT?: SemanticCacheWhereInput | SemanticCacheWhereInput[]
    query?: StringFilter<"SemanticCache"> | string
    response?: StringFilter<"SemanticCache"> | string
    hitCount?: IntFilter<"SemanticCache"> | number
    lastHitAt?: DateTimeFilter<"SemanticCache"> | Date | string
    createdAt?: DateTimeFilter<"SemanticCache"> | Date | string
  }, "id">

  export type SemanticCacheOrderByWithAggregationInput = {
    id?: SortOrder
    query?: SortOrder
    response?: SortOrder
    hitCount?: SortOrder
    lastHitAt?: SortOrder
    createdAt?: SortOrder
    _count?: SemanticCacheCountOrderByAggregateInput
    _avg?: SemanticCacheAvgOrderByAggregateInput
    _max?: SemanticCacheMaxOrderByAggregateInput
    _min?: SemanticCacheMinOrderByAggregateInput
    _sum?: SemanticCacheSumOrderByAggregateInput
  }

  export type SemanticCacheScalarWhereWithAggregatesInput = {
    AND?: SemanticCacheScalarWhereWithAggregatesInput | SemanticCacheScalarWhereWithAggregatesInput[]
    OR?: SemanticCacheScalarWhereWithAggregatesInput[]
    NOT?: SemanticCacheScalarWhereWithAggregatesInput | SemanticCacheScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SemanticCache"> | string
    query?: StringWithAggregatesFilter<"SemanticCache"> | string
    response?: StringWithAggregatesFilter<"SemanticCache"> | string
    hitCount?: IntWithAggregatesFilter<"SemanticCache"> | number
    lastHitAt?: DateTimeWithAggregatesFilter<"SemanticCache"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"SemanticCache"> | Date | string
  }

  export type GraphNodeWhereInput = {
    AND?: GraphNodeWhereInput | GraphNodeWhereInput[]
    OR?: GraphNodeWhereInput[]
    NOT?: GraphNodeWhereInput | GraphNodeWhereInput[]
    id?: StringFilter<"GraphNode"> | string
    label?: StringFilter<"GraphNode"> | string
    name?: StringFilter<"GraphNode"> | string
    properties?: JsonNullableFilter<"GraphNode">
    createdAt?: DateTimeFilter<"GraphNode"> | Date | string
    outbound?: GraphEdgeListRelationFilter
    inbound?: GraphEdgeListRelationFilter
  }

  export type GraphNodeOrderByWithRelationInput = {
    id?: SortOrder
    label?: SortOrder
    name?: SortOrder
    properties?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    outbound?: GraphEdgeOrderByRelationAggregateInput
    inbound?: GraphEdgeOrderByRelationAggregateInput
  }

  export type GraphNodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GraphNodeWhereInput | GraphNodeWhereInput[]
    OR?: GraphNodeWhereInput[]
    NOT?: GraphNodeWhereInput | GraphNodeWhereInput[]
    label?: StringFilter<"GraphNode"> | string
    name?: StringFilter<"GraphNode"> | string
    properties?: JsonNullableFilter<"GraphNode">
    createdAt?: DateTimeFilter<"GraphNode"> | Date | string
    outbound?: GraphEdgeListRelationFilter
    inbound?: GraphEdgeListRelationFilter
  }, "id">

  export type GraphNodeOrderByWithAggregationInput = {
    id?: SortOrder
    label?: SortOrder
    name?: SortOrder
    properties?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: GraphNodeCountOrderByAggregateInput
    _max?: GraphNodeMaxOrderByAggregateInput
    _min?: GraphNodeMinOrderByAggregateInput
  }

  export type GraphNodeScalarWhereWithAggregatesInput = {
    AND?: GraphNodeScalarWhereWithAggregatesInput | GraphNodeScalarWhereWithAggregatesInput[]
    OR?: GraphNodeScalarWhereWithAggregatesInput[]
    NOT?: GraphNodeScalarWhereWithAggregatesInput | GraphNodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GraphNode"> | string
    label?: StringWithAggregatesFilter<"GraphNode"> | string
    name?: StringWithAggregatesFilter<"GraphNode"> | string
    properties?: JsonNullableWithAggregatesFilter<"GraphNode">
    createdAt?: DateTimeWithAggregatesFilter<"GraphNode"> | Date | string
  }

  export type GraphEdgeWhereInput = {
    AND?: GraphEdgeWhereInput | GraphEdgeWhereInput[]
    OR?: GraphEdgeWhereInput[]
    NOT?: GraphEdgeWhereInput | GraphEdgeWhereInput[]
    id?: StringFilter<"GraphEdge"> | string
    type?: StringFilter<"GraphEdge"> | string
    properties?: JsonNullableFilter<"GraphEdge">
    sourceId?: StringFilter<"GraphEdge"> | string
    targetId?: StringFilter<"GraphEdge"> | string
    weight?: FloatFilter<"GraphEdge"> | number
    createdAt?: DateTimeFilter<"GraphEdge"> | Date | string
    source?: XOR<GraphNodeRelationFilter, GraphNodeWhereInput>
    target?: XOR<GraphNodeRelationFilter, GraphNodeWhereInput>
  }

  export type GraphEdgeOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    properties?: SortOrderInput | SortOrder
    sourceId?: SortOrder
    targetId?: SortOrder
    weight?: SortOrder
    createdAt?: SortOrder
    source?: GraphNodeOrderByWithRelationInput
    target?: GraphNodeOrderByWithRelationInput
  }

  export type GraphEdgeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GraphEdgeWhereInput | GraphEdgeWhereInput[]
    OR?: GraphEdgeWhereInput[]
    NOT?: GraphEdgeWhereInput | GraphEdgeWhereInput[]
    type?: StringFilter<"GraphEdge"> | string
    properties?: JsonNullableFilter<"GraphEdge">
    sourceId?: StringFilter<"GraphEdge"> | string
    targetId?: StringFilter<"GraphEdge"> | string
    weight?: FloatFilter<"GraphEdge"> | number
    createdAt?: DateTimeFilter<"GraphEdge"> | Date | string
    source?: XOR<GraphNodeRelationFilter, GraphNodeWhereInput>
    target?: XOR<GraphNodeRelationFilter, GraphNodeWhereInput>
  }, "id">

  export type GraphEdgeOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    properties?: SortOrderInput | SortOrder
    sourceId?: SortOrder
    targetId?: SortOrder
    weight?: SortOrder
    createdAt?: SortOrder
    _count?: GraphEdgeCountOrderByAggregateInput
    _avg?: GraphEdgeAvgOrderByAggregateInput
    _max?: GraphEdgeMaxOrderByAggregateInput
    _min?: GraphEdgeMinOrderByAggregateInput
    _sum?: GraphEdgeSumOrderByAggregateInput
  }

  export type GraphEdgeScalarWhereWithAggregatesInput = {
    AND?: GraphEdgeScalarWhereWithAggregatesInput | GraphEdgeScalarWhereWithAggregatesInput[]
    OR?: GraphEdgeScalarWhereWithAggregatesInput[]
    NOT?: GraphEdgeScalarWhereWithAggregatesInput | GraphEdgeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GraphEdge"> | string
    type?: StringWithAggregatesFilter<"GraphEdge"> | string
    properties?: JsonNullableWithAggregatesFilter<"GraphEdge">
    sourceId?: StringWithAggregatesFilter<"GraphEdge"> | string
    targetId?: StringWithAggregatesFilter<"GraphEdge"> | string
    weight?: FloatWithAggregatesFilter<"GraphEdge"> | number
    createdAt?: DateTimeWithAggregatesFilter<"GraphEdge"> | Date | string
  }

  export type EdintelMediaCreateInput = {
    id?: string
    fileName: string
    url: string
    mediaType: string
    size?: number
    uploadedAt?: Date | string
  }

  export type EdintelMediaUncheckedCreateInput = {
    id?: string
    fileName: string
    url: string
    mediaType: string
    size?: number
    uploadedAt?: Date | string
  }

  export type EdintelMediaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    mediaType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EdintelMediaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    mediaType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EdintelMediaCreateManyInput = {
    id?: string
    fileName: string
    url: string
    mediaType: string
    size?: number
    uploadedAt?: Date | string
  }

  export type EdintelMediaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    mediaType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EdintelMediaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    mediaType?: StringFieldUpdateOperationsInput | string
    size?: IntFieldUpdateOperationsInput | number
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TierCreateInput = {
    id?: string
    name: string
    signupPrice?: number
    description?: string | null
    users?: UserCreateNestedManyWithoutTierInput
  }

  export type TierUncheckedCreateInput = {
    id?: string
    name: string
    signupPrice?: number
    description?: string | null
    users?: UserUncheckedCreateNestedManyWithoutTierInput
  }

  export type TierUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    signupPrice?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUpdateManyWithoutTierNestedInput
  }

  export type TierUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    signupPrice?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    users?: UserUncheckedUpdateManyWithoutTierNestedInput
  }

  export type TierCreateManyInput = {
    id?: string
    name: string
    signupPrice?: number
    description?: string | null
  }

  export type TierUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    signupPrice?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TierUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    signupPrice?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    district?: string | null
    school?: string | null
    schoolSite?: string | null
    position?: string | null
    stripeCustomerId?: string | null
    subscriptionTier?: string
    subscriptionStatus?: string
    usageTokens?: number
    xpPoints?: number
    trialStartedAt?: Date | string
    trialEndsAt?: Date | string | null
    isTrialConverted?: boolean
    googleId?: string | null
    avatarUrl?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    subscriptionId?: string | null
    lastPaymentAt?: Date | string | null
    organization?: OrganizationCreateNestedOneWithoutUsersInput
    tier?: TierCreateNestedOneWithoutUsersInput
    generations?: GenerationCreateNestedManyWithoutUserInput
    observations?: ObservationCreateNestedManyWithoutUserInput
    evidenceFolders?: EvidenceFolderCreateNestedManyWithoutUserInput
    avatarSessions?: AvatarSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    district?: string | null
    school?: string | null
    schoolSite?: string | null
    position?: string | null
    organizationId?: string | null
    stripeCustomerId?: string | null
    subscriptionTier?: string
    subscriptionStatus?: string
    usageTokens?: number
    xpPoints?: number
    trialStartedAt?: Date | string
    trialEndsAt?: Date | string | null
    isTrialConverted?: boolean
    tierId?: string | null
    googleId?: string | null
    avatarUrl?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    subscriptionId?: string | null
    lastPaymentAt?: Date | string | null
    generations?: GenerationUncheckedCreateNestedManyWithoutUserInput
    observations?: ObservationUncheckedCreateNestedManyWithoutUserInput
    evidenceFolders?: EvidenceFolderUncheckedCreateNestedManyWithoutUserInput
    avatarSessions?: AvatarSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    schoolSite?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    usageTokens?: IntFieldUpdateOperationsInput | number
    xpPoints?: IntFieldUpdateOperationsInput | number
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPaymentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneWithoutUsersNestedInput
    tier?: TierUpdateOneWithoutUsersNestedInput
    generations?: GenerationUpdateManyWithoutUserNestedInput
    observations?: ObservationUpdateManyWithoutUserNestedInput
    evidenceFolders?: EvidenceFolderUpdateManyWithoutUserNestedInput
    avatarSessions?: AvatarSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    schoolSite?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    usageTokens?: IntFieldUpdateOperationsInput | number
    xpPoints?: IntFieldUpdateOperationsInput | number
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    tierId?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPaymentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    generations?: GenerationUncheckedUpdateManyWithoutUserNestedInput
    observations?: ObservationUncheckedUpdateManyWithoutUserNestedInput
    evidenceFolders?: EvidenceFolderUncheckedUpdateManyWithoutUserNestedInput
    avatarSessions?: AvatarSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    district?: string | null
    school?: string | null
    schoolSite?: string | null
    position?: string | null
    organizationId?: string | null
    stripeCustomerId?: string | null
    subscriptionTier?: string
    subscriptionStatus?: string
    usageTokens?: number
    xpPoints?: number
    trialStartedAt?: Date | string
    trialEndsAt?: Date | string | null
    isTrialConverted?: boolean
    tierId?: string | null
    googleId?: string | null
    avatarUrl?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    subscriptionId?: string | null
    lastPaymentAt?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    schoolSite?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    usageTokens?: IntFieldUpdateOperationsInput | number
    xpPoints?: IntFieldUpdateOperationsInput | number
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPaymentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    schoolSite?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    usageTokens?: IntFieldUpdateOperationsInput | number
    xpPoints?: IntFieldUpdateOperationsInput | number
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    tierId?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPaymentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OrganizationCreateInput = {
    id?: string
    name: string
    tier?: string
    trialStartedAt?: Date | string
    trialStartsAt?: Date | string
    trialEndsAt: Date | string
    isTrialConverted?: boolean
    usageTokens?: number
    address?: string | null
    contactEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUncheckedCreateInput = {
    id?: string
    name: string
    tier?: string
    trialStartedAt?: Date | string
    trialStartsAt?: Date | string
    trialEndsAt: Date | string
    isTrialConverted?: boolean
    usageTokens?: number
    address?: string | null
    contactEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutOrganizationInput
  }

  export type OrganizationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tier?: StringFieldUpdateOperationsInput | string
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialStartsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    usageTokens?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tier?: StringFieldUpdateOperationsInput | string
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialStartsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    usageTokens?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutOrganizationNestedInput
  }

  export type OrganizationCreateManyInput = {
    id?: string
    name: string
    tier?: string
    trialStartedAt?: Date | string
    trialStartsAt?: Date | string
    trialEndsAt: Date | string
    isTrialConverted?: boolean
    usageTokens?: number
    address?: string | null
    contactEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tier?: StringFieldUpdateOperationsInput | string
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialStartsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    usageTokens?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tier?: StringFieldUpdateOperationsInput | string
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialStartsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    usageTokens?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AvatarSessionCreateInput = {
    id?: string
    avatarName: string
    avatarRole: string
    engine?: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    duration?: number | null
    latencyAvg?: number | null
    conversationLog: JsonNullValueInput | InputJsonValue
    userSentiment?: string | null
    gcpSessionId?: string | null
    vertexAiModel?: string
    cloudRunEndpoint?: string | null
    thoughtSignatures?: NullableJsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutAvatarSessionsInput
    observations?: ObservationCreateNestedManyWithoutAvatarSessionInput
  }

  export type AvatarSessionUncheckedCreateInput = {
    id?: string
    userId: string
    avatarName: string
    avatarRole: string
    engine?: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    duration?: number | null
    latencyAvg?: number | null
    conversationLog: JsonNullValueInput | InputJsonValue
    userSentiment?: string | null
    gcpSessionId?: string | null
    vertexAiModel?: string
    cloudRunEndpoint?: string | null
    thoughtSignatures?: NullableJsonNullValueInput | InputJsonValue
    observations?: ObservationUncheckedCreateNestedManyWithoutAvatarSessionInput
  }

  export type AvatarSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatarName?: StringFieldUpdateOperationsInput | string
    avatarRole?: StringFieldUpdateOperationsInput | string
    engine?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    latencyAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    conversationLog?: JsonNullValueInput | InputJsonValue
    userSentiment?: NullableStringFieldUpdateOperationsInput | string | null
    gcpSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    vertexAiModel?: StringFieldUpdateOperationsInput | string
    cloudRunEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    thoughtSignatures?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutAvatarSessionsNestedInput
    observations?: ObservationUpdateManyWithoutAvatarSessionNestedInput
  }

  export type AvatarSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    avatarName?: StringFieldUpdateOperationsInput | string
    avatarRole?: StringFieldUpdateOperationsInput | string
    engine?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    latencyAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    conversationLog?: JsonNullValueInput | InputJsonValue
    userSentiment?: NullableStringFieldUpdateOperationsInput | string | null
    gcpSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    vertexAiModel?: StringFieldUpdateOperationsInput | string
    cloudRunEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    thoughtSignatures?: NullableJsonNullValueInput | InputJsonValue
    observations?: ObservationUncheckedUpdateManyWithoutAvatarSessionNestedInput
  }

  export type AvatarSessionCreateManyInput = {
    id?: string
    userId: string
    avatarName: string
    avatarRole: string
    engine?: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    duration?: number | null
    latencyAvg?: number | null
    conversationLog: JsonNullValueInput | InputJsonValue
    userSentiment?: string | null
    gcpSessionId?: string | null
    vertexAiModel?: string
    cloudRunEndpoint?: string | null
    thoughtSignatures?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AvatarSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatarName?: StringFieldUpdateOperationsInput | string
    avatarRole?: StringFieldUpdateOperationsInput | string
    engine?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    latencyAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    conversationLog?: JsonNullValueInput | InputJsonValue
    userSentiment?: NullableStringFieldUpdateOperationsInput | string | null
    gcpSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    vertexAiModel?: StringFieldUpdateOperationsInput | string
    cloudRunEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    thoughtSignatures?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AvatarSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    avatarName?: StringFieldUpdateOperationsInput | string
    avatarRole?: StringFieldUpdateOperationsInput | string
    engine?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    latencyAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    conversationLog?: JsonNullValueInput | InputJsonValue
    userSentiment?: NullableStringFieldUpdateOperationsInput | string | null
    gcpSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    vertexAiModel?: StringFieldUpdateOperationsInput | string
    cloudRunEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    thoughtSignatures?: NullableJsonNullValueInput | InputJsonValue
  }

  export type EvidenceFolderCreateInput = {
    id?: string
    studentId: string
    gradeLevel?: string | null
    specialEdStatus?: string | null
    title: string
    category: string
    createdAt?: Date | string
    updatedAt?: Date | string
    aiSummary?: string | null
    riskLevel?: string | null
    complianceScore?: number | null
    user: UserCreateNestedOneWithoutEvidenceFoldersInput
    observations?: ObservationCreateNestedManyWithoutEvidenceFolderInput
    documents?: DocumentCreateNestedManyWithoutEvidenceFolderInput
  }

  export type EvidenceFolderUncheckedCreateInput = {
    id?: string
    userId: string
    studentId: string
    gradeLevel?: string | null
    specialEdStatus?: string | null
    title: string
    category: string
    createdAt?: Date | string
    updatedAt?: Date | string
    aiSummary?: string | null
    riskLevel?: string | null
    complianceScore?: number | null
    observations?: ObservationUncheckedCreateNestedManyWithoutEvidenceFolderInput
    documents?: DocumentUncheckedCreateNestedManyWithoutEvidenceFolderInput
  }

  export type EvidenceFolderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    gradeLevel?: NullableStringFieldUpdateOperationsInput | string | null
    specialEdStatus?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    complianceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutEvidenceFoldersNestedInput
    observations?: ObservationUpdateManyWithoutEvidenceFolderNestedInput
    documents?: DocumentUpdateManyWithoutEvidenceFolderNestedInput
  }

  export type EvidenceFolderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    gradeLevel?: NullableStringFieldUpdateOperationsInput | string | null
    specialEdStatus?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    complianceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: ObservationUncheckedUpdateManyWithoutEvidenceFolderNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutEvidenceFolderNestedInput
  }

  export type EvidenceFolderCreateManyInput = {
    id?: string
    userId: string
    studentId: string
    gradeLevel?: string | null
    specialEdStatus?: string | null
    title: string
    category: string
    createdAt?: Date | string
    updatedAt?: Date | string
    aiSummary?: string | null
    riskLevel?: string | null
    complianceScore?: number | null
  }

  export type EvidenceFolderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    gradeLevel?: NullableStringFieldUpdateOperationsInput | string | null
    specialEdStatus?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    complianceScore?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type EvidenceFolderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    gradeLevel?: NullableStringFieldUpdateOperationsInput | string | null
    specialEdStatus?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    complianceScore?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type ObservationCreateInput = {
    id?: string
    observationType: string
    observationDate?: Date | string
    duration?: number | null
    description: string
    context?: string | null
    interventions?: string | null
    aiAnalysis?: string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: boolean
    hasAudio?: boolean
    hasVideo?: boolean
    hasImages?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutObservationsInput
    evidenceFolder?: EvidenceFolderCreateNestedOneWithoutObservationsInput
    avatarSession?: AvatarSessionCreateNestedOneWithoutObservationsInput
  }

  export type ObservationUncheckedCreateInput = {
    id?: string
    userId: string
    evidenceFolderId?: string | null
    avatarSessionId?: string | null
    observationType: string
    observationDate?: Date | string
    duration?: number | null
    description: string
    context?: string | null
    interventions?: string | null
    aiAnalysis?: string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: boolean
    hasAudio?: boolean
    hasVideo?: boolean
    hasImages?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ObservationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    observationType?: StringFieldUpdateOperationsInput | string
    observationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    interventions?: NullableStringFieldUpdateOperationsInput | string | null
    aiAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: BoolFieldUpdateOperationsInput | boolean
    hasAudio?: BoolFieldUpdateOperationsInput | boolean
    hasVideo?: BoolFieldUpdateOperationsInput | boolean
    hasImages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutObservationsNestedInput
    evidenceFolder?: EvidenceFolderUpdateOneWithoutObservationsNestedInput
    avatarSession?: AvatarSessionUpdateOneWithoutObservationsNestedInput
  }

  export type ObservationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    evidenceFolderId?: NullableStringFieldUpdateOperationsInput | string | null
    avatarSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    observationType?: StringFieldUpdateOperationsInput | string
    observationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    interventions?: NullableStringFieldUpdateOperationsInput | string | null
    aiAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: BoolFieldUpdateOperationsInput | boolean
    hasAudio?: BoolFieldUpdateOperationsInput | boolean
    hasVideo?: BoolFieldUpdateOperationsInput | boolean
    hasImages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ObservationCreateManyInput = {
    id?: string
    userId: string
    evidenceFolderId?: string | null
    avatarSessionId?: string | null
    observationType: string
    observationDate?: Date | string
    duration?: number | null
    description: string
    context?: string | null
    interventions?: string | null
    aiAnalysis?: string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: boolean
    hasAudio?: boolean
    hasVideo?: boolean
    hasImages?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ObservationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    observationType?: StringFieldUpdateOperationsInput | string
    observationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    interventions?: NullableStringFieldUpdateOperationsInput | string | null
    aiAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: BoolFieldUpdateOperationsInput | boolean
    hasAudio?: BoolFieldUpdateOperationsInput | boolean
    hasVideo?: BoolFieldUpdateOperationsInput | boolean
    hasImages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ObservationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    evidenceFolderId?: NullableStringFieldUpdateOperationsInput | string | null
    avatarSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    observationType?: StringFieldUpdateOperationsInput | string
    observationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    interventions?: NullableStringFieldUpdateOperationsInput | string | null
    aiAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: BoolFieldUpdateOperationsInput | boolean
    hasAudio?: BoolFieldUpdateOperationsInput | boolean
    hasVideo?: BoolFieldUpdateOperationsInput | boolean
    hasImages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateInput = {
    id?: string
    fileName: string
    fileType: string
    fileSize: number
    gcpBucketPath: string
    gcpSignedUrl?: string | null
    urlExpiresAt?: Date | string | null
    encrypted?: boolean
    accessLevel?: string
    uploadedAt?: Date | string
    evidenceFolder: EvidenceFolderCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    evidenceFolderId: string
    fileName: string
    fileType: string
    fileSize: number
    gcpBucketPath: string
    gcpSignedUrl?: string | null
    urlExpiresAt?: Date | string | null
    encrypted?: boolean
    accessLevel?: string
    uploadedAt?: Date | string
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    gcpBucketPath?: StringFieldUpdateOperationsInput | string
    gcpSignedUrl?: NullableStringFieldUpdateOperationsInput | string | null
    urlExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    encrypted?: BoolFieldUpdateOperationsInput | boolean
    accessLevel?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evidenceFolder?: EvidenceFolderUpdateOneRequiredWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    evidenceFolderId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    gcpBucketPath?: StringFieldUpdateOperationsInput | string
    gcpSignedUrl?: NullableStringFieldUpdateOperationsInput | string | null
    urlExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    encrypted?: BoolFieldUpdateOperationsInput | boolean
    accessLevel?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateManyInput = {
    id?: string
    evidenceFolderId: string
    fileName: string
    fileType: string
    fileSize: number
    gcpBucketPath: string
    gcpSignedUrl?: string | null
    urlExpiresAt?: Date | string | null
    encrypted?: boolean
    accessLevel?: string
    uploadedAt?: Date | string
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    gcpBucketPath?: StringFieldUpdateOperationsInput | string
    gcpSignedUrl?: NullableStringFieldUpdateOperationsInput | string | null
    urlExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    encrypted?: BoolFieldUpdateOperationsInput | boolean
    accessLevel?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    evidenceFolderId?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    gcpBucketPath?: StringFieldUpdateOperationsInput | string
    gcpSignedUrl?: NullableStringFieldUpdateOperationsInput | string | null
    urlExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    encrypted?: BoolFieldUpdateOperationsInput | boolean
    accessLevel?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GenerationCreateInput = {
    id?: string
    generatorId: string
    prompt: string
    content: string
    professorVideoUrl?: string | null
    avatarEngine?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutGenerationsInput
  }

  export type GenerationUncheckedCreateInput = {
    id?: string
    userId: string
    generatorId: string
    prompt: string
    content: string
    professorVideoUrl?: string | null
    avatarEngine?: string | null
    createdAt?: Date | string
  }

  export type GenerationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    generatorId?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    professorVideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarEngine?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGenerationsNestedInput
  }

  export type GenerationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    generatorId?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    professorVideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarEngine?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GenerationCreateManyInput = {
    id?: string
    userId: string
    generatorId: string
    prompt: string
    content: string
    professorVideoUrl?: string | null
    avatarEngine?: string | null
    createdAt?: Date | string
  }

  export type GenerationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    generatorId?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    professorVideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarEngine?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GenerationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    generatorId?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    professorVideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarEngine?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventCreateInput = {
    id?: string
    userId?: string | null
    eventType: string
    eventCategory: string
    eventAction: string
    eventLabel?: string | null
    latency?: number | null
    tokensUsed?: number | null
    gcpCost?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    userAgent?: string | null
    ipAddress?: string | null
    timestamp?: Date | string
  }

  export type AnalyticsEventUncheckedCreateInput = {
    id?: string
    userId?: string | null
    eventType: string
    eventCategory: string
    eventAction: string
    eventLabel?: string | null
    latency?: number | null
    tokensUsed?: number | null
    gcpCost?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    userAgent?: string | null
    ipAddress?: string | null
    timestamp?: Date | string
  }

  export type AnalyticsEventUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    eventCategory?: StringFieldUpdateOperationsInput | string
    eventAction?: StringFieldUpdateOperationsInput | string
    eventLabel?: NullableStringFieldUpdateOperationsInput | string | null
    latency?: NullableFloatFieldUpdateOperationsInput | number | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    gcpCost?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    eventCategory?: StringFieldUpdateOperationsInput | string
    eventAction?: StringFieldUpdateOperationsInput | string
    eventLabel?: NullableStringFieldUpdateOperationsInput | string | null
    latency?: NullableFloatFieldUpdateOperationsInput | number | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    gcpCost?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventCreateManyInput = {
    id?: string
    userId?: string | null
    eventType: string
    eventCategory: string
    eventAction: string
    eventLabel?: string | null
    latency?: number | null
    tokensUsed?: number | null
    gcpCost?: number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    userAgent?: string | null
    ipAddress?: string | null
    timestamp?: Date | string
  }

  export type AnalyticsEventUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    eventCategory?: StringFieldUpdateOperationsInput | string
    eventAction?: StringFieldUpdateOperationsInput | string
    eventLabel?: NullableStringFieldUpdateOperationsInput | string | null
    latency?: NullableFloatFieldUpdateOperationsInput | number | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    gcpCost?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AnalyticsEventUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    eventType?: StringFieldUpdateOperationsInput | string
    eventCategory?: StringFieldUpdateOperationsInput | string
    eventAction?: StringFieldUpdateOperationsInput | string
    eventLabel?: NullableStringFieldUpdateOperationsInput | string | null
    latency?: NullableFloatFieldUpdateOperationsInput | number | null
    tokensUsed?: NullableIntFieldUpdateOperationsInput | number | null
    gcpCost?: NullableFloatFieldUpdateOperationsInput | number | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SemanticCacheCreateInput = {
    id?: string
    query: string
    response: string
    hitCount?: number
    lastHitAt?: Date | string
    createdAt?: Date | string
  }

  export type SemanticCacheUncheckedCreateInput = {
    id?: string
    query: string
    response: string
    hitCount?: number
    lastHitAt?: Date | string
    createdAt?: Date | string
  }

  export type SemanticCacheUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    hitCount?: IntFieldUpdateOperationsInput | number
    lastHitAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SemanticCacheUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    hitCount?: IntFieldUpdateOperationsInput | number
    lastHitAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SemanticCacheCreateManyInput = {
    id?: string
    query: string
    response: string
    hitCount?: number
    lastHitAt?: Date | string
    createdAt?: Date | string
  }

  export type SemanticCacheUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    hitCount?: IntFieldUpdateOperationsInput | number
    lastHitAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SemanticCacheUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    query?: StringFieldUpdateOperationsInput | string
    response?: StringFieldUpdateOperationsInput | string
    hitCount?: IntFieldUpdateOperationsInput | number
    lastHitAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GraphNodeCreateInput = {
    id?: string
    label: string
    name: string
    properties?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    outbound?: GraphEdgeCreateNestedManyWithoutSourceInput
    inbound?: GraphEdgeCreateNestedManyWithoutTargetInput
  }

  export type GraphNodeUncheckedCreateInput = {
    id?: string
    label: string
    name: string
    properties?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    outbound?: GraphEdgeUncheckedCreateNestedManyWithoutSourceInput
    inbound?: GraphEdgeUncheckedCreateNestedManyWithoutTargetInput
  }

  export type GraphNodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    properties?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    outbound?: GraphEdgeUpdateManyWithoutSourceNestedInput
    inbound?: GraphEdgeUpdateManyWithoutTargetNestedInput
  }

  export type GraphNodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    properties?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    outbound?: GraphEdgeUncheckedUpdateManyWithoutSourceNestedInput
    inbound?: GraphEdgeUncheckedUpdateManyWithoutTargetNestedInput
  }

  export type GraphNodeCreateManyInput = {
    id?: string
    label: string
    name: string
    properties?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type GraphNodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    properties?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GraphNodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    properties?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GraphEdgeCreateInput = {
    id?: string
    type: string
    properties?: NullableJsonNullValueInput | InputJsonValue
    weight?: number
    createdAt?: Date | string
    source: GraphNodeCreateNestedOneWithoutOutboundInput
    target: GraphNodeCreateNestedOneWithoutInboundInput
  }

  export type GraphEdgeUncheckedCreateInput = {
    id?: string
    type: string
    properties?: NullableJsonNullValueInput | InputJsonValue
    sourceId: string
    targetId: string
    weight?: number
    createdAt?: Date | string
  }

  export type GraphEdgeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    properties?: NullableJsonNullValueInput | InputJsonValue
    weight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: GraphNodeUpdateOneRequiredWithoutOutboundNestedInput
    target?: GraphNodeUpdateOneRequiredWithoutInboundNestedInput
  }

  export type GraphEdgeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    properties?: NullableJsonNullValueInput | InputJsonValue
    sourceId?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GraphEdgeCreateManyInput = {
    id?: string
    type: string
    properties?: NullableJsonNullValueInput | InputJsonValue
    sourceId: string
    targetId: string
    weight?: number
    createdAt?: Date | string
  }

  export type GraphEdgeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    properties?: NullableJsonNullValueInput | InputJsonValue
    weight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GraphEdgeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    properties?: NullableJsonNullValueInput | InputJsonValue
    sourceId?: StringFieldUpdateOperationsInput | string
    targetId?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EdintelMediaCountOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    url?: SortOrder
    mediaType?: SortOrder
    size?: SortOrder
    uploadedAt?: SortOrder
  }

  export type EdintelMediaAvgOrderByAggregateInput = {
    size?: SortOrder
  }

  export type EdintelMediaMaxOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    url?: SortOrder
    mediaType?: SortOrder
    size?: SortOrder
    uploadedAt?: SortOrder
  }

  export type EdintelMediaMinOrderByAggregateInput = {
    id?: SortOrder
    fileName?: SortOrder
    url?: SortOrder
    mediaType?: SortOrder
    size?: SortOrder
    uploadedAt?: SortOrder
  }

  export type EdintelMediaSumOrderByAggregateInput = {
    size?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TierCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    signupPrice?: SortOrder
    description?: SortOrder
  }

  export type TierAvgOrderByAggregateInput = {
    signupPrice?: SortOrder
  }

  export type TierMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    signupPrice?: SortOrder
    description?: SortOrder
  }

  export type TierMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    signupPrice?: SortOrder
    description?: SortOrder
  }

  export type TierSumOrderByAggregateInput = {
    signupPrice?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type OrganizationNullableRelationFilter = {
    is?: OrganizationWhereInput | null
    isNot?: OrganizationWhereInput | null
  }

  export type TierNullableRelationFilter = {
    is?: TierWhereInput | null
    isNot?: TierWhereInput | null
  }

  export type GenerationListRelationFilter = {
    every?: GenerationWhereInput
    some?: GenerationWhereInput
    none?: GenerationWhereInput
  }

  export type ObservationListRelationFilter = {
    every?: ObservationWhereInput
    some?: ObservationWhereInput
    none?: ObservationWhereInput
  }

  export type EvidenceFolderListRelationFilter = {
    every?: EvidenceFolderWhereInput
    some?: EvidenceFolderWhereInput
    none?: EvidenceFolderWhereInput
  }

  export type AvatarSessionListRelationFilter = {
    every?: AvatarSessionWhereInput
    some?: AvatarSessionWhereInput
    none?: AvatarSessionWhereInput
  }

  export type GenerationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ObservationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EvidenceFolderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AvatarSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    district?: SortOrder
    school?: SortOrder
    schoolSite?: SortOrder
    position?: SortOrder
    organizationId?: SortOrder
    stripeCustomerId?: SortOrder
    subscriptionTier?: SortOrder
    subscriptionStatus?: SortOrder
    usageTokens?: SortOrder
    xpPoints?: SortOrder
    trialStartedAt?: SortOrder
    trialEndsAt?: SortOrder
    isTrialConverted?: SortOrder
    tierId?: SortOrder
    googleId?: SortOrder
    avatarUrl?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrder
    subscriptionId?: SortOrder
    lastPaymentAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    usageTokens?: SortOrder
    xpPoints?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    district?: SortOrder
    school?: SortOrder
    schoolSite?: SortOrder
    position?: SortOrder
    organizationId?: SortOrder
    stripeCustomerId?: SortOrder
    subscriptionTier?: SortOrder
    subscriptionStatus?: SortOrder
    usageTokens?: SortOrder
    xpPoints?: SortOrder
    trialStartedAt?: SortOrder
    trialEndsAt?: SortOrder
    isTrialConverted?: SortOrder
    tierId?: SortOrder
    googleId?: SortOrder
    avatarUrl?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrder
    subscriptionId?: SortOrder
    lastPaymentAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    role?: SortOrder
    district?: SortOrder
    school?: SortOrder
    schoolSite?: SortOrder
    position?: SortOrder
    organizationId?: SortOrder
    stripeCustomerId?: SortOrder
    subscriptionTier?: SortOrder
    subscriptionStatus?: SortOrder
    usageTokens?: SortOrder
    xpPoints?: SortOrder
    trialStartedAt?: SortOrder
    trialEndsAt?: SortOrder
    isTrialConverted?: SortOrder
    tierId?: SortOrder
    googleId?: SortOrder
    avatarUrl?: SortOrder
    passwordHash?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrder
    subscriptionId?: SortOrder
    lastPaymentAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    usageTokens?: SortOrder
    xpPoints?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type OrganizationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tier?: SortOrder
    trialStartedAt?: SortOrder
    trialStartsAt?: SortOrder
    trialEndsAt?: SortOrder
    isTrialConverted?: SortOrder
    usageTokens?: SortOrder
    address?: SortOrder
    contactEmail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationAvgOrderByAggregateInput = {
    usageTokens?: SortOrder
  }

  export type OrganizationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tier?: SortOrder
    trialStartedAt?: SortOrder
    trialStartsAt?: SortOrder
    trialEndsAt?: SortOrder
    isTrialConverted?: SortOrder
    usageTokens?: SortOrder
    address?: SortOrder
    contactEmail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    tier?: SortOrder
    trialStartedAt?: SortOrder
    trialStartsAt?: SortOrder
    trialEndsAt?: SortOrder
    isTrialConverted?: SortOrder
    usageTokens?: SortOrder
    address?: SortOrder
    contactEmail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrganizationSumOrderByAggregateInput = {
    usageTokens?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AvatarSessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    avatarName?: SortOrder
    avatarRole?: SortOrder
    engine?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    duration?: SortOrder
    latencyAvg?: SortOrder
    conversationLog?: SortOrder
    userSentiment?: SortOrder
    gcpSessionId?: SortOrder
    vertexAiModel?: SortOrder
    cloudRunEndpoint?: SortOrder
    thoughtSignatures?: SortOrder
  }

  export type AvatarSessionAvgOrderByAggregateInput = {
    duration?: SortOrder
    latencyAvg?: SortOrder
  }

  export type AvatarSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    avatarName?: SortOrder
    avatarRole?: SortOrder
    engine?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    duration?: SortOrder
    latencyAvg?: SortOrder
    userSentiment?: SortOrder
    gcpSessionId?: SortOrder
    vertexAiModel?: SortOrder
    cloudRunEndpoint?: SortOrder
  }

  export type AvatarSessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    avatarName?: SortOrder
    avatarRole?: SortOrder
    engine?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    duration?: SortOrder
    latencyAvg?: SortOrder
    userSentiment?: SortOrder
    gcpSessionId?: SortOrder
    vertexAiModel?: SortOrder
    cloudRunEndpoint?: SortOrder
  }

  export type AvatarSessionSumOrderByAggregateInput = {
    duration?: SortOrder
    latencyAvg?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput
    some?: DocumentWhereInput
    none?: DocumentWhereInput
  }

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EvidenceFolderCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    studentId?: SortOrder
    gradeLevel?: SortOrder
    specialEdStatus?: SortOrder
    title?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    aiSummary?: SortOrder
    riskLevel?: SortOrder
    complianceScore?: SortOrder
  }

  export type EvidenceFolderAvgOrderByAggregateInput = {
    complianceScore?: SortOrder
  }

  export type EvidenceFolderMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    studentId?: SortOrder
    gradeLevel?: SortOrder
    specialEdStatus?: SortOrder
    title?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    aiSummary?: SortOrder
    riskLevel?: SortOrder
    complianceScore?: SortOrder
  }

  export type EvidenceFolderMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    studentId?: SortOrder
    gradeLevel?: SortOrder
    specialEdStatus?: SortOrder
    title?: SortOrder
    category?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    aiSummary?: SortOrder
    riskLevel?: SortOrder
    complianceScore?: SortOrder
  }

  export type EvidenceFolderSumOrderByAggregateInput = {
    complianceScore?: SortOrder
  }

  export type EvidenceFolderNullableRelationFilter = {
    is?: EvidenceFolderWhereInput | null
    isNot?: EvidenceFolderWhereInput | null
  }

  export type AvatarSessionNullableRelationFilter = {
    is?: AvatarSessionWhereInput | null
    isNot?: AvatarSessionWhereInput | null
  }

  export type ObservationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    evidenceFolderId?: SortOrder
    avatarSessionId?: SortOrder
    observationType?: SortOrder
    observationDate?: SortOrder
    duration?: SortOrder
    description?: SortOrder
    context?: SortOrder
    interventions?: SortOrder
    aiAnalysis?: SortOrder
    suggestedActions?: SortOrder
    legalCompliance?: SortOrder
    hasAudio?: SortOrder
    hasVideo?: SortOrder
    hasImages?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ObservationAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type ObservationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    evidenceFolderId?: SortOrder
    avatarSessionId?: SortOrder
    observationType?: SortOrder
    observationDate?: SortOrder
    duration?: SortOrder
    description?: SortOrder
    context?: SortOrder
    interventions?: SortOrder
    aiAnalysis?: SortOrder
    legalCompliance?: SortOrder
    hasAudio?: SortOrder
    hasVideo?: SortOrder
    hasImages?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ObservationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    evidenceFolderId?: SortOrder
    avatarSessionId?: SortOrder
    observationType?: SortOrder
    observationDate?: SortOrder
    duration?: SortOrder
    description?: SortOrder
    context?: SortOrder
    interventions?: SortOrder
    aiAnalysis?: SortOrder
    legalCompliance?: SortOrder
    hasAudio?: SortOrder
    hasVideo?: SortOrder
    hasImages?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ObservationSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type EvidenceFolderRelationFilter = {
    is?: EvidenceFolderWhereInput
    isNot?: EvidenceFolderWhereInput
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    evidenceFolderId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    gcpBucketPath?: SortOrder
    gcpSignedUrl?: SortOrder
    urlExpiresAt?: SortOrder
    encrypted?: SortOrder
    accessLevel?: SortOrder
    uploadedAt?: SortOrder
  }

  export type DocumentAvgOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    evidenceFolderId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    gcpBucketPath?: SortOrder
    gcpSignedUrl?: SortOrder
    urlExpiresAt?: SortOrder
    encrypted?: SortOrder
    accessLevel?: SortOrder
    uploadedAt?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    evidenceFolderId?: SortOrder
    fileName?: SortOrder
    fileType?: SortOrder
    fileSize?: SortOrder
    gcpBucketPath?: SortOrder
    gcpSignedUrl?: SortOrder
    urlExpiresAt?: SortOrder
    encrypted?: SortOrder
    accessLevel?: SortOrder
    uploadedAt?: SortOrder
  }

  export type DocumentSumOrderByAggregateInput = {
    fileSize?: SortOrder
  }

  export type GenerationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    generatorId?: SortOrder
    prompt?: SortOrder
    content?: SortOrder
    professorVideoUrl?: SortOrder
    avatarEngine?: SortOrder
    createdAt?: SortOrder
  }

  export type GenerationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    generatorId?: SortOrder
    prompt?: SortOrder
    content?: SortOrder
    professorVideoUrl?: SortOrder
    avatarEngine?: SortOrder
    createdAt?: SortOrder
  }

  export type GenerationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    generatorId?: SortOrder
    prompt?: SortOrder
    content?: SortOrder
    professorVideoUrl?: SortOrder
    avatarEngine?: SortOrder
    createdAt?: SortOrder
  }

  export type AnalyticsEventCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eventType?: SortOrder
    eventCategory?: SortOrder
    eventAction?: SortOrder
    eventLabel?: SortOrder
    latency?: SortOrder
    tokensUsed?: SortOrder
    gcpCost?: SortOrder
    metadata?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    timestamp?: SortOrder
  }

  export type AnalyticsEventAvgOrderByAggregateInput = {
    latency?: SortOrder
    tokensUsed?: SortOrder
    gcpCost?: SortOrder
  }

  export type AnalyticsEventMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eventType?: SortOrder
    eventCategory?: SortOrder
    eventAction?: SortOrder
    eventLabel?: SortOrder
    latency?: SortOrder
    tokensUsed?: SortOrder
    gcpCost?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    timestamp?: SortOrder
  }

  export type AnalyticsEventMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    eventType?: SortOrder
    eventCategory?: SortOrder
    eventAction?: SortOrder
    eventLabel?: SortOrder
    latency?: SortOrder
    tokensUsed?: SortOrder
    gcpCost?: SortOrder
    userAgent?: SortOrder
    ipAddress?: SortOrder
    timestamp?: SortOrder
  }

  export type AnalyticsEventSumOrderByAggregateInput = {
    latency?: SortOrder
    tokensUsed?: SortOrder
    gcpCost?: SortOrder
  }

  export type SemanticCacheCountOrderByAggregateInput = {
    id?: SortOrder
    query?: SortOrder
    response?: SortOrder
    hitCount?: SortOrder
    lastHitAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SemanticCacheAvgOrderByAggregateInput = {
    hitCount?: SortOrder
  }

  export type SemanticCacheMaxOrderByAggregateInput = {
    id?: SortOrder
    query?: SortOrder
    response?: SortOrder
    hitCount?: SortOrder
    lastHitAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SemanticCacheMinOrderByAggregateInput = {
    id?: SortOrder
    query?: SortOrder
    response?: SortOrder
    hitCount?: SortOrder
    lastHitAt?: SortOrder
    createdAt?: SortOrder
  }

  export type SemanticCacheSumOrderByAggregateInput = {
    hitCount?: SortOrder
  }

  export type GraphEdgeListRelationFilter = {
    every?: GraphEdgeWhereInput
    some?: GraphEdgeWhereInput
    none?: GraphEdgeWhereInput
  }

  export type GraphEdgeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GraphNodeCountOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    name?: SortOrder
    properties?: SortOrder
    createdAt?: SortOrder
  }

  export type GraphNodeMaxOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type GraphNodeMinOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
  }

  export type GraphNodeRelationFilter = {
    is?: GraphNodeWhereInput
    isNot?: GraphNodeWhereInput
  }

  export type GraphEdgeCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    properties?: SortOrder
    sourceId?: SortOrder
    targetId?: SortOrder
    weight?: SortOrder
    createdAt?: SortOrder
  }

  export type GraphEdgeAvgOrderByAggregateInput = {
    weight?: SortOrder
  }

  export type GraphEdgeMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    sourceId?: SortOrder
    targetId?: SortOrder
    weight?: SortOrder
    createdAt?: SortOrder
  }

  export type GraphEdgeMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    sourceId?: SortOrder
    targetId?: SortOrder
    weight?: SortOrder
    createdAt?: SortOrder
  }

  export type GraphEdgeSumOrderByAggregateInput = {
    weight?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserCreateNestedManyWithoutTierInput = {
    create?: XOR<UserCreateWithoutTierInput, UserUncheckedCreateWithoutTierInput> | UserCreateWithoutTierInput[] | UserUncheckedCreateWithoutTierInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTierInput | UserCreateOrConnectWithoutTierInput[]
    createMany?: UserCreateManyTierInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutTierInput = {
    create?: XOR<UserCreateWithoutTierInput, UserUncheckedCreateWithoutTierInput> | UserCreateWithoutTierInput[] | UserUncheckedCreateWithoutTierInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTierInput | UserCreateOrConnectWithoutTierInput[]
    createMany?: UserCreateManyTierInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateManyWithoutTierNestedInput = {
    create?: XOR<UserCreateWithoutTierInput, UserUncheckedCreateWithoutTierInput> | UserCreateWithoutTierInput[] | UserUncheckedCreateWithoutTierInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTierInput | UserCreateOrConnectWithoutTierInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutTierInput | UserUpsertWithWhereUniqueWithoutTierInput[]
    createMany?: UserCreateManyTierInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutTierInput | UserUpdateWithWhereUniqueWithoutTierInput[]
    updateMany?: UserUpdateManyWithWhereWithoutTierInput | UserUpdateManyWithWhereWithoutTierInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutTierNestedInput = {
    create?: XOR<UserCreateWithoutTierInput, UserUncheckedCreateWithoutTierInput> | UserCreateWithoutTierInput[] | UserUncheckedCreateWithoutTierInput[]
    connectOrCreate?: UserCreateOrConnectWithoutTierInput | UserCreateOrConnectWithoutTierInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutTierInput | UserUpsertWithWhereUniqueWithoutTierInput[]
    createMany?: UserCreateManyTierInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutTierInput | UserUpdateWithWhereUniqueWithoutTierInput[]
    updateMany?: UserUpdateManyWithWhereWithoutTierInput | UserUpdateManyWithWhereWithoutTierInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type OrganizationCreateNestedOneWithoutUsersInput = {
    create?: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutUsersInput
    connect?: OrganizationWhereUniqueInput
  }

  export type TierCreateNestedOneWithoutUsersInput = {
    create?: XOR<TierCreateWithoutUsersInput, TierUncheckedCreateWithoutUsersInput>
    connectOrCreate?: TierCreateOrConnectWithoutUsersInput
    connect?: TierWhereUniqueInput
  }

  export type GenerationCreateNestedManyWithoutUserInput = {
    create?: XOR<GenerationCreateWithoutUserInput, GenerationUncheckedCreateWithoutUserInput> | GenerationCreateWithoutUserInput[] | GenerationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GenerationCreateOrConnectWithoutUserInput | GenerationCreateOrConnectWithoutUserInput[]
    createMany?: GenerationCreateManyUserInputEnvelope
    connect?: GenerationWhereUniqueInput | GenerationWhereUniqueInput[]
  }

  export type ObservationCreateNestedManyWithoutUserInput = {
    create?: XOR<ObservationCreateWithoutUserInput, ObservationUncheckedCreateWithoutUserInput> | ObservationCreateWithoutUserInput[] | ObservationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ObservationCreateOrConnectWithoutUserInput | ObservationCreateOrConnectWithoutUserInput[]
    createMany?: ObservationCreateManyUserInputEnvelope
    connect?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
  }

  export type EvidenceFolderCreateNestedManyWithoutUserInput = {
    create?: XOR<EvidenceFolderCreateWithoutUserInput, EvidenceFolderUncheckedCreateWithoutUserInput> | EvidenceFolderCreateWithoutUserInput[] | EvidenceFolderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EvidenceFolderCreateOrConnectWithoutUserInput | EvidenceFolderCreateOrConnectWithoutUserInput[]
    createMany?: EvidenceFolderCreateManyUserInputEnvelope
    connect?: EvidenceFolderWhereUniqueInput | EvidenceFolderWhereUniqueInput[]
  }

  export type AvatarSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<AvatarSessionCreateWithoutUserInput, AvatarSessionUncheckedCreateWithoutUserInput> | AvatarSessionCreateWithoutUserInput[] | AvatarSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AvatarSessionCreateOrConnectWithoutUserInput | AvatarSessionCreateOrConnectWithoutUserInput[]
    createMany?: AvatarSessionCreateManyUserInputEnvelope
    connect?: AvatarSessionWhereUniqueInput | AvatarSessionWhereUniqueInput[]
  }

  export type GenerationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<GenerationCreateWithoutUserInput, GenerationUncheckedCreateWithoutUserInput> | GenerationCreateWithoutUserInput[] | GenerationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GenerationCreateOrConnectWithoutUserInput | GenerationCreateOrConnectWithoutUserInput[]
    createMany?: GenerationCreateManyUserInputEnvelope
    connect?: GenerationWhereUniqueInput | GenerationWhereUniqueInput[]
  }

  export type ObservationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ObservationCreateWithoutUserInput, ObservationUncheckedCreateWithoutUserInput> | ObservationCreateWithoutUserInput[] | ObservationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ObservationCreateOrConnectWithoutUserInput | ObservationCreateOrConnectWithoutUserInput[]
    createMany?: ObservationCreateManyUserInputEnvelope
    connect?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
  }

  export type EvidenceFolderUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EvidenceFolderCreateWithoutUserInput, EvidenceFolderUncheckedCreateWithoutUserInput> | EvidenceFolderCreateWithoutUserInput[] | EvidenceFolderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EvidenceFolderCreateOrConnectWithoutUserInput | EvidenceFolderCreateOrConnectWithoutUserInput[]
    createMany?: EvidenceFolderCreateManyUserInputEnvelope
    connect?: EvidenceFolderWhereUniqueInput | EvidenceFolderWhereUniqueInput[]
  }

  export type AvatarSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AvatarSessionCreateWithoutUserInput, AvatarSessionUncheckedCreateWithoutUserInput> | AvatarSessionCreateWithoutUserInput[] | AvatarSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AvatarSessionCreateOrConnectWithoutUserInput | AvatarSessionCreateOrConnectWithoutUserInput[]
    createMany?: AvatarSessionCreateManyUserInputEnvelope
    connect?: AvatarSessionWhereUniqueInput | AvatarSessionWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type OrganizationUpdateOneWithoutUsersNestedInput = {
    create?: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
    connectOrCreate?: OrganizationCreateOrConnectWithoutUsersInput
    upsert?: OrganizationUpsertWithoutUsersInput
    disconnect?: OrganizationWhereInput | boolean
    delete?: OrganizationWhereInput | boolean
    connect?: OrganizationWhereUniqueInput
    update?: XOR<XOR<OrganizationUpdateToOneWithWhereWithoutUsersInput, OrganizationUpdateWithoutUsersInput>, OrganizationUncheckedUpdateWithoutUsersInput>
  }

  export type TierUpdateOneWithoutUsersNestedInput = {
    create?: XOR<TierCreateWithoutUsersInput, TierUncheckedCreateWithoutUsersInput>
    connectOrCreate?: TierCreateOrConnectWithoutUsersInput
    upsert?: TierUpsertWithoutUsersInput
    disconnect?: TierWhereInput | boolean
    delete?: TierWhereInput | boolean
    connect?: TierWhereUniqueInput
    update?: XOR<XOR<TierUpdateToOneWithWhereWithoutUsersInput, TierUpdateWithoutUsersInput>, TierUncheckedUpdateWithoutUsersInput>
  }

  export type GenerationUpdateManyWithoutUserNestedInput = {
    create?: XOR<GenerationCreateWithoutUserInput, GenerationUncheckedCreateWithoutUserInput> | GenerationCreateWithoutUserInput[] | GenerationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GenerationCreateOrConnectWithoutUserInput | GenerationCreateOrConnectWithoutUserInput[]
    upsert?: GenerationUpsertWithWhereUniqueWithoutUserInput | GenerationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GenerationCreateManyUserInputEnvelope
    set?: GenerationWhereUniqueInput | GenerationWhereUniqueInput[]
    disconnect?: GenerationWhereUniqueInput | GenerationWhereUniqueInput[]
    delete?: GenerationWhereUniqueInput | GenerationWhereUniqueInput[]
    connect?: GenerationWhereUniqueInput | GenerationWhereUniqueInput[]
    update?: GenerationUpdateWithWhereUniqueWithoutUserInput | GenerationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GenerationUpdateManyWithWhereWithoutUserInput | GenerationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GenerationScalarWhereInput | GenerationScalarWhereInput[]
  }

  export type ObservationUpdateManyWithoutUserNestedInput = {
    create?: XOR<ObservationCreateWithoutUserInput, ObservationUncheckedCreateWithoutUserInput> | ObservationCreateWithoutUserInput[] | ObservationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ObservationCreateOrConnectWithoutUserInput | ObservationCreateOrConnectWithoutUserInput[]
    upsert?: ObservationUpsertWithWhereUniqueWithoutUserInput | ObservationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ObservationCreateManyUserInputEnvelope
    set?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    disconnect?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    delete?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    connect?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    update?: ObservationUpdateWithWhereUniqueWithoutUserInput | ObservationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ObservationUpdateManyWithWhereWithoutUserInput | ObservationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ObservationScalarWhereInput | ObservationScalarWhereInput[]
  }

  export type EvidenceFolderUpdateManyWithoutUserNestedInput = {
    create?: XOR<EvidenceFolderCreateWithoutUserInput, EvidenceFolderUncheckedCreateWithoutUserInput> | EvidenceFolderCreateWithoutUserInput[] | EvidenceFolderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EvidenceFolderCreateOrConnectWithoutUserInput | EvidenceFolderCreateOrConnectWithoutUserInput[]
    upsert?: EvidenceFolderUpsertWithWhereUniqueWithoutUserInput | EvidenceFolderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EvidenceFolderCreateManyUserInputEnvelope
    set?: EvidenceFolderWhereUniqueInput | EvidenceFolderWhereUniqueInput[]
    disconnect?: EvidenceFolderWhereUniqueInput | EvidenceFolderWhereUniqueInput[]
    delete?: EvidenceFolderWhereUniqueInput | EvidenceFolderWhereUniqueInput[]
    connect?: EvidenceFolderWhereUniqueInput | EvidenceFolderWhereUniqueInput[]
    update?: EvidenceFolderUpdateWithWhereUniqueWithoutUserInput | EvidenceFolderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EvidenceFolderUpdateManyWithWhereWithoutUserInput | EvidenceFolderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EvidenceFolderScalarWhereInput | EvidenceFolderScalarWhereInput[]
  }

  export type AvatarSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<AvatarSessionCreateWithoutUserInput, AvatarSessionUncheckedCreateWithoutUserInput> | AvatarSessionCreateWithoutUserInput[] | AvatarSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AvatarSessionCreateOrConnectWithoutUserInput | AvatarSessionCreateOrConnectWithoutUserInput[]
    upsert?: AvatarSessionUpsertWithWhereUniqueWithoutUserInput | AvatarSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AvatarSessionCreateManyUserInputEnvelope
    set?: AvatarSessionWhereUniqueInput | AvatarSessionWhereUniqueInput[]
    disconnect?: AvatarSessionWhereUniqueInput | AvatarSessionWhereUniqueInput[]
    delete?: AvatarSessionWhereUniqueInput | AvatarSessionWhereUniqueInput[]
    connect?: AvatarSessionWhereUniqueInput | AvatarSessionWhereUniqueInput[]
    update?: AvatarSessionUpdateWithWhereUniqueWithoutUserInput | AvatarSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AvatarSessionUpdateManyWithWhereWithoutUserInput | AvatarSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AvatarSessionScalarWhereInput | AvatarSessionScalarWhereInput[]
  }

  export type GenerationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<GenerationCreateWithoutUserInput, GenerationUncheckedCreateWithoutUserInput> | GenerationCreateWithoutUserInput[] | GenerationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: GenerationCreateOrConnectWithoutUserInput | GenerationCreateOrConnectWithoutUserInput[]
    upsert?: GenerationUpsertWithWhereUniqueWithoutUserInput | GenerationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: GenerationCreateManyUserInputEnvelope
    set?: GenerationWhereUniqueInput | GenerationWhereUniqueInput[]
    disconnect?: GenerationWhereUniqueInput | GenerationWhereUniqueInput[]
    delete?: GenerationWhereUniqueInput | GenerationWhereUniqueInput[]
    connect?: GenerationWhereUniqueInput | GenerationWhereUniqueInput[]
    update?: GenerationUpdateWithWhereUniqueWithoutUserInput | GenerationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: GenerationUpdateManyWithWhereWithoutUserInput | GenerationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: GenerationScalarWhereInput | GenerationScalarWhereInput[]
  }

  export type ObservationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ObservationCreateWithoutUserInput, ObservationUncheckedCreateWithoutUserInput> | ObservationCreateWithoutUserInput[] | ObservationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ObservationCreateOrConnectWithoutUserInput | ObservationCreateOrConnectWithoutUserInput[]
    upsert?: ObservationUpsertWithWhereUniqueWithoutUserInput | ObservationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ObservationCreateManyUserInputEnvelope
    set?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    disconnect?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    delete?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    connect?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    update?: ObservationUpdateWithWhereUniqueWithoutUserInput | ObservationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ObservationUpdateManyWithWhereWithoutUserInput | ObservationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ObservationScalarWhereInput | ObservationScalarWhereInput[]
  }

  export type EvidenceFolderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EvidenceFolderCreateWithoutUserInput, EvidenceFolderUncheckedCreateWithoutUserInput> | EvidenceFolderCreateWithoutUserInput[] | EvidenceFolderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EvidenceFolderCreateOrConnectWithoutUserInput | EvidenceFolderCreateOrConnectWithoutUserInput[]
    upsert?: EvidenceFolderUpsertWithWhereUniqueWithoutUserInput | EvidenceFolderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: EvidenceFolderCreateManyUserInputEnvelope
    set?: EvidenceFolderWhereUniqueInput | EvidenceFolderWhereUniqueInput[]
    disconnect?: EvidenceFolderWhereUniqueInput | EvidenceFolderWhereUniqueInput[]
    delete?: EvidenceFolderWhereUniqueInput | EvidenceFolderWhereUniqueInput[]
    connect?: EvidenceFolderWhereUniqueInput | EvidenceFolderWhereUniqueInput[]
    update?: EvidenceFolderUpdateWithWhereUniqueWithoutUserInput | EvidenceFolderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EvidenceFolderUpdateManyWithWhereWithoutUserInput | EvidenceFolderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EvidenceFolderScalarWhereInput | EvidenceFolderScalarWhereInput[]
  }

  export type AvatarSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AvatarSessionCreateWithoutUserInput, AvatarSessionUncheckedCreateWithoutUserInput> | AvatarSessionCreateWithoutUserInput[] | AvatarSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AvatarSessionCreateOrConnectWithoutUserInput | AvatarSessionCreateOrConnectWithoutUserInput[]
    upsert?: AvatarSessionUpsertWithWhereUniqueWithoutUserInput | AvatarSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AvatarSessionCreateManyUserInputEnvelope
    set?: AvatarSessionWhereUniqueInput | AvatarSessionWhereUniqueInput[]
    disconnect?: AvatarSessionWhereUniqueInput | AvatarSessionWhereUniqueInput[]
    delete?: AvatarSessionWhereUniqueInput | AvatarSessionWhereUniqueInput[]
    connect?: AvatarSessionWhereUniqueInput | AvatarSessionWhereUniqueInput[]
    update?: AvatarSessionUpdateWithWhereUniqueWithoutUserInput | AvatarSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AvatarSessionUpdateManyWithWhereWithoutUserInput | AvatarSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AvatarSessionScalarWhereInput | AvatarSessionScalarWhereInput[]
  }

  export type UserCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutOrganizationInput | UserUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutOrganizationInput | UserUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: UserUpdateManyWithWhereWithoutOrganizationInput | UserUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput> | UserCreateWithoutOrganizationInput[] | UserUncheckedCreateWithoutOrganizationInput[]
    connectOrCreate?: UserCreateOrConnectWithoutOrganizationInput | UserCreateOrConnectWithoutOrganizationInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutOrganizationInput | UserUpsertWithWhereUniqueWithoutOrganizationInput[]
    createMany?: UserCreateManyOrganizationInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutOrganizationInput | UserUpdateWithWhereUniqueWithoutOrganizationInput[]
    updateMany?: UserUpdateManyWithWhereWithoutOrganizationInput | UserUpdateManyWithWhereWithoutOrganizationInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutAvatarSessionsInput = {
    create?: XOR<UserCreateWithoutAvatarSessionsInput, UserUncheckedCreateWithoutAvatarSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAvatarSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type ObservationCreateNestedManyWithoutAvatarSessionInput = {
    create?: XOR<ObservationCreateWithoutAvatarSessionInput, ObservationUncheckedCreateWithoutAvatarSessionInput> | ObservationCreateWithoutAvatarSessionInput[] | ObservationUncheckedCreateWithoutAvatarSessionInput[]
    connectOrCreate?: ObservationCreateOrConnectWithoutAvatarSessionInput | ObservationCreateOrConnectWithoutAvatarSessionInput[]
    createMany?: ObservationCreateManyAvatarSessionInputEnvelope
    connect?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
  }

  export type ObservationUncheckedCreateNestedManyWithoutAvatarSessionInput = {
    create?: XOR<ObservationCreateWithoutAvatarSessionInput, ObservationUncheckedCreateWithoutAvatarSessionInput> | ObservationCreateWithoutAvatarSessionInput[] | ObservationUncheckedCreateWithoutAvatarSessionInput[]
    connectOrCreate?: ObservationCreateOrConnectWithoutAvatarSessionInput | ObservationCreateOrConnectWithoutAvatarSessionInput[]
    createMany?: ObservationCreateManyAvatarSessionInputEnvelope
    connect?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAvatarSessionsNestedInput = {
    create?: XOR<UserCreateWithoutAvatarSessionsInput, UserUncheckedCreateWithoutAvatarSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAvatarSessionsInput
    upsert?: UserUpsertWithoutAvatarSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAvatarSessionsInput, UserUpdateWithoutAvatarSessionsInput>, UserUncheckedUpdateWithoutAvatarSessionsInput>
  }

  export type ObservationUpdateManyWithoutAvatarSessionNestedInput = {
    create?: XOR<ObservationCreateWithoutAvatarSessionInput, ObservationUncheckedCreateWithoutAvatarSessionInput> | ObservationCreateWithoutAvatarSessionInput[] | ObservationUncheckedCreateWithoutAvatarSessionInput[]
    connectOrCreate?: ObservationCreateOrConnectWithoutAvatarSessionInput | ObservationCreateOrConnectWithoutAvatarSessionInput[]
    upsert?: ObservationUpsertWithWhereUniqueWithoutAvatarSessionInput | ObservationUpsertWithWhereUniqueWithoutAvatarSessionInput[]
    createMany?: ObservationCreateManyAvatarSessionInputEnvelope
    set?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    disconnect?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    delete?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    connect?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    update?: ObservationUpdateWithWhereUniqueWithoutAvatarSessionInput | ObservationUpdateWithWhereUniqueWithoutAvatarSessionInput[]
    updateMany?: ObservationUpdateManyWithWhereWithoutAvatarSessionInput | ObservationUpdateManyWithWhereWithoutAvatarSessionInput[]
    deleteMany?: ObservationScalarWhereInput | ObservationScalarWhereInput[]
  }

  export type ObservationUncheckedUpdateManyWithoutAvatarSessionNestedInput = {
    create?: XOR<ObservationCreateWithoutAvatarSessionInput, ObservationUncheckedCreateWithoutAvatarSessionInput> | ObservationCreateWithoutAvatarSessionInput[] | ObservationUncheckedCreateWithoutAvatarSessionInput[]
    connectOrCreate?: ObservationCreateOrConnectWithoutAvatarSessionInput | ObservationCreateOrConnectWithoutAvatarSessionInput[]
    upsert?: ObservationUpsertWithWhereUniqueWithoutAvatarSessionInput | ObservationUpsertWithWhereUniqueWithoutAvatarSessionInput[]
    createMany?: ObservationCreateManyAvatarSessionInputEnvelope
    set?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    disconnect?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    delete?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    connect?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    update?: ObservationUpdateWithWhereUniqueWithoutAvatarSessionInput | ObservationUpdateWithWhereUniqueWithoutAvatarSessionInput[]
    updateMany?: ObservationUpdateManyWithWhereWithoutAvatarSessionInput | ObservationUpdateManyWithWhereWithoutAvatarSessionInput[]
    deleteMany?: ObservationScalarWhereInput | ObservationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutEvidenceFoldersInput = {
    create?: XOR<UserCreateWithoutEvidenceFoldersInput, UserUncheckedCreateWithoutEvidenceFoldersInput>
    connectOrCreate?: UserCreateOrConnectWithoutEvidenceFoldersInput
    connect?: UserWhereUniqueInput
  }

  export type ObservationCreateNestedManyWithoutEvidenceFolderInput = {
    create?: XOR<ObservationCreateWithoutEvidenceFolderInput, ObservationUncheckedCreateWithoutEvidenceFolderInput> | ObservationCreateWithoutEvidenceFolderInput[] | ObservationUncheckedCreateWithoutEvidenceFolderInput[]
    connectOrCreate?: ObservationCreateOrConnectWithoutEvidenceFolderInput | ObservationCreateOrConnectWithoutEvidenceFolderInput[]
    createMany?: ObservationCreateManyEvidenceFolderInputEnvelope
    connect?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
  }

  export type DocumentCreateNestedManyWithoutEvidenceFolderInput = {
    create?: XOR<DocumentCreateWithoutEvidenceFolderInput, DocumentUncheckedCreateWithoutEvidenceFolderInput> | DocumentCreateWithoutEvidenceFolderInput[] | DocumentUncheckedCreateWithoutEvidenceFolderInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutEvidenceFolderInput | DocumentCreateOrConnectWithoutEvidenceFolderInput[]
    createMany?: DocumentCreateManyEvidenceFolderInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type ObservationUncheckedCreateNestedManyWithoutEvidenceFolderInput = {
    create?: XOR<ObservationCreateWithoutEvidenceFolderInput, ObservationUncheckedCreateWithoutEvidenceFolderInput> | ObservationCreateWithoutEvidenceFolderInput[] | ObservationUncheckedCreateWithoutEvidenceFolderInput[]
    connectOrCreate?: ObservationCreateOrConnectWithoutEvidenceFolderInput | ObservationCreateOrConnectWithoutEvidenceFolderInput[]
    createMany?: ObservationCreateManyEvidenceFolderInputEnvelope
    connect?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutEvidenceFolderInput = {
    create?: XOR<DocumentCreateWithoutEvidenceFolderInput, DocumentUncheckedCreateWithoutEvidenceFolderInput> | DocumentCreateWithoutEvidenceFolderInput[] | DocumentUncheckedCreateWithoutEvidenceFolderInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutEvidenceFolderInput | DocumentCreateOrConnectWithoutEvidenceFolderInput[]
    createMany?: DocumentCreateManyEvidenceFolderInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutEvidenceFoldersNestedInput = {
    create?: XOR<UserCreateWithoutEvidenceFoldersInput, UserUncheckedCreateWithoutEvidenceFoldersInput>
    connectOrCreate?: UserCreateOrConnectWithoutEvidenceFoldersInput
    upsert?: UserUpsertWithoutEvidenceFoldersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEvidenceFoldersInput, UserUpdateWithoutEvidenceFoldersInput>, UserUncheckedUpdateWithoutEvidenceFoldersInput>
  }

  export type ObservationUpdateManyWithoutEvidenceFolderNestedInput = {
    create?: XOR<ObservationCreateWithoutEvidenceFolderInput, ObservationUncheckedCreateWithoutEvidenceFolderInput> | ObservationCreateWithoutEvidenceFolderInput[] | ObservationUncheckedCreateWithoutEvidenceFolderInput[]
    connectOrCreate?: ObservationCreateOrConnectWithoutEvidenceFolderInput | ObservationCreateOrConnectWithoutEvidenceFolderInput[]
    upsert?: ObservationUpsertWithWhereUniqueWithoutEvidenceFolderInput | ObservationUpsertWithWhereUniqueWithoutEvidenceFolderInput[]
    createMany?: ObservationCreateManyEvidenceFolderInputEnvelope
    set?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    disconnect?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    delete?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    connect?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    update?: ObservationUpdateWithWhereUniqueWithoutEvidenceFolderInput | ObservationUpdateWithWhereUniqueWithoutEvidenceFolderInput[]
    updateMany?: ObservationUpdateManyWithWhereWithoutEvidenceFolderInput | ObservationUpdateManyWithWhereWithoutEvidenceFolderInput[]
    deleteMany?: ObservationScalarWhereInput | ObservationScalarWhereInput[]
  }

  export type DocumentUpdateManyWithoutEvidenceFolderNestedInput = {
    create?: XOR<DocumentCreateWithoutEvidenceFolderInput, DocumentUncheckedCreateWithoutEvidenceFolderInput> | DocumentCreateWithoutEvidenceFolderInput[] | DocumentUncheckedCreateWithoutEvidenceFolderInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutEvidenceFolderInput | DocumentCreateOrConnectWithoutEvidenceFolderInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutEvidenceFolderInput | DocumentUpsertWithWhereUniqueWithoutEvidenceFolderInput[]
    createMany?: DocumentCreateManyEvidenceFolderInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutEvidenceFolderInput | DocumentUpdateWithWhereUniqueWithoutEvidenceFolderInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutEvidenceFolderInput | DocumentUpdateManyWithWhereWithoutEvidenceFolderInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type ObservationUncheckedUpdateManyWithoutEvidenceFolderNestedInput = {
    create?: XOR<ObservationCreateWithoutEvidenceFolderInput, ObservationUncheckedCreateWithoutEvidenceFolderInput> | ObservationCreateWithoutEvidenceFolderInput[] | ObservationUncheckedCreateWithoutEvidenceFolderInput[]
    connectOrCreate?: ObservationCreateOrConnectWithoutEvidenceFolderInput | ObservationCreateOrConnectWithoutEvidenceFolderInput[]
    upsert?: ObservationUpsertWithWhereUniqueWithoutEvidenceFolderInput | ObservationUpsertWithWhereUniqueWithoutEvidenceFolderInput[]
    createMany?: ObservationCreateManyEvidenceFolderInputEnvelope
    set?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    disconnect?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    delete?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    connect?: ObservationWhereUniqueInput | ObservationWhereUniqueInput[]
    update?: ObservationUpdateWithWhereUniqueWithoutEvidenceFolderInput | ObservationUpdateWithWhereUniqueWithoutEvidenceFolderInput[]
    updateMany?: ObservationUpdateManyWithWhereWithoutEvidenceFolderInput | ObservationUpdateManyWithWhereWithoutEvidenceFolderInput[]
    deleteMany?: ObservationScalarWhereInput | ObservationScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutEvidenceFolderNestedInput = {
    create?: XOR<DocumentCreateWithoutEvidenceFolderInput, DocumentUncheckedCreateWithoutEvidenceFolderInput> | DocumentCreateWithoutEvidenceFolderInput[] | DocumentUncheckedCreateWithoutEvidenceFolderInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutEvidenceFolderInput | DocumentCreateOrConnectWithoutEvidenceFolderInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutEvidenceFolderInput | DocumentUpsertWithWhereUniqueWithoutEvidenceFolderInput[]
    createMany?: DocumentCreateManyEvidenceFolderInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutEvidenceFolderInput | DocumentUpdateWithWhereUniqueWithoutEvidenceFolderInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutEvidenceFolderInput | DocumentUpdateManyWithWhereWithoutEvidenceFolderInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutObservationsInput = {
    create?: XOR<UserCreateWithoutObservationsInput, UserUncheckedCreateWithoutObservationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutObservationsInput
    connect?: UserWhereUniqueInput
  }

  export type EvidenceFolderCreateNestedOneWithoutObservationsInput = {
    create?: XOR<EvidenceFolderCreateWithoutObservationsInput, EvidenceFolderUncheckedCreateWithoutObservationsInput>
    connectOrCreate?: EvidenceFolderCreateOrConnectWithoutObservationsInput
    connect?: EvidenceFolderWhereUniqueInput
  }

  export type AvatarSessionCreateNestedOneWithoutObservationsInput = {
    create?: XOR<AvatarSessionCreateWithoutObservationsInput, AvatarSessionUncheckedCreateWithoutObservationsInput>
    connectOrCreate?: AvatarSessionCreateOrConnectWithoutObservationsInput
    connect?: AvatarSessionWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutObservationsNestedInput = {
    create?: XOR<UserCreateWithoutObservationsInput, UserUncheckedCreateWithoutObservationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutObservationsInput
    upsert?: UserUpsertWithoutObservationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutObservationsInput, UserUpdateWithoutObservationsInput>, UserUncheckedUpdateWithoutObservationsInput>
  }

  export type EvidenceFolderUpdateOneWithoutObservationsNestedInput = {
    create?: XOR<EvidenceFolderCreateWithoutObservationsInput, EvidenceFolderUncheckedCreateWithoutObservationsInput>
    connectOrCreate?: EvidenceFolderCreateOrConnectWithoutObservationsInput
    upsert?: EvidenceFolderUpsertWithoutObservationsInput
    disconnect?: EvidenceFolderWhereInput | boolean
    delete?: EvidenceFolderWhereInput | boolean
    connect?: EvidenceFolderWhereUniqueInput
    update?: XOR<XOR<EvidenceFolderUpdateToOneWithWhereWithoutObservationsInput, EvidenceFolderUpdateWithoutObservationsInput>, EvidenceFolderUncheckedUpdateWithoutObservationsInput>
  }

  export type AvatarSessionUpdateOneWithoutObservationsNestedInput = {
    create?: XOR<AvatarSessionCreateWithoutObservationsInput, AvatarSessionUncheckedCreateWithoutObservationsInput>
    connectOrCreate?: AvatarSessionCreateOrConnectWithoutObservationsInput
    upsert?: AvatarSessionUpsertWithoutObservationsInput
    disconnect?: AvatarSessionWhereInput | boolean
    delete?: AvatarSessionWhereInput | boolean
    connect?: AvatarSessionWhereUniqueInput
    update?: XOR<XOR<AvatarSessionUpdateToOneWithWhereWithoutObservationsInput, AvatarSessionUpdateWithoutObservationsInput>, AvatarSessionUncheckedUpdateWithoutObservationsInput>
  }

  export type EvidenceFolderCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<EvidenceFolderCreateWithoutDocumentsInput, EvidenceFolderUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: EvidenceFolderCreateOrConnectWithoutDocumentsInput
    connect?: EvidenceFolderWhereUniqueInput
  }

  export type EvidenceFolderUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<EvidenceFolderCreateWithoutDocumentsInput, EvidenceFolderUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: EvidenceFolderCreateOrConnectWithoutDocumentsInput
    upsert?: EvidenceFolderUpsertWithoutDocumentsInput
    connect?: EvidenceFolderWhereUniqueInput
    update?: XOR<XOR<EvidenceFolderUpdateToOneWithWhereWithoutDocumentsInput, EvidenceFolderUpdateWithoutDocumentsInput>, EvidenceFolderUncheckedUpdateWithoutDocumentsInput>
  }

  export type UserCreateNestedOneWithoutGenerationsInput = {
    create?: XOR<UserCreateWithoutGenerationsInput, UserUncheckedCreateWithoutGenerationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGenerationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutGenerationsNestedInput = {
    create?: XOR<UserCreateWithoutGenerationsInput, UserUncheckedCreateWithoutGenerationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGenerationsInput
    upsert?: UserUpsertWithoutGenerationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGenerationsInput, UserUpdateWithoutGenerationsInput>, UserUncheckedUpdateWithoutGenerationsInput>
  }

  export type GraphEdgeCreateNestedManyWithoutSourceInput = {
    create?: XOR<GraphEdgeCreateWithoutSourceInput, GraphEdgeUncheckedCreateWithoutSourceInput> | GraphEdgeCreateWithoutSourceInput[] | GraphEdgeUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: GraphEdgeCreateOrConnectWithoutSourceInput | GraphEdgeCreateOrConnectWithoutSourceInput[]
    createMany?: GraphEdgeCreateManySourceInputEnvelope
    connect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
  }

  export type GraphEdgeCreateNestedManyWithoutTargetInput = {
    create?: XOR<GraphEdgeCreateWithoutTargetInput, GraphEdgeUncheckedCreateWithoutTargetInput> | GraphEdgeCreateWithoutTargetInput[] | GraphEdgeUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: GraphEdgeCreateOrConnectWithoutTargetInput | GraphEdgeCreateOrConnectWithoutTargetInput[]
    createMany?: GraphEdgeCreateManyTargetInputEnvelope
    connect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
  }

  export type GraphEdgeUncheckedCreateNestedManyWithoutSourceInput = {
    create?: XOR<GraphEdgeCreateWithoutSourceInput, GraphEdgeUncheckedCreateWithoutSourceInput> | GraphEdgeCreateWithoutSourceInput[] | GraphEdgeUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: GraphEdgeCreateOrConnectWithoutSourceInput | GraphEdgeCreateOrConnectWithoutSourceInput[]
    createMany?: GraphEdgeCreateManySourceInputEnvelope
    connect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
  }

  export type GraphEdgeUncheckedCreateNestedManyWithoutTargetInput = {
    create?: XOR<GraphEdgeCreateWithoutTargetInput, GraphEdgeUncheckedCreateWithoutTargetInput> | GraphEdgeCreateWithoutTargetInput[] | GraphEdgeUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: GraphEdgeCreateOrConnectWithoutTargetInput | GraphEdgeCreateOrConnectWithoutTargetInput[]
    createMany?: GraphEdgeCreateManyTargetInputEnvelope
    connect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
  }

  export type GraphEdgeUpdateManyWithoutSourceNestedInput = {
    create?: XOR<GraphEdgeCreateWithoutSourceInput, GraphEdgeUncheckedCreateWithoutSourceInput> | GraphEdgeCreateWithoutSourceInput[] | GraphEdgeUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: GraphEdgeCreateOrConnectWithoutSourceInput | GraphEdgeCreateOrConnectWithoutSourceInput[]
    upsert?: GraphEdgeUpsertWithWhereUniqueWithoutSourceInput | GraphEdgeUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: GraphEdgeCreateManySourceInputEnvelope
    set?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    disconnect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    delete?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    connect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    update?: GraphEdgeUpdateWithWhereUniqueWithoutSourceInput | GraphEdgeUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: GraphEdgeUpdateManyWithWhereWithoutSourceInput | GraphEdgeUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: GraphEdgeScalarWhereInput | GraphEdgeScalarWhereInput[]
  }

  export type GraphEdgeUpdateManyWithoutTargetNestedInput = {
    create?: XOR<GraphEdgeCreateWithoutTargetInput, GraphEdgeUncheckedCreateWithoutTargetInput> | GraphEdgeCreateWithoutTargetInput[] | GraphEdgeUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: GraphEdgeCreateOrConnectWithoutTargetInput | GraphEdgeCreateOrConnectWithoutTargetInput[]
    upsert?: GraphEdgeUpsertWithWhereUniqueWithoutTargetInput | GraphEdgeUpsertWithWhereUniqueWithoutTargetInput[]
    createMany?: GraphEdgeCreateManyTargetInputEnvelope
    set?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    disconnect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    delete?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    connect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    update?: GraphEdgeUpdateWithWhereUniqueWithoutTargetInput | GraphEdgeUpdateWithWhereUniqueWithoutTargetInput[]
    updateMany?: GraphEdgeUpdateManyWithWhereWithoutTargetInput | GraphEdgeUpdateManyWithWhereWithoutTargetInput[]
    deleteMany?: GraphEdgeScalarWhereInput | GraphEdgeScalarWhereInput[]
  }

  export type GraphEdgeUncheckedUpdateManyWithoutSourceNestedInput = {
    create?: XOR<GraphEdgeCreateWithoutSourceInput, GraphEdgeUncheckedCreateWithoutSourceInput> | GraphEdgeCreateWithoutSourceInput[] | GraphEdgeUncheckedCreateWithoutSourceInput[]
    connectOrCreate?: GraphEdgeCreateOrConnectWithoutSourceInput | GraphEdgeCreateOrConnectWithoutSourceInput[]
    upsert?: GraphEdgeUpsertWithWhereUniqueWithoutSourceInput | GraphEdgeUpsertWithWhereUniqueWithoutSourceInput[]
    createMany?: GraphEdgeCreateManySourceInputEnvelope
    set?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    disconnect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    delete?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    connect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    update?: GraphEdgeUpdateWithWhereUniqueWithoutSourceInput | GraphEdgeUpdateWithWhereUniqueWithoutSourceInput[]
    updateMany?: GraphEdgeUpdateManyWithWhereWithoutSourceInput | GraphEdgeUpdateManyWithWhereWithoutSourceInput[]
    deleteMany?: GraphEdgeScalarWhereInput | GraphEdgeScalarWhereInput[]
  }

  export type GraphEdgeUncheckedUpdateManyWithoutTargetNestedInput = {
    create?: XOR<GraphEdgeCreateWithoutTargetInput, GraphEdgeUncheckedCreateWithoutTargetInput> | GraphEdgeCreateWithoutTargetInput[] | GraphEdgeUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: GraphEdgeCreateOrConnectWithoutTargetInput | GraphEdgeCreateOrConnectWithoutTargetInput[]
    upsert?: GraphEdgeUpsertWithWhereUniqueWithoutTargetInput | GraphEdgeUpsertWithWhereUniqueWithoutTargetInput[]
    createMany?: GraphEdgeCreateManyTargetInputEnvelope
    set?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    disconnect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    delete?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    connect?: GraphEdgeWhereUniqueInput | GraphEdgeWhereUniqueInput[]
    update?: GraphEdgeUpdateWithWhereUniqueWithoutTargetInput | GraphEdgeUpdateWithWhereUniqueWithoutTargetInput[]
    updateMany?: GraphEdgeUpdateManyWithWhereWithoutTargetInput | GraphEdgeUpdateManyWithWhereWithoutTargetInput[]
    deleteMany?: GraphEdgeScalarWhereInput | GraphEdgeScalarWhereInput[]
  }

  export type GraphNodeCreateNestedOneWithoutOutboundInput = {
    create?: XOR<GraphNodeCreateWithoutOutboundInput, GraphNodeUncheckedCreateWithoutOutboundInput>
    connectOrCreate?: GraphNodeCreateOrConnectWithoutOutboundInput
    connect?: GraphNodeWhereUniqueInput
  }

  export type GraphNodeCreateNestedOneWithoutInboundInput = {
    create?: XOR<GraphNodeCreateWithoutInboundInput, GraphNodeUncheckedCreateWithoutInboundInput>
    connectOrCreate?: GraphNodeCreateOrConnectWithoutInboundInput
    connect?: GraphNodeWhereUniqueInput
  }

  export type GraphNodeUpdateOneRequiredWithoutOutboundNestedInput = {
    create?: XOR<GraphNodeCreateWithoutOutboundInput, GraphNodeUncheckedCreateWithoutOutboundInput>
    connectOrCreate?: GraphNodeCreateOrConnectWithoutOutboundInput
    upsert?: GraphNodeUpsertWithoutOutboundInput
    connect?: GraphNodeWhereUniqueInput
    update?: XOR<XOR<GraphNodeUpdateToOneWithWhereWithoutOutboundInput, GraphNodeUpdateWithoutOutboundInput>, GraphNodeUncheckedUpdateWithoutOutboundInput>
  }

  export type GraphNodeUpdateOneRequiredWithoutInboundNestedInput = {
    create?: XOR<GraphNodeCreateWithoutInboundInput, GraphNodeUncheckedCreateWithoutInboundInput>
    connectOrCreate?: GraphNodeCreateOrConnectWithoutInboundInput
    upsert?: GraphNodeUpsertWithoutInboundInput
    connect?: GraphNodeWhereUniqueInput
    update?: XOR<XOR<GraphNodeUpdateToOneWithWhereWithoutInboundInput, GraphNodeUpdateWithoutInboundInput>, GraphNodeUncheckedUpdateWithoutInboundInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserCreateWithoutTierInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    district?: string | null
    school?: string | null
    schoolSite?: string | null
    position?: string | null
    stripeCustomerId?: string | null
    subscriptionTier?: string
    subscriptionStatus?: string
    usageTokens?: number
    xpPoints?: number
    trialStartedAt?: Date | string
    trialEndsAt?: Date | string | null
    isTrialConverted?: boolean
    googleId?: string | null
    avatarUrl?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    subscriptionId?: string | null
    lastPaymentAt?: Date | string | null
    organization?: OrganizationCreateNestedOneWithoutUsersInput
    generations?: GenerationCreateNestedManyWithoutUserInput
    observations?: ObservationCreateNestedManyWithoutUserInput
    evidenceFolders?: EvidenceFolderCreateNestedManyWithoutUserInput
    avatarSessions?: AvatarSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTierInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    district?: string | null
    school?: string | null
    schoolSite?: string | null
    position?: string | null
    organizationId?: string | null
    stripeCustomerId?: string | null
    subscriptionTier?: string
    subscriptionStatus?: string
    usageTokens?: number
    xpPoints?: number
    trialStartedAt?: Date | string
    trialEndsAt?: Date | string | null
    isTrialConverted?: boolean
    googleId?: string | null
    avatarUrl?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    subscriptionId?: string | null
    lastPaymentAt?: Date | string | null
    generations?: GenerationUncheckedCreateNestedManyWithoutUserInput
    observations?: ObservationUncheckedCreateNestedManyWithoutUserInput
    evidenceFolders?: EvidenceFolderUncheckedCreateNestedManyWithoutUserInput
    avatarSessions?: AvatarSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTierInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTierInput, UserUncheckedCreateWithoutTierInput>
  }

  export type UserCreateManyTierInputEnvelope = {
    data: UserCreateManyTierInput | UserCreateManyTierInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutTierInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutTierInput, UserUncheckedUpdateWithoutTierInput>
    create: XOR<UserCreateWithoutTierInput, UserUncheckedCreateWithoutTierInput>
  }

  export type UserUpdateWithWhereUniqueWithoutTierInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutTierInput, UserUncheckedUpdateWithoutTierInput>
  }

  export type UserUpdateManyWithWhereWithoutTierInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutTierInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    district?: StringNullableFilter<"User"> | string | null
    school?: StringNullableFilter<"User"> | string | null
    schoolSite?: StringNullableFilter<"User"> | string | null
    position?: StringNullableFilter<"User"> | string | null
    organizationId?: StringNullableFilter<"User"> | string | null
    stripeCustomerId?: StringNullableFilter<"User"> | string | null
    subscriptionTier?: StringFilter<"User"> | string
    subscriptionStatus?: StringFilter<"User"> | string
    usageTokens?: IntFilter<"User"> | number
    xpPoints?: IntFilter<"User"> | number
    trialStartedAt?: DateTimeFilter<"User"> | Date | string
    trialEndsAt?: DateTimeNullableFilter<"User"> | Date | string | null
    isTrialConverted?: BoolFilter<"User"> | boolean
    tierId?: StringNullableFilter<"User"> | string | null
    googleId?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    subscriptionId?: StringNullableFilter<"User"> | string | null
    lastPaymentAt?: DateTimeNullableFilter<"User"> | Date | string | null
  }

  export type OrganizationCreateWithoutUsersInput = {
    id?: string
    name: string
    tier?: string
    trialStartedAt?: Date | string
    trialStartsAt?: Date | string
    trialEndsAt: Date | string
    isTrialConverted?: boolean
    usageTokens?: number
    address?: string | null
    contactEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    tier?: string
    trialStartedAt?: Date | string
    trialStartsAt?: Date | string
    trialEndsAt: Date | string
    isTrialConverted?: boolean
    usageTokens?: number
    address?: string | null
    contactEmail?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrganizationCreateOrConnectWithoutUsersInput = {
    where: OrganizationWhereUniqueInput
    create: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
  }

  export type TierCreateWithoutUsersInput = {
    id?: string
    name: string
    signupPrice?: number
    description?: string | null
  }

  export type TierUncheckedCreateWithoutUsersInput = {
    id?: string
    name: string
    signupPrice?: number
    description?: string | null
  }

  export type TierCreateOrConnectWithoutUsersInput = {
    where: TierWhereUniqueInput
    create: XOR<TierCreateWithoutUsersInput, TierUncheckedCreateWithoutUsersInput>
  }

  export type GenerationCreateWithoutUserInput = {
    id?: string
    generatorId: string
    prompt: string
    content: string
    professorVideoUrl?: string | null
    avatarEngine?: string | null
    createdAt?: Date | string
  }

  export type GenerationUncheckedCreateWithoutUserInput = {
    id?: string
    generatorId: string
    prompt: string
    content: string
    professorVideoUrl?: string | null
    avatarEngine?: string | null
    createdAt?: Date | string
  }

  export type GenerationCreateOrConnectWithoutUserInput = {
    where: GenerationWhereUniqueInput
    create: XOR<GenerationCreateWithoutUserInput, GenerationUncheckedCreateWithoutUserInput>
  }

  export type GenerationCreateManyUserInputEnvelope = {
    data: GenerationCreateManyUserInput | GenerationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ObservationCreateWithoutUserInput = {
    id?: string
    observationType: string
    observationDate?: Date | string
    duration?: number | null
    description: string
    context?: string | null
    interventions?: string | null
    aiAnalysis?: string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: boolean
    hasAudio?: boolean
    hasVideo?: boolean
    hasImages?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    evidenceFolder?: EvidenceFolderCreateNestedOneWithoutObservationsInput
    avatarSession?: AvatarSessionCreateNestedOneWithoutObservationsInput
  }

  export type ObservationUncheckedCreateWithoutUserInput = {
    id?: string
    evidenceFolderId?: string | null
    avatarSessionId?: string | null
    observationType: string
    observationDate?: Date | string
    duration?: number | null
    description: string
    context?: string | null
    interventions?: string | null
    aiAnalysis?: string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: boolean
    hasAudio?: boolean
    hasVideo?: boolean
    hasImages?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ObservationCreateOrConnectWithoutUserInput = {
    where: ObservationWhereUniqueInput
    create: XOR<ObservationCreateWithoutUserInput, ObservationUncheckedCreateWithoutUserInput>
  }

  export type ObservationCreateManyUserInputEnvelope = {
    data: ObservationCreateManyUserInput | ObservationCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type EvidenceFolderCreateWithoutUserInput = {
    id?: string
    studentId: string
    gradeLevel?: string | null
    specialEdStatus?: string | null
    title: string
    category: string
    createdAt?: Date | string
    updatedAt?: Date | string
    aiSummary?: string | null
    riskLevel?: string | null
    complianceScore?: number | null
    observations?: ObservationCreateNestedManyWithoutEvidenceFolderInput
    documents?: DocumentCreateNestedManyWithoutEvidenceFolderInput
  }

  export type EvidenceFolderUncheckedCreateWithoutUserInput = {
    id?: string
    studentId: string
    gradeLevel?: string | null
    specialEdStatus?: string | null
    title: string
    category: string
    createdAt?: Date | string
    updatedAt?: Date | string
    aiSummary?: string | null
    riskLevel?: string | null
    complianceScore?: number | null
    observations?: ObservationUncheckedCreateNestedManyWithoutEvidenceFolderInput
    documents?: DocumentUncheckedCreateNestedManyWithoutEvidenceFolderInput
  }

  export type EvidenceFolderCreateOrConnectWithoutUserInput = {
    where: EvidenceFolderWhereUniqueInput
    create: XOR<EvidenceFolderCreateWithoutUserInput, EvidenceFolderUncheckedCreateWithoutUserInput>
  }

  export type EvidenceFolderCreateManyUserInputEnvelope = {
    data: EvidenceFolderCreateManyUserInput | EvidenceFolderCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AvatarSessionCreateWithoutUserInput = {
    id?: string
    avatarName: string
    avatarRole: string
    engine?: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    duration?: number | null
    latencyAvg?: number | null
    conversationLog: JsonNullValueInput | InputJsonValue
    userSentiment?: string | null
    gcpSessionId?: string | null
    vertexAiModel?: string
    cloudRunEndpoint?: string | null
    thoughtSignatures?: NullableJsonNullValueInput | InputJsonValue
    observations?: ObservationCreateNestedManyWithoutAvatarSessionInput
  }

  export type AvatarSessionUncheckedCreateWithoutUserInput = {
    id?: string
    avatarName: string
    avatarRole: string
    engine?: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    duration?: number | null
    latencyAvg?: number | null
    conversationLog: JsonNullValueInput | InputJsonValue
    userSentiment?: string | null
    gcpSessionId?: string | null
    vertexAiModel?: string
    cloudRunEndpoint?: string | null
    thoughtSignatures?: NullableJsonNullValueInput | InputJsonValue
    observations?: ObservationUncheckedCreateNestedManyWithoutAvatarSessionInput
  }

  export type AvatarSessionCreateOrConnectWithoutUserInput = {
    where: AvatarSessionWhereUniqueInput
    create: XOR<AvatarSessionCreateWithoutUserInput, AvatarSessionUncheckedCreateWithoutUserInput>
  }

  export type AvatarSessionCreateManyUserInputEnvelope = {
    data: AvatarSessionCreateManyUserInput | AvatarSessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OrganizationUpsertWithoutUsersInput = {
    update: XOR<OrganizationUpdateWithoutUsersInput, OrganizationUncheckedUpdateWithoutUsersInput>
    create: XOR<OrganizationCreateWithoutUsersInput, OrganizationUncheckedCreateWithoutUsersInput>
    where?: OrganizationWhereInput
  }

  export type OrganizationUpdateToOneWithWhereWithoutUsersInput = {
    where?: OrganizationWhereInput
    data: XOR<OrganizationUpdateWithoutUsersInput, OrganizationUncheckedUpdateWithoutUsersInput>
  }

  export type OrganizationUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tier?: StringFieldUpdateOperationsInput | string
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialStartsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    usageTokens?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrganizationUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    tier?: StringFieldUpdateOperationsInput | string
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialStartsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    usageTokens?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    contactEmail?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TierUpsertWithoutUsersInput = {
    update: XOR<TierUpdateWithoutUsersInput, TierUncheckedUpdateWithoutUsersInput>
    create: XOR<TierCreateWithoutUsersInput, TierUncheckedCreateWithoutUsersInput>
    where?: TierWhereInput
  }

  export type TierUpdateToOneWithWhereWithoutUsersInput = {
    where?: TierWhereInput
    data: XOR<TierUpdateWithoutUsersInput, TierUncheckedUpdateWithoutUsersInput>
  }

  export type TierUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    signupPrice?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TierUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    signupPrice?: FloatFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GenerationUpsertWithWhereUniqueWithoutUserInput = {
    where: GenerationWhereUniqueInput
    update: XOR<GenerationUpdateWithoutUserInput, GenerationUncheckedUpdateWithoutUserInput>
    create: XOR<GenerationCreateWithoutUserInput, GenerationUncheckedCreateWithoutUserInput>
  }

  export type GenerationUpdateWithWhereUniqueWithoutUserInput = {
    where: GenerationWhereUniqueInput
    data: XOR<GenerationUpdateWithoutUserInput, GenerationUncheckedUpdateWithoutUserInput>
  }

  export type GenerationUpdateManyWithWhereWithoutUserInput = {
    where: GenerationScalarWhereInput
    data: XOR<GenerationUpdateManyMutationInput, GenerationUncheckedUpdateManyWithoutUserInput>
  }

  export type GenerationScalarWhereInput = {
    AND?: GenerationScalarWhereInput | GenerationScalarWhereInput[]
    OR?: GenerationScalarWhereInput[]
    NOT?: GenerationScalarWhereInput | GenerationScalarWhereInput[]
    id?: StringFilter<"Generation"> | string
    userId?: StringFilter<"Generation"> | string
    generatorId?: StringFilter<"Generation"> | string
    prompt?: StringFilter<"Generation"> | string
    content?: StringFilter<"Generation"> | string
    professorVideoUrl?: StringNullableFilter<"Generation"> | string | null
    avatarEngine?: StringNullableFilter<"Generation"> | string | null
    createdAt?: DateTimeFilter<"Generation"> | Date | string
  }

  export type ObservationUpsertWithWhereUniqueWithoutUserInput = {
    where: ObservationWhereUniqueInput
    update: XOR<ObservationUpdateWithoutUserInput, ObservationUncheckedUpdateWithoutUserInput>
    create: XOR<ObservationCreateWithoutUserInput, ObservationUncheckedCreateWithoutUserInput>
  }

  export type ObservationUpdateWithWhereUniqueWithoutUserInput = {
    where: ObservationWhereUniqueInput
    data: XOR<ObservationUpdateWithoutUserInput, ObservationUncheckedUpdateWithoutUserInput>
  }

  export type ObservationUpdateManyWithWhereWithoutUserInput = {
    where: ObservationScalarWhereInput
    data: XOR<ObservationUpdateManyMutationInput, ObservationUncheckedUpdateManyWithoutUserInput>
  }

  export type ObservationScalarWhereInput = {
    AND?: ObservationScalarWhereInput | ObservationScalarWhereInput[]
    OR?: ObservationScalarWhereInput[]
    NOT?: ObservationScalarWhereInput | ObservationScalarWhereInput[]
    id?: StringFilter<"Observation"> | string
    userId?: StringFilter<"Observation"> | string
    evidenceFolderId?: StringNullableFilter<"Observation"> | string | null
    avatarSessionId?: StringNullableFilter<"Observation"> | string | null
    observationType?: StringFilter<"Observation"> | string
    observationDate?: DateTimeFilter<"Observation"> | Date | string
    duration?: IntNullableFilter<"Observation"> | number | null
    description?: StringFilter<"Observation"> | string
    context?: StringNullableFilter<"Observation"> | string | null
    interventions?: StringNullableFilter<"Observation"> | string | null
    aiAnalysis?: StringNullableFilter<"Observation"> | string | null
    suggestedActions?: JsonNullableFilter<"Observation">
    legalCompliance?: BoolFilter<"Observation"> | boolean
    hasAudio?: BoolFilter<"Observation"> | boolean
    hasVideo?: BoolFilter<"Observation"> | boolean
    hasImages?: BoolFilter<"Observation"> | boolean
    createdAt?: DateTimeFilter<"Observation"> | Date | string
    updatedAt?: DateTimeFilter<"Observation"> | Date | string
  }

  export type EvidenceFolderUpsertWithWhereUniqueWithoutUserInput = {
    where: EvidenceFolderWhereUniqueInput
    update: XOR<EvidenceFolderUpdateWithoutUserInput, EvidenceFolderUncheckedUpdateWithoutUserInput>
    create: XOR<EvidenceFolderCreateWithoutUserInput, EvidenceFolderUncheckedCreateWithoutUserInput>
  }

  export type EvidenceFolderUpdateWithWhereUniqueWithoutUserInput = {
    where: EvidenceFolderWhereUniqueInput
    data: XOR<EvidenceFolderUpdateWithoutUserInput, EvidenceFolderUncheckedUpdateWithoutUserInput>
  }

  export type EvidenceFolderUpdateManyWithWhereWithoutUserInput = {
    where: EvidenceFolderScalarWhereInput
    data: XOR<EvidenceFolderUpdateManyMutationInput, EvidenceFolderUncheckedUpdateManyWithoutUserInput>
  }

  export type EvidenceFolderScalarWhereInput = {
    AND?: EvidenceFolderScalarWhereInput | EvidenceFolderScalarWhereInput[]
    OR?: EvidenceFolderScalarWhereInput[]
    NOT?: EvidenceFolderScalarWhereInput | EvidenceFolderScalarWhereInput[]
    id?: StringFilter<"EvidenceFolder"> | string
    userId?: StringFilter<"EvidenceFolder"> | string
    studentId?: StringFilter<"EvidenceFolder"> | string
    gradeLevel?: StringNullableFilter<"EvidenceFolder"> | string | null
    specialEdStatus?: StringNullableFilter<"EvidenceFolder"> | string | null
    title?: StringFilter<"EvidenceFolder"> | string
    category?: StringFilter<"EvidenceFolder"> | string
    createdAt?: DateTimeFilter<"EvidenceFolder"> | Date | string
    updatedAt?: DateTimeFilter<"EvidenceFolder"> | Date | string
    aiSummary?: StringNullableFilter<"EvidenceFolder"> | string | null
    riskLevel?: StringNullableFilter<"EvidenceFolder"> | string | null
    complianceScore?: FloatNullableFilter<"EvidenceFolder"> | number | null
  }

  export type AvatarSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: AvatarSessionWhereUniqueInput
    update: XOR<AvatarSessionUpdateWithoutUserInput, AvatarSessionUncheckedUpdateWithoutUserInput>
    create: XOR<AvatarSessionCreateWithoutUserInput, AvatarSessionUncheckedCreateWithoutUserInput>
  }

  export type AvatarSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: AvatarSessionWhereUniqueInput
    data: XOR<AvatarSessionUpdateWithoutUserInput, AvatarSessionUncheckedUpdateWithoutUserInput>
  }

  export type AvatarSessionUpdateManyWithWhereWithoutUserInput = {
    where: AvatarSessionScalarWhereInput
    data: XOR<AvatarSessionUpdateManyMutationInput, AvatarSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type AvatarSessionScalarWhereInput = {
    AND?: AvatarSessionScalarWhereInput | AvatarSessionScalarWhereInput[]
    OR?: AvatarSessionScalarWhereInput[]
    NOT?: AvatarSessionScalarWhereInput | AvatarSessionScalarWhereInput[]
    id?: StringFilter<"AvatarSession"> | string
    userId?: StringFilter<"AvatarSession"> | string
    avatarName?: StringFilter<"AvatarSession"> | string
    avatarRole?: StringFilter<"AvatarSession"> | string
    engine?: StringFilter<"AvatarSession"> | string
    startedAt?: DateTimeFilter<"AvatarSession"> | Date | string
    endedAt?: DateTimeNullableFilter<"AvatarSession"> | Date | string | null
    duration?: IntNullableFilter<"AvatarSession"> | number | null
    latencyAvg?: FloatNullableFilter<"AvatarSession"> | number | null
    conversationLog?: JsonFilter<"AvatarSession">
    userSentiment?: StringNullableFilter<"AvatarSession"> | string | null
    gcpSessionId?: StringNullableFilter<"AvatarSession"> | string | null
    vertexAiModel?: StringFilter<"AvatarSession"> | string
    cloudRunEndpoint?: StringNullableFilter<"AvatarSession"> | string | null
    thoughtSignatures?: JsonNullableFilter<"AvatarSession">
  }

  export type UserCreateWithoutOrganizationInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    district?: string | null
    school?: string | null
    schoolSite?: string | null
    position?: string | null
    stripeCustomerId?: string | null
    subscriptionTier?: string
    subscriptionStatus?: string
    usageTokens?: number
    xpPoints?: number
    trialStartedAt?: Date | string
    trialEndsAt?: Date | string | null
    isTrialConverted?: boolean
    googleId?: string | null
    avatarUrl?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    subscriptionId?: string | null
    lastPaymentAt?: Date | string | null
    tier?: TierCreateNestedOneWithoutUsersInput
    generations?: GenerationCreateNestedManyWithoutUserInput
    observations?: ObservationCreateNestedManyWithoutUserInput
    evidenceFolders?: EvidenceFolderCreateNestedManyWithoutUserInput
    avatarSessions?: AvatarSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrganizationInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    district?: string | null
    school?: string | null
    schoolSite?: string | null
    position?: string | null
    stripeCustomerId?: string | null
    subscriptionTier?: string
    subscriptionStatus?: string
    usageTokens?: number
    xpPoints?: number
    trialStartedAt?: Date | string
    trialEndsAt?: Date | string | null
    isTrialConverted?: boolean
    tierId?: string | null
    googleId?: string | null
    avatarUrl?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    subscriptionId?: string | null
    lastPaymentAt?: Date | string | null
    generations?: GenerationUncheckedCreateNestedManyWithoutUserInput
    observations?: ObservationUncheckedCreateNestedManyWithoutUserInput
    evidenceFolders?: EvidenceFolderUncheckedCreateNestedManyWithoutUserInput
    avatarSessions?: AvatarSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrganizationInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput>
  }

  export type UserCreateManyOrganizationInputEnvelope = {
    data: UserCreateManyOrganizationInput | UserCreateManyOrganizationInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutOrganizationInput, UserUncheckedUpdateWithoutOrganizationInput>
    create: XOR<UserCreateWithoutOrganizationInput, UserUncheckedCreateWithoutOrganizationInput>
  }

  export type UserUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutOrganizationInput, UserUncheckedUpdateWithoutOrganizationInput>
  }

  export type UserUpdateManyWithWhereWithoutOrganizationInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutOrganizationInput>
  }

  export type UserCreateWithoutAvatarSessionsInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    district?: string | null
    school?: string | null
    schoolSite?: string | null
    position?: string | null
    stripeCustomerId?: string | null
    subscriptionTier?: string
    subscriptionStatus?: string
    usageTokens?: number
    xpPoints?: number
    trialStartedAt?: Date | string
    trialEndsAt?: Date | string | null
    isTrialConverted?: boolean
    googleId?: string | null
    avatarUrl?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    subscriptionId?: string | null
    lastPaymentAt?: Date | string | null
    organization?: OrganizationCreateNestedOneWithoutUsersInput
    tier?: TierCreateNestedOneWithoutUsersInput
    generations?: GenerationCreateNestedManyWithoutUserInput
    observations?: ObservationCreateNestedManyWithoutUserInput
    evidenceFolders?: EvidenceFolderCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAvatarSessionsInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    district?: string | null
    school?: string | null
    schoolSite?: string | null
    position?: string | null
    organizationId?: string | null
    stripeCustomerId?: string | null
    subscriptionTier?: string
    subscriptionStatus?: string
    usageTokens?: number
    xpPoints?: number
    trialStartedAt?: Date | string
    trialEndsAt?: Date | string | null
    isTrialConverted?: boolean
    tierId?: string | null
    googleId?: string | null
    avatarUrl?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    subscriptionId?: string | null
    lastPaymentAt?: Date | string | null
    generations?: GenerationUncheckedCreateNestedManyWithoutUserInput
    observations?: ObservationUncheckedCreateNestedManyWithoutUserInput
    evidenceFolders?: EvidenceFolderUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAvatarSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAvatarSessionsInput, UserUncheckedCreateWithoutAvatarSessionsInput>
  }

  export type ObservationCreateWithoutAvatarSessionInput = {
    id?: string
    observationType: string
    observationDate?: Date | string
    duration?: number | null
    description: string
    context?: string | null
    interventions?: string | null
    aiAnalysis?: string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: boolean
    hasAudio?: boolean
    hasVideo?: boolean
    hasImages?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutObservationsInput
    evidenceFolder?: EvidenceFolderCreateNestedOneWithoutObservationsInput
  }

  export type ObservationUncheckedCreateWithoutAvatarSessionInput = {
    id?: string
    userId: string
    evidenceFolderId?: string | null
    observationType: string
    observationDate?: Date | string
    duration?: number | null
    description: string
    context?: string | null
    interventions?: string | null
    aiAnalysis?: string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: boolean
    hasAudio?: boolean
    hasVideo?: boolean
    hasImages?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ObservationCreateOrConnectWithoutAvatarSessionInput = {
    where: ObservationWhereUniqueInput
    create: XOR<ObservationCreateWithoutAvatarSessionInput, ObservationUncheckedCreateWithoutAvatarSessionInput>
  }

  export type ObservationCreateManyAvatarSessionInputEnvelope = {
    data: ObservationCreateManyAvatarSessionInput | ObservationCreateManyAvatarSessionInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutAvatarSessionsInput = {
    update: XOR<UserUpdateWithoutAvatarSessionsInput, UserUncheckedUpdateWithoutAvatarSessionsInput>
    create: XOR<UserCreateWithoutAvatarSessionsInput, UserUncheckedCreateWithoutAvatarSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAvatarSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAvatarSessionsInput, UserUncheckedUpdateWithoutAvatarSessionsInput>
  }

  export type UserUpdateWithoutAvatarSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    schoolSite?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    usageTokens?: IntFieldUpdateOperationsInput | number
    xpPoints?: IntFieldUpdateOperationsInput | number
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPaymentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneWithoutUsersNestedInput
    tier?: TierUpdateOneWithoutUsersNestedInput
    generations?: GenerationUpdateManyWithoutUserNestedInput
    observations?: ObservationUpdateManyWithoutUserNestedInput
    evidenceFolders?: EvidenceFolderUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAvatarSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    schoolSite?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    usageTokens?: IntFieldUpdateOperationsInput | number
    xpPoints?: IntFieldUpdateOperationsInput | number
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    tierId?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPaymentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    generations?: GenerationUncheckedUpdateManyWithoutUserNestedInput
    observations?: ObservationUncheckedUpdateManyWithoutUserNestedInput
    evidenceFolders?: EvidenceFolderUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ObservationUpsertWithWhereUniqueWithoutAvatarSessionInput = {
    where: ObservationWhereUniqueInput
    update: XOR<ObservationUpdateWithoutAvatarSessionInput, ObservationUncheckedUpdateWithoutAvatarSessionInput>
    create: XOR<ObservationCreateWithoutAvatarSessionInput, ObservationUncheckedCreateWithoutAvatarSessionInput>
  }

  export type ObservationUpdateWithWhereUniqueWithoutAvatarSessionInput = {
    where: ObservationWhereUniqueInput
    data: XOR<ObservationUpdateWithoutAvatarSessionInput, ObservationUncheckedUpdateWithoutAvatarSessionInput>
  }

  export type ObservationUpdateManyWithWhereWithoutAvatarSessionInput = {
    where: ObservationScalarWhereInput
    data: XOR<ObservationUpdateManyMutationInput, ObservationUncheckedUpdateManyWithoutAvatarSessionInput>
  }

  export type UserCreateWithoutEvidenceFoldersInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    district?: string | null
    school?: string | null
    schoolSite?: string | null
    position?: string | null
    stripeCustomerId?: string | null
    subscriptionTier?: string
    subscriptionStatus?: string
    usageTokens?: number
    xpPoints?: number
    trialStartedAt?: Date | string
    trialEndsAt?: Date | string | null
    isTrialConverted?: boolean
    googleId?: string | null
    avatarUrl?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    subscriptionId?: string | null
    lastPaymentAt?: Date | string | null
    organization?: OrganizationCreateNestedOneWithoutUsersInput
    tier?: TierCreateNestedOneWithoutUsersInput
    generations?: GenerationCreateNestedManyWithoutUserInput
    observations?: ObservationCreateNestedManyWithoutUserInput
    avatarSessions?: AvatarSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEvidenceFoldersInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    district?: string | null
    school?: string | null
    schoolSite?: string | null
    position?: string | null
    organizationId?: string | null
    stripeCustomerId?: string | null
    subscriptionTier?: string
    subscriptionStatus?: string
    usageTokens?: number
    xpPoints?: number
    trialStartedAt?: Date | string
    trialEndsAt?: Date | string | null
    isTrialConverted?: boolean
    tierId?: string | null
    googleId?: string | null
    avatarUrl?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    subscriptionId?: string | null
    lastPaymentAt?: Date | string | null
    generations?: GenerationUncheckedCreateNestedManyWithoutUserInput
    observations?: ObservationUncheckedCreateNestedManyWithoutUserInput
    avatarSessions?: AvatarSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEvidenceFoldersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEvidenceFoldersInput, UserUncheckedCreateWithoutEvidenceFoldersInput>
  }

  export type ObservationCreateWithoutEvidenceFolderInput = {
    id?: string
    observationType: string
    observationDate?: Date | string
    duration?: number | null
    description: string
    context?: string | null
    interventions?: string | null
    aiAnalysis?: string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: boolean
    hasAudio?: boolean
    hasVideo?: boolean
    hasImages?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutObservationsInput
    avatarSession?: AvatarSessionCreateNestedOneWithoutObservationsInput
  }

  export type ObservationUncheckedCreateWithoutEvidenceFolderInput = {
    id?: string
    userId: string
    avatarSessionId?: string | null
    observationType: string
    observationDate?: Date | string
    duration?: number | null
    description: string
    context?: string | null
    interventions?: string | null
    aiAnalysis?: string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: boolean
    hasAudio?: boolean
    hasVideo?: boolean
    hasImages?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ObservationCreateOrConnectWithoutEvidenceFolderInput = {
    where: ObservationWhereUniqueInput
    create: XOR<ObservationCreateWithoutEvidenceFolderInput, ObservationUncheckedCreateWithoutEvidenceFolderInput>
  }

  export type ObservationCreateManyEvidenceFolderInputEnvelope = {
    data: ObservationCreateManyEvidenceFolderInput | ObservationCreateManyEvidenceFolderInput[]
    skipDuplicates?: boolean
  }

  export type DocumentCreateWithoutEvidenceFolderInput = {
    id?: string
    fileName: string
    fileType: string
    fileSize: number
    gcpBucketPath: string
    gcpSignedUrl?: string | null
    urlExpiresAt?: Date | string | null
    encrypted?: boolean
    accessLevel?: string
    uploadedAt?: Date | string
  }

  export type DocumentUncheckedCreateWithoutEvidenceFolderInput = {
    id?: string
    fileName: string
    fileType: string
    fileSize: number
    gcpBucketPath: string
    gcpSignedUrl?: string | null
    urlExpiresAt?: Date | string | null
    encrypted?: boolean
    accessLevel?: string
    uploadedAt?: Date | string
  }

  export type DocumentCreateOrConnectWithoutEvidenceFolderInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutEvidenceFolderInput, DocumentUncheckedCreateWithoutEvidenceFolderInput>
  }

  export type DocumentCreateManyEvidenceFolderInputEnvelope = {
    data: DocumentCreateManyEvidenceFolderInput | DocumentCreateManyEvidenceFolderInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutEvidenceFoldersInput = {
    update: XOR<UserUpdateWithoutEvidenceFoldersInput, UserUncheckedUpdateWithoutEvidenceFoldersInput>
    create: XOR<UserCreateWithoutEvidenceFoldersInput, UserUncheckedCreateWithoutEvidenceFoldersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEvidenceFoldersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEvidenceFoldersInput, UserUncheckedUpdateWithoutEvidenceFoldersInput>
  }

  export type UserUpdateWithoutEvidenceFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    schoolSite?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    usageTokens?: IntFieldUpdateOperationsInput | number
    xpPoints?: IntFieldUpdateOperationsInput | number
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPaymentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneWithoutUsersNestedInput
    tier?: TierUpdateOneWithoutUsersNestedInput
    generations?: GenerationUpdateManyWithoutUserNestedInput
    observations?: ObservationUpdateManyWithoutUserNestedInput
    avatarSessions?: AvatarSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEvidenceFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    schoolSite?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    usageTokens?: IntFieldUpdateOperationsInput | number
    xpPoints?: IntFieldUpdateOperationsInput | number
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    tierId?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPaymentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    generations?: GenerationUncheckedUpdateManyWithoutUserNestedInput
    observations?: ObservationUncheckedUpdateManyWithoutUserNestedInput
    avatarSessions?: AvatarSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ObservationUpsertWithWhereUniqueWithoutEvidenceFolderInput = {
    where: ObservationWhereUniqueInput
    update: XOR<ObservationUpdateWithoutEvidenceFolderInput, ObservationUncheckedUpdateWithoutEvidenceFolderInput>
    create: XOR<ObservationCreateWithoutEvidenceFolderInput, ObservationUncheckedCreateWithoutEvidenceFolderInput>
  }

  export type ObservationUpdateWithWhereUniqueWithoutEvidenceFolderInput = {
    where: ObservationWhereUniqueInput
    data: XOR<ObservationUpdateWithoutEvidenceFolderInput, ObservationUncheckedUpdateWithoutEvidenceFolderInput>
  }

  export type ObservationUpdateManyWithWhereWithoutEvidenceFolderInput = {
    where: ObservationScalarWhereInput
    data: XOR<ObservationUpdateManyMutationInput, ObservationUncheckedUpdateManyWithoutEvidenceFolderInput>
  }

  export type DocumentUpsertWithWhereUniqueWithoutEvidenceFolderInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutEvidenceFolderInput, DocumentUncheckedUpdateWithoutEvidenceFolderInput>
    create: XOR<DocumentCreateWithoutEvidenceFolderInput, DocumentUncheckedCreateWithoutEvidenceFolderInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutEvidenceFolderInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutEvidenceFolderInput, DocumentUncheckedUpdateWithoutEvidenceFolderInput>
  }

  export type DocumentUpdateManyWithWhereWithoutEvidenceFolderInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutEvidenceFolderInput>
  }

  export type DocumentScalarWhereInput = {
    AND?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    OR?: DocumentScalarWhereInput[]
    NOT?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    id?: StringFilter<"Document"> | string
    evidenceFolderId?: StringFilter<"Document"> | string
    fileName?: StringFilter<"Document"> | string
    fileType?: StringFilter<"Document"> | string
    fileSize?: IntFilter<"Document"> | number
    gcpBucketPath?: StringFilter<"Document"> | string
    gcpSignedUrl?: StringNullableFilter<"Document"> | string | null
    urlExpiresAt?: DateTimeNullableFilter<"Document"> | Date | string | null
    encrypted?: BoolFilter<"Document"> | boolean
    accessLevel?: StringFilter<"Document"> | string
    uploadedAt?: DateTimeFilter<"Document"> | Date | string
  }

  export type UserCreateWithoutObservationsInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    district?: string | null
    school?: string | null
    schoolSite?: string | null
    position?: string | null
    stripeCustomerId?: string | null
    subscriptionTier?: string
    subscriptionStatus?: string
    usageTokens?: number
    xpPoints?: number
    trialStartedAt?: Date | string
    trialEndsAt?: Date | string | null
    isTrialConverted?: boolean
    googleId?: string | null
    avatarUrl?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    subscriptionId?: string | null
    lastPaymentAt?: Date | string | null
    organization?: OrganizationCreateNestedOneWithoutUsersInput
    tier?: TierCreateNestedOneWithoutUsersInput
    generations?: GenerationCreateNestedManyWithoutUserInput
    evidenceFolders?: EvidenceFolderCreateNestedManyWithoutUserInput
    avatarSessions?: AvatarSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutObservationsInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    district?: string | null
    school?: string | null
    schoolSite?: string | null
    position?: string | null
    organizationId?: string | null
    stripeCustomerId?: string | null
    subscriptionTier?: string
    subscriptionStatus?: string
    usageTokens?: number
    xpPoints?: number
    trialStartedAt?: Date | string
    trialEndsAt?: Date | string | null
    isTrialConverted?: boolean
    tierId?: string | null
    googleId?: string | null
    avatarUrl?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    subscriptionId?: string | null
    lastPaymentAt?: Date | string | null
    generations?: GenerationUncheckedCreateNestedManyWithoutUserInput
    evidenceFolders?: EvidenceFolderUncheckedCreateNestedManyWithoutUserInput
    avatarSessions?: AvatarSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutObservationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutObservationsInput, UserUncheckedCreateWithoutObservationsInput>
  }

  export type EvidenceFolderCreateWithoutObservationsInput = {
    id?: string
    studentId: string
    gradeLevel?: string | null
    specialEdStatus?: string | null
    title: string
    category: string
    createdAt?: Date | string
    updatedAt?: Date | string
    aiSummary?: string | null
    riskLevel?: string | null
    complianceScore?: number | null
    user: UserCreateNestedOneWithoutEvidenceFoldersInput
    documents?: DocumentCreateNestedManyWithoutEvidenceFolderInput
  }

  export type EvidenceFolderUncheckedCreateWithoutObservationsInput = {
    id?: string
    userId: string
    studentId: string
    gradeLevel?: string | null
    specialEdStatus?: string | null
    title: string
    category: string
    createdAt?: Date | string
    updatedAt?: Date | string
    aiSummary?: string | null
    riskLevel?: string | null
    complianceScore?: number | null
    documents?: DocumentUncheckedCreateNestedManyWithoutEvidenceFolderInput
  }

  export type EvidenceFolderCreateOrConnectWithoutObservationsInput = {
    where: EvidenceFolderWhereUniqueInput
    create: XOR<EvidenceFolderCreateWithoutObservationsInput, EvidenceFolderUncheckedCreateWithoutObservationsInput>
  }

  export type AvatarSessionCreateWithoutObservationsInput = {
    id?: string
    avatarName: string
    avatarRole: string
    engine?: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    duration?: number | null
    latencyAvg?: number | null
    conversationLog: JsonNullValueInput | InputJsonValue
    userSentiment?: string | null
    gcpSessionId?: string | null
    vertexAiModel?: string
    cloudRunEndpoint?: string | null
    thoughtSignatures?: NullableJsonNullValueInput | InputJsonValue
    user: UserCreateNestedOneWithoutAvatarSessionsInput
  }

  export type AvatarSessionUncheckedCreateWithoutObservationsInput = {
    id?: string
    userId: string
    avatarName: string
    avatarRole: string
    engine?: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    duration?: number | null
    latencyAvg?: number | null
    conversationLog: JsonNullValueInput | InputJsonValue
    userSentiment?: string | null
    gcpSessionId?: string | null
    vertexAiModel?: string
    cloudRunEndpoint?: string | null
    thoughtSignatures?: NullableJsonNullValueInput | InputJsonValue
  }

  export type AvatarSessionCreateOrConnectWithoutObservationsInput = {
    where: AvatarSessionWhereUniqueInput
    create: XOR<AvatarSessionCreateWithoutObservationsInput, AvatarSessionUncheckedCreateWithoutObservationsInput>
  }

  export type UserUpsertWithoutObservationsInput = {
    update: XOR<UserUpdateWithoutObservationsInput, UserUncheckedUpdateWithoutObservationsInput>
    create: XOR<UserCreateWithoutObservationsInput, UserUncheckedCreateWithoutObservationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutObservationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutObservationsInput, UserUncheckedUpdateWithoutObservationsInput>
  }

  export type UserUpdateWithoutObservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    schoolSite?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    usageTokens?: IntFieldUpdateOperationsInput | number
    xpPoints?: IntFieldUpdateOperationsInput | number
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPaymentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneWithoutUsersNestedInput
    tier?: TierUpdateOneWithoutUsersNestedInput
    generations?: GenerationUpdateManyWithoutUserNestedInput
    evidenceFolders?: EvidenceFolderUpdateManyWithoutUserNestedInput
    avatarSessions?: AvatarSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutObservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    schoolSite?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    usageTokens?: IntFieldUpdateOperationsInput | number
    xpPoints?: IntFieldUpdateOperationsInput | number
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    tierId?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPaymentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    generations?: GenerationUncheckedUpdateManyWithoutUserNestedInput
    evidenceFolders?: EvidenceFolderUncheckedUpdateManyWithoutUserNestedInput
    avatarSessions?: AvatarSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EvidenceFolderUpsertWithoutObservationsInput = {
    update: XOR<EvidenceFolderUpdateWithoutObservationsInput, EvidenceFolderUncheckedUpdateWithoutObservationsInput>
    create: XOR<EvidenceFolderCreateWithoutObservationsInput, EvidenceFolderUncheckedCreateWithoutObservationsInput>
    where?: EvidenceFolderWhereInput
  }

  export type EvidenceFolderUpdateToOneWithWhereWithoutObservationsInput = {
    where?: EvidenceFolderWhereInput
    data: XOR<EvidenceFolderUpdateWithoutObservationsInput, EvidenceFolderUncheckedUpdateWithoutObservationsInput>
  }

  export type EvidenceFolderUpdateWithoutObservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    gradeLevel?: NullableStringFieldUpdateOperationsInput | string | null
    specialEdStatus?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    complianceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutEvidenceFoldersNestedInput
    documents?: DocumentUpdateManyWithoutEvidenceFolderNestedInput
  }

  export type EvidenceFolderUncheckedUpdateWithoutObservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    gradeLevel?: NullableStringFieldUpdateOperationsInput | string | null
    specialEdStatus?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    complianceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    documents?: DocumentUncheckedUpdateManyWithoutEvidenceFolderNestedInput
  }

  export type AvatarSessionUpsertWithoutObservationsInput = {
    update: XOR<AvatarSessionUpdateWithoutObservationsInput, AvatarSessionUncheckedUpdateWithoutObservationsInput>
    create: XOR<AvatarSessionCreateWithoutObservationsInput, AvatarSessionUncheckedCreateWithoutObservationsInput>
    where?: AvatarSessionWhereInput
  }

  export type AvatarSessionUpdateToOneWithWhereWithoutObservationsInput = {
    where?: AvatarSessionWhereInput
    data: XOR<AvatarSessionUpdateWithoutObservationsInput, AvatarSessionUncheckedUpdateWithoutObservationsInput>
  }

  export type AvatarSessionUpdateWithoutObservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatarName?: StringFieldUpdateOperationsInput | string
    avatarRole?: StringFieldUpdateOperationsInput | string
    engine?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    latencyAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    conversationLog?: JsonNullValueInput | InputJsonValue
    userSentiment?: NullableStringFieldUpdateOperationsInput | string | null
    gcpSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    vertexAiModel?: StringFieldUpdateOperationsInput | string
    cloudRunEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    thoughtSignatures?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneRequiredWithoutAvatarSessionsNestedInput
  }

  export type AvatarSessionUncheckedUpdateWithoutObservationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    avatarName?: StringFieldUpdateOperationsInput | string
    avatarRole?: StringFieldUpdateOperationsInput | string
    engine?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    latencyAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    conversationLog?: JsonNullValueInput | InputJsonValue
    userSentiment?: NullableStringFieldUpdateOperationsInput | string | null
    gcpSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    vertexAiModel?: StringFieldUpdateOperationsInput | string
    cloudRunEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    thoughtSignatures?: NullableJsonNullValueInput | InputJsonValue
  }

  export type EvidenceFolderCreateWithoutDocumentsInput = {
    id?: string
    studentId: string
    gradeLevel?: string | null
    specialEdStatus?: string | null
    title: string
    category: string
    createdAt?: Date | string
    updatedAt?: Date | string
    aiSummary?: string | null
    riskLevel?: string | null
    complianceScore?: number | null
    user: UserCreateNestedOneWithoutEvidenceFoldersInput
    observations?: ObservationCreateNestedManyWithoutEvidenceFolderInput
  }

  export type EvidenceFolderUncheckedCreateWithoutDocumentsInput = {
    id?: string
    userId: string
    studentId: string
    gradeLevel?: string | null
    specialEdStatus?: string | null
    title: string
    category: string
    createdAt?: Date | string
    updatedAt?: Date | string
    aiSummary?: string | null
    riskLevel?: string | null
    complianceScore?: number | null
    observations?: ObservationUncheckedCreateNestedManyWithoutEvidenceFolderInput
  }

  export type EvidenceFolderCreateOrConnectWithoutDocumentsInput = {
    where: EvidenceFolderWhereUniqueInput
    create: XOR<EvidenceFolderCreateWithoutDocumentsInput, EvidenceFolderUncheckedCreateWithoutDocumentsInput>
  }

  export type EvidenceFolderUpsertWithoutDocumentsInput = {
    update: XOR<EvidenceFolderUpdateWithoutDocumentsInput, EvidenceFolderUncheckedUpdateWithoutDocumentsInput>
    create: XOR<EvidenceFolderCreateWithoutDocumentsInput, EvidenceFolderUncheckedCreateWithoutDocumentsInput>
    where?: EvidenceFolderWhereInput
  }

  export type EvidenceFolderUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: EvidenceFolderWhereInput
    data: XOR<EvidenceFolderUpdateWithoutDocumentsInput, EvidenceFolderUncheckedUpdateWithoutDocumentsInput>
  }

  export type EvidenceFolderUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    gradeLevel?: NullableStringFieldUpdateOperationsInput | string | null
    specialEdStatus?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    complianceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutEvidenceFoldersNestedInput
    observations?: ObservationUpdateManyWithoutEvidenceFolderNestedInput
  }

  export type EvidenceFolderUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    gradeLevel?: NullableStringFieldUpdateOperationsInput | string | null
    specialEdStatus?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    complianceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: ObservationUncheckedUpdateManyWithoutEvidenceFolderNestedInput
  }

  export type UserCreateWithoutGenerationsInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    district?: string | null
    school?: string | null
    schoolSite?: string | null
    position?: string | null
    stripeCustomerId?: string | null
    subscriptionTier?: string
    subscriptionStatus?: string
    usageTokens?: number
    xpPoints?: number
    trialStartedAt?: Date | string
    trialEndsAt?: Date | string | null
    isTrialConverted?: boolean
    googleId?: string | null
    avatarUrl?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    subscriptionId?: string | null
    lastPaymentAt?: Date | string | null
    organization?: OrganizationCreateNestedOneWithoutUsersInput
    tier?: TierCreateNestedOneWithoutUsersInput
    observations?: ObservationCreateNestedManyWithoutUserInput
    evidenceFolders?: EvidenceFolderCreateNestedManyWithoutUserInput
    avatarSessions?: AvatarSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGenerationsInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    district?: string | null
    school?: string | null
    schoolSite?: string | null
    position?: string | null
    organizationId?: string | null
    stripeCustomerId?: string | null
    subscriptionTier?: string
    subscriptionStatus?: string
    usageTokens?: number
    xpPoints?: number
    trialStartedAt?: Date | string
    trialEndsAt?: Date | string | null
    isTrialConverted?: boolean
    tierId?: string | null
    googleId?: string | null
    avatarUrl?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    subscriptionId?: string | null
    lastPaymentAt?: Date | string | null
    observations?: ObservationUncheckedCreateNestedManyWithoutUserInput
    evidenceFolders?: EvidenceFolderUncheckedCreateNestedManyWithoutUserInput
    avatarSessions?: AvatarSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGenerationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGenerationsInput, UserUncheckedCreateWithoutGenerationsInput>
  }

  export type UserUpsertWithoutGenerationsInput = {
    update: XOR<UserUpdateWithoutGenerationsInput, UserUncheckedUpdateWithoutGenerationsInput>
    create: XOR<UserCreateWithoutGenerationsInput, UserUncheckedCreateWithoutGenerationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGenerationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGenerationsInput, UserUncheckedUpdateWithoutGenerationsInput>
  }

  export type UserUpdateWithoutGenerationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    schoolSite?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    usageTokens?: IntFieldUpdateOperationsInput | number
    xpPoints?: IntFieldUpdateOperationsInput | number
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPaymentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneWithoutUsersNestedInput
    tier?: TierUpdateOneWithoutUsersNestedInput
    observations?: ObservationUpdateManyWithoutUserNestedInput
    evidenceFolders?: EvidenceFolderUpdateManyWithoutUserNestedInput
    avatarSessions?: AvatarSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGenerationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    schoolSite?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    usageTokens?: IntFieldUpdateOperationsInput | number
    xpPoints?: IntFieldUpdateOperationsInput | number
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    tierId?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPaymentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    observations?: ObservationUncheckedUpdateManyWithoutUserNestedInput
    evidenceFolders?: EvidenceFolderUncheckedUpdateManyWithoutUserNestedInput
    avatarSessions?: AvatarSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type GraphEdgeCreateWithoutSourceInput = {
    id?: string
    type: string
    properties?: NullableJsonNullValueInput | InputJsonValue
    weight?: number
    createdAt?: Date | string
    target: GraphNodeCreateNestedOneWithoutInboundInput
  }

  export type GraphEdgeUncheckedCreateWithoutSourceInput = {
    id?: string
    type: string
    properties?: NullableJsonNullValueInput | InputJsonValue
    targetId: string
    weight?: number
    createdAt?: Date | string
  }

  export type GraphEdgeCreateOrConnectWithoutSourceInput = {
    where: GraphEdgeWhereUniqueInput
    create: XOR<GraphEdgeCreateWithoutSourceInput, GraphEdgeUncheckedCreateWithoutSourceInput>
  }

  export type GraphEdgeCreateManySourceInputEnvelope = {
    data: GraphEdgeCreateManySourceInput | GraphEdgeCreateManySourceInput[]
    skipDuplicates?: boolean
  }

  export type GraphEdgeCreateWithoutTargetInput = {
    id?: string
    type: string
    properties?: NullableJsonNullValueInput | InputJsonValue
    weight?: number
    createdAt?: Date | string
    source: GraphNodeCreateNestedOneWithoutOutboundInput
  }

  export type GraphEdgeUncheckedCreateWithoutTargetInput = {
    id?: string
    type: string
    properties?: NullableJsonNullValueInput | InputJsonValue
    sourceId: string
    weight?: number
    createdAt?: Date | string
  }

  export type GraphEdgeCreateOrConnectWithoutTargetInput = {
    where: GraphEdgeWhereUniqueInput
    create: XOR<GraphEdgeCreateWithoutTargetInput, GraphEdgeUncheckedCreateWithoutTargetInput>
  }

  export type GraphEdgeCreateManyTargetInputEnvelope = {
    data: GraphEdgeCreateManyTargetInput | GraphEdgeCreateManyTargetInput[]
    skipDuplicates?: boolean
  }

  export type GraphEdgeUpsertWithWhereUniqueWithoutSourceInput = {
    where: GraphEdgeWhereUniqueInput
    update: XOR<GraphEdgeUpdateWithoutSourceInput, GraphEdgeUncheckedUpdateWithoutSourceInput>
    create: XOR<GraphEdgeCreateWithoutSourceInput, GraphEdgeUncheckedCreateWithoutSourceInput>
  }

  export type GraphEdgeUpdateWithWhereUniqueWithoutSourceInput = {
    where: GraphEdgeWhereUniqueInput
    data: XOR<GraphEdgeUpdateWithoutSourceInput, GraphEdgeUncheckedUpdateWithoutSourceInput>
  }

  export type GraphEdgeUpdateManyWithWhereWithoutSourceInput = {
    where: GraphEdgeScalarWhereInput
    data: XOR<GraphEdgeUpdateManyMutationInput, GraphEdgeUncheckedUpdateManyWithoutSourceInput>
  }

  export type GraphEdgeScalarWhereInput = {
    AND?: GraphEdgeScalarWhereInput | GraphEdgeScalarWhereInput[]
    OR?: GraphEdgeScalarWhereInput[]
    NOT?: GraphEdgeScalarWhereInput | GraphEdgeScalarWhereInput[]
    id?: StringFilter<"GraphEdge"> | string
    type?: StringFilter<"GraphEdge"> | string
    properties?: JsonNullableFilter<"GraphEdge">
    sourceId?: StringFilter<"GraphEdge"> | string
    targetId?: StringFilter<"GraphEdge"> | string
    weight?: FloatFilter<"GraphEdge"> | number
    createdAt?: DateTimeFilter<"GraphEdge"> | Date | string
  }

  export type GraphEdgeUpsertWithWhereUniqueWithoutTargetInput = {
    where: GraphEdgeWhereUniqueInput
    update: XOR<GraphEdgeUpdateWithoutTargetInput, GraphEdgeUncheckedUpdateWithoutTargetInput>
    create: XOR<GraphEdgeCreateWithoutTargetInput, GraphEdgeUncheckedCreateWithoutTargetInput>
  }

  export type GraphEdgeUpdateWithWhereUniqueWithoutTargetInput = {
    where: GraphEdgeWhereUniqueInput
    data: XOR<GraphEdgeUpdateWithoutTargetInput, GraphEdgeUncheckedUpdateWithoutTargetInput>
  }

  export type GraphEdgeUpdateManyWithWhereWithoutTargetInput = {
    where: GraphEdgeScalarWhereInput
    data: XOR<GraphEdgeUpdateManyMutationInput, GraphEdgeUncheckedUpdateManyWithoutTargetInput>
  }

  export type GraphNodeCreateWithoutOutboundInput = {
    id?: string
    label: string
    name: string
    properties?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    inbound?: GraphEdgeCreateNestedManyWithoutTargetInput
  }

  export type GraphNodeUncheckedCreateWithoutOutboundInput = {
    id?: string
    label: string
    name: string
    properties?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    inbound?: GraphEdgeUncheckedCreateNestedManyWithoutTargetInput
  }

  export type GraphNodeCreateOrConnectWithoutOutboundInput = {
    where: GraphNodeWhereUniqueInput
    create: XOR<GraphNodeCreateWithoutOutboundInput, GraphNodeUncheckedCreateWithoutOutboundInput>
  }

  export type GraphNodeCreateWithoutInboundInput = {
    id?: string
    label: string
    name: string
    properties?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    outbound?: GraphEdgeCreateNestedManyWithoutSourceInput
  }

  export type GraphNodeUncheckedCreateWithoutInboundInput = {
    id?: string
    label: string
    name: string
    properties?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    outbound?: GraphEdgeUncheckedCreateNestedManyWithoutSourceInput
  }

  export type GraphNodeCreateOrConnectWithoutInboundInput = {
    where: GraphNodeWhereUniqueInput
    create: XOR<GraphNodeCreateWithoutInboundInput, GraphNodeUncheckedCreateWithoutInboundInput>
  }

  export type GraphNodeUpsertWithoutOutboundInput = {
    update: XOR<GraphNodeUpdateWithoutOutboundInput, GraphNodeUncheckedUpdateWithoutOutboundInput>
    create: XOR<GraphNodeCreateWithoutOutboundInput, GraphNodeUncheckedCreateWithoutOutboundInput>
    where?: GraphNodeWhereInput
  }

  export type GraphNodeUpdateToOneWithWhereWithoutOutboundInput = {
    where?: GraphNodeWhereInput
    data: XOR<GraphNodeUpdateWithoutOutboundInput, GraphNodeUncheckedUpdateWithoutOutboundInput>
  }

  export type GraphNodeUpdateWithoutOutboundInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    properties?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inbound?: GraphEdgeUpdateManyWithoutTargetNestedInput
  }

  export type GraphNodeUncheckedUpdateWithoutOutboundInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    properties?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inbound?: GraphEdgeUncheckedUpdateManyWithoutTargetNestedInput
  }

  export type GraphNodeUpsertWithoutInboundInput = {
    update: XOR<GraphNodeUpdateWithoutInboundInput, GraphNodeUncheckedUpdateWithoutInboundInput>
    create: XOR<GraphNodeCreateWithoutInboundInput, GraphNodeUncheckedCreateWithoutInboundInput>
    where?: GraphNodeWhereInput
  }

  export type GraphNodeUpdateToOneWithWhereWithoutInboundInput = {
    where?: GraphNodeWhereInput
    data: XOR<GraphNodeUpdateWithoutInboundInput, GraphNodeUncheckedUpdateWithoutInboundInput>
  }

  export type GraphNodeUpdateWithoutInboundInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    properties?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    outbound?: GraphEdgeUpdateManyWithoutSourceNestedInput
  }

  export type GraphNodeUncheckedUpdateWithoutInboundInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    properties?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    outbound?: GraphEdgeUncheckedUpdateManyWithoutSourceNestedInput
  }

  export type UserCreateManyTierInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    district?: string | null
    school?: string | null
    schoolSite?: string | null
    position?: string | null
    organizationId?: string | null
    stripeCustomerId?: string | null
    subscriptionTier?: string
    subscriptionStatus?: string
    usageTokens?: number
    xpPoints?: number
    trialStartedAt?: Date | string
    trialEndsAt?: Date | string | null
    isTrialConverted?: boolean
    googleId?: string | null
    avatarUrl?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    subscriptionId?: string | null
    lastPaymentAt?: Date | string | null
  }

  export type UserUpdateWithoutTierInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    schoolSite?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    usageTokens?: IntFieldUpdateOperationsInput | number
    xpPoints?: IntFieldUpdateOperationsInput | number
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPaymentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    organization?: OrganizationUpdateOneWithoutUsersNestedInput
    generations?: GenerationUpdateManyWithoutUserNestedInput
    observations?: ObservationUpdateManyWithoutUserNestedInput
    evidenceFolders?: EvidenceFolderUpdateManyWithoutUserNestedInput
    avatarSessions?: AvatarSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTierInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    schoolSite?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    usageTokens?: IntFieldUpdateOperationsInput | number
    xpPoints?: IntFieldUpdateOperationsInput | number
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPaymentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    generations?: GenerationUncheckedUpdateManyWithoutUserNestedInput
    observations?: ObservationUncheckedUpdateManyWithoutUserNestedInput
    evidenceFolders?: EvidenceFolderUncheckedUpdateManyWithoutUserNestedInput
    avatarSessions?: AvatarSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutTierInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    schoolSite?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    organizationId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    usageTokens?: IntFieldUpdateOperationsInput | number
    xpPoints?: IntFieldUpdateOperationsInput | number
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPaymentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type GenerationCreateManyUserInput = {
    id?: string
    generatorId: string
    prompt: string
    content: string
    professorVideoUrl?: string | null
    avatarEngine?: string | null
    createdAt?: Date | string
  }

  export type ObservationCreateManyUserInput = {
    id?: string
    evidenceFolderId?: string | null
    avatarSessionId?: string | null
    observationType: string
    observationDate?: Date | string
    duration?: number | null
    description: string
    context?: string | null
    interventions?: string | null
    aiAnalysis?: string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: boolean
    hasAudio?: boolean
    hasVideo?: boolean
    hasImages?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EvidenceFolderCreateManyUserInput = {
    id?: string
    studentId: string
    gradeLevel?: string | null
    specialEdStatus?: string | null
    title: string
    category: string
    createdAt?: Date | string
    updatedAt?: Date | string
    aiSummary?: string | null
    riskLevel?: string | null
    complianceScore?: number | null
  }

  export type AvatarSessionCreateManyUserInput = {
    id?: string
    avatarName: string
    avatarRole: string
    engine?: string
    startedAt?: Date | string
    endedAt?: Date | string | null
    duration?: number | null
    latencyAvg?: number | null
    conversationLog: JsonNullValueInput | InputJsonValue
    userSentiment?: string | null
    gcpSessionId?: string | null
    vertexAiModel?: string
    cloudRunEndpoint?: string | null
    thoughtSignatures?: NullableJsonNullValueInput | InputJsonValue
  }

  export type GenerationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    generatorId?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    professorVideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarEngine?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GenerationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    generatorId?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    professorVideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarEngine?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GenerationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    generatorId?: StringFieldUpdateOperationsInput | string
    prompt?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    professorVideoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    avatarEngine?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ObservationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    observationType?: StringFieldUpdateOperationsInput | string
    observationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    interventions?: NullableStringFieldUpdateOperationsInput | string | null
    aiAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: BoolFieldUpdateOperationsInput | boolean
    hasAudio?: BoolFieldUpdateOperationsInput | boolean
    hasVideo?: BoolFieldUpdateOperationsInput | boolean
    hasImages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evidenceFolder?: EvidenceFolderUpdateOneWithoutObservationsNestedInput
    avatarSession?: AvatarSessionUpdateOneWithoutObservationsNestedInput
  }

  export type ObservationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    evidenceFolderId?: NullableStringFieldUpdateOperationsInput | string | null
    avatarSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    observationType?: StringFieldUpdateOperationsInput | string
    observationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    interventions?: NullableStringFieldUpdateOperationsInput | string | null
    aiAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: BoolFieldUpdateOperationsInput | boolean
    hasAudio?: BoolFieldUpdateOperationsInput | boolean
    hasVideo?: BoolFieldUpdateOperationsInput | boolean
    hasImages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ObservationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    evidenceFolderId?: NullableStringFieldUpdateOperationsInput | string | null
    avatarSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    observationType?: StringFieldUpdateOperationsInput | string
    observationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    interventions?: NullableStringFieldUpdateOperationsInput | string | null
    aiAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: BoolFieldUpdateOperationsInput | boolean
    hasAudio?: BoolFieldUpdateOperationsInput | boolean
    hasVideo?: BoolFieldUpdateOperationsInput | boolean
    hasImages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvidenceFolderUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    gradeLevel?: NullableStringFieldUpdateOperationsInput | string | null
    specialEdStatus?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    complianceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: ObservationUpdateManyWithoutEvidenceFolderNestedInput
    documents?: DocumentUpdateManyWithoutEvidenceFolderNestedInput
  }

  export type EvidenceFolderUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    gradeLevel?: NullableStringFieldUpdateOperationsInput | string | null
    specialEdStatus?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    complianceScore?: NullableFloatFieldUpdateOperationsInput | number | null
    observations?: ObservationUncheckedUpdateManyWithoutEvidenceFolderNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutEvidenceFolderNestedInput
  }

  export type EvidenceFolderUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    gradeLevel?: NullableStringFieldUpdateOperationsInput | string | null
    specialEdStatus?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiSummary?: NullableStringFieldUpdateOperationsInput | string | null
    riskLevel?: NullableStringFieldUpdateOperationsInput | string | null
    complianceScore?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type AvatarSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatarName?: StringFieldUpdateOperationsInput | string
    avatarRole?: StringFieldUpdateOperationsInput | string
    engine?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    latencyAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    conversationLog?: JsonNullValueInput | InputJsonValue
    userSentiment?: NullableStringFieldUpdateOperationsInput | string | null
    gcpSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    vertexAiModel?: StringFieldUpdateOperationsInput | string
    cloudRunEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    thoughtSignatures?: NullableJsonNullValueInput | InputJsonValue
    observations?: ObservationUpdateManyWithoutAvatarSessionNestedInput
  }

  export type AvatarSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatarName?: StringFieldUpdateOperationsInput | string
    avatarRole?: StringFieldUpdateOperationsInput | string
    engine?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    latencyAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    conversationLog?: JsonNullValueInput | InputJsonValue
    userSentiment?: NullableStringFieldUpdateOperationsInput | string | null
    gcpSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    vertexAiModel?: StringFieldUpdateOperationsInput | string
    cloudRunEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    thoughtSignatures?: NullableJsonNullValueInput | InputJsonValue
    observations?: ObservationUncheckedUpdateManyWithoutAvatarSessionNestedInput
  }

  export type AvatarSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    avatarName?: StringFieldUpdateOperationsInput | string
    avatarRole?: StringFieldUpdateOperationsInput | string
    engine?: StringFieldUpdateOperationsInput | string
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    latencyAvg?: NullableFloatFieldUpdateOperationsInput | number | null
    conversationLog?: JsonNullValueInput | InputJsonValue
    userSentiment?: NullableStringFieldUpdateOperationsInput | string | null
    gcpSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    vertexAiModel?: StringFieldUpdateOperationsInput | string
    cloudRunEndpoint?: NullableStringFieldUpdateOperationsInput | string | null
    thoughtSignatures?: NullableJsonNullValueInput | InputJsonValue
  }

  export type UserCreateManyOrganizationInput = {
    id?: string
    email: string
    name?: string | null
    role?: string
    district?: string | null
    school?: string | null
    schoolSite?: string | null
    position?: string | null
    stripeCustomerId?: string | null
    subscriptionTier?: string
    subscriptionStatus?: string
    usageTokens?: number
    xpPoints?: number
    trialStartedAt?: Date | string
    trialEndsAt?: Date | string | null
    isTrialConverted?: boolean
    tierId?: string | null
    googleId?: string | null
    avatarUrl?: string | null
    passwordHash?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
    subscriptionId?: string | null
    lastPaymentAt?: Date | string | null
  }

  export type UserUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    schoolSite?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    usageTokens?: IntFieldUpdateOperationsInput | number
    xpPoints?: IntFieldUpdateOperationsInput | number
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPaymentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tier?: TierUpdateOneWithoutUsersNestedInput
    generations?: GenerationUpdateManyWithoutUserNestedInput
    observations?: ObservationUpdateManyWithoutUserNestedInput
    evidenceFolders?: EvidenceFolderUpdateManyWithoutUserNestedInput
    avatarSessions?: AvatarSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    schoolSite?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    usageTokens?: IntFieldUpdateOperationsInput | number
    xpPoints?: IntFieldUpdateOperationsInput | number
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    tierId?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPaymentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    generations?: GenerationUncheckedUpdateManyWithoutUserNestedInput
    observations?: ObservationUncheckedUpdateManyWithoutUserNestedInput
    evidenceFolders?: EvidenceFolderUncheckedUpdateManyWithoutUserNestedInput
    avatarSessions?: AvatarSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutOrganizationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    district?: NullableStringFieldUpdateOperationsInput | string | null
    school?: NullableStringFieldUpdateOperationsInput | string | null
    schoolSite?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableStringFieldUpdateOperationsInput | string | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionTier?: StringFieldUpdateOperationsInput | string
    subscriptionStatus?: StringFieldUpdateOperationsInput | string
    usageTokens?: IntFieldUpdateOperationsInput | number
    xpPoints?: IntFieldUpdateOperationsInput | number
    trialStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    trialEndsAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isTrialConverted?: BoolFieldUpdateOperationsInput | boolean
    tierId?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    lastPaymentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ObservationCreateManyAvatarSessionInput = {
    id?: string
    userId: string
    evidenceFolderId?: string | null
    observationType: string
    observationDate?: Date | string
    duration?: number | null
    description: string
    context?: string | null
    interventions?: string | null
    aiAnalysis?: string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: boolean
    hasAudio?: boolean
    hasVideo?: boolean
    hasImages?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ObservationUpdateWithoutAvatarSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    observationType?: StringFieldUpdateOperationsInput | string
    observationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    interventions?: NullableStringFieldUpdateOperationsInput | string | null
    aiAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: BoolFieldUpdateOperationsInput | boolean
    hasAudio?: BoolFieldUpdateOperationsInput | boolean
    hasVideo?: BoolFieldUpdateOperationsInput | boolean
    hasImages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutObservationsNestedInput
    evidenceFolder?: EvidenceFolderUpdateOneWithoutObservationsNestedInput
  }

  export type ObservationUncheckedUpdateWithoutAvatarSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    evidenceFolderId?: NullableStringFieldUpdateOperationsInput | string | null
    observationType?: StringFieldUpdateOperationsInput | string
    observationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    interventions?: NullableStringFieldUpdateOperationsInput | string | null
    aiAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: BoolFieldUpdateOperationsInput | boolean
    hasAudio?: BoolFieldUpdateOperationsInput | boolean
    hasVideo?: BoolFieldUpdateOperationsInput | boolean
    hasImages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ObservationUncheckedUpdateManyWithoutAvatarSessionInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    evidenceFolderId?: NullableStringFieldUpdateOperationsInput | string | null
    observationType?: StringFieldUpdateOperationsInput | string
    observationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    interventions?: NullableStringFieldUpdateOperationsInput | string | null
    aiAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: BoolFieldUpdateOperationsInput | boolean
    hasAudio?: BoolFieldUpdateOperationsInput | boolean
    hasVideo?: BoolFieldUpdateOperationsInput | boolean
    hasImages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ObservationCreateManyEvidenceFolderInput = {
    id?: string
    userId: string
    avatarSessionId?: string | null
    observationType: string
    observationDate?: Date | string
    duration?: number | null
    description: string
    context?: string | null
    interventions?: string | null
    aiAnalysis?: string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: boolean
    hasAudio?: boolean
    hasVideo?: boolean
    hasImages?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentCreateManyEvidenceFolderInput = {
    id?: string
    fileName: string
    fileType: string
    fileSize: number
    gcpBucketPath: string
    gcpSignedUrl?: string | null
    urlExpiresAt?: Date | string | null
    encrypted?: boolean
    accessLevel?: string
    uploadedAt?: Date | string
  }

  export type ObservationUpdateWithoutEvidenceFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    observationType?: StringFieldUpdateOperationsInput | string
    observationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    interventions?: NullableStringFieldUpdateOperationsInput | string | null
    aiAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: BoolFieldUpdateOperationsInput | boolean
    hasAudio?: BoolFieldUpdateOperationsInput | boolean
    hasVideo?: BoolFieldUpdateOperationsInput | boolean
    hasImages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutObservationsNestedInput
    avatarSession?: AvatarSessionUpdateOneWithoutObservationsNestedInput
  }

  export type ObservationUncheckedUpdateWithoutEvidenceFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    avatarSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    observationType?: StringFieldUpdateOperationsInput | string
    observationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    interventions?: NullableStringFieldUpdateOperationsInput | string | null
    aiAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: BoolFieldUpdateOperationsInput | boolean
    hasAudio?: BoolFieldUpdateOperationsInput | boolean
    hasVideo?: BoolFieldUpdateOperationsInput | boolean
    hasImages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ObservationUncheckedUpdateManyWithoutEvidenceFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    avatarSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    observationType?: StringFieldUpdateOperationsInput | string
    observationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    description?: StringFieldUpdateOperationsInput | string
    context?: NullableStringFieldUpdateOperationsInput | string | null
    interventions?: NullableStringFieldUpdateOperationsInput | string | null
    aiAnalysis?: NullableStringFieldUpdateOperationsInput | string | null
    suggestedActions?: NullableJsonNullValueInput | InputJsonValue
    legalCompliance?: BoolFieldUpdateOperationsInput | boolean
    hasAudio?: BoolFieldUpdateOperationsInput | boolean
    hasVideo?: BoolFieldUpdateOperationsInput | boolean
    hasImages?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUpdateWithoutEvidenceFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    gcpBucketPath?: StringFieldUpdateOperationsInput | string
    gcpSignedUrl?: NullableStringFieldUpdateOperationsInput | string | null
    urlExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    encrypted?: BoolFieldUpdateOperationsInput | boolean
    accessLevel?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUncheckedUpdateWithoutEvidenceFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    gcpBucketPath?: StringFieldUpdateOperationsInput | string
    gcpSignedUrl?: NullableStringFieldUpdateOperationsInput | string | null
    urlExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    encrypted?: BoolFieldUpdateOperationsInput | boolean
    accessLevel?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUncheckedUpdateManyWithoutEvidenceFolderInput = {
    id?: StringFieldUpdateOperationsInput | string
    fileName?: StringFieldUpdateOperationsInput | string
    fileType?: StringFieldUpdateOperationsInput | string
    fileSize?: IntFieldUpdateOperationsInput | number
    gcpBucketPath?: StringFieldUpdateOperationsInput | string
    gcpSignedUrl?: NullableStringFieldUpdateOperationsInput | string | null
    urlExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    encrypted?: BoolFieldUpdateOperationsInput | boolean
    accessLevel?: StringFieldUpdateOperationsInput | string
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GraphEdgeCreateManySourceInput = {
    id?: string
    type: string
    properties?: NullableJsonNullValueInput | InputJsonValue
    targetId: string
    weight?: number
    createdAt?: Date | string
  }

  export type GraphEdgeCreateManyTargetInput = {
    id?: string
    type: string
    properties?: NullableJsonNullValueInput | InputJsonValue
    sourceId: string
    weight?: number
    createdAt?: Date | string
  }

  export type GraphEdgeUpdateWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    properties?: NullableJsonNullValueInput | InputJsonValue
    weight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: GraphNodeUpdateOneRequiredWithoutInboundNestedInput
  }

  export type GraphEdgeUncheckedUpdateWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    properties?: NullableJsonNullValueInput | InputJsonValue
    targetId?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GraphEdgeUncheckedUpdateManyWithoutSourceInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    properties?: NullableJsonNullValueInput | InputJsonValue
    targetId?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GraphEdgeUpdateWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    properties?: NullableJsonNullValueInput | InputJsonValue
    weight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: GraphNodeUpdateOneRequiredWithoutOutboundNestedInput
  }

  export type GraphEdgeUncheckedUpdateWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    properties?: NullableJsonNullValueInput | InputJsonValue
    sourceId?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GraphEdgeUncheckedUpdateManyWithoutTargetInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    properties?: NullableJsonNullValueInput | InputJsonValue
    sourceId?: StringFieldUpdateOperationsInput | string
    weight?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use TierCountOutputTypeDefaultArgs instead
     */
    export type TierCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TierCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrganizationCountOutputTypeDefaultArgs instead
     */
    export type OrganizationCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrganizationCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AvatarSessionCountOutputTypeDefaultArgs instead
     */
    export type AvatarSessionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AvatarSessionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EvidenceFolderCountOutputTypeDefaultArgs instead
     */
    export type EvidenceFolderCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EvidenceFolderCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GraphNodeCountOutputTypeDefaultArgs instead
     */
    export type GraphNodeCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GraphNodeCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EdintelMediaDefaultArgs instead
     */
    export type EdintelMediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EdintelMediaDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TierDefaultArgs instead
     */
    export type TierArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TierDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use OrganizationDefaultArgs instead
     */
    export type OrganizationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = OrganizationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AvatarSessionDefaultArgs instead
     */
    export type AvatarSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AvatarSessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EvidenceFolderDefaultArgs instead
     */
    export type EvidenceFolderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EvidenceFolderDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ObservationDefaultArgs instead
     */
    export type ObservationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ObservationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DocumentDefaultArgs instead
     */
    export type DocumentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DocumentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GenerationDefaultArgs instead
     */
    export type GenerationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GenerationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AnalyticsEventDefaultArgs instead
     */
    export type AnalyticsEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AnalyticsEventDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SemanticCacheDefaultArgs instead
     */
    export type SemanticCacheArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SemanticCacheDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GraphNodeDefaultArgs instead
     */
    export type GraphNodeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GraphNodeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use GraphEdgeDefaultArgs instead
     */
    export type GraphEdgeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = GraphEdgeDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}