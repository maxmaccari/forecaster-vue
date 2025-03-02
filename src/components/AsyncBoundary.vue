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

<script lang="ts" setup>
  import { ref, onErrorCaptured, type Ref } from 'vue'
  import ErrorPanel from './ErrorPanel.vue'
  import LoadingPanel from './LoadingPanel.vue'

  const error: Ref<Error | null> = ref(null)

  const tryAgain = () => {
    error.value = null
  }

  onErrorCaptured(err => {
    error.value = err

    return true
  })
</script>
