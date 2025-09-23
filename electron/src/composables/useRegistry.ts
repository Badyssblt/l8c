import { markRaw } from 'vue'
import FolderSelector from '@/components/automation/FolderSelector/FolderSelector.vue'
import EmailWriter from '@/components/automation/EmailWriter/EmailWriter.vue'

// Registry des composants avec markRaw
const componentRegistry = {
  FolderSelector: markRaw(FolderSelector),
  EmailWriter: markRaw(EmailWriter),
} as const

export type ComponentKey = keyof typeof componentRegistry

export function useComponentRegistry() {
  
  /**
   * Récupère un composant depuis le registry
   */
  const getComponent = (key: ComponentKey) => {
    const component = componentRegistry[key]
    if (!component) {
      console.warn(`Component "${key}" not found in registry`)
      return null
    }
    return component
  }

  /**
   * Vérifie si un composant existe dans le registry
   */
  const hasComponent = (key: string): key is ComponentKey => {
    return key in componentRegistry
  }

  /**
   * Récupère la liste des composants disponibles
   */
  const getAvailableComponents = (): ComponentKey[] => {
    return Object.keys(componentRegistry) as ComponentKey[]
  }

  /**
   * Enregistre un nouveau composant dans le registry (utile pour les plugins)
   */
  const registerComponent = (key: string, component: any) => {
    // @ts-ignore - Extension dynamique du registry
    componentRegistry[key] = markRaw(component)
  }

  return {
    getComponent,
    hasComponent,
    getAvailableComponents,
    registerComponent,
    registry: componentRegistry
  }
}