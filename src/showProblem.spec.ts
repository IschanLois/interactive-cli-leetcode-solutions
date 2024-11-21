import showProblem from './showProblem'
import buildAssetsPath from './utils/buildAssetsPath'

jest.mock('./utils/buildAssetsPath', () => jest.fn())

jest.mock('child_process', () => ({
  execSync: jest.fn().mockReturnValue(''),
}))

describe(('showProblem'), (): void => {
  it('should read the correct path of the file', (): void => {
    showProblem('problem 1')

    expect(buildAssetsPath).toHaveBeenCalledWith('code/problem-1.cpp')
  })
})
