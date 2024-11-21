import { jest } from '@jest/globals'
import * as fs from 'fs/promises'

import { Metadata } from './types'
import seed from './seed'

jest.mock('fs/promises', () => ({
  readdir: jest.fn(),
  readFile: jest.fn(),
  writeFile: jest.fn(),
}))

describe.only('seed', (): void => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should group the files according to topics in categories.json', async (): Promise<void> => {
    const readdirMock = fs.readdir as jest.Mock
    const readFileMock = fs.readFile as jest.Mock
    const writeFileMock = fs.writeFile as jest.Mock

    const metadata: Metadata[] = [
      {
        title: 'Problem 1',
        topics: [
          'Topic 1',
          'Topic 2',
        ],
      },
      {
        title: 'Problem 2',
        topics: [
          'Topic 2',
          'Topic 3',
          'Topic 4',
        ],
      },
      {
        title: 'Problem 3',
        topics: [
          'Topic 3',
          'Topic 5',
        ],
      },
    ]

    const expectedResult: Record<string, string[]> = {
      'Topic 1': ['Problem 1'],
      'Topic 2': ['Problem 1', 'Problem 2'],
      'Topic 3': ['Problem 2', 'Problem 3'],
      'Topic 4': ['Problem 2'],
      'Topic 5': ['Problem 3'],
    }

    readdirMock.mockResolvedValue(['file1.json', 'file2.json', 'file3.json'] as never)

    readFileMock.mockResolvedValueOnce(JSON.stringify(metadata[0]) as never)
    readFileMock.mockResolvedValueOnce(JSON.stringify(metadata[1]) as never)
    readFileMock.mockResolvedValueOnce(JSON.stringify(metadata[2]) as never)

    writeFileMock.mockResolvedValue(undefined as never)

    await seed()

    expect(readFileMock).toHaveBeenCalledTimes(3)
    expect(writeFileMock.mock.calls[0][1]).toBe(JSON.stringify(expectedResult, undefined, 2))
  })

  it('should handle errors', async (): Promise<void> => {
    const consoleErrorMock = jest.spyOn(console, 'error')
    const readdirMock = jest.spyOn(fs, 'readdir')

    readdirMock.mockRejectedValue(new Error('Failed to read directory'))
    consoleErrorMock.mockImplementation(() => ({}))

    await seed()

    expect(consoleErrorMock).toHaveBeenCalledWith(new Error('Failed to read directory'))
  })
})
