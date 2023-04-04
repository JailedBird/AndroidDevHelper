<script setup lang="ts">
import Versions from './components/Versions.vue'
import { ref } from 'vue'
import { isEmptyString } from '../../utils/StringUtils'
// IPC DOC https://www.electronjs.org/zh/docs/latest/tutorial/ipc
// IPC API https://www.electronjs.org/zh/docs/latest/api/ipc-renderer

class DeviceInfo {
  deviceId: string
  product?: string
  model?: string
  device?: string
  transport_id?: string
  check = false

  constructor(deviceId: string) {
    this.deviceId = deviceId
  }
}

// function sendMessageToMainProcess(): void {
//   const message = 'sendMessageFromRenderProcessToMainProcess'
//   // noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
//   window.api.setTitle(message)
//   // noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
//   window.api.setTitle1(message + ' ' + message)
// }

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// async function openFile() {
//   // noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
//   const filePath = await window.api.openFile()
//   console.log(filePath)
// }

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function execCmd(command: string) {
  // noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
  return window.api.execCmd(command)
}

function execAsyncCmd(command: string): void {
  // noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
  window.api.execAsyncCmd(command)
}

const devicesList = ref<DeviceInfo[]>([])
getDevicesList()

async function getDevicesList(): Promise<void> {
  const command = 'adb devices -l'
  const result: string = await execCmd(command)
  if (result.startsWith('error')) {
    return
  } else {
    const adbList = parseAdbDevices(result)
    devicesList.value = adbList
    console.log(adbList)
  }
}

const ERROR_LABEL = '[Error]'

const radio = ref<number>(0)

function showScreen(index: number = radio.value): void {
  if (index >= 0 && index < devicesList.value.length) {
    // noinspection SpellCheckingInspection
    execAsyncCmd('scrcpy -s ' + devicesList.value[index].deviceId)
  }
}

function parseAdbDevices(result: string): DeviceInfo[] {
  if (result.length === 0 || result.startsWith(ERROR_LABEL)) {
    return []
  }

  const lines = result.split('\n')
  const deviceInfoList: DeviceInfo[] = []

  for (const line of lines) {
    const deviceInfo: Record<string, string> = {}
    const [deviceId, ...dataFields] = line.split(/\s+/)
    for (const field of dataFields) {
      const [key, value] = field.split(':')
      deviceInfo[key] = value
    }
    if (isEmptyString(deviceId)) {
      continue
    }
    const deviceModel = new DeviceInfo(deviceId)
    deviceModel.product = deviceInfo['product']
    deviceModel.model = deviceInfo['model']
    deviceModel.device = deviceInfo['device']
    deviceModel.transport_id = deviceInfo['transport_id']
    if (deviceModel.product?.length > 0 && deviceModel.device?.length > 0) {
      deviceInfoList.push(deviceModel)
    }
    if (deviceInfoList.length > 0) {
      deviceInfoList[0].check = true
    }
  }
  return deviceInfoList
}
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
      <el-col :span="24" style="margin-bottom: 20px">
        <el-button type="primary" @click="getDevicesList()">设备扫描</el-button>
      </el-col>
      <el-col :span="24">
        <el-radio-group v-model="radio" style="flex-wrap: nowrap">
          <el-col
            v-for="(device, index) in devicesList"
            :key="device.deviceId"
            :span="8"
            style="margin-left: 8px"
          >
            <el-radio :label="index">{{ device.model }}</el-radio>
          </el-col>
        </el-radio-group>
        <!--      <el-col v-for="device in devicesList" :span="6" style="margin-left: 8px">-->
        <!--        <el-checkbox v-model="device.check" :label="device.model"></el-checkbox>-->
        <!--      </el-col>-->
      </el-col>
    </el-row>
    <el-col :span="24" style="margin-top: 20px">
      <el-button type="primary" @click="showScreen()">展示投屏</el-button>
    </el-col>
  </div>

  <!--  <div class="features">-->
  <!--    <div class="feature-item" @click="sendMessageToMainProcess()">-->
  <!--      <article>-->
  <!--        <h2 class="title">Configuring</h2>-->
  <!--        <p class="detail">-->
  <!--          Config with <span>electron.vite.config.ts</span> and refer to the-->
  <!--          <a target="_blank" href="https://evite.netlify.app/config/">config guide</a>.-->
  <!--        </p>-->
  <!--      </article>-->
  <!--    </div>-->
  <!--    <div class="feature-item" @click="openFile()">-->
  <!--      <article>-->
  <!--        <h2 class="title">HMR</h2>-->
  <!--        <p class="detail">-->
  <!--          Edit <span>src/renderer</span> files to test HMR. See-->
  <!--          <a target="_blank" href="https://evite.netlify.app/guide/hmr-in-renderer.html">docs</a>.-->
  <!--        </p>-->
  <!--      </article>-->
  <!--    </div>-->
  <!--    <div class="feature-item" @click="execCmd('dir')">-->
  <!--      <article>-->
  <!--        <h2 class="title">Hot Reloading</h2>-->
  <!--        <p class="detail">-->
  <!--          Run <span>'electron-vite dev &#45;&#45;watch'</span> to enable. See-->
  <!--          <a target="_blank" href="https://evite.netlify.app/guide/hot-reloading.html">docs</a>.-->
  <!--        </p>-->
  <!--      </article>-->
  <!--    </div>-->
  <!--    <div class="feature-item">-->
  <!--      <article>-->
  <!--        <h2 class="title">Debugging</h2>-->
  <!--        <p class="detail">-->
  <!--          Check out <span>.vscode/launch.json</span>. See-->
  <!--          <a target="_blank" href="https://evite.netlify.app/guide/debugging.html">docs</a>.-->
  <!--        </p>-->
  <!--      </article>-->
  <!--    </div>-->
  <!--    <div class="feature-item">-->
  <!--      <article>-->
  <!--        <h2 class="title">Source Code Protection</h2>-->
  <!--        <p class="detail">-->
  <!--          Supported via built-in plugin <span>bytecodePlugin</span>. See-->
  <!--          <a target="_blank" href="https://evite.netlify.app/guide/source-code-protection.html">-->
  <!--            docs-->
  <!--          </a>-->
  <!--          .-->
  <!--        </p>-->
  <!--      </article>-->
  <!--    </div>-->
  <!--    <div class="feature-item">-->
  <!--      <article>-->
  <!--        <h2 class="title">Packaging</h2>-->
  <!--        <p class="detail">-->
  <!--          Use-->
  <!--          <a target="_blank" href="https://www.electron.build">electron-builder</a>-->
  <!--          and pre-configured to pack your app.-->
  <!--        </p>-->
  <!--      </article>-->
  <!--    </div>-->
  <!--  </div>-->
</template>

<style lang="less">
@import './assets/css/styles.less';
</style>
