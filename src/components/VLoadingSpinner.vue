<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
  >
    <rect x="17.5" y="30" width="15" height="40" fill="#212b5a">
      <animate
        attributeName="y"
        repeatCount="indefinite"
        dur="1s"
        calcMode="spline"
        keyTimes="0;0.5;1"
        values="18;30;30"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.2s"
      ></animate>
      <animate
        attributeName="height"
        repeatCount="indefinite"
        dur="1s"
        calcMode="spline"
        keyTimes="0;0.5;1"
        values="64;40;40"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.2s"
      ></animate>
    </rect>
    <rect x="42.5" y="30" width="15" height="40" fill="#212b5a">
      <animate
        attributeName="y"
        repeatCount="indefinite"
        dur="1s"
        calcMode="spline"
        keyTimes="0;0.5;1"
        values="20.999999999999996;30;30"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.1s"
      ></animate>
      <animate
        attributeName="height"
        repeatCount="indefinite"
        dur="1s"
        calcMode="spline"
        keyTimes="0;0.5;1"
        values="58.00000000000001;40;40"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
        begin="-0.1s"
      ></animate>
    </rect>
    <rect x="67.5" y="30" width="15" height="40" fill="#212b5a">
      <animate
        attributeName="y"
        repeatCount="indefinite"
        dur="1s"
        calcMode="spline"
        keyTimes="0;0.5;1"
        values="20.999999999999996;30;30"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
      ></animate>
      <animate
        attributeName="height"
        repeatCount="indefinite"
        dur="1s"
        calcMode="spline"
        keyTimes="0;0.5;1"
        values="58.00000000000001;40;40"
        keySplines="0 0.5 0.5 1;0 0.5 0.5 1"
      ></animate>
    </rect>
  </svg>
</template>

<script lang="ts" setup>
defineOptions({ functional: true })
</script>