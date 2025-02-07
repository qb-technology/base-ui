<script setup lang="ts">
import * as z from 'zod'
import type { ButtonProps, FormSubmitEvent } from '#ui/types'

defineProps({
  nameContainerClass: {
    type: String,
    default: 'md:grid-cols-2'
  },
  button: {
    type: Object as PropType<ButtonProps>,
    default: () => ({
      label: 'Login',
      block: true,
      size: 'xl'
    })
  },
})

const emits = defineEmits(['submit'])

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string()
    .regex(/([a-z])/, 'Must contain at least one lowercase character')
    .regex(/([A-Z])/, 'Must contain at least one uppercase character')
    .regex(/([!@#$%^&*])/, 'Must contain at least one symbol')
    .min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined
})

const show = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // console.log(event.data)
  emits('submit', event.data)
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField
      label="Email"
      name="email"
    >
      <UInput v-model="state.email" />
    </UFormField>

    <UFormField
      label="Password"
      name="password"
    >
      <UInput
        v-model="state.password"
        placeholder="Password"
        :type="show ? 'text' : 'password'"
        :ui="{ trailing: 'pe-1' }"
      >
        <template #trailing>
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            aria-label="show ? 'Hide password' : 'Show password'"
            :aria-pressed="show"
            aria-controls="password"
            @click="show = !show"
          />
        </template>
      </UInput>
    </UFormField>

    <slot name="btnFormSubmit" />

    <UButton
      v-bind="button"
      type="submit"
    />
  </UForm>
</template>
