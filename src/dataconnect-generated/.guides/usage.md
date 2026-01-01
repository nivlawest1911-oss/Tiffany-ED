# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createCognitiveArea, listExercisesForCognitiveArea, updateSessionNotes, getUserSubscriptions } from '@dataconnect/generated';


// Operation CreateCognitiveArea:  For variables, look at type CreateCognitiveAreaVars in ../index.d.ts
const { data } = await CreateCognitiveArea(dataConnect, createCognitiveAreaVars);

// Operation ListExercisesForCognitiveArea:  For variables, look at type ListExercisesForCognitiveAreaVars in ../index.d.ts
const { data } = await ListExercisesForCognitiveArea(dataConnect, listExercisesForCognitiveAreaVars);

// Operation UpdateSessionNotes:  For variables, look at type UpdateSessionNotesVars in ../index.d.ts
const { data } = await UpdateSessionNotes(dataConnect, updateSessionNotesVars);

// Operation GetUserSubscriptions:  For variables, look at type GetUserSubscriptionsVars in ../index.d.ts
const { data } = await GetUserSubscriptions(dataConnect, getUserSubscriptionsVars);


```