import type { Config } from '@jest/types';
import fs from 'fs';
import path from 'path';

// 检查 setupTests.ts 是否存在，如果不存在则使用 .js 版本
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
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/src/**/*.stories.tsx',
  ],
  collectCoverageFrom: [
    'src/components/**/*.{ts,tsx}',
    '!src/**/*.stories.tsx',
    '!src/*.d.ts',
    '!src/index.tsx',
    '!src/setupTests.ts',
  ],
};

export default config;
