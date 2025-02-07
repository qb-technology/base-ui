<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const emits = defineEmits(['submit'])

const schema = z.object({
  email: z.string().email('Invalid email'),
  first_name: z.string(),
  last_name: z.string(),
  password: z.string()
    .regex(/([a-z])/, 'Must contain at least one lowercase character')
    .regex(/([A-Z])/, 'Must contain at least one uppercase character')
    .regex(/([!@#$%^&*])/, 'Must contain at least one symbol')
    .min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
  first_name: undefined,
  last_name: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
  emits('submit', event.data)
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <div class="grid md:grid-cols-2 gap-x-5 gap-y-4">
      <UFormField label="First Name" name="first_name">
        <UInput v-model="state.first_name" />
      </UFormField>
      <UFormField label="Last Name" name="last_name">
        <UInput v-model="state.last_name" />
      </UFormField>
    </div>
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormField>

    <FormInputPassword v-model="state.password" />

    <UButton type="submit">
      Sign Up
    </UButton>
  </UForm>
</template>
