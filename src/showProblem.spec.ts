import { execSync } from 'child_process'
import { readFileSync } from 'fs'

import showProblem from './showProblem'
import buildAssetsPath from './utils/buildAssetsPath'
import { Platform } from './types'

jest.mock('./utils/buildAssetsPath', () => jest.fn())

jest.mock('child_process', () => ({
  execSync: jest.fn(),
}))

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}))

describe(('showProblem'), (): void => {
  let mockExecSync: jest.Mock
  let mockBuildAssetsPath: jest.Mock

  const originalPlatform = Object.getOwnPropertyDescriptor(process, 'platform')

  beforeEach((): void => {
    mockExecSync = execSync as jest.Mock
    mockBuildAssetsPath = buildAssetsPath as jest.Mock
  })

  afterEach((): void => {
    jest.resetAllMocks()
    Object.defineProperty(
      process,
      'platform',
      originalPlatform as PropertyDescriptor,
    )
  })

  it('should read the correct path of the file', (): void => {
    showProblem('problem 1')

    expect(buildAssetsPath).toHaveBeenCalledWith('code/problem-1.cpp')
  })

  it('should console log for non windows and unix-like platforms', (): void => {
    jest.spyOn(console, 'log').mockReturnValue(undefined)
    mockBuildAssetsPath.mockReturnValue('codePath');
    (readFileSync as jest.Mock).mockReturnValue('file content')

    Object.defineProperty(process, 'platform', {
      value: 'other',
    })

    showProblem('problem 1')
    expect(console.log).toHaveBeenCalledWith('file content')
  })

  it('should handle errors', (): void => {
    mockBuildAssetsPath.mockImplementation(() => {
      throw new Error('error')
    })

    jest.spyOn(console, 'log').mockReturnValue(undefined)

    showProblem('problem 1')

    expect(console.log).toHaveBeenCalledWith(
      'There was an error with showing the problem',
      new Error('error'),
    )
  })

  it.each([
    ['more', Platform.Windows],
    ['less', Platform.Linux],
  ])('should call %s for %s', (expectedCommand, platform): void => {
    mockBuildAssetsPath.mockReturnValue('codePath')

    Object.defineProperty(process, 'platform', {
      value: platform,
    })

    showProblem('problem 1')

    expect(mockExecSync.mock.calls[0][0]).toBe(`${expectedCommand} codePath`)
  })
})
