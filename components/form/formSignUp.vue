<script setup lang="ts">
import * as z from 'zod'
import type { PropType } from 'vue';
import type { FormSubmitEvent, ButtonProps } from '#ui/types'

defineProps({
  nameContainerClass: {
    type: String,
    default: 'md:grid-cols-2'
  },
  button: {
    type: Object as PropType<ButtonProps>,
    default: () => ({
      label: 'Sign Up',
      block: true,
      size: 'xl'
    })
  },
})

const emits = defineEmits(['submit'])

const schema = z.object({
  email: z.string().email('Invalid email'),
  first_name: z.string(),
  last_name: z.string(),
  password: z.string()
    .regex(/([a-z])/, 'Must contain at least one lowercase character')
    .regex(/([A-Z])/, 'Must contain at least one uppercase character')
    .regex(/([!@#$%^&*])/, 'Must contain at least one symbol')
    .min(8, 'Must be at least 8 characters'),
  tnc: z.boolean({ message: 'Required' })
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
  first_name: undefined,
  last_name: undefined,
  tnc: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
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
    <div
      class="grid gap-x-5 gap-y-4"
      :class="nameContainerClass"
    >
      <UFormField
        label="First Name"
        name="first_name"
      >
        <UInput v-model="state.first_name" />
      </UFormField>
      <UFormField
        label="Last Name"
        name="last_name"
      >
        <UInput v-model="state.last_name" />
      </UFormField>
    </div>
    <UFormField
      label="Email"
      name="email"
    >
      <UInput v-model="state.email" />
    </UFormField>

    <FormInputPassword v-model="state.password" />

    <UFormField name="tnc">
      <UCheckbox v-model="state.tnc">
        <template #label>
          <span>I agree to the <ULink class="text-primary">Terms & Conditions</ULink>.</span>
        </template>
      </UCheckbox>
    </UFormField>

    <slot name="btnFormSubmit" />

    <UButton
      v-bind="button"
      type="submit"
    />
  </UForm>
</template>
