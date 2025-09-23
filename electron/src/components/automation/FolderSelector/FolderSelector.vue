<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import path from 'path'

const props = defineProps<{
  modelValue?: { path: string; recursive?: boolean }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: { path: string; recursive?: boolean }): void
}>()

// Ref interne pour stocker la valeur si parent non fourni
const internalValue = ref<{ path: string | null; recursive?: boolean }>(
  props.modelValue ?? { path: '', recursive: false }
)

const onSelect = async (e: Event) => {
  const result = await window.electronAPI.selectDirectory()
  internalValue.value.path = result
  emit('update:modelValue', { ...internalValue.value })
}

</script>

<template>
  <div class="flex flex-col space-y-2">
    <button type="button" @click="onSelect">Sélectionner un dossier</button>
    <span class="text-sm text-gray-600">{{ internalValue.path }}</span>
  </div>
</template>
