import { jest } from '@jest/globals'
import inquirer from 'inquirer'

import solutionPrompt from './solutionPrompt'

describe('solutionPrompt', () => {
  let spy: jest.Spied<typeof inquirer.prompt>

  beforeEach((): void => {
    spy = jest.spyOn(inquirer, 'prompt')
  })

  it('should call the inquirer prompt', (): void => {
    spy.mockResolvedValue({})
    solutionPrompt()

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
    await solutionPrompt()

    expect(mockExit).toHaveBeenCalledWith(0)
  })
})