// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  debug: process.env.NODE_ENV !== 'production',
  sourcemap: process.env.NODE_ENV !== 'production',
  css: [
    './assets/css/main.css'
  ],
  modules: ["@nuxt/ui", "@vueuse/nuxt", '@nuxt/eslint'],
  eslint: {
    config: {
      stylistic: {
        semi: false,
        indent: 2
      }
    }
  }
})