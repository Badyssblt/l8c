import { ref } from 'vue'
import { Steps } from '@/types/data'

const nodes = ref<any[]>([])
const edges = ref<any[]>([])

export const useWorkflow = () => {
  let nodeId = 0

  const addNode = (step: Steps, position: {x: number, y: number}) => {
    nodes.value.push({
      id: (nodeId++).toString(),
      type: "default",
      position,
      data: { label: step.name, step }
    })
  }

  const addEdge = (connection: any, addEdgesFn: Function) => {
    addEdgesFn(connection)
  }

  return { nodes, edges, addNode, addEdge }
}
