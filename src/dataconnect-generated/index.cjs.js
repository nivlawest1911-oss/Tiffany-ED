const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'cognition',
  service: 'studio-9997686479-ca258-service',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createCognitiveAreaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCognitiveArea', inputVars);
}
createCognitiveAreaRef.operationName = 'CreateCognitiveArea';
exports.createCognitiveAreaRef = createCognitiveAreaRef;

exports.createCognitiveArea = function createCognitiveArea(dcOrVars, vars) {
  return executeMutation(createCognitiveAreaRef(dcOrVars, vars));
};

const listExercisesForCognitiveAreaRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListExercisesForCognitiveArea', inputVars);
}
listExercisesForCognitiveAreaRef.operationName = 'ListExercisesForCognitiveArea';
exports.listExercisesForCognitiveAreaRef = listExercisesForCognitiveAreaRef;

exports.listExercisesForCognitiveArea = function listExercisesForCognitiveArea(dcOrVars, vars) {
  return executeQuery(listExercisesForCognitiveAreaRef(dcOrVars, vars));
};

const updateSessionNotesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateSessionNotes', inputVars);
}
updateSessionNotesRef.operationName = 'UpdateSessionNotes';
exports.updateSessionNotesRef = updateSessionNotesRef;

exports.updateSessionNotes = function updateSessionNotes(dcOrVars, vars) {
  return executeMutation(updateSessionNotesRef(dcOrVars, vars));
};

const getUserSubscriptionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserSubscriptions', inputVars);
}
getUserSubscriptionsRef.operationName = 'GetUserSubscriptions';
exports.getUserSubscriptionsRef = getUserSubscriptionsRef;

exports.getUserSubscriptions = function getUserSubscriptions(dcOrVars, vars) {
  return executeQuery(getUserSubscriptionsRef(dcOrVars, vars));
};
