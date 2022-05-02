/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const { resolve } = require("path");
const root = resolve(__dirname);
module.exports = {
  rootDir: root,
  displayName: "src-tests",
  testMatch: ["<rootDir>/src/**/*.spec.ts"],
  testEnvironment: "node",
  clearMocks: true,
  preset: "ts-jest",
  moduleNameMapper: {
    "@src/(.*)": "<rootDir>/src/$1",
    "@tests/(.*)": "<rootDir>/tests/$1",
    "@useCases/(.*)": ["<rootDir>/src/application/useCases/$1"],
    "@domain/(.*)": ["<rootDir>/src/application/domain/$1"],
    "@repositories/(.*)": ["<rootDir>/src/output/repositories"],
  },
};
