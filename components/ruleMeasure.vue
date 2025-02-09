<script setup lang='ts'>
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-vue'

const props = defineProps({
  modelValue: Number,
  length: {
    type: Number,
    default: 300
  }
})

const emits = defineEmits(['update:modelValue'])

const local_modelValue = ref(0)
// update local model value
local_modelValue.value = props.modelValue ? props.modelValue : local_modelValue.value

const slide_count = computed(() => Array.from(Array(props.length).keys()))

const options: EmblaOptionsType = {
  loop: false,
  axis: 'x',
  dragFree: true,
  watchSlides: false,
  align: 'center'
}

if (props.modelValue) {
  options.startIndex = props.modelValue
}

const [emblaRef, emblaApi] = useEmblaCarousel(options)

// update modelValue
const updateCurrentValue = (api: EmblaCarouselType) => {
  if (!api) return
  local_modelValue.value = api.selectedScrollSnap() + 1;
  emits('update:modelValue', local_modelValue.value)
}

onMounted(() => {
  if (!emblaApi.value) return
  emblaApi.value.on('select', updateCurrentValue)
})

watch(local_modelValue, () => {
  console.log(local_modelValue.value)
})

defineExpose({
  emblaRef, emblaApi
})
</script>

<template>
  <div class="embla max-w-sm mx-auto">
    <div
      ref="emblaRef"
      class="embla__viewport overflow-hidden"
    >
      <div
        class="embla__container flex touch-pan-y touch-pinch-zoom"
      >
        <div
          v-for="(value, index) of slide_count"
          :key="index"
          class="embla__slide mx-0.5 w-3 translate-3d grow-0 shrink-0 pl-0.5"
        >
          <div class="embla__slide__number select-none w-full">
            <USeparator
              orientation="vertical"
              :label="value%10===0 ? `${value}` : ''"
              :ui="{
                container: ['order-last', value%10 !== 0 && 'opacity-0'].join(' '),
              }"
              :size="value==local_modelValue ? 'md' : 'xs'"
              :color="value==local_modelValue ? 'primary' : 'neutral'"
              :class="[value%10==0 ? 'h-28' : 'h-14']"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
