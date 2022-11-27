import {BrowserWindow, WebContents, Rectangle} from "electron";
import {ElectronWindowOptions} from "./options";

abstract class BaseWindow {
  public nativeWindow: BrowserWindow
  public webContent: WebContents
  public abstract webContentUrl: string
  public isWebContentLoad: boolean

  public pendingList: Array<{key: string, value: any}> = []

  public get isDestroyed() { return !this.nativeWindow || this.nativeWindow.isDestroyed() }

  protected createNativeWindow(options: ElectronWindowOptions) {
    this.onBeforeCreate()
    this.nativeWindow = new BrowserWindow(options)
    this.webContent = this.nativeWindow.webContents

    if (!this.webContentUrl) {
      throw new Error('You must provide WebContentUrl before created!')
    }

    this.nativeWindow
      .loadURL(this.webContentUrl)
      .then(() => this.isWebContentLoad = true)
      .then(() => this.onCreated())
      .then(() => {
        this.pendingList.forEach(pending => {
          this.sendToRenderer(pending.key, pending.value)
        })
        this.pendingList = []
      })
      .catch((error) => console.warn('load url error: ', error))

    this.nativeWindow.once('ready-to-show', this.onBeforeShow.bind(this))
    this.nativeWindow.on('show', this.onShow.bind(this))
    this.nativeWindow.on('hide', this.onHidden.bind(this))
    this.nativeWindow.on('close', this.onBeforeClose.bind(this))
    this.nativeWindow.once('closed', this.onClosed.bind(this))
  }
  // 生命周期
  public abstract onBeforeCreate();
  public abstract onCreated();
  public abstract onBeforeShow();
  public abstract onShow();
  public abstract onHidden();
  public abstract onBeforeClose(event: Event);
  public abstract onClosed();
  // 一些基础操作
  public show() {
    if (this.isDestroyed) return

    this.nativeWindow.show()
  }
  public hide() {
    if (this.isDestroyed) return

    this.nativeWindow.hide()
  }
  public close() {
    return !this.isDestroyed && this.nativeWindow.close()
  }
  public forceClose() {
    return !this.isDestroyed && this.nativeWindow.destroy()
  }
  public reload() {
    return !this.isDestroyed && this.nativeWindow.reload()
  }
  public destroy() {
    if (this.isDestroyed) return

    this.nativeWindow.destroy()
    this.nativeWindow = null
  }
  public maximize() {
    if (this.isDestroyed) return

    this.nativeWindow.maximize()
  }
  public minimize() {
    if (this.isDestroyed) return

    this.nativeWindow.minimize()
  }

  public unmaximize() {
    if (this.isDestroyed) return

    this.nativeWindow.unmaximize()
  }
  public centralize() {
    if (this.isDestroyed) return

    this.nativeWindow.center()
  }

  public setBounds(rect: Rectangle) {
    if (this.isDestroyed) return

    this.nativeWindow.setBounds(rect)
  }

  /**
   * 向渲染进程发送数据（考虑渲染检测未加载情况）
   * @param channel
   * @param params
   */
  public sendToRenderer(channel: string, params?: any) {
    if (!this.nativeWindow) return
    if (!this.isWebContentLoad) { // 页面未加载成功，则放入pending列表
      this.pendingList.push({key: channel, value: params})

      return
    }

    this.webContent.send(channel, params)
  }
}

export default BaseWindow