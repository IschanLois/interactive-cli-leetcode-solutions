import problemPrompt from './problemPrompt'
import getProblems from './utils/getProblems'
import showProblem from './showProblem'
import inquirerWrapper from './utils/inquirerWrapper'

jest.mock('./utils/getProblems', () => jest.fn())

jest.mock('./showProblem', () => jest.fn())

jest.mock('./utils/inquirerWrapper', () => jest.fn())

describe('problemPrompt', () => {
  const getProblemsMock = getProblems as jest.Mock
  const inquirerWrapperMock = inquirerWrapper as jest.Mock
  const category: string = 'category'
  const problems: string[] = ['problem']

  afterEach((): void => {
    jest.resetAllMocks()
  })

  it('should pick the right problem', async (): Promise<void> => {
    getProblemsMock.mockReturnValue({ category: problems })
    inquirerWrapperMock.mockResolvedValueOnce({ category })
    inquirerWrapperMock.mockResolvedValueOnce({ problem: problems[0] })

    await problemPrompt()

    expect(showProblem).toHaveBeenCalledWith(problems[0])
  })

  it('should exit when "exit" is selected', async (): Promise<void> => {
    getProblemsMock.mockReturnValue({ category: [...problems, 'exit'] })
    inquirerWrapperMock.mockResolvedValueOnce({ category: 'exit' })

    await problemPrompt()

    expect(showProblem).not.toHaveBeenCalled()
  })

  it('should go back to recursively select problem when "back" is selected', async (): Promise<void> => {
    const consoleClearMock = jest.spyOn(console, 'clear').mockImplementation(() => {})
    getProblemsMock.mockReturnValue({ category: [...problems] })

    inquirerWrapperMock.mockResolvedValueOnce({ category })
    inquirerWrapperMock.mockResolvedValueOnce({ problem: 'back' })
    inquirerWrapperMock.mockResolvedValueOnce({ category })
    inquirerWrapperMock.mockResolvedValueOnce({ problem: problems[0] })

    await problemPrompt()

    expect(consoleClearMock).toHaveBeenCalledTimes(1)
    expect(showProblem).toHaveBeenCalledTimes(1)
    expect(showProblem).toHaveBeenCalledWith(problems[0])
  })
})
