//disable the type/interface rules for this file as it breaks the interface defintions
/* eslint-disable @typescript-eslint/consistent-type-definitions */
export {}

declare global {
  interface Window {
    electronAPI: {
      readFile: (filePath: string) => Promise<string>
    }
  }
}
