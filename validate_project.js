const fs = require('fs');
const { spawnSync } = require('child_process');

function exists(p) { try { return fs.existsSync(p); } catch { return false; } }

const report = { checks: [], ok: true };

const needed = [
  'package.json','tsconfig.json','tailwind.config.js','postcss.config.js','index.html',
  'src/main.tsx','src/App.tsx','src/index.css','src/types/index.ts','src/data/mockPodcasts.ts'
];

needed.forEach((p) => {
  const ok = exists(p);
  report.checks.push({ file: p, exists: ok });
  if (!ok) report.ok = false;
});

// basic package.json dependency check
let pkg = {};
try { pkg = JSON.parse(fs.readFileSync('package.json','utf8')); } catch (e) { report.checks.push({ pkg: 'invalid json' }); report.ok = false; }
if (pkg.dependencies && Object.keys(pkg.dependencies).length > 0) report.checks.push({ dependencies: Object.keys(pkg.dependencies) }); else { report.checks.push({ dependencies: 'missing' }); report.ok = false; }

// quick grep for aria labels
const files = fs.readdirSync('src', { withFileTypes: true }).filter(f => f.isDirectory()).map(d => d.name);
let ariaFound = false;
function grep(dir) {
  const items = fs.readdirSync(dir);
  for (const it of items) {
    const p = dir + '/' + it;
    const stat = fs.statSync(p);
    if (stat.isDirectory()) grep(p);
    else if (p.endsWith('.tsx') || p.endsWith('.ts') || p.endsWith('.css') || p.endsWith('.html')) {
      const txt = fs.readFileSync(p,'utf8');
      if (txt.includes('aria-') || txt.includes('role=') ) ariaFound = true;
    }
  }
}
grep('src');
report.checks.push({ accessibility_attributes_present: ariaFound });
if (!ariaFound) report.ok = false;

// tsc check (if available)
let tsc = spawnSync('npx', ['-y','tsc','--noEmit'], { encoding: 'utf8' });
report.tsc = { status: tsc.status, stdout: tsc.stdout ? String(tsc.stdout).slice(0,200) : '', stderr: tsc.stderr ? String(tsc.stderr).slice(0,200) : '' };
if (tsc.status !== 0) { report.checks.push({ tsc: 'failed or not available' }); }

// try build (pnpm or npm)
let build = spawnSync('pnpm', ['build'], { encoding: 'utf8' });
if (build.status !== 0) build = spawnSync('npm', ['run','build'], { encoding: 'utf8' });
report.build = { status: build.status, stdout: build.stdout ? String(build.stdout).slice(0,200) : '', stderr: build.stderr ? String(build.stderr).slice(0,200) : '' };
if (build.status !== 0) report.checks.push({ build: 'failed or package manager not available' });

fs.writeFileSync('logs/validation_report.json', JSON.stringify(report, null, 2));
console.log('Validation report written to logs/validation_report.json');
if (!report.ok) process.exitCode = 2; else process.exitCode = 0;
