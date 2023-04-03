import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('electronAPI', {
      setTitle: (title) => ipcRenderer.send('set-title', title),
      setTitle1: (title) => ipcRenderer.send('set-title', title),
      openFile: () => ipcRenderer.invoke('dialog:openFile'),
      execCmd: (command) => ipcRenderer.invoke('exec-cmd', command),
      execAsyncCmd: (command) => ipcRenderer.invoke('exec-async-cmd', command)
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
