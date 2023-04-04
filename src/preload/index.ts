import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const api = {
  setTitle: (title): void => ipcRenderer.send('set-title', title),
  setTitle1: (title): void => ipcRenderer.send('set-title', title),
  openFile: (): Promise<string> => ipcRenderer.invoke('dialog:openFile'),
  execCmd: (command): Promise<string> => ipcRenderer.invoke('exec-cmd', command),
  execAsyncCmd: (command): Promise<void> => ipcRenderer.invoke('exec-async-cmd', command)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
