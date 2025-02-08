<script setup lang='ts'>
import {
  createDateRange,
  createDecade,
  createMonth,
  createYear,
  createYearRange,
  getDaysInMonth,
  hasTime,
  isAfter,
  isAfterOrSame,
  isBefore,
  isBeforeOrSame,
  isBetween,
  isBetweenInclusive,
  isCalendarDateTime,
  isZonedDateTime,
  parseStringToDateValue,
  toDate,
} from 'reka-ui/date'

import { CalendarDate, type DateValue } from '@internationalized/date'

const date = new CalendarDate(1995, 8, 18)
const minDate = new CalendarDate(1995, 8, 1)
const maxDate = new CalendarDate(1995, 8, 31)
const startEndYear = computed(() => {
  const cur_year = new Date().getFullYear()
  return [cur_year, cur_year - 60]
})

parseStringToDateValue('1995-08-18', date) // returns a DateValue object
toDate(date) // returns a Date object
isCalendarDateTime(date) // returns false
isZonedDateTime(date) // returns false
hasTime(date) // returns false
getDaysInMonth(date) // returns 31
isAfter(date, minDate) // returns true
isBeforeOrSame(date, maxDate) // returns true
isAfterOrSame(date, minDate) // returns true
isBefore(date, maxDate) // returns true
isBetweenInclusive(date, minDate, maxDate) // returns true
isBetween(date, minDate, maxDate) // returns true
createMonth({ dateObj: new CalendarDate(1995, 8, 18), weekStartsOn: 0, locale: 'en', fixedWeeks: true }) // returns a grid of days as DateValue for the month, also containing the dateObj, plus an array of days for the month
createYear({ dateObj: new CalendarDate(1995, 8, 18), numberOfMonths: 2, pagedNavigation: true }) // returns an array of months as DateValue, centered around the dateObj taking into account the numberOfMonths and pagedNavigation when returning the months
createDecade({ dateObj: new CalendarDate(1995, 8, 18), startIndex: -10, endIndex: 10 }) // returns a decade centered around the dateObj
createDateRange({ start: new CalendarDate(1995, 8, 18), end: new CalendarDate(2005, 8, 18) }) // returns an array of dates as DateValue between the start and end date
const year_range = createYearRange({ start: new CalendarDate(startEndYear.value[1], 1, 1), end: new CalendarDate(startEndYear.value[0], 1, 1) }).map(x => x.year) // returns an array of years as DateValue between the start and end date

const carousel = useTemplateRef('carousel')

watch(carousel, () => {
  if (carousel.value && carousel.value.emblaApi) {
    console.log(carousel.value.emblaApi.slidesInView())
  }
})
</script>

<template>
  <div>
    <UCarousel
      ref="carousel"
      v-slot="{ item }"
      orientation="vertical"
      :items="year_range"
      :start-index="year_range.length"
      class="max-w-3xs mx-auto"
      :ui="{ container: 'h-[336px] grid' }"
    >
      <span>{{ item }}</span>
    </UCarousel>
  </div>
</template>
