<script setup lang='ts'>
// import type { EmblaCarouselVueType as EmblaCarouselType } from 'embla-carousel-vue';
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-vue'
import { range } from 'es-toolkit';
import type { PropType } from 'vue';

const CIRCLE_DEGREES = 360
const WHEEL_ITEM_SIZE = 32
const WHEEL_ITEM_COUNT = 18
const WHEEL_ITEMS_IN_VIEW = 4

const WHEEL_ITEM_RADIUS = CIRCLE_DEGREES / WHEEL_ITEM_COUNT
const IN_VIEW_DEGREES = WHEEL_ITEM_RADIUS * WHEEL_ITEMS_IN_VIEW
const WHEEL_RADIUS = Math.round(
  WHEEL_ITEM_SIZE / 2 / Math.tan(Math.PI / WHEEL_ITEM_COUNT)
)

const isInView = (wheelLocation: number, slidePosition: number): boolean =>
  Math.abs(wheelLocation - slidePosition) < IN_VIEW_DEGREES

// const [emblaRef, emblaApi] = useEmblaCarousel()

const setSlideStyles = (
  emblaApi: EmblaCarouselType,
  index: number,
  loop: boolean,
  slideCount: number,
  totalRadius: number
): void => {
  if (!emblaApi) return
  const slideNode = emblaApi.slideNodes()[index]
  const wheelLocation = emblaApi.scrollProgress() * totalRadius
  const positionDefault = emblaApi.scrollSnapList()[index] * totalRadius
  const positionLoopStart = positionDefault + totalRadius
  const positionLoopEnd = positionDefault - totalRadius

  let inView = false
  let angle = index * -WHEEL_ITEM_RADIUS

  if (isInView(wheelLocation, positionDefault)) {
    inView = true
  }

  if (loop && isInView(wheelLocation, positionLoopEnd)) {
    inView = true
    angle = -CIRCLE_DEGREES + (slideCount - index) * WHEEL_ITEM_RADIUS
  }

  if (loop && isInView(wheelLocation, positionLoopStart)) {
    inView = true
    angle = -(totalRadius % CIRCLE_DEGREES) - index * WHEEL_ITEM_RADIUS
  }

  if (inView) {
    slideNode.style.opacity = '1'
    slideNode.style.transform = `translateY(-${
      index * 100
    }%) rotateX(${angle}deg) translateZ(${WHEEL_RADIUS}px)`
  }
  else {
    slideNode.style.opacity = '0'
    slideNode.style.transform = 'none'
  }
}

