import {ClientContext} from "./client";
import {globalShortcut} from 'electron'

export enum SHORTCUT_KEY {
  MAIN_OPEN_DEVTOOL = 'CommandOrControl+Shift+u',
  MAIN_REFRESH = 'CommandOrControl+Shift+k'
}

class ShortcutService {
  public context: ClientContext
  constructor(context: ClientContext) { this.context = context }

  /**
   * 创建一些基础的快捷键
   */
  public createBaseShortcut() {

  }

  public createMainWindowShortcut() {
    // TODO 将全局快捷键转化为本地快捷键
    globalShortcut.register(SHORTCUT_KEY.MAIN_OPEN_DEVTOOL, () => {
      this.context.mainWindow.webContent.openDevTools()
    })
    globalShortcut.register(SHORTCUT_KEY.MAIN_REFRESH, () => {
      this.context.mainWindow.reload()
    })
  }

  public destroyMainWindowShortcut() {
    globalShortcut.unregister(SHORTCUT_KEY.MAIN_OPEN_DEVTOOL)
    globalShortcut.unregister(SHORTCUT_KEY.MAIN_REFRESH)
  }
}

export default ShortcutService