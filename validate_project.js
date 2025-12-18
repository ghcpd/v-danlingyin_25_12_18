import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const REQUIRED_FILES = [
  // Configuration
  'package.json',
  'tsconfig.json',
  'tailwind.config.js',
  'vite.config.ts',
  'postcss.config.js',
  'index.html',

  // Source files - Components
  'src/components/Header.tsx',
  'src/components/Hero.tsx',
  'src/components/PodcastCard.tsx',
  'src/components/EpisodeItem.tsx',
  'src/components/GlobalAudioPlayer.tsx',
  'src/components/ProgressBar.tsx',
  'src/components/VolumeControl.tsx',
  'src/components/SearchBar.tsx',
  'src/components/FilterPanel.tsx',
  'src/components/CategoryPill.tsx',
  'src/components/EmptyState.tsx',
  'src/components/PodcastHeader.tsx',

  // Source files - Pages
  'src/pages/HomePage.tsx',
  'src/pages/PodcastDetailPage.tsx',
  'src/pages/SearchPage.tsx',
  'src/pages/LibraryPage.tsx',
  'src/pages/CategoryPage.tsx',

  // Source files - Hooks
  'src/hooks/useLocalStorage.ts',
  'src/hooks/useDebounce.ts',
  'src/hooks/useAudioPlayer.ts',

  // Source files - Context
  'src/context/PlayerContext.tsx',
  'src/context/LibraryContext.tsx',

  // Source files - Utils
  'src/utils/formatDuration.ts',
  'src/utils/formatDate.ts',
  'src/types/index.ts',
  'src/data/mockPodcasts.ts',

  // Entry files
  'src/App.tsx',
  'src/main.tsx',
  'src/index.css',
];

interface ValidationReport {
  timestamp: string;
  total_required_files: number;
  files_found: number;
  files_missing: string[];
  typescript_valid: boolean;
  tailwind_configured: boolean;
  package_json_dependencies: {
    react: boolean;
    typescript: boolean;
    tailwindcss: boolean;
    vite: boolean;
  };
  score: number;
}

function validateProject(): ValidationReport {
  const report: ValidationReport = {
    timestamp: new Date().toISOString(),
    total_required_files: REQUIRED_FILES.length,
    files_found: 0,
    files_missing: [],
    typescript_valid: false,
    tailwind_configured: false,
    package_json_dependencies: {
      react: false,
      typescript: false,
      tailwindcss: false,
      vite: false,
    },
    score: 0,
  };

  console.log('🔍 Starting project validation...\n');

  // Check files
  console.log('📁 Checking required files...');
  REQUIRED_FILES.forEach((file) => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      report.files_found++;
    } else {
      report.files_missing.push(file);
      console.log(`   ❌ Missing: ${file}`);
    }
  });

  console.log(
    `   ✅ Found ${report.files_found}/${report.total_required_files} files\n`
  );

  // Check package.json
  console.log('📦 Checking package.json dependencies...');
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

    report.package_json_dependencies.react = !!deps['react'];
    report.package_json_dependencies.typescript = !!deps['typescript'];
    report.package_json_dependencies.tailwindcss = !!deps['tailwindcss'];
    report.package_json_dependencies.vite = !!deps['vite'];

    console.log(
      `   ✅ React: ${report.package_json_dependencies.react ? '✓' : '✗'}`
    );
    console.log(
      `   ✅ TypeScript: ${report.package_json_dependencies.typescript ? '✓' : '✗'}`
    );
    console.log(
      `   ✅ Tailwind: ${report.package_json_dependencies.tailwindcss ? '✓' : '✗'}`
    );
    console.log(`   ✅ Vite: ${report.package_json_dependencies.vite ? '✓' : '✗'}\n`);
  }

  // Check TypeScript config
  console.log('✅ Checking TypeScript configuration...');
  const tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
  if (fs.existsSync(tsconfigPath)) {
    const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));
    report.typescript_valid = tsconfig.compilerOptions?.strict === true;
    console.log(
      `   ✅ Strict Mode: ${report.typescript_valid ? '✓' : '✗'}\n`
    );
  }

  // Check Tailwind config
  console.log('🎨 Checking Tailwind configuration...');
  const tailwindPath = path.join(process.cwd(), 'tailwind.config.js');
  if (fs.existsSync(tailwindPath)) {
    report.tailwind_configured = true;
    console.log(`   ✅ Tailwind configured: ✓\n`);
  }

  // Calculate score
  const fileScore = (report.files_found / report.total_required_files) * 40;
  const depsScore =
    Object.values(report.package_json_dependencies).filter(Boolean).length *
    10;
  const tsScore = report.typescript_valid ? 20 : 0;
  const tailwindScore = report.tailwind_configured ? 10 : 0;

  report.score = Math.round(fileScore + depsScore + tsScore + tailwindScore);

  // Generate report
  console.log('📊 Validation Report');
  console.log('═'.repeat(50));
  console.log(`Total Required Files: ${report.total_required_files}`);
  console.log(`Files Found: ${report.files_found}`);
  console.log(`Files Missing: ${report.files_missing.length}`);
  console.log(`TypeScript Valid: ${report.typescript_valid ? 'Yes' : 'No'}`);
  console.log(`Tailwind Configured: ${report.tailwind_configured ? 'Yes' : 'No'}`);
  console.log(`Overall Score: ${report.score}/100`);
  console.log('═'.repeat(50));

  return report;
}

// Run validation
const report = validateProject();

// Create logs directory if it doesn't exist
if (!fs.existsSync(path.join(process.cwd(), 'logs'))) {
  fs.mkdirSync(path.join(process.cwd(), 'logs'));
}

// Save report
const logPath = path.join(process.cwd(), 'logs', 'validation_run.log');
fs.writeFileSync(logPath, JSON.stringify(report, null, 2));
console.log(`\n✅ Validation report saved to logs/validation_run.log`);

// Exit with appropriate code
process.exit(report.score >= 80 ? 0 : 1);
