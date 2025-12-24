import { ConnectorConfig, DataConnect, OperationOptions, ExecuteOperationResponse } from 'firebase-admin/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface CognitiveArea_Key {
  id: UUIDString;
  __typename?: 'CognitiveArea_Key';
}

export interface CreateCognitiveAreaData {
  cognitiveArea_insert: CognitiveArea_Key;
}

export interface CreateCognitiveAreaVariables {
  description: string;
  iconUrl?: string | null;
  name: string;
}

export interface Exercise_Key {
  id: UUIDString;
  __typename?: 'Exercise_Key';
}

export interface GetUserSubscriptionsData {
  userSubscriptions: ({
    id: UUIDString;
    startDate: TimestampString;
    endDate: TimestampString;
    status: string;
    subscriptionType?: {
      name: string;
      price: number;
    };
  } & UserSubscription_Key)[];
}

export interface GetUserSubscriptionsVariables {
  userId: UUIDString;
}

export interface ListExercisesForCognitiveAreaData {
  exercises: ({
    id: UUIDString;
    name: string;
    difficultyLevel: string;
  } & Exercise_Key)[];
}

export interface ListExercisesForCognitiveAreaVariables {
  cognitiveAreaId: UUIDString;
}

export interface ProgressMetric_Key {
  id: UUIDString;
  __typename?: 'ProgressMetric_Key';
}

export interface Session_Key {
  id: UUIDString;
  __typename?: 'Session_Key';
}

export interface SubscriptionType_Key {
  id: UUIDString;
  __typename?: 'SubscriptionType_Key';
}

export interface UpdateSessionNotesData {
  session_update?: Session_Key | null;
}

export interface UpdateSessionNotesVariables {
  id: UUIDString;
  notes?: string | null;
}

export interface UserSubscription_Key {
  id: UUIDString;
  __typename?: 'UserSubscription_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

/** Generated Node Admin SDK operation action function for the 'CreateCognitiveArea' Mutation. Allow users to execute without passing in DataConnect. */
export function createCognitiveArea(dc: DataConnect, vars: CreateCognitiveAreaVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateCognitiveAreaData>>;
/** Generated Node Admin SDK operation action function for the 'CreateCognitiveArea' Mutation. Allow users to pass in custom DataConnect instances. */
export function createCognitiveArea(vars: CreateCognitiveAreaVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<CreateCognitiveAreaData>>;

/** Generated Node Admin SDK operation action function for the 'ListExercisesForCognitiveArea' Query. Allow users to execute without passing in DataConnect. */
export function listExercisesForCognitiveArea(dc: DataConnect, vars: ListExercisesForCognitiveAreaVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListExercisesForCognitiveAreaData>>;
/** Generated Node Admin SDK operation action function for the 'ListExercisesForCognitiveArea' Query. Allow users to pass in custom DataConnect instances. */
export function listExercisesForCognitiveArea(vars: ListExercisesForCognitiveAreaVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<ListExercisesForCognitiveAreaData>>;

/** Generated Node Admin SDK operation action function for the 'UpdateSessionNotes' Mutation. Allow users to execute without passing in DataConnect. */
export function updateSessionNotes(dc: DataConnect, vars: UpdateSessionNotesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateSessionNotesData>>;
/** Generated Node Admin SDK operation action function for the 'UpdateSessionNotes' Mutation. Allow users to pass in custom DataConnect instances. */
export function updateSessionNotes(vars: UpdateSessionNotesVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<UpdateSessionNotesData>>;

/** Generated Node Admin SDK operation action function for the 'GetUserSubscriptions' Query. Allow users to execute without passing in DataConnect. */
export function getUserSubscriptions(dc: DataConnect, vars: GetUserSubscriptionsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetUserSubscriptionsData>>;
/** Generated Node Admin SDK operation action function for the 'GetUserSubscriptions' Query. Allow users to pass in custom DataConnect instances. */
export function getUserSubscriptions(vars: GetUserSubscriptionsVariables, options?: OperationOptions): Promise<ExecuteOperationResponse<GetUserSubscriptionsData>>;

