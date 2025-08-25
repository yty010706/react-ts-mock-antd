import type { Config } from '@jest/types';
import fs from 'fs';
import path from 'path';

const setupTestsPath = fs.existsSync(
  path.resolve(__dirname, 'src/setupTests.ts')
)
  ? '<rootDir>/src/setupTests.ts'
  : '<rootDir>/src/setupTests.js';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [setupTestsPath],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    '!src/**/*.stories.tsx',
    '!src/*.d.ts',
    '!src/index.tsx',
    '!src/setupTests.ts',
  ],
};

export default config;
