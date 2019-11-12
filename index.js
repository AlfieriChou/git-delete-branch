const shell = require('shelljs')
const _ = require('lodash')

const deleteGitBranch = (projectPath) => {
  shell.cd(projectPath)
  const branchArr = shell.exec('git branch -a').stdout.toString().split(/\s+/g)
  branchArr.pop()
  branchArr.shift()
  _.remove(branchArr, n => {
    return n === '*'
  })
  branchArr.reduce(async (promise, branch) => {
    await promise
    if (branch.match(/develop|master|plugin/)) {
      return
    }
    if (branch.match(/origin/)) {
      const originBranch = branch.split('remotes/')[1]
      shell.exec(`git branch -r -d ${originBranch}`)
      console.log('-----delete origin branch-----', originBranch)
      return
    }
    shell.exec(`git branch -D ${branch}`)
    console.log('-----delete branch-----', branch)
  }, Promise.resolve())
}

module.exports = deleteGitBranch
