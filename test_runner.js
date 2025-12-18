import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

interface TestResult {
  name: string;
  passed: boolean;
  duration: number;
  error?: string;
}

interface FullReport {
  timestamp: string;
  tests: TestResult[];
  overall_passed: boolean;
  total_duration: number;
  score: number;
  details: {
    validation_score: number;
    build_successful: boolean;
    typescript_compilation: boolean;
    all_files_present: boolean;
  };
}

async function runTests(): Promise<FullReport> {
  const report: FullReport = {
    timestamp: new Date().toISOString(),
    tests: [],
    overall_passed: false,
    total_duration: 0,
    score: 0,
    details: {
      validation_score: 0,
      build_successful: false,
      typescript_compilation: false,
      all_files_present: false,
    },
  };

  console.log('🚀 Starting comprehensive test suite...\n');

  // Test 1: File Validation
  console.log('Test 1: File Validation');
  const fileStartTime = Date.now();
  try {
    execSync('node validate_project.js', { stdio: 'pipe' });
    const duration = Date.now() - fileStartTime;
    report.tests.push({
      name: 'File Validation',
      passed: true,
      duration,
    });
    report.details.all_files_present = true;
    report.details.validation_score = 85;
    console.log('   ✅ Passed\n');
  } catch (error) {
    const duration = Date.now() - fileStartTime;
    report.tests.push({
      name: 'File Validation',
      passed: false,
      duration,
      error: String(error),
    });
    console.log('   ❌ Failed\n');
  }

  // Test 2: TypeScript Compilation
  console.log('Test 2: TypeScript Compilation');
  const tsStartTime = Date.now();
  try {
    execSync('npx tsc --noEmit', { stdio: 'pipe' });
    const duration = Date.now() - tsStartTime;
    report.tests.push({
      name: 'TypeScript Compilation',
      passed: true,
      duration,
    });
    report.details.typescript_compilation = true;
    console.log('   ✅ Passed\n');
  } catch (error) {
    const duration = Date.now() - tsStartTime;
    report.tests.push({
      name: 'TypeScript Compilation',
      passed: false,
      duration,
      error: String(error),
    });
    console.log('   ❌ Failed\n');
  }

  // Test 3: Build Test
  console.log('Test 3: Build Test');
  const buildStartTime = Date.now();
  try {
    console.log('   Building project (this may take a minute)...');
    execSync('pnpm build', { stdio: 'pipe' });
    const duration = Date.now() - buildStartTime;
    report.tests.push({
      name: 'Build Test',
      passed: true,
      duration,
    });
    report.details.build_successful = true;
    console.log('   ✅ Passed\n');
  } catch (error) {
    const duration = Date.now() - buildStartTime;
    report.tests.push({
      name: 'Build Test',
      passed: false,
      duration,
      error: String(error),
    });
    console.log('   ❌ Failed\n');
  }

  // Calculate results
  report.total_duration = report.tests.reduce((sum, test) => sum + test.duration, 0);
  const passedTests = report.tests.filter((t) => t.passed).length;
  report.overall_passed = passedTests === report.tests.length;

  // Calculate final score
  let scoreBreakdown = 0;
  if (report.details.all_files_present) scoreBreakdown += 30;
  if (report.details.typescript_compilation) scoreBreakdown += 30;
  if (report.details.build_successful) scoreBreakdown += 30;
  scoreBreakdown += Math.floor((passedTests / report.tests.length) * 10);
  report.score = Math.min(100, scoreBreakdown);

  // Print summary
  console.log('\n📊 Test Suite Summary');
  console.log('═'.repeat(50));
  console.log(`Total Tests: ${report.tests.length}`);
  console.log(`Passed: ${passedTests}`);
  console.log(`Failed: ${report.tests.length - passedTests}`);
  console.log(`Total Duration: ${(report.total_duration / 1000).toFixed(2)}s`);
  console.log(`Overall Score: ${report.score}/100`);
  console.log(`Status: ${report.overall_passed ? '✅ PASS' : '❌ FAIL'}`);
  console.log('═'.repeat(50));

  return report;
}

// Run tests
runTests()
  .then((report) => {
    // Save report
    if (!fs.existsSync(path.join(process.cwd(), 'logs'))) {
      fs.mkdirSync(path.join(process.cwd(), 'logs'));
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const logPath = path.join(
      process.cwd(),
      'logs',
      `test_run_${timestamp}.json`
    );
    fs.writeFileSync(logPath, JSON.stringify(report, null, 2));
    console.log(`\n✅ Test report saved to logs/test_run_${timestamp}.json`);

    process.exit(report.overall_passed ? 0 : 1);
  })
  .catch((error) => {
    console.error('Fatal error running tests:', error);
    process.exit(1);
  });
