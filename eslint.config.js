import withNuxt from './.playground/.nuxt/eslint.config.mjs'

export default withNuxt(
    
).overrideRules({
    'vue/block-tag-newline': 'off',
    '@stylistic/semi': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@stylistic/comma-dangle': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
})
