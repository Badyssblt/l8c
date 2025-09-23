<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue?: { path: string, recursive?: boolean }
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: { path: string, recursive?: boolean }): void
}>()

// Ref interne pour stocker la valeur si parent non fourni
const internalValue = ref<{ path: string; recursive?: boolean }>(
  props.modelValue ?? { path: '', recursive: false }
)

function onSelect(e: Event) {
  const files = (e.target as HTMLInputElement).files
  if (files && files.length > 0) {
    internalValue.value.path = files[0].path
    emit('update:modelValue', { ...internalValue.value })
  }
}

function onToggleRecursive(e: Event) {
  internalValue.value.recursive = (e.target as HTMLInputElement).checked
  emit('update:modelValue', { ...internalValue.value })
}
</script>

<template>
  <div class="flex flex-col space-y-2">
    <input type="file" webkitdirectory directory @change="onSelect" />
    <label>
      <input type="checkbox" :checked="internalValue.recursive" @change="onToggleRecursive" />
      Inclure sous-dossiers
    </label>
    <span class="text-sm text-gray-600">{{ internalValue.path }}</span>
  </div>
</template>
