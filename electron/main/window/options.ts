import {BrowserWindowConstructorOptions} from 'electron'
import {join} from "path";

export type ElectronWindowOptions = BrowserWindowConstructorOptions

const mergePlainObject = (source: object, target: object) => {
  Reflect.ownKeys(source).forEach(key => target[key] = target[key] ?? source[key])
}

export const mergeOptions = (
  source: ElectronWindowOptions,
  target: ElectronWindowOptions
): ElectronWindowOptions => {
  const keyList = Reflect.ownKeys(source)

  keyList.forEach(key => {
    target[key] = target[key] ?? source[key]
    if (key === 'webPreferences') { // 单独处理 webPreferences
      mergePlainObject(target[key], source[key])
    }
  })

  return target
}

export function useMainWindowOptions() {
  return {
    title: '飞书',
    icon: join(process.env.PUBLIC, 'favicon.png'),
    width: 1120,
    height: 760,
    minWidth: 920,
    minHeight: 640,
    frame: false,
    backgroundColor: "#FFFFFF",
    alwaysOnTop: true,
    webPreferences: {
      preload:  join(__dirname, '../../preload/index.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  } as BrowserWindowConstructorOptions
}