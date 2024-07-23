import inquirer from 'inquirer'

import getProblems from './utils/getProblems.js'
import { Problems } from './types.js'

export default async (): Promise<void> => {
  const problems: Problems = getProblems()

  await inquirer
    .prompt([
      {
        type: 'list',
        name: 'category',
        message: 'Select a category',
        choices: Object.keys(problems),
      },
    ])
    .then(({ category }) => {
      if (category === 'exit') {
        process.exit(0)
      }

      console.log(category)
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.error(new Error('Unsupported Environment'))
      } else {
        console.error(error)
      }
    })
}
