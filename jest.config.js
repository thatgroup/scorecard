module.exports = {
  setupFilesAfterEnv: ["<rootDir>/test/mocks.ts", "<rootDir>/test/rtl.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
};
