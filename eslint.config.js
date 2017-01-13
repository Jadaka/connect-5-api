module.exports = {
  "extends": "airbnb-base",
  "rules": {
    "key-spacing": ["error", {
      "align": "colon"
    }],
    "no-multi-spaces": ["error", {
      "exceptions": {
        "VariableDeclarator": true
      }
    }],
    "no-trailing-spaces": ["error", { 
      "skipBlankLines": true 
    }],
    "space-before-function-paren": ["error", "never"],
    "import/prefer-default-export": "off",
    "no-console": "off",
    "new-cap": "off",
    "quote-props": "off",
    "no-param-reassign": "off",
    "consistent-return": "off",
    "arrow-body-style": "off",
    "object-shorthand": "off",
    "func-names": "off",
    "no-plusplus": "off"
  }
}