const setContainerStyles = (
  emblaApi: EmblaCarouselType,
  wheelRotation: number
): void => {
  if (!emblaApi) return
  emblaApi.containerNode().style.transform = `translateZ(${WHEEL_RADIUS}px) rotateX(${wheelRotation}deg)`
}

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
    default: 24
  },
  step: {
    type: Number,
    default: 1
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

const options = {
  loop: props.loop,
  axis: 'y',
  dragFree: true,
  containScroll: false,
  watchSlides: false,
  startIndex: props.startIndex
} as EmblaOptionsType

const [emblaRef, emblaApi] = useEmblaCarousel({ ...options })

const updateCurrentValue = (api: EmblaCarouselType) => {
  if (!api) return
  _modelValue.value = api.selectedScrollSnap() + 1;
}

const rootNodeRef = ref(null)
const totalRadius = computed(() => _slideCount.value * WHEEL_ITEM_RADIUS)
const rotationOffset = computed(() => props.loop ? 0 : WHEEL_ITEM_RADIUS)
const slides = computed(() => range(props.start, props.end, props.step))
const _slideCount = computed(() => slides.value.length)

const inactivateEmblaTransform = (api: EmblaCarouselType) => {
  if (!api) return
  const { translate, slideLooper } = api.internalEngine()
  translate.clear()
  translate.toggleActive(false)
  slideLooper.loopPoints.forEach(({ translate }) => {
    translate.clear()
    translate.toggleActive(false)
  })
}

function rotateWheel(api: EmblaCarouselType) {
  if (!api) return
  const rotation = _slideCount.value * WHEEL_ITEM_RADIUS - rotationOffset.value
  const wheelRotation = rotation * api.scrollProgress()
  setContainerStyles(api, wheelRotation)
  api.slideNodes().forEach((_, index) => {
    setSlideStyles(api, index, props.loop, _slideCount.value, totalRadius.value)
  })
}

watchArray([rotationOffset, totalRadius, _slideCount], () => {
  if (!emblaApi.value) return
  rotateWheel(emblaApi.value)
  updateCurrentValue(emblaApi.value)
})

function onPointerUp(api: EmblaCarouselType) {
  if (!api) return
  const { scrollTo, target, location } = api.internalEngine()
  const diffToTarget = target.get() - location.get()
  const factor = Math.abs(diffToTarget) < WHEEL_ITEM_SIZE / 2.5 ? 10 : 0.1
  const distance = diffToTarget * factor
  scrollTo.distance(distance, true)
}

function initFunc() {
  if (!emblaApi.value) return

  emblaApi.value.on('pointerUp', onPointerUp)
  emblaApi.value.on('scroll', rotateWheel)
  emblaApi.value.on('reInit', (api) => {
    inactivateEmblaTransform(api)
    rotateWheel(api)
  })
  emblaApi.value.on('init', (api) => {
    inactivateEmblaTransform(api)
    rotateWheel(api)
  })
  emblaApi.value.on('select', updateCurrentValue)
  // updateCurrentValue(emblaApi.value)
}

onMounted(() => {
  if (!emblaApi.value) return
  initFunc()
})

watchArray([emblaApi, emblaRef, slides], () => {
  initFunc()
}, { deep: true })

// watch(emblaRef, () => {
//   // updateCurrentValue()
// })

defineExpose({
  emblaRef, emblaApi
})
</script>

<template>
  <div class="embla before:bg-linear-to-t before:from-[var(--ui-bg)]/65 before:to-[var(--ui-bg)] before:border-b-[0.5px] before:border-[var(--ui-border-muted)] after:border-t-[0.5px] after:border-[var(--ui-border-muted)] after:bg-linear-to-b after:from-[var(--ui-bg)]/65 after:to-[var(--ui-bg)]">
    <div class="embla__ios-picker h-full min-w-[50%] flex items-center justify-center gap-3 relative">
      <div
        ref="rootNodeRef"
        class="embla__ios-picker__scene w-full h-full overflow-hidden flex items-center touch-pan-x"
      >
        <div
          ref="emblaRef"
          :class="[`embla__ios-picker__viewport embla__ios-picker__viewport--perspective-${perspective}`]"
        >
          <div class="embla__ios-picker__container h-full w-full transform-3d will-change-transform">
            <div
              v-for="(_, index) of slides"
              :key="index"
              class="embla__ios-picker__slide text-lg w-fit"
            >
              <slot
                name="content"
                :item="_"
                :index="index"
              >
                {{ _ }}
              </slot>
            </div>
          </div>
        </div>
      </div>
      <div class="embla__ios-picker__label font-bold">
        {{ label }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.embla {
  position: relative;
  display: block;
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
/*
.embla__ios-picker {
  height: 100%;
  display: flex;
  align-items: center;
  min-width: 50%;
  justify-content: center;
  line-height: 1;
  font-size: 1.8rem;
}

.embla__ios-picker__scene {
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  touch-action: pan-x;
}*/
.embla__ios-picker__viewport {
  height: 32px;
  width: 100%;
  perspective: 1000px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;
}
.embla__ios-picker__viewport--perspective-left {
  perspective-origin: calc(50% + 130px) 50%;
  transform: translateX(27px);
}
.embla__ios-picker__viewport--perspective-right {
  perspective-origin: calc(50% - 130px) 50%;
  transform: translateX(-27px);
}
.embla__ios-picker__viewport--perspective-center {
  perspective-origin: calc(50% - 0px) 50%;
  transform: translateX(0px);
}
/*
.embla__ios-picker__container {
  height: 100%;
  width: 100%;
  transform-style: preserve-3d;
  will-change: transform;
}
*/
.embla__ios-picker__slide {
  width: 100%;
  height: 100%;
  /* font-size: 19px; */
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  opacity: 0;
}
.embla__ios-picker__label {
  /* font-weight: 700;
  transform: translateX(-55px);*/
  pointer-events: none;
}
</style>
