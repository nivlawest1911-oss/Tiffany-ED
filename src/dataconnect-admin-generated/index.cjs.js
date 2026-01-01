const { validateAdminArgs } = require('firebase-admin/data-connect');

const connectorConfig = {
  connector: 'cognition',
  serviceId: 'studio-9997686479-ca258-service',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

function createCognitiveArea(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('CreateCognitiveArea', inputVars, inputOpts);
}
exports.createCognitiveArea = createCognitiveArea;

function listExercisesForCognitiveArea(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('ListExercisesForCognitiveArea', inputVars, inputOpts);
}
exports.listExercisesForCognitiveArea = listExercisesForCognitiveArea;

function updateSessionNotes(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeMutation('UpdateSessionNotes', inputVars, inputOpts);
}
exports.updateSessionNotes = updateSessionNotes;

function getUserSubscriptions(dcOrVarsOrOptions, varsOrOptions, options) {
  const { dc: dcInstance, vars: inputVars, options: inputOpts} = validateAdminArgs(connectorConfig, dcOrVarsOrOptions, varsOrOptions, options, true, true);
  dcInstance.useGen(true);
  return dcInstance.executeQuery('GetUserSubscriptions', inputVars, inputOpts);
}
exports.getUserSubscriptions = getUserSubscriptions;

