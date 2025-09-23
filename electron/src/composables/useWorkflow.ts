import { Ref, ref } from 'vue'
import { Steps } from '@/types/data'
import { NodeLocal } from '@/types/node'
import { Workflow } from '@/types/workflow'
import { useApi } from './useApi'
const nodes = ref<NodeLocal[]>([])
const edges = ref<any[]>([])


const workflow: Ref = ref<Workflow>({
  name: "",
  description: "",
  steps: [] as Steps[]
} satisfies Workflow);

const workflows: Ref = ref<Workflow[]>([])

export const useWorkflow = () => {
  let nodeId = 0

  const { post } = useApi()

  const addNode = (step: Steps, position: {x: number, y: number}) => {
    nodes.value.push({
      id: (nodeId++).toString(),
      type: "default",
      position,
      data: { label: step.name, step }
    })
  }

  const addEdge = (connection: any, addEdgesFn: Function) => {
    console.log(connection);
    
    addEdgesFn(connection)
  }

  const getOrderedNode = () => {
    if (nodes.value.length === 0) return []

    // Construire une map des connexions
    const adjacencyMap: Record<string, string[]> = {}
    edges.value.forEach(edge => {
      if (!adjacencyMap[edge.source]) adjacencyMap[edge.source] = []
      adjacencyMap[edge.source].push(edge.target)
    })

    // Déterminer le node de départ (pas de source qui le cible)
    const targetIds = edges.value.map(e => e.target)
    const startNode = nodes.value.find(n => !targetIds.includes(n.id))
    if (!startNode) return []

    // Parcourir les nodes dans l'ordre
    const orderedNodes: any[] = []
    const visited = new Set<string>()

    const traverse = (nodeId: string) => {
      if (visited.has(nodeId)) return
      visited.add(nodeId)
      const node = nodes.value.find(n => n.id === nodeId)
      if (node) orderedNodes.push(node)
      const nextNodes = adjacencyMap[nodeId] || []
      nextNodes.forEach(nextId => traverse(nextId))
    }

    traverse(startNode.id)

    return orderedNodes
  }
  

  /**
   * Générer l'objet du workflow
   */
    const createWorkflow = () => {
    
    // Récupère les nodes du workflow courant
    const orderedNodes: NodeLocal[] = getOrderedNode()
    

    let step = null
    
    Object.values(orderedNodes).forEach(node => {
        
        step = {
          id: "step" + node.id,
          type: node.data.step.key,
          params: node.data.params
        }
        
        workflow.value.steps.push(step)
        
        
    })

    post("/workflows", workflow.value)
    
    
  }

  return { nodes, edges, addNode, addEdge, createWorkflow, workflow, workflows }
}
