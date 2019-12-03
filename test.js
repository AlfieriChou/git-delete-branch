const path = require('path')
const fs = require('fs')
const deleteGitBranch = require('./')

const dirs = fs.readdirSync(path.resolve(__dirname, '../'))
dirs.reduce(async (promise, dir) => {
  await promise
  if (dir.startsWith('.')) {
    return
  }
  try {
    deleteGitBranch(path.resolve(__dirname, `../${dir}`))
  } catch (err) {
    console.log('----->', err.message)
  }
}, Promise.resolve())
