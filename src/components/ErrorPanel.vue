<template>
  <div class="px-6 py-4 pt-2 text-primary min-w-64 max-w-md mx-8 sm:mx-0 bg-secondary/[0.8]">
    <h2 class="flex items-center mt-4 text-lg font-light text-primary text-justify">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        class="w-8 text-red-800"
      >
        <path
          fill-rule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
      <span class="ml-1 text-lg leading-6 font-normal">
        {{ title }}
      </span>
    </h2>
    <p class="mt-2 text-base leading-6 font-light">{{ message }}</p>
    <p class="mt-2 text-base leading-6 font-light" v-if="isTryAgain">
      <a class="link" @click="$emit('try-again')">Click here</a> to try again.
    </p>
    <p class="mt-2 text-base leading-6 font-light" v-else>
      <router-link :to="{ name: 'Home' }" class="link">Click here</router-link>
      to try again with another city.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

declare interface AppError {
  response: {
    status: number
  } | null
  message: string
}

export default defineComponent({
  name: 'ErrorPanel',
  props: {
    error: {
      type: [Object, String],
      required: true,
    },
  },
  computed: {
    title(): string {
      if (typeof this.error === 'object') {
        const error = this.error as AppError

        if (error.response?.status === 404) {
          return 'Not Found'
        } else if (error?.message === 'Failed to fetch') {
          return 'Network Error'
        }
      }

      return 'Something gone wrong'
    },
    message(): string {
      if (typeof this.error === 'string') {
        return this.error
      }

      const error = this.error as AppError

      if (error.response?.status === 404) {
        return 'Sorry, the asked city was not found.'
      } else if (error.message === 'Failed to fetch') {
        return 'Sorry, we was not able to perform the request.'
      }

      return error.message
    },
    isTryAgain(): boolean {
      const error = this.error as AppError

      return !error.response || error.response.status !== 404
    },
  },
})
</script>
