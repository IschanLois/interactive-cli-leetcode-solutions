import inquirerWrapper from './utils/inquirerWrapper.js'
import getProblems from './utils/getProblems.js'
import { Problems } from './types.js'

export default async (): Promise<void> => {
  const problems: Problems = getProblems()

  const { category } = await inquirerWrapper([
    {
      type: 'list',
      name: 'category',
      message: 'Select a category',
      choices: Object.keys(problems),
    },
  ])

  if (category === 'exit') {
    process.exit(0)
  }
}
