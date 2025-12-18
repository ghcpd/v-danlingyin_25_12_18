const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;

function fileExists(rel) {
  return fs.existsSync(path.join(projectRoot, rel));
}

function checkProjectSetup() {
  const packageJson = fileExists('package.json');
  const tsconfig = fileExists('tsconfig.json');
  const tailwind = fileExists('tailwind.config.js');
  const vite = fileExists('vite.config.ts');

  let dependenciesComplete = false;
  if (packageJson) {
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf-8'));
      dependenciesComplete = pkg.dependencies && Object.keys(pkg.dependencies).length > 0;
    } catch (e) {}
  }

  return { packageJson, tsconfig, tailwind, vite, dependenciesComplete };
}

function checkFolderStructure() {
  const hasComponents = fileExists('src/components');
  const hasPages = fileExists('src/pages');
  const hasTypes = fileExists('src/types');
  const hasUtils = fileExists('src/utils');
  const hasData = fileExists('src/data');
  const hasHooks = fileExists('src/hooks');
  const hasContext = fileExists('src/context');
  return { hasComponents, hasPages, hasTypes, hasUtils, hasData, hasHooks, hasContext };
}

function checkTsStrict() {
  try {
    const tsconfig = JSON.parse(fs.readFileSync(path.join(projectRoot, 'tsconfig.json'), 'utf-8'));
    return !!(tsconfig.compilerOptions && tsconfig.compilerOptions.strict === true);
  } catch (e) { return false; }
}

function checkNoAnyTypes() {
  const srcFiles = getFilesRecursively(path.join(projectRoot, 'src')).filter((f) => f.endsWith('.ts') || f.endsWith('.tsx'));
  for (const file of srcFiles) {
    const contents = fs.readFileSync(file, 'utf-8');
    if (/\bany\b/.test(contents)) return false;
  }
  return true;
}

function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) results = results.concat(getFilesRecursively(filePath));
    else results.push(filePath);
  });
  return results;
}

function checkFilesExported() {
  const requiredFiles = [
    'src/pages/HomePage.tsx',
    'src/pages/PodcastDetailPage.tsx',
    'src/pages/SearchPage.tsx',
    'src/pages/LibraryPage.tsx',
    'src/pages/CategoryPage.tsx',
    'src/components/GlobalAudioPlayer.tsx',
    'src/components/PodcastCard.tsx',
    'src/components/PodcastHeader.tsx',
    'src/components/EpisodeItem.tsx'
  ];

  const missing = requiredFiles.filter((f) => !fileExists(f));
  return { requiredFiles, missing };
}

function main() {
  const results = {
    project_setup: checkProjectSetup(),
    folder_structure: checkFolderStructure(),
    ts_strict: checkTsStrict(),
    no_any_types: checkNoAnyTypes(),
    required_files: checkFilesExported(),
  };

  const reportPath = path.join(projectRoot, 'validation_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log('Validation complete. Report saved to validation_report.json');
}

main();
