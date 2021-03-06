module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)$",
  coverageDirectory: "coverage",
  testPathIgnorePatterns: ["node_modules", "vendor", "config"],
  roots: ["test"],
  automock: false,
  setupFilesAfterEnv: ["./jest.setup.js"],
  verbose: true,
};
