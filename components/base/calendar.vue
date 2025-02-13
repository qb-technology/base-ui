<script setup lang='ts'>
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNext,
  CalendarPrev,
  CalendarRoot
} from 'reka-ui'
import { CalendarDate } from '@internationalized/date';
import { createMonth, toDate } from 'reka-ui/date';

const _month = computed(() => createMonth({ dateObj: new CalendarDate(1995, 8, 18), weekStartsOn: 0, locale: 'en', fixedWeeks: true }))

// console.log(toDate(month.value.value).toLocaleString('en-US', { month: 'long' }), month.value);

// const days_week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const date = _month.value.value
</script>

<template>
  <CalendarRoot
    v-slot="{ weekDays, grid }"
    :default-value="date"
  >
    <CalendarHeader class="flex items-center justify-center">
      <CalendarPrev
        ref="prev"
        class="hidden"
      />
      <CalendarHeading class="text-base font-medium" />
      <CalendarNext
        ref="next"
        class="hidden"
      />
    </CalendarHeader>
    <div class="grid">
      <CalendarGrid
        v-for="month in grid"
        :key="month.value.toString()"
        class="w-full border-collapse select-none"
      >
        <CalendarGridHead>
          <CalendarGridRow class="mb-1 grid w-full grid-cols-7">
            <CalendarHeadCell
              v-for="day in weekDays"
              :key="day"
              class="font-medium"
            >
              {{ day }}
            </CalendarHeadCell>
          </CalendarGridRow>
        </CalendarGridHead>
        <CalendarGridBody class="grid">
          <CalendarGridRow
            v-for="(weekDates, index) in month.rows"
            :key="`weekDate-${index}`"
            class="grid grid-cols-7"
          >
            <CalendarCell
              v-for="weekDate in weekDates"
              :key="weekDate.toString()"
              :date="weekDate"
              class="relative text-center text-sm"
            >
              <CalendarCellTrigger
                :day="weekDate"
                :month="month.value"
                class="relative flex items-center justify-center"
              />
            </CalendarCell>
          </CalendarGridRow>
        </CalendarGridBody>
      </CalendarGrid>
    </div>
  </CalendarRoot>
</template>

<!-- <template>
  <div class="w-full h-full">
    <div class="w-full grid grid-cols-7">
      <div
        v-for="i of 7"
        :key="i"
        class="text-center"
      >
        <span class="text-base font-medium">{{ days_week[i] }}</span>
      </div>
    </div>

    <div class="border border-[var(--ui-border-muted)] divide-y divide-[var(--ui-border-muted)]">
      <div
        v-for="(row, ind) of month.rows"
        :key="ind"
      >
        <div class="w-full grid grid-cols-7 divide-x divide-[var(--ui-border-muted)] h-[48px]">
          <div
            v-for="(day, d_ind) of row"
            :key="d_ind"
            class=" relative w-full grid place-content-center"
          >
            <span class="absolute top-0 left-0">{{ day.day }}</span>
            <UIcon
              name="i-qb-blood-drop"
              class="w-4 h-4"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template> -->
