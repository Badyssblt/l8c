<template>
    <div class="border rounded p-4 relative">
        <RouterLink :to="'/workflow/' + workflow.name" >
            <p>{{  workflow.name  }}</p>
            <p class="text-sm opacity-70">Nombre de step: {{  workflow.steps.length  }}</p>
        </RouterLink>
        <button @click.stop="runWorkflow(workflow)" class="absolute p-1 -top-3 -right-3 bg-slate-800 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import { runWorkflow } from '@/services/workflow-service';
import { Workflown } from '@/types/workflow';

const props = defineProps<{workflow: Workflow}>()


</script>