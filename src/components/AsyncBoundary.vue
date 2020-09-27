<template>
  <ErrorPanel :error="error" v-if="error" @try-again="tryAgain" />
  <Suspense v-else>
    <template #default>
      <slot />
    </template>
    <template #fallback>
      <LoadingPanel />
    </template>
  </Suspense>
</template>

<script>
import { ref, onErrorCaptured } from 'vue'
import ErrorPanel from './ErrorPanel'
import LoadingPanel from './LoadingPanel'

export default {
  name: 'AsyncBoundary',
  components: { LoadingPanel, ErrorPanel },
  setup() {
    const error = ref(null)

    const tryAgain = () => {
      error.value = null
    }

    onErrorCaptured(err => {
      error.value = err

      return true
    })

    return { error, tryAgain }
  },
}
</script>
