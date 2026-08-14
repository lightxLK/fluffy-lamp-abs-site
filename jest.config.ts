import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  // Worktrees under .claude/worktrees/ are nested inside this repo but have
  // their own node_modules (their own React copy) — without this, Jest
  // picks up their tests too and cross-copy React hook calls fail. Matched
  // as a relative path segment (not via <rootDir>) because this project's
  // absolute path contains a literal "+" (…/website+/…), which is a regex
  // quantifier and silently fails to match if embedded in the pattern.
  testPathIgnorePatterns: ['/node_modules/', String.raw`[\\/]\.claude[\\/]worktrees[\\/]`],
};

export default createJestConfig(config);
