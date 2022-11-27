import {ClientContext} from "./client";
import {app, ipcMain} from 'electron'

class IPCService {
  public context: ClientContext

  constructor(context: ClientContext) { this.context = context }

  /**
   * 创建一些基础的同
   */
  public createBaseCommunication() {
    ipcMain.on('app-quit', () => {
      app.quit()
    })
    ipcMain.on('close-quit', () => {
      app.exit(0)
    })
  }

  /**
   * 创建与主窗口的通信
   */
  public createMainWindowCommunication() {
    const mainWindow = this.context.mainWindow

    ipcMain.on('main:minimize', (_) => mainWindow.minimize())
    ipcMain.on('main:maximize', (_) => {
      if (mainWindow.nativeWindow.isMaximized()) {
        return mainWindow.unmaximize()
      }
      mainWindow.maximize()
    })
    ipcMain.on('main:close', (_) => mainWindow.close())
  }

}

export default IPCService