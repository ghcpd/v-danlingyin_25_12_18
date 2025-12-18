const fs = require('fs')
const path = require('path')

function exists(p) {
  return fs.existsSync(path.join(__dirname, p))
}

const report = {
  timestamp: new Date().toISOString(),
  checks: {},
  score: 0
}

// Basic checks
report.checks.package_json = exists('package.json')
report.checks.tsconfig = exists('tsconfig.json')
report.checks.tailwind = exists('tailwind.config.js')
report.checks.vite = exists('vite.config.ts')
report.checks.src = exists('src')

// Check tsconfig strict
try {
  const ts = JSON.parse(fs.readFileSync(path.join(__dirname, 'tsconfig.json'), 'utf8'))
  report.checks.tsconfig_strict = ts.compilerOptions && ts.compilerOptions.strict === true
} catch (e) {
  report.checks.tsconfig_strict = false
}

// Check package.json deps
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json')))
  const deps = Object.assign({}, pkg.dependencies, pkg.devDependencies)
  report.checks.has_react = !!deps['react']
  report.checks.has_router = !!deps['react-router-dom']
  report.checks.has_tailwind = !!deps['tailwindcss']
} catch (e) {
  report.checks.has_react = false
  report.checks.has_router = false
  report.checks.has_tailwind = false
}

// Check for key src files
const expected = [
  'src/App.tsx',
  'src/main.tsx',
  'src/index.css',
  'src/data/mockPodcasts.ts',
  'src/context/PlayerContext.tsx',
  'src/context/LibraryContext.tsx',
  'src/components/GlobalAudioPlayer.tsx'
]
report.checks.files = {}
expected.forEach(f => (report.checks.files[f] = exists(f)))

// Check for aria attributes in src
const srcFiles = fs.readdirSync(path.join(__dirname, 'src'), { withFileTypes: true })
let ariaCount = 0
function walk(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(d => {
    const full = path.join(dir, d.name)
    if (d.isDirectory()) return walk(full)
    if (d.name.endsWith('.tsx') || d.name.endsWith('.ts') || d.name.endsWith('.jsx')) {
      const content = fs.readFileSync(full, 'utf8')
      if (/aria-|role=/.test(content)) ariaCount++
    }
  })
}
walk(path.join(__dirname, 'src'))
report.checks.aria_count = ariaCount

// Basic scoring
let score = 0
if (report.checks.package_json) score += 10
if (report.checks.tsconfig) score += 10
if (report.checks.tsconfig_strict) score += 15
if (report.checks.tailwind) score += 10
if (report.checks.vite) score += 10
if (report.checks.has_react && report.checks.has_router) score += 15
if (ariaCount > 0) score += 10
report.score = score

// Write report
const out = path.join(__dirname, 'logs')
if (!fs.existsSync(out)) fs.mkdirSync(out)
fs.writeFileSync(path.join(out, 'validation_report.json'), JSON.stringify(report, null, 2))
fs.writeFileSync(path.join(out, 'validation_run.log'), `Validation run at ${new Date().toISOString()}\nScore: ${score}\n`)

console.log('Validation complete. Score:', score)
console.log('Report written to logs/validation_report.json')

if (score < 60) process.exitCode = 2
else process.exitCode = 0
