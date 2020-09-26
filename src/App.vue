<template>
  <div class="background">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style scoped>
.background {
  background-image: url('./assets/img/morning_photo.jpg');
  @apply bg-cover w-full h-screen;
}
</style>
