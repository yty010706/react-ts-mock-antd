import type { Config } from '@jest/types';
import path from 'path';

const config: Config.InitialOptions = {
  rootDir: path.resolve(__dirname),
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setUpTests.ts'],
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
