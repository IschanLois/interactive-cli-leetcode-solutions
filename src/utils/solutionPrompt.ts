import inquirer from 'inquirer'

export default (): void => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'category',
        message: 'Select a category',
        choices: ['Tree', 'DFS', 'BFS'],
      },
    ])
    .then(() => {
      console.log('Solutions...')
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.error(new Error('Unsupported Environment'))
      } else {
        console.error(error)
      }
    })
}
