<script setup lang="ts">
import Versions from './components/Versions.vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
// IPC DOC https://www.electronjs.org/zh/docs/latest/tutorial/ipc
// IPC API https://www.electronjs.org/zh/docs/latest/api/ipc-renderer
import 'element-plus/es/components/button/style/index'

function sendMessageToMainProcess(): void {
  const message = 'sendMessageToMainProcess'
  // noinspection TypeScriptUnresolvedVariable
  window.electronAPI.setTitle(message)
  // noinspection TypeScriptUnresolvedVariable
  window.electronAPI.setTitle1(message + message)
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function openFile() {
  const filePath = await window.electronAPI.openFile()
  console.log(filePath)
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function execCmd() {
  const result = await window.electronAPI.execCmd('adb devices')
  console.log(result)
  ElMessage.info(result)
  /* const NOTIFICATION_TITLE = 'Title'
   const NOTIFICATION_BODY =
     'Notification from the Renderer process. Click to log to console.'
   const CLICK_MESSAGE = 'Notification clicked'

   new Notification(NOTIFICATION_TITLE, { body: result }).onclick =
     () => console.log(CLICK_MESSAGE)*/
}

// eslint-disable-next-line vue/no-export-in-script-setup

const checked1 = ref(true)
const checked2 = ref(false)
const checked3 = ref(false)
const checked4 = ref(false)
const checked5 = ref(false)
const checked6 = ref(false)
const checked7 = ref(false)
const checked8 = ref(false)

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
          <el-button  round type="warning">主要按钮</el-button>
        </el-col>

      </el-row>
    </div>

    <div>
      <el-checkbox v-model="checked1" label="备选项1">备选项1</el-checkbox>
      <el-checkbox v-model="checked2" label="备选项2">备选项2</el-checkbox>
    </div>
    <div>
      <el-checkbox v-model="checked3" label="备选项1" size="medium">备选项1</el-checkbox>
      <el-checkbox v-model="checked4" label="备选项2" size="medium"></el-checkbox>
    </div>
    <div>
      <el-checkbox v-model="checked5" label="备选项1" size="small"></el-checkbox>
      <el-checkbox v-model="checked6" label="备选项2" size="small"></el-checkbox>
    </div>
    <div>
      <el-checkbox v-model="checked7" label="备选项1" size="mini"></el-checkbox>
      <el-checkbox v-model="checked8" label="备选项2" size="mini"></el-checkbox>
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
    <div class="feature-item" @click="sayHello">
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
