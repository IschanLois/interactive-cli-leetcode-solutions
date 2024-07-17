import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "ts-jest/presets/default-esm",
  transform: {
   "^.+\\.[tj]sx?$": ["ts-jest", { useESM: true }],
  },
  testPathIgnorePatterns: ["./dist"]
};

export default config;
