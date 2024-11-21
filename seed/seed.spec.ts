import { jest } from '@jest/globals'
import { Dirent } from 'fs'
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
    const readdirMock = jest.spyOn(fs, 'readdir')
    const readFileMock = jest.spyOn(fs, 'readFile')
    const writeFileMock = jest.spyOn(fs, 'writeFile')

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

    readdirMock.mockResolvedValue(['file1.json', 'file2.json', 'file3.json'] as unknown as Dirent[])

    readFileMock.mockResolvedValueOnce(JSON.stringify(metadata[0]))
    readFileMock.mockResolvedValueOnce(JSON.stringify(metadata[1]))
    readFileMock.mockResolvedValueOnce(JSON.stringify(metadata[2]))

    writeFileMock.mockResolvedValue(undefined)

    await seed()

    expect(readFileMock).toHaveBeenCalledTimes(3)
    expect(writeFileMock.mock.calls[0][1]).toBe(JSON.stringify(expectedResult, undefined, 2))
  })

  it('should handle errors', async (): Promise<void> => {
    const consoleErrorMock = jest.spyOn(console, 'error')
    const readdirMock = jest.spyOn(fs, 'readdir')

    readdirMock.mockRejectedValue(new Error('Failed to read directory'))

    await seed()

    expect(consoleErrorMock).toHaveBeenCalled()
  })
})
