// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    './assets/css/main.css'
  ],
  modules: [
    "@nuxt/ui"
  ],
  eslint: {
    config: {
      stylistic: {
        semi: false,
        indent: 2
      }
    }
  }
})
