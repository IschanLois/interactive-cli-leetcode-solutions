import { readFileSync } from 'fs'

import buildAssetsPath from './buildAssetsPath.js'
import { Problems } from '../types'

export default (): Problems => {
  const categoriesFile: string = buildAssetsPath('categories.json')

  return JSON.parse(readFileSync(categoriesFile, { encoding: 'utf-8' })) as Problems
}
