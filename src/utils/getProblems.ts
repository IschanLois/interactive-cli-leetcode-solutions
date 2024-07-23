import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { join } from 'path'

import { Problems } from '../types'

export default (): Problems => {
  const categoriesFile: string = join(
    execSync('git rev-parse --show-toplevel', { encoding: 'utf8' }).trim(),
    '/assets/categories.json',
  )

  return JSON.parse(readFileSync(categoriesFile, { encoding: 'utf-8' })) as Problems
}
