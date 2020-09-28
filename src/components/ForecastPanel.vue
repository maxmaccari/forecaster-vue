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
        <div class="flex mt-1">
          <div></div>
          <div class="flex flex-col text-xs">
            <span>
              Scattered Clouds
            </span>
            <span>
              Flees like: 36º
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

<style scoped></style>
