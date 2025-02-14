<script setup lang='ts'>
import type { PropType } from 'vue'
import type { DropdownMenuItem, ButtonProps, DropdownMenuProps, NavigationMenuProps, NavigationMenuItem } from '#ui/types'
import type { MaybeArrayOfArray } from '#ui/types/utils';

const menuEl = useTemplateRef('menuEl')
const { width: menu_width, height: menu_height } = useElementSize(menuEl)

const props = defineProps({
  menuButton: {
    type: Object as PropType<ButtonProps>,
    default: () => ({
      color: 'neutral',
      variant: 'link',
      icon: 'i-heroicons-ellipsis-vertical'
    })
  },
  menu: {
    type: Object as PropType<DropdownMenuProps<DropdownMenuItem>>,
    default: () => ({
      items: [
        [{
          label: 'Notification',
          icon: 'i-solar-bell-bing-linear'
        },
        {
          label: 'Billing',
          icon: 'i-solar-card-2-outline'
        },
        {
          label: 'Settings',
          icon: 'i-solar-settings-outline'
        },],
        [
          {
            label: 'Logout',
            icon: 'i-solar-logout-3-linear'
          }
        ]
      ],
      content: {
        align: 'end',
        side: 'bottom'
      },
      ui: { content: 'w-48' }
    })
  },
  name: {
    type: String,
    default: 'QB Tech'
  },
  footerMenu: {
    type: Object as PropType<NavigationMenuProps<MaybeArrayOfArray<NavigationMenuItem>>>,
  }
})

// export type BaseTemplateMobileV1Prop = {
//   menuButton: ButtonProps
//   menu: DropdownMenuProps<DropdownMenuItem>
//   name?: string
//   footerMenu?: NavigationMenuProps<MaybeArrayOfArray<NavigationMenuItem>>
// }

// withDefaults(defineProps<BaseTemplateMobileV1Prop>(), {
//   name: 'QB Tech',

// })
const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const _nu_items = [{
  label: 'Theme',
  slot: 'theme',
  onSelect: () => {
    isDark.value = !isDark.value
  }
}] as DropdownMenuItem[]
</script>

<template>
  <UContainer class="h-dvh max-h-dvh max-w-[var(--app-width)] mx-auto overflow-auto relative">
    <div
      class="w-full overflow-x-hidden overflow-y-auto relative flex flex-col space-y-2"
      :style="`height: calc(100% - ${menu_height}px)`"
    >
      <div class="flex items-center justify-between py-4">
        <slot name="logo">
          <p class="text-lg">
            QB Tech
          </p>
        </slot>

        <slot name="appName">
          <p class="text-highlighted font-medium">
            {{ name }}
          </p>
        </slot>

        <slot name="menu">
          <UDropdownMenu
            v-bind="{ ...props.menu }"
            :content="{
              align: 'end',
              side: 'bottom',
            }"
            :ui="{ content: 'w-48' }"
          >
            <UButton v-bind="props.menuButton" />

            <template #theme>
              <ClientOnly>
                <template #fallback>
                  <UButton
                    color="neutral"
                    variant="link"
                    label="Theme"
                  />
                </template>
                <BaseDarkMode />
              </ClientOnly>
            </template>
          </UDropdownMenu>
        </slot>
      </div>
      <div class="w-full flex-grow overflow-y-auto no-scrollbar">
        <slot />
      </div>
    </div>
    <div
      ref="menuEl"
      class="w-full h-fit absolute right-0 left-0 bottom-0"
    >
      <slot name="footerMenu">
        <BaseTemplateMenuMobileV1 :menu="footerMenu" />
      </slot>
    </div>
  </UContainer>
</template>
