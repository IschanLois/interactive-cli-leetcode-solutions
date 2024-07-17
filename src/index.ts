import inquirer from 'inquirer'

import printWelcome from './printWelcome.js'
import solutionPrompt from './solutionPrompt.js'

printWelcome()

process.on('exit', () => console.log('Bye!'))

inquirer
  .prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What do you want to do?',
      choices: ['continue', 'exit'],
    },
  ])
  .then(async ({ action }) => {
    if (action === 'exit') {
      return
    }

    console.clear()
    await solutionPrompt()
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error(new Error('Unsupported Environment'))
    } else {
      console.error(error)
    }
  })
