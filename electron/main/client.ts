import MainWindow from "./window/main";
import {app, BrowserWindow} from 'electron'
import ShortcutService from "./shortcut";
import IPCService from "./ipc";

export type ClientContext = EasyCustomerClient

export type HiLinkContextStatus =
  'before-create'
  | 'created'
  | 'before-quit'
  | 'quited'
  | 'before-close'
  | 'closed'

class EasyCustomerClient {
  public status: HiLinkContextStatus = 'before-create'

  public inMeeting: boolean = false
  public isDesktopSharing: boolean = false

  // 窗口
  public mainWindow: MainWindow

  public shortcut: ShortcutService
  public ipc: IPCService

  constructor() { }

  public createClient() {
    app.on('ready', this.onReady.bind(this))
    app.on('before-quit', this.onBeforeQuit.bind(this))
    app.on('window-all-closed', this.onWindowAllClosed.bind(this))
    app.on('activate', this.onActivate.bind(this))
    app.on('quit', this.onQuit.bind(this))

    app.on('second-instance', this.onSecondInstance.bind(this))

    // 限制只运行一个实例
    const isLockFetched = app.requestSingleInstanceLock()
    if (!isLockFetched) { // 没拿到锁则说明有其他实例在运行
      this.status = 'before-quit'
      app.quit()
    }

    process.on('exit', (code) => app.exit(code))
  }

  // 生命周期

  private onReady() {
    this.status = 'created'

    this.createIPC() // 首先创建IPC服务

    // 创建窗口
    this.createMainWindow()

    this.ipc.createMainWindowCommunication()
  }
  private onBeforeQuit() { this.status = 'before-quit' }
  private onWindowAllClosed() {
    this.status = 'closed'
    if (process.platform !== 'darwin') app.quit()
  }
  private onActivate() {
    if (BrowserWindow.getAllWindows().length > 0) return
    if (!this.mainWindow || this.mainWindow.isDestroyed) {
      return this.createMainWindow()
    }

    this.mainWindow.show()
  }
  private onQuit() { this.status = 'quited' }

  private onSecondInstance() {
    if (this.mainWindow) {
      this.mainWindow.focusWindow()
    }
  }

  // 创建窗口
  private createMainWindow() {
    this.mainWindow = new MainWindow(this)
    this.mainWindow.createWindow()

    return this.mainWindow
  }

  // 创建跨进程通信
  private createIPC() {
    if (this.ipc) return

    this.ipc = new IPCService(this)

    this.ipc.createBaseCommunication()
  }
  // 创建快捷键
  private createShortCut() {
    this.shortcut = new ShortcutService(this)

    this.mainWindow.nativeWindow.on('focus', () => this.shortcut.createMainWindowShortcut())
    this.mainWindow.nativeWindow.on('blur', () => this.shortcut.destroyMainWindowShortcut())
  }
}

export default EasyCustomerClient