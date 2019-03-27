module.exports = {
  'extends': ['taro'],
  'rules': {
    'no-unused-vars': ['error', { 'varsIgnorePattern': 'Taro' }],
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx', '.tsx'] }],
    "indent": ["error", 2],
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-closing-bracket-location': ['warn', 'line-aligned'],
    'react/jsx-closing-tag-location': 'warn',
    'react/jsx-props-no-multi-spaces': ['warn'],
    'react/jsx-curly-spacing': ['error', 'never', { allowMultiline: true }],
    'react/jsx-max-props-per-line': ['error', { maximum: 1, when: 'multiline' }],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'no-trailing-spaces': ['error', {'skipBlankLines': false, 'ignoreComments': false}],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'spaced-comment': ['error', 'always', {
      'line': {
        'exceptions': ['-', '+'],
        'markers': ['=', '!'],
      },
      'block': {
        'exceptions': ['-', '+'],
        'markers': ['=', '!'],
        'balanced': true,
      }
    }],
    'space-unary-ops': "error",
    'object-curly-newline': ['warn', {
      'multiline': true,
      'consistent': true
    }],
    'object-property-newline': ["error", { "allowAllPropertiesOnSameLine": true }],
    'rest-spread-spacing': ["error", "never"],
    'object-curly-spacing': ['error', 'always'],
    'space-infix-ops': 'error',
    "template-curly-spacing": ["error", "never"],
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
    'no-multi-spaces': ['error'],
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    'space-before-blocks': ["error"],
    'padded-blocks': ['error', 'never'],
    'space-in-parens': ["error", "never"],
    'array-bracket-spacing': ["error", "never"],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always'
    }],
    'comma-dangle': 0,
    'comma-spacing': ["error", { "before": false, "after": true }],
    'operator-linebreak': ["error", "before"],
    'comma-style': ["error", "last"],
    'dot-location': ["error", "property"],
    'eol-last': ["error", "always"],
    'func-call-spacing': ["error", "never"],
    'key-spacing': ["error", { "afterColon": true }],
    'no-dupe-keys': "error",
    'no-whitespace-before-property': "error",
    'semi-spacing': ["error", { "before": false, "after": true }]
  },
  'parser': 'babel-eslint'
}
