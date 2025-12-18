const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

function run(cmd, description) {
  try {
    console.log(`Running: ${description}`);
    const out = execSync(cmd, { stdio: 'pipe' });
    fs.writeFileSync(path.join(logDir, `${description.replace(/ /g, '_')}.log`), out);
    return true;
  } catch (e) {
    fs.writeFileSync(path.join(logDir, `${description.replace(/ /g, '_')}.log`), e.stdout || e.message);
    console.error(`Failed: ${description}`);
    return false;
  }
}

let allPass = true;

// Run validation script
allPass = run('node validate_project.js', 'validate_project') && allPass;

// Run build via pnpm
if (execSync('which pnpm || echo false').toString().trim() !== 'false') {
  allPass = run('pnpm build', 'pnpm_build') && allPass;
} else {
  console.warn('pnpm not found; skipping build');
}

// Run TypeScript compiler check (noEmit)
allPass = run('npx tsc --noEmit', 'tsc_noemit') && allPass;

fs.writeFileSync(path.join(logDir, 'test_runner_summary.log'), allPass ? 'All tests passed' : 'Some tests failed');
process.exit(allPass ? 0 : 1);
