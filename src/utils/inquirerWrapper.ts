import inquirer, { QuestionCollection } from 'inquirer'

export default async (questions: QuestionCollection) => inquirer
  .prompt(questions)
  .catch((error) => {
    if (error.isTtyError) {
      console.error(new Error('Unsupported Environment'))
    } else {
      console.error(error)
    }

    process.exit(1)
  })
