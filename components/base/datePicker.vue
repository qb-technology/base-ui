<script lang="ts" setup>
import { random, range } from 'es-toolkit'
import { CalendarDate } from '@internationalized/date'
import { getDaysInMonth, toDate } from 'reka-ui/date'

const props = defineProps({
  modelValue: {
    type: String
  },
  maxAge: {
    type: Number,
    default: 60
  }
})
const emits = defineEmits(['update:modelValue'])
const _modelValue = computed({
  set: val => emits('update:modelValue', val),
  get: () => props.modelValue
})

const day = ref((new Date()).getDate()) // get number of the day
const day_key = ref(random(10000000)) // we will be changing this to refresh the day ui
const month = ref((new Date()).getMonth() + 1) // get the number of the month, it start from 0 so add 1
const year = ref((new Date()).getFullYear()) // get number of the year
const maxAge = props.maxAge// max age is 60
const maxDays = ref(31)

const month_val_index = ref(0)
// initialized to the current year
// plus one because the index does not start 0
const year_val_index = ref(maxAge + 1)

// get the range to show eg. 1965 to 2025
const yearRange = computed(() => {
  const cur_year = (new Date()).getFullYear()
  return {
    from: cur_year - maxAge,
    to: cur_year
  }
})

/**
 * set the initial start indexes of the carousel for both days and month
 */
const month_index = ref(0)
const day_index = ref(0)

function initializeVals() {
  const _month = (new Date()).getMonth() + 1
  month_index.value = range(1, 13).findIndex(x => x == _month)

  const _day = (new Date()).getDate()
  day_index.value = range(1, maxDays.value).findIndex(x => x == _day)
}

onBeforeMount(() => {
  initializeVals()
})

// =====================================================

/**
 * calculate days based on month and year selected => days are not the same and some years have leap year
 */
function getDaysInEveryMonth() {
  const date = new CalendarDate(year.value, month.value, 1)
  maxDays.value = getDaysInMonth(date)
}

watchArray([month, year], () => {
  getDaysInEveryMonth()
}, { deep: true })

function updateModelValue() {
  year.value = yearRange.value.from + year_val_index.value - 1
  _modelValue.value = `${day.value}-${month.value}-${year.value}`
}

watchArray([year_val_index, day, month,], () => {
  updateModelValue()
})

watch(maxDays, () => {
  day_key.value = random(10000000)
})

onMounted(() => {
  updateModelValue()
})
</script>

<template>
  <div class="grid grid-cols-3">
    <div class="space-y-4">
      <p class="text-center">
        Year
      </p>
      <IosPicker
        v-model="year_val_index"
        label=""
        :start="yearRange.from"
        :end="yearRange.to+1"
        perspective="left"
        loop
        :start-index="maxAge"
        type="first"
      />
    </div>

    <div class="space-y-4">
      <p class="text-center">
        Month
      </p>
      <IosPicker
        v-model="month"
        label=""
        :start="1"
        :end="13"
        perspective="center"
        loop
        :start-index="month_index"
        type="first"
      />
    </div>

    <div class="space-y-4">
      <p class="text-center">
        Day
      </p>
      <IosPicker
        :key="day_key"
        v-model="day"
        label=""
        :start="1"
        :end="maxDays+1"
        perspective="right"
        loop
        :start-index="day_index"
        type="first"
      />
    </div>
  </div>
</template>

<style scoped></style>
