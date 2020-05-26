const shell = require('shelljs')
const _ = require('lodash')

const deleteGitBranch = (projectPath) => {
  shell.cd(projectPath)
  const currentBranchInfo = shell.exec('git symbolic-ref --short -q HEAD')
  const currentBranch = currentBranchInfo.stdout.toString().replace(/\s+/g, '')
  if (!['master', 'develop'].includes(currentBranch)) {
    throw new Error('Current branch is not develop or master')
  }
  const branchArr = shell.exec('git branch -a').stdout.toString().split(/\s+/g)
  branchArr
    .filter(branch => !['*', '', '->'].includes(branch))
    .reduce(async (promise, branch) => {
      await promise
      if (branch.match(/develop|master|plugin|HEAD/)) {
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
