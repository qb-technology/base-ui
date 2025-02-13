<script setup lang='ts'>
import type { PropType } from 'vue';
import type { NavigationMenuItem, NavigationMenuProps } from '#ui/types'
import type { MaybeArrayOfArray } from '#ui/types/utils';

const props = defineProps({
  menu: {
    type: Object as PropType<NavigationMenuProps<MaybeArrayOfArray<NavigationMenuItem>>>,
    default: () => ({
      items: [
        {
          label: 'Home',
          icon: 'i-solar-home-angle-bold',
          to: '/'
        },
        {
          label: 'Calendar',
          icon: 'i-solar-calendar-outline'
        },
        {
          label: 'Tracker',
          icon: 'i-solar-graph-new-outline'
        },
        {
          label: 'Articles',
          icon: 'i-solar-document-text-outline'
        },
        {
          label: 'Account',
          icon: 'i-solar-user-linear'
        },
      ],
      ui: {
        link: 'flex-col justify-center text-xs',
        linkLeadingIcon: 'size-6',
        root: 'w-full',
        list: 'gap-5',
      }
    })
  },
})

const _menu = computed(() => {
  if (props.menu.ui) return props.menu
  const __menu = props.menu
  __menu.ui = {
    link: 'flex-col justify-center text-xs',
    linkLeadingIcon: 'size-6',
    root: 'w-full',
    list: 'gap-5',
  }
  return __menu
})

</script>

<template>
  <UNavigationMenu
    :items="_menu.items"
    class="w-full justify-center"
    :variant="menu.variant"
    :ui="_menu.ui"
    v-bind="_menu"
  />
</template>
