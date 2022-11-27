import BaseWindow from "./base";
import { useMainWindowOptions } from "./options";
import { isDev } from "../utils/is";
import { join } from "path";
import { ClientContext } from "../client";
import { shell, app } from "electron";

class MainWindow extends BaseWindow {
  public context: ClientContext

  public webContentUrl: string

  constructor(context: ClientContext) {
    super()
    this.context = context
  }

  public createWindow() {
    this.createNativeWindow(useMainWindowOptions())
  }

  // 生命周期
  public onBeforeCreate() {
    this.webContentUrl = isDev
      ? process.env.VITE_DEV_SERVER_URL
      : `file://${join(process.env.DIST, 'index.html')}`
  }
  public onCreated() {
    this.nativeWindow.setMenu(null)
    this.show()

    // 链接使用外部浏览器打开
    this.webContent.setWindowOpenHandler((details) => {
      shell.openExternal(details.url).then(() => {})

      return {action: 'deny'}
    })
    this.webContent.on('will-navigate', (event, url) => {
      event.preventDefault()

      shell.openExternal(url).then(() => {})
    })

    this.webContent.on('did-finish-load', () => {
      this.sendToRenderer('main-process-message', new Date().toLocaleString())
    })
  }
  public onBeforeShow() { this.show() }
  public onHidden() { }
  public onShow() {
    if (isDev) {
      this.webContent.openDevTools()
    }
  }
  public onBeforeClose() {}
  public onClosed() {
    this.webContent = null
    this.nativeWindow = null

    app.exit(0)
  }

  public focusWindow() {
    if (this.isDestroyed) return

    if (this.nativeWindow.isMinimized()) {
      this.nativeWindow.restore()
    }
    if (!this.nativeWindow.isVisible()) {
      this.nativeWindow.show()
    }

    this.nativeWindow.focus()
  }
}

export default MainWindow