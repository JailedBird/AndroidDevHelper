<script setup lang="ts">
import Versions from './components/Versions.vue'
import { ref } from 'vue'
import * as zlib from 'zlib'
// IPC DOC https://www.electronjs.org/zh/docs/latest/tutorial/ipc
// IPC API https://www.electronjs.org/zh/docs/latest/api/ipc-renderer
function sendMessageToMainProcess(): void {
  const message = 'sendMessageToMainProcess'
  // noinspection TypeScriptUnresolvedVariable
  window.electronAPI.setTitle(message)
  // noinspection TypeScriptUnresolvedVariable
  window.electronAPI.setTitle1(message + message)
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function openFile() {
  // noinspection TypeScriptUnresolvedVariable
  const filePath = await window.electronAPI.openFile()
  console.log(filePath)
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function execCmd(command: string) {
  // noinspection TypeScriptUnresolvedVariable
  return window.electronAPI.execCmd(command)
}

const devicesList = ref<string[]>([])

async function getDevicesList() {
  const command = 'adb devices -l'
  const result: string = await execCmd(command)
  if (result.startsWith('error')) {
    return
  } else {
    const adbList = parseAdbDevices(result)
    console.log(adbList)
  }
}

const ERROR_LABEL = '[Error]'

class DeviceInfo {
  deviceId: string
  product?: string
  model?: string
  device?: string
  transport_id?: string

  constructor(deviceId: string) {
    this.deviceId = deviceId
  }
}

function parseAdbDevices(result: string): DeviceInfo[] {
  if (result.length === 0 || result.startsWith(ERROR_LABEL)) {
    return []
  }

  const lines = result.split('\n')
  const deviceInfoList: DeviceInfo[] = []

  for (const line of lines) {
    const deviceInfo: Record<string, any> = {}

    const [deviceId, ...dataFields] = line.split(/\s+/)

    deviceInfo.deviceId = deviceId

    for (const field of dataFields) {
      const [key, value] = field.split(':')
      deviceInfo[key] = value
    }
    const deviceModel = new DeviceInfo(deviceId)
    deviceModel.product = deviceInfo['product']
    deviceModel.model = deviceInfo['model']
    deviceModel.device = deviceInfo['device']
    deviceModel.transport_id = deviceInfo['transport_id']

    deviceInfoList.push(deviceModel)
  }
  return deviceInfoList
}

// eslint-disable-next-line vue/no-export-in-script-setup

const checked1 = ref(true)
const checked2 = ref(false)

</script>

<template>
  <Versions></Versions>

  <svg class="hero-logo" viewBox="0 0 900 300">
    <use xlink:href="./assets/icons.svg#electron" />
  </svg>
  <h2 class="hero-text">You've successfully created an Electron project with Vue and TypeScript</h2>
  <p class="hero-tagline">Please try pressing <code>F12</code> to open the devTool</p>

  <div class="links">
    <div class="link-item">
      <a target="_blank" href="https://evite.netlify.app">Documentation</a>
    </div>
    <div class="link-item link-dot">•</div>
    <div class="link-item">
      <a target="_blank" href="https://github.com/alex8088/electron-vite">Getting Help</a>
    </div>
    <div class="link-item link-dot">•</div>
    <div class="link-item">
      <a
        target="_blank"
        href="https://github.com/alex8088/quick-start/tree/master/packages/create-electron"
      >
        create-electron
      </a>
    </div>
  </div>

  <div style="margin-top: 20px; margin-bottom: 20px">
    <el-row style="display: flex">
      <el-col :span="24">
        <el-button type="primary" @click="getDevicesList()">设备扫描</el-button>
      </el-col>

    </el-row>
  </div>

  <div>
    <el-checkbox v-model="checked1" label="备选项1"></el-checkbox>
    <el-checkbox v-model="checked2" label="备选项2"></el-checkbox>
  </div>

  <div class="features">
    <div class="feature-item" @click="sendMessageToMainProcess()">
      <article>
        <h2 class="title">Configuring</h2>
        <p class="detail">
          Config with <span>electron.vite.config.ts</span> and refer to the
          <a target="_blank" href="https://evite.netlify.app/config/">config guide</a>.
        </p>
      </article>
    </div>
    <div class="feature-item" @click="openFile()">
      <article>
        <h2 class="title">HMR</h2>
        <p class="detail">
          Edit <span>src/renderer</span> files to test HMR. See
          <a target="_blank" href="https://evite.netlify.app/guide/hmr-in-renderer.html">docs</a>.
        </p>
      </article>
    </div>
    <div class="feature-item" @click="execCmd()">
      <article>
        <h2 class="title">Hot Reloading</h2>
        <p class="detail">
          Run <span>'electron-vite dev --watch'</span> to enable. See
          <a target="_blank" href="https://evite.netlify.app/guide/hot-reloading.html">docs</a>.
        </p>
      </article>
    </div>
    <div class="feature-item">
      <article>
        <h2 class="title">Debugging</h2>
        <p class="detail">
          Check out <span>.vscode/launch.json</span>. See
          <a target="_blank" href="https://evite.netlify.app/guide/debugging.html">docs</a>.
        </p>
      </article>
    </div>
    <div class="feature-item">
      <article>
        <h2 class="title">Source Code Protection</h2>
        <p class="detail">
          Supported via built-in plugin <span>bytecodePlugin</span>. See
          <a target="_blank" href="https://evite.netlify.app/guide/source-code-protection.html">
            docs
          </a>
          .
        </p>
      </article>
    </div>
    <div class="feature-item">
      <article>
        <h2 class="title">Packaging</h2>
        <p class="detail">
          Use
          <a target="_blank" href="https://www.electron.build">electron-builder</a>
          and pre-configured to pack your app.
        </p>
      </article>
    </div>
  </div>
</template>

<style lang="less">
@import './assets/css/styles.less';
</style>
