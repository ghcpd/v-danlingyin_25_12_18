const { exec } = require('child_process')
const fs = require('fs')

function run(cmd) {
  return new Promise((res) => {
    exec(cmd, { cwd: __dirname }, (err, stdout, stderr) => {
      res({ err, stdout, stderr })
    })
  })
}

async function main() {
  const out = []
  console.log('Running validation...')
  const val = await run('node validate_project.js')
  out.push({ step: 'validation', code: val.err ? 1 : 0, stdout: val.stdout, stderr: val.stderr })

  console.log('Attempting build (this may fail if pnpm is not available)')
  const build = await run('pnpm build')
  out.push({ step: 'build', code: build.err ? 1 : 0, stdout: build.stdout, stderr: build.stderr })

  const logPath = __dirname + '/logs/validation_run.log'
  fs.appendFileSync(logPath, JSON.stringify(out, null, 2) + '\n')

  const success = out.every(o => o.code === 0)
  console.log('Test runner finished. Success:', success)
}

main()
