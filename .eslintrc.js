module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "parser": "babel-eslint",
  "extends": "plugin:react/recommended",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "react/prop-types": 0
  }
};
