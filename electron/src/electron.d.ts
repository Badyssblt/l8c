export {} // rend ce fichier un module

interface ElectronAPI {
  selectDirectory: () => Promise<string | null>
}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }
}
