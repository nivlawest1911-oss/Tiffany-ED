# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `cognition`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListExercisesForCognitiveArea*](#listexercisesforcognitivearea)
  - [*GetUserSubscriptions*](#getusersubscriptions)
- [**Mutations**](#mutations)
  - [*CreateCognitiveArea*](#createcognitivearea)
  - [*UpdateSessionNotes*](#updatesessionnotes)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `cognition`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `cognition` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListExercisesForCognitiveArea
You can execute the `ListExercisesForCognitiveArea` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listExercisesForCognitiveArea(vars: ListExercisesForCognitiveAreaVariables): QueryPromise<ListExercisesForCognitiveAreaData, ListExercisesForCognitiveAreaVariables>;

interface ListExercisesForCognitiveAreaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListExercisesForCognitiveAreaVariables): QueryRef<ListExercisesForCognitiveAreaData, ListExercisesForCognitiveAreaVariables>;
}
export const listExercisesForCognitiveAreaRef: ListExercisesForCognitiveAreaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listExercisesForCognitiveArea(dc: DataConnect, vars: ListExercisesForCognitiveAreaVariables): QueryPromise<ListExercisesForCognitiveAreaData, ListExercisesForCognitiveAreaVariables>;

interface ListExercisesForCognitiveAreaRef {
  ...
  (dc: DataConnect, vars: ListExercisesForCognitiveAreaVariables): QueryRef<ListExercisesForCognitiveAreaData, ListExercisesForCognitiveAreaVariables>;
}
export const listExercisesForCognitiveAreaRef: ListExercisesForCognitiveAreaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listExercisesForCognitiveAreaRef:
```typescript
const name = listExercisesForCognitiveAreaRef.operationName;
console.log(name);
```

### Variables
The `ListExercisesForCognitiveArea` query requires an argument of type `ListExercisesForCognitiveAreaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListExercisesForCognitiveAreaVariables {
  cognitiveAreaId: UUIDString;
}
```
### Return Type
Recall that executing the `ListExercisesForCognitiveArea` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListExercisesForCognitiveAreaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListExercisesForCognitiveAreaData {
  exercises: ({
    id: UUIDString;
    name: string;
    difficultyLevel: string;
  } & Exercise_Key)[];
}
```
### Using `ListExercisesForCognitiveArea`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listExercisesForCognitiveArea, ListExercisesForCognitiveAreaVariables } from '@dataconnect/generated';

// The `ListExercisesForCognitiveArea` query requires an argument of type `ListExercisesForCognitiveAreaVariables`:
const listExercisesForCognitiveAreaVars: ListExercisesForCognitiveAreaVariables = {
  cognitiveAreaId: ..., 
};

// Call the `listExercisesForCognitiveArea()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listExercisesForCognitiveArea(listExercisesForCognitiveAreaVars);
// Variables can be defined inline as well.
const { data } = await listExercisesForCognitiveArea({ cognitiveAreaId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listExercisesForCognitiveArea(dataConnect, listExercisesForCognitiveAreaVars);

console.log(data.exercises);

// Or, you can use the `Promise` API.
listExercisesForCognitiveArea(listExercisesForCognitiveAreaVars).then((response) => {
  const data = response.data;
  console.log(data.exercises);
});
```

### Using `ListExercisesForCognitiveArea`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listExercisesForCognitiveAreaRef, ListExercisesForCognitiveAreaVariables } from '@dataconnect/generated';

// The `ListExercisesForCognitiveArea` query requires an argument of type `ListExercisesForCognitiveAreaVariables`:
const listExercisesForCognitiveAreaVars: ListExercisesForCognitiveAreaVariables = {
  cognitiveAreaId: ..., 
};

// Call the `listExercisesForCognitiveAreaRef()` function to get a reference to the query.
const ref = listExercisesForCognitiveAreaRef(listExercisesForCognitiveAreaVars);
// Variables can be defined inline as well.
const ref = listExercisesForCognitiveAreaRef({ cognitiveAreaId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listExercisesForCognitiveAreaRef(dataConnect, listExercisesForCognitiveAreaVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.exercises);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.exercises);
});
```

## GetUserSubscriptions
You can execute the `GetUserSubscriptions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserSubscriptions(vars: GetUserSubscriptionsVariables): QueryPromise<GetUserSubscriptionsData, GetUserSubscriptionsVariables>;

interface GetUserSubscriptionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserSubscriptionsVariables): QueryRef<GetUserSubscriptionsData, GetUserSubscriptionsVariables>;
}
export const getUserSubscriptionsRef: GetUserSubscriptionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserSubscriptions(dc: DataConnect, vars: GetUserSubscriptionsVariables): QueryPromise<GetUserSubscriptionsData, GetUserSubscriptionsVariables>;

interface GetUserSubscriptionsRef {
  ...
  (dc: DataConnect, vars: GetUserSubscriptionsVariables): QueryRef<GetUserSubscriptionsData, GetUserSubscriptionsVariables>;
}
export const getUserSubscriptionsRef: GetUserSubscriptionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserSubscriptionsRef:
```typescript
const name = getUserSubscriptionsRef.operationName;
console.log(name);
```

### Variables
The `GetUserSubscriptions` query requires an argument of type `GetUserSubscriptionsVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserSubscriptionsVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `GetUserSubscriptions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserSubscriptionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUserSubscriptions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserSubscriptions, GetUserSubscriptionsVariables } from '@dataconnect/generated';

// The `GetUserSubscriptions` query requires an argument of type `GetUserSubscriptionsVariables`:
const getUserSubscriptionsVars: GetUserSubscriptionsVariables = {
  userId: ..., 
};

// Call the `getUserSubscriptions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserSubscriptions(getUserSubscriptionsVars);
// Variables can be defined inline as well.
const { data } = await getUserSubscriptions({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserSubscriptions(dataConnect, getUserSubscriptionsVars);

console.log(data.userSubscriptions);

// Or, you can use the `Promise` API.
getUserSubscriptions(getUserSubscriptionsVars).then((response) => {
  const data = response.data;
  console.log(data.userSubscriptions);
});
```

### Using `GetUserSubscriptions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserSubscriptionsRef, GetUserSubscriptionsVariables } from '@dataconnect/generated';

// The `GetUserSubscriptions` query requires an argument of type `GetUserSubscriptionsVariables`:
const getUserSubscriptionsVars: GetUserSubscriptionsVariables = {
  userId: ..., 
};

// Call the `getUserSubscriptionsRef()` function to get a reference to the query.
const ref = getUserSubscriptionsRef(getUserSubscriptionsVars);
// Variables can be defined inline as well.
const ref = getUserSubscriptionsRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserSubscriptionsRef(dataConnect, getUserSubscriptionsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userSubscriptions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userSubscriptions);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `cognition` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateCognitiveArea
You can execute the `CreateCognitiveArea` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createCognitiveArea(vars: CreateCognitiveAreaVariables): MutationPromise<CreateCognitiveAreaData, CreateCognitiveAreaVariables>;

interface CreateCognitiveAreaRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCognitiveAreaVariables): MutationRef<CreateCognitiveAreaData, CreateCognitiveAreaVariables>;
}
export const createCognitiveAreaRef: CreateCognitiveAreaRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createCognitiveArea(dc: DataConnect, vars: CreateCognitiveAreaVariables): MutationPromise<CreateCognitiveAreaData, CreateCognitiveAreaVariables>;

interface CreateCognitiveAreaRef {
  ...
  (dc: DataConnect, vars: CreateCognitiveAreaVariables): MutationRef<CreateCognitiveAreaData, CreateCognitiveAreaVariables>;
}
export const createCognitiveAreaRef: CreateCognitiveAreaRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCognitiveAreaRef:
```typescript
const name = createCognitiveAreaRef.operationName;
console.log(name);
```

### Variables
The `CreateCognitiveArea` mutation requires an argument of type `CreateCognitiveAreaVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateCognitiveAreaVariables {
  description: string;
  iconUrl?: string | null;
  name: string;
}
```
### Return Type
Recall that executing the `CreateCognitiveArea` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCognitiveAreaData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCognitiveAreaData {
  cognitiveArea_insert: CognitiveArea_Key;
}
```
### Using `CreateCognitiveArea`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCognitiveArea, CreateCognitiveAreaVariables } from '@dataconnect/generated';

// The `CreateCognitiveArea` mutation requires an argument of type `CreateCognitiveAreaVariables`:
const createCognitiveAreaVars: CreateCognitiveAreaVariables = {
  description: ..., 
  iconUrl: ..., // optional
  name: ..., 
};

// Call the `createCognitiveArea()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCognitiveArea(createCognitiveAreaVars);
// Variables can be defined inline as well.
const { data } = await createCognitiveArea({ description: ..., iconUrl: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCognitiveArea(dataConnect, createCognitiveAreaVars);

console.log(data.cognitiveArea_insert);

// Or, you can use the `Promise` API.
createCognitiveArea(createCognitiveAreaVars).then((response) => {
  const data = response.data;
  console.log(data.cognitiveArea_insert);
});
```

### Using `CreateCognitiveArea`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCognitiveAreaRef, CreateCognitiveAreaVariables } from '@dataconnect/generated';

// The `CreateCognitiveArea` mutation requires an argument of type `CreateCognitiveAreaVariables`:
const createCognitiveAreaVars: CreateCognitiveAreaVariables = {
  description: ..., 
  iconUrl: ..., // optional
  name: ..., 
};

// Call the `createCognitiveAreaRef()` function to get a reference to the mutation.
const ref = createCognitiveAreaRef(createCognitiveAreaVars);
// Variables can be defined inline as well.
const ref = createCognitiveAreaRef({ description: ..., iconUrl: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCognitiveAreaRef(dataConnect, createCognitiveAreaVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.cognitiveArea_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.cognitiveArea_insert);
});
```

## UpdateSessionNotes
You can execute the `UpdateSessionNotes` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateSessionNotes(vars: UpdateSessionNotesVariables): MutationPromise<UpdateSessionNotesData, UpdateSessionNotesVariables>;

interface UpdateSessionNotesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateSessionNotesVariables): MutationRef<UpdateSessionNotesData, UpdateSessionNotesVariables>;
}
export const updateSessionNotesRef: UpdateSessionNotesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateSessionNotes(dc: DataConnect, vars: UpdateSessionNotesVariables): MutationPromise<UpdateSessionNotesData, UpdateSessionNotesVariables>;

interface UpdateSessionNotesRef {
  ...
  (dc: DataConnect, vars: UpdateSessionNotesVariables): MutationRef<UpdateSessionNotesData, UpdateSessionNotesVariables>;
}
export const updateSessionNotesRef: UpdateSessionNotesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateSessionNotesRef:
```typescript
const name = updateSessionNotesRef.operationName;
console.log(name);
```

### Variables
The `UpdateSessionNotes` mutation requires an argument of type `UpdateSessionNotesVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateSessionNotesVariables {
  id: UUIDString;
  notes?: string | null;
}
```
### Return Type
Recall that executing the `UpdateSessionNotes` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateSessionNotesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateSessionNotesData {
  session_update?: Session_Key | null;
}
```
### Using `UpdateSessionNotes`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateSessionNotes, UpdateSessionNotesVariables } from '@dataconnect/generated';

// The `UpdateSessionNotes` mutation requires an argument of type `UpdateSessionNotesVariables`:
const updateSessionNotesVars: UpdateSessionNotesVariables = {
  id: ..., 
  notes: ..., // optional
};

// Call the `updateSessionNotes()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateSessionNotes(updateSessionNotesVars);
// Variables can be defined inline as well.
const { data } = await updateSessionNotes({ id: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateSessionNotes(dataConnect, updateSessionNotesVars);

console.log(data.session_update);

// Or, you can use the `Promise` API.
updateSessionNotes(updateSessionNotesVars).then((response) => {
  const data = response.data;
  console.log(data.session_update);
});
```

### Using `UpdateSessionNotes`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateSessionNotesRef, UpdateSessionNotesVariables } from '@dataconnect/generated';

// The `UpdateSessionNotes` mutation requires an argument of type `UpdateSessionNotesVariables`:
const updateSessionNotesVars: UpdateSessionNotesVariables = {
  id: ..., 
  notes: ..., // optional
};

// Call the `updateSessionNotesRef()` function to get a reference to the mutation.
const ref = updateSessionNotesRef(updateSessionNotesVars);
// Variables can be defined inline as well.
const ref = updateSessionNotesRef({ id: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateSessionNotesRef(dataConnect, updateSessionNotesVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.session_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.session_update);
});
```

