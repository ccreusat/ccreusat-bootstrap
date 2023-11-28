const semver = require("semver");
const { exec } = require("shelljs");

function generateChangelog() {
  exec("conventional-changelog -p angular -i CHANGELOG.md -s");
}

function bumpVersion(version) {
  const newVersion = semver.inc(version, "patch");
  exec(`npm version ${newVersion}`);
  return newVersion;
}

function createRelease(version) {
  exec(`git tag v${version}`);
  exec("git push origin main --tags");
}

function main() {
  // Vérifiez les commits et génère le changelog
  generateChangelog();

  // Obtenez la version actuelle
  const currentVersion = require("./package.json").version;

  // Augmentez la version (peut être modifiée en fonction de vos besoins)
  const newVersion = bumpVersion(currentVersion);

  // Créez une release avec le nouveau tag
  createRelease(newVersion);

  console.log(`Release ${newVersion} créée avec succès!`);
}

main();
