<template>
    <div class="border-r p-4 h-screen w-62">
        <Collapsible>
            <CollapsibleTrigger>
                <p class="font-medium">Automatisation</p>
            </CollapsibleTrigger>
            <CollapsibleContent class="flex flex-col gap-1 mt-2 pl-2 text-sm">
                <RouterLink to="/my-automation">Mes automatisations</RouterLink>
                <RouterLink to="/create-automation">Créer une automatisation</RouterLink>
            </CollapsibleContent>
        </Collapsible>
    </div>
</template>

<script setup>
import Collapsible from "@/components/ui/collapsible/Collapsible.vue";
import CollapsibleContent from "@/components/ui/collapsible/CollapsibleContent.vue";
import CollapsibleTrigger from "@/components/ui/collapsible/CollapsibleTrigger.vue";

</script>