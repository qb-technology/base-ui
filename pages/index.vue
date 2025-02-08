<script setup lang='ts'>
import {
  createYearRange
} from 'reka-ui/date'
import { CalendarDate, type DateValue } from '@internationalized/date'

const hour_val = ref(1)
watch(hour_val, () => {
  console.log(hour_val.value);
})

const startEndYear = computed(() => {
  const cur_year = new Date().getFullYear()
  return [cur_year, cur_year - 60]
})
</script>

<template>
  <div>
    <BaseDarkMode />
    <div class="flex items-center">
      <IosPicker
        label="Years"
        :start="startEndYear[1]"
        :end="startEndYear[0]"
        :loop="true"
      />
      <IosPicker
        label="Mins"
        :end="60"
        perspective="right"
        :loop="true"
      />
    </div>
  </div>
</template>

<!-- <style scoped>
.embla {
  position: relative;
  display: flex;
  width: 100%;
  height: 22.2rem;
  max-width: 30rem;
  margin-left: auto;
  margin-right: auto;
}
.embla:before,
.embla:after {
  position: absolute;
  left: 0;
  right: 0;
  content: '';
  display: block;
  height: calc(50% - 32px / 2);
  z-index: 1;
  pointer-events: none;
}
.embla:before {
  top: -0.5px;
  /* border-bottom: 0.5px solid rgba(var(--text-high-contrast-rgb-value), 0.3);
  bg-linear-to-t from-[var(--ui-bg)]/65 to-[var(--ui-bg)]
  background: linear-gradient(
    to top,
    rgba(var(--background-site-rgb-value), 0.65) 0%,
    rgba(var(--background-site-rgb-value), 1) 100%
  ); */
}
.embla:after {
  bottom: -0.5px;
  /* border-top: 0.5px solid rgba(var(--text-high-contrast-rgb-value), 0.3);
  background: linear-gradient(
    to bottom,
    rgba(var(--background-site-rgb-value), 0.65) 0%,
    rgba(var(--background-site-rgb-value), 1) 100%
  ); */
}
</style> -->
