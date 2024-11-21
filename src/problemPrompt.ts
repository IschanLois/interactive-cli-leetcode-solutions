import { Problems } from './types.js'
import showProblem from './showProblem.js'
import inquirerWrapper from './utils/inquirerWrapper.js'
import getProblems from './utils/getProblems.js'

const problemPrompt = async (): Promise<void> => {
  const problems: Problems = getProblems()

  const { category } = await inquirerWrapper([
    {
      type: 'list',
      name: 'category',
      message: 'Select a category',
      choices: [...Object.keys(problems), 'exit'],
    },
  ])

  if (category === 'exit') {
    return
  }

  const { problem } = await inquirerWrapper([
    {
      type: 'list',
      name: 'problem',
      message: 'Select a problem',
      choices: [...problems[category], 'back'],
    },
  ])

  if (problem !== 'back') {
    showProblem(problem)
  }

  console.clear()
  await problemPrompt()
}

export default problemPrompt
