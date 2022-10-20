const path = require('path')

const deleteGitBranch = require('./')

const projects = ['web-baclend', 'schedule-server']

const start = async () => {
  await projects.reduce(async (promise, project) => {
    await deleteGitBranch(path.resolve(__dirname, `../${project}`))
  }, Promise.resolve())
}

start()
