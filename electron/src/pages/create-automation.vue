<script setup lang="ts">
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import NodeBar from '@/components/automation/NodeBar/NodeBar.vue'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Steps } from '@/types/data'
import { Button } from '@/components/ui/button'
import { useWorkflow } from '@/composables/useWorkflow'
import { useNode } from '@/composables/useNode'
import { useComponentRegistry } from '@/composables/useRegistry'
const { onInit, onNodeDragStop, onConnect, addEdges, setViewport, toObject, project, applyNodeChanges } = useVueFlow()

const { nodes, edges } = useWorkflow()
const { getNode, editNode } = useNode()
const { getComponent } = useComponentRegistry()

onConnect((connection) => {
  addEdges(connection)
  edges.value.push(connection)
})


let nodeId = 0


const onDrop = (event: DragEvent) => {
  const step = JSON.parse(event.dataTransfer?.getData("application/vueflow") || "{}")
  const bounds = event.currentTarget.getBoundingClientRect()

  // Position souris relative au container
  const position = project({
    x: event.clientX - bounds.left,
    y: event.clientY - bounds.top,
  })

  nodes.value.push({
    id: (nodeId++).toString(),
    type: "default",
    position,
    data: { label: step.name, step },
  })
}


const selectedNode = ref<Steps>()
const selectedNodeId = ref<number>()
const isParamsModalOpen = ref<boolean>(false)

const onNodeClick = ({event, node}: any) => {
  selectedNode.value = node.data.step
  
  selectedNodeId.value = node.id
  
  isParamsModalOpen.value = !isParamsModalOpen.value
  
  params.value = node.data.params || {}
}

const workflow = ref({
  name: "",
  description: "",
  steps: [] as Steps[]
})

const onNodesChange = (changes: any[]) => {
  // Applique les changements sur chaque node existant sans remplacer le tableau
  const newNodes = applyNodeChanges(changes, [...nodes.value])
  nodes.value.splice(0, nodes.value.length, ...newNodes)
}


/**
 * Ajoute les params d'un node à la liste des nodes
 */
const handleNodeParams = () => {
  if(!selectedNode.value) return
  const nodeIndex = nodes.value.findIndex(
    (n: any) => n.id === selectedNodeId.value
  )

  const node = getNode(nodeIndex)
  
  editNode(nodeIndex, {
    params: {...params.value}
  })

  console.log(params.value);
  
    
  isParamsModalOpen.value = false
  params.value = {}
}

const handleDialogParams = () => {
  handleNodeParams()
}

const params = ref<Record<string, any>>({})
</script>

<template>
  
  <div class="flex h-scren">
    <div class="h-screen w-full" @dragover.prevent @drop="onDrop">
      <VueFlow :nodes="nodes" :edges="edges" @node-context-menu="onNodeClick" @nodes-change="onNodesChange">
          <Background variant="dots"/>
      </VueFlow>
    </div>
    <Dialog  v-model:open="isParamsModalOpen" @update:open="handleDialogParams">
      <DialogTrigger>

      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          Paramètres pour {{ selectedNode?.name  }}
        </DialogTitle>
        <form v-if="selectedNode" class="flex flex-col gap-2">
          <div class="flex flex-col gap-2" v-for="param in selectedNode.params" :key="param.key">
            <Label v-if="param.label">{{ param.label }}</Label>
            <!-- Vérification type guard pour ComponentParam -->
            <component v-if="'component' in param" :is="getComponent(param.component)" v-model="params[param.key]" />
            <Input v-model="params[param.key]" v-else/>
          </div>
          <Button type="button" @click="handleNodeParams">Enregistrer</Button>
        </form>
        
      </DialogContent>
    </Dialog>
    <div>
      <NodeBar/>
    </div>
  </div>
</template>

<style>
@import '@vue-flow/core/dist/style.css';

@import '@vue-flow/core/dist/theme-default.css';
</style>