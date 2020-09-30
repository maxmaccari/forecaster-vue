module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  setupFiles: ['<rootDir>/tests/unit/setup.ts'],
  moduleNameMapper: {
    '^@unit(.*)$': '<rootDir>/tests/unit/$1',
  },
}
