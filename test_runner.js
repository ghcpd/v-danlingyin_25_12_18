const { spawnSync } = require('child_process');
const fs = require('fs');

console.log('Running validation...');
let v = spawnSync('node', ['validate_project.js'], { encoding: 'utf8' });
fs.appendFileSync('logs/validation_run.log', `\n[${new Date().toISOString()}] validate_project exit ${v.status}\n`);
console.log(v.stdout || v.stderr);

console.log('Attempting build (may fail if pnpm not installed)...');
let b = spawnSync('pnpm', ['build'], { encoding: 'utf8' });
if (b.status !== 0) b = spawnSync('npm', ['run','build'], { encoding: 'utf8' });
fs.appendFileSync('logs/validation_run.log', `\n[${new Date().toISOString()}] build exit ${b.status}\n`);
console.log(b.stdout ? b.stdout.slice(0,200) : b.stderr.slice(0,200));

const report = {
  timestamp: new Date().toISOString(),
  validationExit: v.status,
  buildExit: b.status
};
fs.writeFileSync('logs/test_run_report.json', JSON.stringify(report, null, 2));
console.log('Test run complete. Report written to logs/test_run_report.json');
