module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['**/app/**/*.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text']
}
