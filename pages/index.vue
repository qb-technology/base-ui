<script setup lang='ts'>
import {
  createMonth
} from 'reka-ui/date'
import { CalendarDate, type DateValue } from '@internationalized/date'

const date = ref('')

watch(date, () => {
  console.log(date.value);
})
</script>

<template>
  <div>
    <BaseDarkMode />

    <BaseDatePicker v-model="date" />
  </div>
</template>
