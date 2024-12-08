import { execSync } from 'child_process'
import { readFileSync } from 'fs'

import buildAssetsPath from './utils/buildAssetsPath.js'
import { Platform } from './types.js'

const showProblem = (problem: string) => {
  try {
    const codePath: string = buildAssetsPath(
      `code/${problem.toLowerCase().replaceAll(' ', '-')}.cpp`,
    )

    switch (process.platform) {
      case Platform.Windows:
        execSync(`more ${codePath}`, { stdio: 'inherit' })
        break
      case Platform.Mac:
      case Platform.Linux:
        execSync(`less ${codePath}`, { stdio: 'inherit' })
        break
      default:
        console.log(readFileSync(codePath, 'utf8'))
    }
  } catch (error) {
    console.log('There was an error with showing the problem', error)
  }
}

export default showProblem
