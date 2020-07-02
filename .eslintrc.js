module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
      parser: "babel-eslint",
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
      "max-len": ["error", { "code": 120 }],
      "no-new": 0,
      "import/no-unresolved": "off",
      "import/extensions": "off",
      "no-return-assign": 0,
      "no-param-reassign": "off",
      "no-unused-vars": "off",
      "vue/no-unused-components": "off",
      "no-console": "off",
      "no-shadow": "off",
      "import/no-extraneous-dependencies": "off",
      "indent": ["error", 4],
      "import/prefer-default-export": "off"
  },
};
