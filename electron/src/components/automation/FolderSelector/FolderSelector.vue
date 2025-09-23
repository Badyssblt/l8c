<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import path from 'path'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

// Ref interne pour stocker la valeur si parent non fourni
const internalValue = ref<string | null>(
  props.modelValue ?? ''
)

const onSelect = async (e: Event) => {
  const result = await window.electronAPI.selectDirectory()
  internalValue.value = result
  emit('update:modelValue', internalValue.value)
}

</script>

<template>
  <div class="flex flex-col space-y-2">
    <button type="button" @click="onSelect">Sélectionner un dossier</button>
    <span class="text-sm text-gray-600">{{ internalValue }}</span>
  </div>
</template>
