import { useApi } from "@/composables/useApi"
import { Workflow } from "@/types/workflow";
const { get, post } = useApi()

/**
 * Get all Workflows from workflows directory
 * @returns List of workflows
 */
export const getWorkflows = async () => {
    try {
        return get('/workflows')
    }catch (error) {
        console.log(error);
        
    }
}

/**
 * Run a workflow
 * @param workflow Workflow
 * @returns 
 */
export const runWorkflow = async(workflow: Workflow) => {
    try {
        return get('/run/' + workflow.name)
    }catch (error) {
        console.log(error);
        
    }
}