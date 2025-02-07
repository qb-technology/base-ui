<script setup lang="ts">

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: 'Password'
  }
})

const emits = defineEmits(['update:modelValue'])

const show = ref(false)
const password = computed({
  set: val => emits('update:modelValue', val),
  get: () => props.modelValue
})

</script>

<template>
  <div class="space-y-2">
    <UFormField :label="label">
      <UInput
        v-model="password"
        placeholder="Password"
        :type="show ? 'text' : 'password'"
        :ui="{ trailing: 'pe-1' }"
        aria-describedby="password-strength"
        class="w-full"
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
            @click="() => { show = !show }"
          />
        </template>
      </UInput>
    </UFormField>
  </div>
</template>
