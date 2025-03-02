<template>
  <VPanel class="min-w-80 max-w-4xl sm:p-4 md:p-6 md:m-4 lg:m-0" bg-color="bg-secondary">
    <VCol class="sm:flex-row">
      <router-link :to="{ name: 'Forecast', params: { location } }" class="sm:mt-2">
        <CircleLeftIcon class="w-8 fill-primary/75 stroke-primary/75 hover:fill-primary  hover:stroke-primary " />
      </router-link>
      
      <VCol class="flex-grow mt-4 sm:mt-0 sm:ml-2">
        <ForecastHeader
          :weather="weather"
          :date="formatedDate"
        />
        
        <div class="flex flex-col sm:flex-row sm:justify-between flex-wrap">
          <div class="text-3xl sm:text-5xl leading-none font-normal mb-4">
            {{ forecast.name }}
          </div>
  
          <div class="mt-4 sm:mt-0 flex flex-col sm:flex-row">
            <div class="flex flex-col items-center border-t sm:border-t-0 sm:border-r border-gray border-dotted sm:border-solid pt-2 sm:pt-0 sm:pr-2 sm:mr-2">
              <div class="flex">
                <WindIcon />
                <div class="ml-2 font-bold">Wind Direction</div>
              </div>

              <div class="mt-2 flex text-primary/75 self-center items-baseline">
                <div class="ml-2 sm:-mt-2 border-primary/25 text-2xl antialiased leading-none tracking-tighter	" :style="'rotate: ' + (weather.wind.direction - 90) + 'deg'">
                  ➣
                </div>
                <div class="ml-2"> {{ weather.wind.speed }} km/h </div>
              </div>
            </div>

            <div class="flex flex-col items-center border-t sm:border-t-0 sm:border-r border-gray border-dotted sm:border-solid mt-2 pt-2 sm:mt-0 sm:pt-0 sm:pr-2 sm:mr-2">
              <div class="flex">
                <HumidityIcon />
                <div class="ml-2 font-bold">Humidity</div>
              </div>

              <div class="mt-2 text-primary/75 text-center">{{ weather.humidity }}%</div>
            </div>

            <div class="flex flex-col items-center border-t border-b sm:border-0 border-gray border-dotted my-2 py-2 sm:m-0 sm:p-0">
              <div class="flex">
                <MeterIcon />
                <div class="ml-2 font-bold">Pressure</div>
              </div>
              <div class="mt-2 text-primary/75 text-center">{{ weather.pressure }} bar</div>
            </div>
          </div>
        </div>

      </VCol>
    </VCol>

    <div class="my-4 sm:mt-8">
      <div class="text-lg leading-6 font-normal">Next Hours Forecast</div>

      <div
        class="mt-2 sm:mt-10 grid gap-4 sm:grid-flow-col sm:grid-rows-4"
      >
        <ForecastDetailsPanelTimeWeather
          v-for="detail in details"
          :key="detail.timestamp"
          :detail="detail"
        />
      </div>
    </div>
  </VPanel>
</template>

<script lang="ts" setup>
import ForecastHeader from './ForecastHeader.vue'
import ForecastDetailsPanelTimeWeather from './ForecastDetailsPanelTimeWeather.vue'
import CircleLeftIcon from '@/assets/icons/circle-left.svg?component'
import WindIcon from '@/assets/icons/wind.svg?component'
import HumidityIcon from '@/assets/icons/humidity.svg?component'
import MeterIcon from '@/assets/icons/meter.svg?component'
import VPanel from './VPanel.vue'
import VCol from './VCol.vue'

import {computed} from 'vue';
import { Forecast } from '@/use/forecast'
import { getDetailsNextHours, dateFormat, getDetailsWeather } from '@/utils/forecast'

  const props = defineProps({
    forecast: {
      type: Forecast,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  })

  const date =  new Date(`${props.date}T00:00:00`);
  const weather = getDetailsWeather(props.forecast, date);
  const details = getDetailsNextHours(props.forecast, date);

  const formatedDate = computed(() => 
    dateFormat.format(date)
  );
</script>