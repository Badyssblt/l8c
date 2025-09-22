<template>
    <Dialog>
    <DialogTrigger>
      <Button>Créer l'automatisation</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogTitle>
        Créer une automatisation
      </DialogTitle>
      <div>
        <Label>Nom</label>
        <Input />
      </div>
    </DialogContent>
  </Dialog>
    <div class="w-42 flex flex-col gap-4">
        <Collapsible v-for="data in allDatas" :default-open="true">
            <CollapsibleTrigger>
                <p class="font-semibold">{{  data.category  }}</p>
            </CollapsibleTrigger>
            <CollapsibleContent class="px-4">
                <div v-for="step in data.steps" :draggable="true" @dragstart="onDragstart($event, step)">
                    <p>{{  step.name  }}</p>
                </div>
            </CollapsibleContent>
        </Collapsible>
    </div>
</template>

<script setup type="ts">
import { allDatas } from "@/all_datas.ts"
import Collapsible from "@/components/ui/collapsible/Collapsible.vue";
import CollapsibleContent from "@/components/ui/collapsible/CollapsibleContent.vue";
import CollapsibleTrigger from "@/components/ui/collapsible/CollapsibleTrigger.vue";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Input from '@/components/ui/input/Input.vue'
import Label from '@/components/ui/label/Label.vue'
import Button from '@/components/ui/button/Button.vue'


const onDragstart = (event, step) => {
    event.dataTransfer.setData("application/vueflow", JSON.stringify(step))
    event.dataTransfer.effectAllowed = "move"
}

</script>