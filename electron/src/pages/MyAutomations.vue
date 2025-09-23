<template>
    <div class="p-4">
        <p class="text-xl font-medium">Mes automatisations</p>
        <div class="flex flex-wrap gap-4 mt-4">
            <WorkflowCard v-for="workflow in workflows" :workflow="workflow"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import WorkflowCard from '@/components/workflow/WorkflowCard.vue';
import { useWorkflow } from '@/composables/useWorkflow';
import { getWorkflows } from '@/services/workflow-service';
import { onMounted } from 'vue';

const {  workflows } = useWorkflow()

onMounted(async () => {
    workflows.value = await getWorkflows()
})
</script>