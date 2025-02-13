<script setup lang='ts'>
import {
  createMonth
} from 'reka-ui/date'
import { CalendarDate, type DateValue } from '@internationalized/date'

const date = ref('')

watch(date, () => {
  console.log(date.value);
})

const days = ref(20)
</script>

<template>
  <div class="">
    <BaseDarkMode />

    <div class="w-full h-full flex items-center justify-center">
      <IosPicker
        v-model="days"
        label="days"
        perspective="center"
        loop
        :item-size="52"
        class="max-w-28"
        :variant-style="{
          indicator_color: 'border-[var(--ui-primary)]',
          label_class: 'text-[var(--ui-primary)]',
          item_class: 'text-[var(--ui-primary)]',
        }"
      />
    </div>
    <div>
      <BaseDatePicker v-model="date" />
    </div>
  </div>
</template>
