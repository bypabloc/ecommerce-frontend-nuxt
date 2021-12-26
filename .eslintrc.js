module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {
        parser: '@babel/eslint-parser',
        requireConfigFile: false,
    },
    extends: [
        '@nuxtjs',
        'plugin:nuxt/recommended'
    ],
    plugins: [
    ],
    ignorePatterns: ['jsconfig.json', '**/vendor/*.js'],
    // add your custom rules here
    rules: {
        'no-console': 'off',
        indent: ['error', 4, {
            SwitchCase: 1,
        }],
        'vue/html-indent': ['error', 4, {
            attribute: 1,
            baseIndent: 1,
            closeBracket: 0,
            alignAttributesVertically: true,
            ignores: [],
        }],
        'comma-dangle': ['error', {
            arrays: 'never',
            objects: 'always',
            imports: 'never',
            exports: 'never',
            functions: 'never',
        }],
        'padded-blocks': ['error', 'never'],
    },
}
