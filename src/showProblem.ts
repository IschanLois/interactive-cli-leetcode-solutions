import { execSync } from 'child_process'

import buildAssetsPath from './utils/buildAssetsPath.js'

const showProblem = (problem: string) => {
  const codePath: string = buildAssetsPath(
    `code/${problem.toLowerCase().replaceAll(' ', '-')}.cpp`,
  )

  execSync(`less ${codePath}`, { stdio: 'inherit' })
}

export default showProblem
