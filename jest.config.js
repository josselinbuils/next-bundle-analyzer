module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  coverageReporters: ['text'],
  roots: ['<rootDir>/src'],
  transform: {
    '.ts': 'ts-jest',
  },
};
