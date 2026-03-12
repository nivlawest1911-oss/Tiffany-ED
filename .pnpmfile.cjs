/**
 * This hook forces pnpm to use specific versions for React and Next.js
 * to prevent version conflicts that cause SWC/webpack errors.
 */
function readPackage(pkg) {
  // Force all packages to use the same React version
  if (pkg.dependencies && pkg.dependencies.react) {
    pkg.dependencies.react = '19.1.0';
  }
  if (pkg.dependencies && pkg.dependencies['react-dom']) {
    pkg.dependencies['react-dom'] = '19.1.0';
  }
  if (pkg.dependencies && pkg.dependencies.next) {
    pkg.dependencies.next = '15.3.3';
  }
  
  // Also check peerDependencies
  if (pkg.peerDependencies && pkg.peerDependencies.react) {
    pkg.peerDependencies.react = '>=19.0.0';
  }
  if (pkg.peerDependencies && pkg.peerDependencies['react-dom']) {
    pkg.peerDependencies['react-dom'] = '>=19.0.0';
  }
  if (pkg.peerDependencies && pkg.peerDependencies.next) {
    pkg.peerDependencies.next = '>=15.0.0';
  }

  return pkg;
}

module.exports = {
  hooks: {
    readPackage
  }
};
