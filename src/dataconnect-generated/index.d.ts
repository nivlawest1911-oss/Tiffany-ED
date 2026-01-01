import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

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

interface CreateCognitiveAreaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCognitiveAreaVariables): MutationRef<CreateCognitiveAreaData, CreateCognitiveAreaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCognitiveAreaVariables): MutationRef<CreateCognitiveAreaData, CreateCognitiveAreaVariables>;
  operationName: string;
}
export const createCognitiveAreaRef: CreateCognitiveAreaRef;

export function createCognitiveArea(vars: CreateCognitiveAreaVariables): MutationPromise<CreateCognitiveAreaData, CreateCognitiveAreaVariables>;
export function createCognitiveArea(dc: DataConnect, vars: CreateCognitiveAreaVariables): MutationPromise<CreateCognitiveAreaData, CreateCognitiveAreaVariables>;

interface ListExercisesForCognitiveAreaRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListExercisesForCognitiveAreaVariables): QueryRef<ListExercisesForCognitiveAreaData, ListExercisesForCognitiveAreaVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListExercisesForCognitiveAreaVariables): QueryRef<ListExercisesForCognitiveAreaData, ListExercisesForCognitiveAreaVariables>;
  operationName: string;
}
export const listExercisesForCognitiveAreaRef: ListExercisesForCognitiveAreaRef;

export function listExercisesForCognitiveArea(vars: ListExercisesForCognitiveAreaVariables): QueryPromise<ListExercisesForCognitiveAreaData, ListExercisesForCognitiveAreaVariables>;
export function listExercisesForCognitiveArea(dc: DataConnect, vars: ListExercisesForCognitiveAreaVariables): QueryPromise<ListExercisesForCognitiveAreaData, ListExercisesForCognitiveAreaVariables>;

interface UpdateSessionNotesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSessionNotesVariables): MutationRef<UpdateSessionNotesData, UpdateSessionNotesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateSessionNotesVariables): MutationRef<UpdateSessionNotesData, UpdateSessionNotesVariables>;
  operationName: string;
}
export const updateSessionNotesRef: UpdateSessionNotesRef;

export function updateSessionNotes(vars: UpdateSessionNotesVariables): MutationPromise<UpdateSessionNotesData, UpdateSessionNotesVariables>;
export function updateSessionNotes(dc: DataConnect, vars: UpdateSessionNotesVariables): MutationPromise<UpdateSessionNotesData, UpdateSessionNotesVariables>;

interface GetUserSubscriptionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserSubscriptionsVariables): QueryRef<GetUserSubscriptionsData, GetUserSubscriptionsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserSubscriptionsVariables): QueryRef<GetUserSubscriptionsData, GetUserSubscriptionsVariables>;
  operationName: string;
}
export const getUserSubscriptionsRef: GetUserSubscriptionsRef;

export function getUserSubscriptions(vars: GetUserSubscriptionsVariables): QueryPromise<GetUserSubscriptionsData, GetUserSubscriptionsVariables>;
export function getUserSubscriptions(dc: DataConnect, vars: GetUserSubscriptionsVariables): QueryPromise<GetUserSubscriptionsData, GetUserSubscriptionsVariables>;

