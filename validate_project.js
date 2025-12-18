const fs = require('fs')
const path = require('path')

function exists(p) { return fs.existsSync(path.resolve(p)) }

const report = { files: {}, issues: [] }

const expectedFiles = [
  'package.json','tsconfig.json','tailwind.config.js','vite.config.ts','index.html','src/App.tsx','src/main.tsx'
]

expectedFiles.forEach(f => report.files[f] = exists(f))

try {
  const pkg = JSON.parse(fs.readFileSync('package.json','utf-8'))
  report.nodeDeps = !!(pkg.dependencies && pkg.devDependencies)
} catch (e) { report.issues.push('package.json parse error') }

try {
  const ts = JSON.parse(fs.readFileSync('tsconfig.json','utf-8'))
  report.tsStrict = ts.compilerOptions && ts.compilerOptions.strict === true
  if (!report.tsStrict) report.issues.push('tsconfig strict mode disabled')
} catch (e) { report.issues.push('tsconfig.json parse error') }

// scan for any 'any' usage
const srcFiles = fs.readdirSync('src', { withFileTypes: true })
function walk(dir){
  const res = []
  for (const f of fs.readdirSync(dir)){
    const full = path.join(dir,f)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) res.push(...walk(full))
    else if (full.endsWith('.ts')||full.endsWith('.tsx')) res.push(full)
  }
  return res
}

const tsFiles = walk('src')
let anyCount = 0
for (const f of tsFiles){
  const txt = fs.readFileSync(f,'utf-8')
  const m = txt.match(/\bany\b/g)
  if (m) anyCount += m.length
  if (txt.includes('aria-')) report.files['has_aria'] = true
}
report.anyCount = anyCount

// tailwind usage
const css = fs.readFileSync('src/index.css','utf-8')
report.tailwindUsed = css.includes('@tailwind')

fs.mkdirSync('logs', { recursive: true })
fs.writeFileSync('logs/validation_run.log', JSON.stringify(report,null,2))
console.log('Validation complete. Report written to logs/validation_run.log')
module.exports = report
