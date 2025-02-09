<script setup lang='ts'>
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-vue'
import { range } from 'es-toolkit';
import type { PropType } from 'vue';

const props = defineProps({
  loop: Boolean,
  label: {
    type: String,
    default: 'hours'
  },
  start: {
    type: Number,
    default: 0
  },
  end: {
    type: Number,
    default: 200
  },
  step: {
    type: Number,
    default: 0.1
  },
  startIndex: {
    type: Number,
    default: 0
  },
  perspective: {
    type: String as PropType<'left' | 'right' | 'center'>,
    default: 'center',
    validator: (val: string) => ['left', 'right', 'center'].includes(val)
  },
  modelValue: Number
})
const emits = defineEmits(['update:modelValue'])

const _modelValue = computed({
  set: val => emits('update:modelValue', val),
  get: () => props.modelValue
})

</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
