import inquirer from 'inquirer'

import printWelcome from './utils/printWelcome.js'
import solutionPrompt from './utils/solutionPrompt.js'

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
  .then(({ action }) => {
    if (action === 'exit') {
      return
    }

    console.clear()
    solutionPrompt()
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error(new Error('Unsupported Environment'))
    } else {
      console.error(error)
    }
  })
