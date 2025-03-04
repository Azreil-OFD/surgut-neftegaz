import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@primevue/nuxt-module', 'nuxt-appwrite'],
  primevue: {
    options: {
        theme: {
            preset: Aura
        }
    }
  },
  appwrite: {
    project: "67c6bdf80002cd9baf1a",
    endpoint: "https://cloud.appwrite.io/v1"
  },
  css: ['primeicons/primeicons.css']

})