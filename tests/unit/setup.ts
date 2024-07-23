import { config } from '@vue/test-utils'
import { h } from 'vue'

// For vscode runner
process.env.NODE_ENV = 'test'
process.env.VITE_APP_API_KEY = 'FAKE_API_KEY'
process.env.VITE_APP_API_URL = 'https://api-url.com'

config.global.stubs = ['v-icon', 'v-router-link']
config.global.components = {
  VIcon: (props, context) => h('svg', context.attrs),
  RouterLink: (props, context) => h('a', context.attrs, context.slots)
}