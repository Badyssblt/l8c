<template>
    <div class="flex flex-col items-start space-y-2">
        <label class="font-semibold text-gray-700">Sélectionner un dossier</label>
        <div class="flex items-center space-x-2">
            <input
                type="text"
                :value="folderPath"
                readonly
                class="w-64 px-3 py-2 border rounded bg-gray-100 text-gray-700 focus:outline-none"
                placeholder="Aucun dossier sélectionné"
            />
            <button
                @click="selectFolder"
                class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Parcourir...
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const folderPath = ref('')

async function selectFolder() {
    // Utilise l'API IPC d'Electron pour ouvrir la boîte de dialogue de sélection de dossier
    const { ipcRenderer } = window.require('electron')
    const result = await ipcRenderer.invoke('select-folder')
    if (result && !result.canceled && result.filePaths && result.filePaths[0]) {
        folderPath.value = result.filePaths[0]
    }
}
</script>