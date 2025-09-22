<template>
  <!-- Corps -->
  <div>
    <textarea
      id="body"
      v-model="email.body"
      rows="6"
      class="w-full border rounded px-3 py-2"
    ></textarea>
  </div>

  <!-- Pièces jointes -->
  <div class="mt-4">
    <label class="block font-semibold mb-1">Pièces jointes</label>
    <input type="file" multiple @change="handleFiles" />
    <ul class="mt-2">
      <li
        v-for="(file, index) in email.attachments"
        :key="index"
        class="flex justify-between items-center bg-gray-100 rounded px-2 py-1 mb-1"
      >
        {{ file.name }}
        <button
          type="button"
          @click="removeFile(index)"
          class="text-red-500 font-bold"
        >
          Supprimer
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const email = reactive({
  body: "",
  attachments: []
});

function handleFiles(event) {
  email.attachments.push(...event.target.files);
}

function removeFile(index) {
  email.attachments.splice(index, 1);
}
</script>
