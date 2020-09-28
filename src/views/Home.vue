<template>
  <div class="flex items-center justify-center h-full home">
    <div class="w-full max-w-md px-2 py-3 sm:p-6 bg-gray-translucid">
      <img class="m-auto" src="@/assets/img/logo.svg" alt="Forecaster" />

      <hr class="w-full mt-4 border-gray-500 sm:mt-5" />

      <form
        @submit.prevent="goToForecast"
        class="flex w-full mt-4 sm:mt-5"
        data-test-id="locationForm"
      >
        <input
          type="text"
          class="flex-1 input"
          placeholder="Where are you now?"
          data-test-id="locationInput"
          v-model.trim="location"
        />
        <button
          type="submit"
          class="ml-2 btn"
          :disabled="isGoDisabled"
          data-test-id="goButton"
        >
          Go
        </button>
      </form>

      <hr class="w-full mt-4 border-gray-500 sm:mt-5" />
      <p class="mt-3 font-thin text-blue-900 sm:mt-4">
        Designed and developed by
        <a
          href="https://www.linkedin.com/in/maxmaccari/"
          class="link"
          target="_blank"
          >Maxsuel Maccari</a
        >. You can check all credits of used assets
        <router-link :to="{ name: 'Credits' }" class="link">here</router-link>.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

const Component = defineComponent({
  name: 'Home',
  components: {},
  data() {
    return {
      location: '',
    }
  },
  computed: {
    isGoDisabled(): boolean {
      return !this.location
    },
  },
  methods: {
    goToForecast() {
      this.$router.push({
        name: 'Forecast',
        params: { location: this.location.toLowerCase() },
      })
    },
  },
})

export default Component
</script>
