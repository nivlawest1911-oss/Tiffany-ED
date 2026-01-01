import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'cognition',
  service: 'studio-9997686479-ca258-service',
  location: 'us-east4'
};

export const createCognitiveAreaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCognitiveArea', inputVars);
}
createCognitiveAreaRef.operationName = 'CreateCognitiveArea';

export function createCognitiveArea(dcOrVars, vars) {
  return executeMutation(createCognitiveAreaRef(dcOrVars, vars));
}

export const listExercisesForCognitiveAreaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListExercisesForCognitiveArea', inputVars);
}
listExercisesForCognitiveAreaRef.operationName = 'ListExercisesForCognitiveArea';

export function listExercisesForCognitiveArea(dcOrVars, vars) {
  return executeQuery(listExercisesForCognitiveAreaRef(dcOrVars, vars));
}

export const updateSessionNotesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSessionNotes', inputVars);
}
updateSessionNotesRef.operationName = 'UpdateSessionNotes';

export function updateSessionNotes(dcOrVars, vars) {
  return executeMutation(updateSessionNotesRef(dcOrVars, vars));
}

export const getUserSubscriptionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserSubscriptions', inputVars);
}
getUserSubscriptionsRef.operationName = 'GetUserSubscriptions';

export function getUserSubscriptions(dcOrVars, vars) {
  return executeQuery(getUserSubscriptionsRef(dcOrVars, vars));
}

