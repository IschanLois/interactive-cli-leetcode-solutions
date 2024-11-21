module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '(.+)\\.js': '$1',
  },
  testPathIgnorePatterns: ['./dist'],
}
