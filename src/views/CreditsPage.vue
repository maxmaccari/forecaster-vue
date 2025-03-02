<template>
  <VPanel class="max-w-md">
    <template #title>Credits</template>

    <VParagraph class="mt-4">
      Icons taken from
      <a href="https://www.flaticon.com/" target="blank" class="link">www.flaticon.com</a>
      made by:
      <a
        href="https://www.flaticon.com/free-icon/wind_615486?term=wind&page=1&position=50"
        target="blank"
        class="link"
      >Freeplk</a>,
      <a
        href="https://www.flaticon.com/free-icon/humidity_1163648?term=humidity&page=1&position=43"
        target="blank"
        class="link"
      >Iconixar</a>,
      <a
        href="https://www.flaticon.com/free-icon/meter_1085657?term=pressure&page=1&position=13"
        target="blank"
        class="link"
      >Goodware</a> and
      <a
        href="https://www.flaticon.com/packs/weather-forecast"
        target="blank"
        class="link"
      >Linector</a>.
    </VParagraph>

    <VParagraph class="mt-3">
      Photos taken from
      <a href="https://unsplash.com/" target="_blank" class="link">unsplash.com</a> by:
      <a
        href="https://unsplash.com/photos/W5MhJ6cy1So"
        target="blank"
        class="link"
      >@davidmarcu</a>,
      <a
        href="https://unsplash.com/photos/Lagi4DWvXpc"
        target="blank"
        class="link"
      >@niklas_wersinger</a>,
      <a
        href="https://unsplash.com/photos/trvELSvNZoY"
        target="blank"
        class="link"
      >@ivans_in_danger</a>,
      <a
        href="https://unsplash.com/photos/QdwR5aRGkbs"
        target="blank"
        class="link"
      >@jfelise</a>,
      <a
        href="https://unsplash.com/photos/VWxiaKn-lVc"
        target="blank"
        class="link"
      >@tadej</a> and
      <a
        href="https://unsplash.com/photos/TvCRYXwKhfQ"
        target="blank"
        class="link"
      >@renancaraujo</a>.
    </VParagraph>

    <VSeparator class="mt-4" />

    <router-link
      :to="{ name: 'Home' }"
      class="block w-full mt-4 text-center btn"
      >Back</router-link
    >
  </VPanel>
</template>

<script class="ts" setup>
import VPanel from '@/components/VPanel.vue';
import VParagraph from '@/components/VParagraph.vue';
import VSeparator from '@/components/VSeparator.vue';
</script>