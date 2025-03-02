<template>
  <VPanel class="max-w-md">
    <template #title>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-8 mr-2"
      >
        <path
          fill-rule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>

      {{ title }}
    </template>

    <VParagraph class="mt-2 text-justify">{{ message }}</VParagraph>
    <VParagraph class="mt-2 text-justify" v-if="isTryAgain">
      <a class="link" @click="$emit('try-again')">Click here</a> to try again.
    </VParagraph>
    <VParagraph class="mt-2 text-justify" v-else>
      <router-link :to="{ name: 'Home' }" class="link">Click here</router-link>
      to try again with another city.
    </VParagraph>
  </VPanel>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import VPanel from './VPanel.vue'
import VParagraph from './VParagraph.vue';

declare interface AppError {
  response: {
    status: number
  } | null
  message: string
}

const props = defineProps({
  error: {
    type: [Object, String],
    required: true,
  }
})

const title = computed(() => {
  if (typeof props.error === 'object') {
    const error = props.error as AppError

    if (error.response?.status === 404) {
      return 'Not Found'
    } else if (error?.message === 'Failed to fetch') {
      return 'Network Error'
    }
  }

  return 'Something gone wrong'
})

const message = computed(() => {
  if (typeof props.error === 'string') {
      return props.error
    }

    const error = props.error as AppError

    if (error.response?.status === 404) {
      return 'Sorry, the asked city was not found.'
    } else if (error.message === 'Failed to fetch') {
      return 'Sorry, we was not able to perform the request.'
    }

    return error.message
})

const isTryAgain = computed(() => {
  const error = props.error as AppError

  return !error.response || error.response.status !== 404
});
</script>
