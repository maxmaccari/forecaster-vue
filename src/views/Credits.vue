<template>
  <div class="flex items-center justify-center h-full home">
    <div class="bg-secondary/75 max-w-md px-2 py-3 mx-4 sm:mx-0">
      <h2 class="text-3xl font-bold text-center text-primary">Credits</h2>

      <hr class="w-full mt-1 border-gray" />

      <!-- eslint-disable -->
      <p class="mt-4 text-primary">
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
      </p>

      <p class="mt-3 text-primary">
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
      </p>
      <!-- eslint-enable -->

      <hr class="w-full mt-4 border-gray" />

      <router-link
        :to="{ name: 'Home' }"
        class="block w-full mt-4 text-center btn"
        >Back</router-link
      >
    </div>
  </div>
</template>
