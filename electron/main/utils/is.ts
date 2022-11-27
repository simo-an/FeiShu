import {app} from 'electron'

export const isDev = !app.isPackaged

export const isWin32 = process.platform === 'win32'
export const isDarwin = process.platform === 'darwin'