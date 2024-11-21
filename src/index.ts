import inquirerWrapper from './utils/inquirerWrapper.js'
import printWelcome from './printWelcome.js'
import problemPrompt from './problemPrompt.js'

(async () => {
  process.on('exit', () => console.log('Bye!'))
  printWelcome()

  try {
    const { action } = await inquirerWrapper([
      {
        type: 'list',
        name: 'action',
        message: 'What do you want to do?',
        choices: ['continue', 'exit'],
      },
    ])

    if (action === 'exit') {
      process.exit(0)
    }

    console.clear()
    await problemPrompt()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
