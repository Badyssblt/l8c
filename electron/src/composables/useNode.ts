import { Node } from "@vue-flow/core"
import { useWorkflow } from "./useWorkflow"

export const useNode = () => {
  const { nodes } = useWorkflow()

  /**
   * Retourne un node dans une liste nodes par son id
   * @param id node id
   * @returns node | undefined
   */
  const getNode = (id: number): Node => {
    return nodes.value[id]
  }

  /**
   * Modifie les données d'un node
   * @param id node id
   * @param newData nouvelles données à fusionner
   */
  const editNode = (nodeIndex: number, newData: any) => {
    
    nodes.value[nodeIndex].data = { 
      ...nodes.value[nodeIndex].data, 
      ...newData 
    }

    nodes.value = [...nodes.value]
  }

  return {
    getNode,
    editNode
  }
}
