import { readFileSync } from 'fs'

import buildAssetsPath from './utils/buildAssetsPath.js'

const showProblem = (problem: string) => {
  const codePath: string = buildAssetsPath(
    `code/${problem.toLowerCase().replaceAll(' ', '-')}.cpp`,
  )
  const code: string = readFileSync(codePath, { encoding: 'utf-8' })

  console.log(code)
}

export default showProblem
