module.exports = {
    env: {
        commonjs: true,
        es2020: true,
    },
    extends: ['airbnb', 'prettier'],
    plugins: ['prettier'],
    parserOptions: {
        ecmaVersion: 11,
    },
    rules: {
        'prettier/prettier': ['error'],
    },
};
