import { jest } from '@jest/globals'
import printWelcome from '../src/printWelcome'

describe('printWelcome', (): void => {
  it('should print welcome message', (): void => {
    const message = `
  #######################################################################################################
  #                                                                                                     #
  #     Welcome! This is an interactive CLI where you can browse Leetcode solutions.                    #
  #                                                                                                     #
  #     Feel free to contribute at https://github.com/IschanLois/interactive-cli-leetcode-solutions     #
  #                                                                                                     #
  #######################################################################################################
`
    console.log = jest.fn()

    printWelcome()

    expect(console.log).toHaveBeenCalledWith(message)
  })
})
