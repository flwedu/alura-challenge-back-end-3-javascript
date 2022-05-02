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
    "@test/(.*)": "<rootDir>/test/$1",
  },
};
