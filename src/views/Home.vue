<template>
  <div class="flex items-center justify-center h-full home">
    <div class="px-2 py-3 sm:p-6 w-450 bg-gray-translucid">
      <img class="m-auto" src="@/assets/img/logo.svg" alt="Forecaster" />

      <hr class="w-full mt-4 border-gray-500 sm:mt-5" />

      <div class="flex w-full mt-4 sm:mt-5">
        <input
          type="text"
          class="flex-1 input"
          placeholder="Where are you now?"
        />
        <button class="btn" disabled>
          Go
        </button>
      </div>

      <hr class="w-full mt-4 border-gray-500 sm:mt-5" />
      <p class="mt-3 font-thin text-blue-900 sm:mt-4">
        Designed and developed by <a href="#" class="link">Maxsuel Maccari</a>.
        You can check all credits of used assets
        <a href="#" class="link">here</a>.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
  components: {},
})
</script>
