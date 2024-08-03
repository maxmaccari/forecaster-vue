<template>
  <div class="flex items-center justify-center h-full home">
    <div class="w-full max-w-md px-2 py-3 mx-4 sm:mx-0 sm:p-6 bg-secondary/[0.8]">
      <AppLogo class="m-auto" />

      <hr class="w-full mt-4 border-gray sm:mt-5" />

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

      <div v-if="isGeolocationEnabled" class="mt-8 w-full flex flex-col">
        <div class="self-center w-1/2 text-center text-gray-darker border-y border-gray py-1">
          Or
        </div>

        <button class="btn w-full mt-8 text-sm sm:text-base" 
          @click="goToForecastFromLocation" :disabled="fetchingLocation">
          

          <div v-if="fetchingLocation" class="flex items-center justify-center">
            Getting location... 
            <LoadingSpinner class="w-6 h-6 ml-2 opacity-50" />
          </div>
          <div class="flex items-center justify-center" v-else>
            <div class="relative inline-flex animate-pulse text-xl sm:2xl mr-1">⦿</div>
            Get Weather from My Location
          </div>
        </button>
      </div>

      <hr class="w-full mt-4 border-gray sm:mt-5" />
      <p class="mt-3 text-base leading-6 font-light text-primary sm:mt-4 text-justify">
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
import { defineComponent, ref, computed, onMounted } from 'vue'
import AppLogo from '@/assets/img/logo.svg?component'
import { clearCache } from '@/use/forecast'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useRouter } from 'vue-router'


const Component = defineComponent({
  name: 'HomePage',
  components: { AppLogo, LoadingSpinner },
  setup() {
    const location = ref('');
    const fetchingLocation = ref(false);
    const isGoDisabled = computed(() => !location.value);

    const isGeolocationEnabled = 'geolocation' in navigator;

    const router = useRouter();

    const goToForecast = () => {
      router.push({
        name: 'Forecast',
        params: { location: location.value.toLowerCase() },
      })
    }

    const goToForecastFromLocation = () => {
      fetchingLocation.value = true;

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const { latitude, longitude } = position.coords
          const location = `lat=${latitude}&lon=${longitude}`

          fetchingLocation.value = false;
          
          router.push({
            name: 'Forecast',
            params: { location },
          });
        });
      }
    }

    onMounted(() => {
      clearCache()
    })

    return {
      location, fetchingLocation, isGoDisabled, goToForecast, goToForecastFromLocation, isGeolocationEnabled
    }
  }
})

export default Component
</script>
