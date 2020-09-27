<template>
  <ErrorPanel :error="error" v-if="error" />
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

    onErrorCaptured(err => {
      error.value = err

      return true
    })

    return { error }
  },
}
</script>
