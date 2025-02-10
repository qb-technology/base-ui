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
  loop: true,
  axis: 'x',
  dragFree: true,
  watchSlides: false,
  align: 'center'
}

if (props.modelValue) {
  options.startIndex = props.modelValue - 1
}

const [emblaRef, emblaApi] = useEmblaCarousel(options)

// update modelValue
const updateCurrentValue = (api: EmblaCarouselType) => {
  if (!api) return
  local_modelValue.value = api.selectedScrollSnap() + 1;
  emits('update:modelValue', local_modelValue.value)
}

// update index based on prop change
const _mod = computed(() => props.modelValue)
watch(_mod, () => {
  if (!emblaApi.value || !_mod.value) return
  emblaApi.value?.scrollTo(_mod.value - 1, false)
})

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

const embla_before_after = "before:bg-linear-to-r before:from-[var(--ui-bg)]/80 before:via-[var(--ui-bg)]/40 before:to-[var(--ui-bg)]/10 before:w-[calc(50%-7px)] before:h-full after:w-[calc(50%-7px)] after:bg-linear-to-l after:from-[var(--ui-bg)]/80 via-[var(--ui-bg)]/40 after:to-[var(--ui-bg)]/10 before:-left-0.5 after:-right-0.5"
// const embla_before_after = "before:bg-linear-to-r before:from-[var(--ui-bg)]/65 before:to-[var(--ui-bg)] after:bg-linear-to-l after:from-[var(--ui-bg)]/65 after:to-[var(--ui-bg)] before:-left-0.5 after:-right-0.5"
</script>

<template>
  <div
    class="embla relative max-w-sm sm:max-w-md md:max-w-lg mx-auto max-h-fit"
    :class="[embla_before_after]"
  >
    <!-- <USeparator
      orientation="vertical"
      size="lg"
      color="primary"
      :class="[local_modelValue%10==0 ? 'h-28' : 'h-14']"
      class="absolute top-0 left-[calc(50%-0px)] right-[calc(50%-0px)] z-1"
    /> -->

    <div
      ref="emblaRef"
      class="embla__viewport overflow-hidden w-full relative"
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
                container: ['order-last', value % 10 !== 0 && 'opacity-0'].join(' '),
                border: value==local_modelValue ? 'border-white' : '',
              }"
              :size="value==local_modelValue ? 'lg' : 'sm'"
              :class="[value%10==0 ? 'h-28' : 'h-14']"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.embla:before,
.embla:after {
  position:absolute;
  top: 0;
  bottom: 0;
  /* content: ''; */
  display: block;
  /* width: calc(50%-20px); */
  z-index: 1;
  pointer-events: none;
}
</style>
