import inquirer from 'inquirer'

export default async (): Promise<void> => {
  await inquirer
    .prompt([
      {
        type: 'list',
        name: 'category',
        message: 'Select a category',
        choices: ['Tree', 'DFS', 'BFS', 'exit'],
      },
    ])
    .then(({ category }) => {
      if (category === 'exit') {
        process.exit(0)
      }

      // console.log('Solutions...')
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.error(new Error('Unsupported Environment'))
      } else {
        console.error(error)
      }
    })
}
