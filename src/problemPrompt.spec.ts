import { jest } from '@jest/globals'
import inquirer from 'inquirer'

import problemPrompt from './problemPrompt'

describe('problemPrompt', () => {
  let spy: jest.Spied<typeof inquirer.prompt>

  beforeEach((): void => {
    spy = jest.spyOn(inquirer, 'prompt')
  })

  afterEach((): void => {
    jest.resetAllMocks()
  })

  it('should call the inquirer prompt', (): void => {
    spy.mockResolvedValue({})
    problemPrompt()

    expect(inquirer.prompt).toHaveBeenCalledWith([{
      type: expect.any(String),
      name: expect.any(String),
      message: expect.any(String),
      choices: expect.any(Array<String>),
    }])
  })

  it('should exit the process when exit is chosen', async (): Promise<void> => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never)
    spy.mockResolvedValue({ category: 'exit' })
    await problemPrompt()

    expect(mockExit).toHaveBeenCalledWith(0)
  })

  it('should handle miscellaneous errors', async (): Promise<void> => {
    const consoleErrorMock = jest.spyOn(console, 'error')
    spy.mockRejectedValue(new Error())
    await problemPrompt()

    expect(consoleErrorMock).toHaveBeenCalled()
  })
})
