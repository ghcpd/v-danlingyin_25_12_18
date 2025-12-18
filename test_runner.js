const { spawnSync } = require('child_process')
const fs = require('fs')

console.log('Running validation...')
const res = spawnSync('node', ['validate_project.js'], { stdio: 'inherit' })

console.log('Running TypeScript check (tsc --noEmit)')
const tsc = spawnSync('npx', ['tsc', '--noEmit'], { stdio: 'inherit' })

console.log('Attempting build (pnpm build)')
const build = spawnSync('pnpm', ['build'], { stdio: 'inherit' })

const report = {
  validation: res.status === 0,
  tsc: tsc.status === 0,
  build: build.status === 0
}
fs.mkdirSync('logs', { recursive: true })
fs.writeFileSync('logs/validation_run.log', JSON.stringify(report,null,2))
console.log('Test run complete. Report:', report)
