// eslint-disable-next-line no-undef
module.exports = {
    env: {
        node: true,
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:sonarjs/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        'eol-last': 2,
        'react/prop-types': 'off',
    },
};
