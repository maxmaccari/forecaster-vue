import { config } from '@vue/test-utils'

// For vscode runner
process.env.NODE_ENV='test'
process.env.VUE_APP_API_KEY='FAKE_API_KEY'
process.env.VUE_APP_API_URL='https://api-url.com'

config.global.stubs = ['v-icon']