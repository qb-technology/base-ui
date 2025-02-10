<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import type { PropType } from 'vue';
import type { LastPeriodRangeDateType } from '../../../utils/types';

const props = defineProps({
  modelValue: Object as PropType<{ start: LastPeriodRangeDateType, end: LastPeriodRangeDateType }>
})

const emits = defineEmits(['update:modelValue'])

const day = ref((new Date()).getDate()) // get number of the day
const month = ref((new Date()).getMonth() + 1) // get the number of the month, it start from 0 so add 1
const year = ref((new Date()).getFullYear()) // get number of the year
const value = ref({ start: new CalendarDate(year.value, month.value, day.value - 5), end: new CalendarDate(year.value, month.value, day.value) })

const minDate = new CalendarDate(year.value - 60, 12, 1)
const maxDate = new CalendarDate(year.value, day.value + 7, month.value)

watch(value, () => {
  if (!value.value.start || !value.value.end) return
  const start = {
    day: value.value.start.day,
    month: value.value.start.month,
    year: value.value.start.year,
  }
  const end = {
    day: value.value.end.day,
    month: value.value.end.month,
    year: value.value.end.year,
  }
  emits('update:modelValue', { start, end })
})
</script>

<template>
  <!-- @vue-ignore -->
  <UCalendar
    v-model="value"
    :min-value="minDate"
    :max-value="maxDate"
    range
    size="xl"
  />
</template>
