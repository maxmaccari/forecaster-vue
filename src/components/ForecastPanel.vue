<template>
  <div class="w-full max-w-4xl p-2 text-indigo-900 bg-gray-100">
    <div class="flex">
      <span class="text-6xl leading-none align-text-top">
        37º
      </span>
      <div class="flex flex-col mt-1 ml-4 text-indigo-800">
        <div>
          Monday 28
        </div>
        <div class="flex items-center mt-1">
          <div>
            <VIcon file="021-cloud" class="w-8" />
          </div>
          <div class="flex flex-col ml-2 text-xs">
            <span>
              Scattered Clouds
            </span>
            <span>
              Fees like: 36º
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col mt-1">
      <div><span class="font-light">Min</span>: 37º</div>
      <div><span class="font-light">Max</span>: 37º</div>
    </div>

    <div class="text-3xl">
      Cuiabá
    </div>

    <router-link class="change-btn" :to="{ name: 'Home' }">
      <v-icon file="pencil-icon" class="inline-block w-4 fill-current" />
      <span>Change City</span>
    </router-link>

    <div class="mt-1 text-sm text-gray-400">
      Data fecthed from OpenWeather® API
    </div>

    <div class="mt-2">
      <div>Next 24 hours summary</div>

      <div class="flex flex-wrap">
        <div class="flex w-1/2 mt-2">
          <div><v-icon file="021-cloud" class="w-8" /></div>
          <div class="ml-2">
            <div class="text-3xl font-bold leading-none">37º</div>
            <div class="text-lg font-light">5:00 PM</div>
            <div class="text-sm text-gray-600">47% cloudness</div>
          </div>
        </div>
        <div class="flex w-1/2 mt-2">
          <div><v-icon file="021-night" class="w-8" /></div>
          <div class="ml-2">
            <div class="text-3xl font-bold leading-none">27º</div>
            <div class="text-lg font-light">11:00 PM</div>
            <div class="text-sm text-gray-600">3% cloudness</div>
          </div>
        </div>
        <div class="flex w-1/2 mt-4">
          <div><v-icon file="021-night" class="w-8" /></div>
          <div class="ml-2">
            <div class="text-3xl font-bold leading-none">23º</div>
            <div class="text-lg font-light">5:00 AM</div>
            <div class="text-sm text-gray-600">4% cloudness</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ForecastPanel',
  props: {
    forecast: {
      type: Object,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
})
</script>

<style scoped>
.change-btn {
  @apply flex items-center justify-center py-1 text-sm text-center text-indigo-900 bg-gray-400;

  &:hover {
    @apply bg-gray-300;
  }
}
</style>
