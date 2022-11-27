export const noop = () => {}
export const nextTick = (callback: Function, timeout: number = 0) => {
  setTimeout(() => callback(), timeout)
}