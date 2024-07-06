import inquirer from 'inquirer'

import printWelcome from './utils/printWelcome.js'

printWelcome()

inquirer
  .prompt([
    {
      type: 'list',
      name: 'foo',
      message: 'hi there',
      choices: ['taena ka', 'bubu'],
    },
  ])
  .then((answers) => {
    console.log(answers.foo)
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  })
