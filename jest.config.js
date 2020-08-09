module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  moduleFileExtensions: [
    "ts",
    "js",
    "json",
    "node",
  ],
  collectCoverage: true,
  // testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)$",
  coverageDirectory: "coverage",
  testPathIgnorePatterns: [
    "node_modules",
    "vendor",
    "config"
  ],
  roots: ["test"],
  automock: false,
  setupFilesAfterEnv: ["./jest.setup.js"],
  verbose: true,
}
