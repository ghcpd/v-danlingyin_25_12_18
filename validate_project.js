const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;

function checkFileExists(filePath) {
  return fs.existsSync(path.join(projectRoot, filePath));
}

function checkPackageJson() {
  if (!checkFileExists('package.json')) return false;

  const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));

  const requiredDeps = ['react', 'react-dom', 'react-router-dom', 'lucide-react'];
  const requiredDevDeps = ['typescript', 'tailwindcss', 'vite', '@vitejs/plugin-react'];

  const hasDeps = requiredDeps.every(dep => packageJson.dependencies && packageJson.dependencies[dep]);
  const hasDevDeps = requiredDevDeps.every(dep => packageJson.devDependencies && packageJson.devDependencies[dep]);

  return hasDeps && hasDevDeps;
}

function checkTypeScriptFiles() {
  const tsFiles = [
    'src/types/index.ts',
    'src/components/Header.tsx',
    'src/pages/HomePage.tsx',
    'src/App.tsx'
  ];

  return tsFiles.every(file => checkFileExists(file));
}

function checkTailwindUsage() {
  const files = [
    'src/index.css',
    'tailwind.config.js'
  ];

  return files.every(file => checkFileExists(file));
}

function checkAccessibility() {
  // Simple check for aria-labels in components
  const componentFiles = fs.readdirSync(path.join(projectRoot, 'src/components'))
    .filter(file => file.endsWith('.tsx'));

  let hasAriaLabels = false;
  for (const file of componentFiles) {
    const content = fs.readFileSync(path.join(projectRoot, 'src/components', file), 'utf8');
    if (content.includes('aria-label')) {
      hasAriaLabels = true;
      break;
    }
  }

  return hasAriaLabels;
}

function generateReport() {
  const report = {
    timestamp: new Date().toISOString(),
    checks: {
      packageJson: checkPackageJson(),
      tsconfig: checkFileExists('tsconfig.json'),
      tailwindConfig: checkFileExists('tailwind.config.js'),
      viteConfig: checkFileExists('vite.config.ts'),
      indexHtml: checkFileExists('index.html'),
      srcStructure: checkFileExists('src/App.tsx') && checkFileExists('src/main.tsx'),
      components: fs.existsSync(path.join(projectRoot, 'src/components')),
      pages: fs.existsSync(path.join(projectRoot, 'src/pages')),
      types: checkTypeScriptFiles(),
      tailwindUsage: checkTailwindUsage(),
      accessibility: checkAccessibility()
    },
    score: 0
  };

  const totalChecks = Object.keys(report.checks).length;
  const passedChecks = Object.values(report.checks).filter(Boolean).length;
  report.score = Math.round((passedChecks / totalChecks) * 100);

  return report;
}

console.log('Project Validation Report');
console.log('========================');
const report = generateReport();
console.log(JSON.stringify(report, null, 2));
console.log(`\nOverall Score: ${report.score}/100`);

if (report.score >= 80) {
  console.log('✅ Project validation PASSED');
  process.exit(0);
} else {
  console.log('❌ Project validation FAILED');
  process.exit(1);
}