import useRoomInformation from "./useRoomInformation";

let roomList: Array<string> = []
let aliasMap: Map<string, string> = null
let locationMap: Map<string, string> = null

let roomRegexp: RegExp = null

let clearCacheTimer

function clearLocationCache() {
  if (clearCacheTimer) {
    clearTimeout(clearCacheTimer)
    clearCacheTimer = null
  }

  clearCacheTimer = setTimeout(() => {
    roomList.length = 0
    aliasMap && aliasMap.clear()
    locationMap && locationMap.clear()

    aliasMap = null
    locationMap = null
  }, 5 * 60 * 1000) // 缓存5分钟
}

/**
 * 判断当前名称是否是房间的别名
 * @param name
 */
function isRoomAlias(name: string) {
  return aliasMap.has(name.toLowerCase())
}

/**
 * 通过别名获取房间名称
 * @param location
 */
function getRoomViaAlias(location: string): string {
  return aliasMap.get(location.toLowerCase())
}

/**
 * 通过房间名称获取位置信息
 * @param alias
 */
function getLocation(alias: string) {
  const roomName = isRoomAlias(alias) ? getRoomViaAlias(alias) : alias

  return locationMap.get(roomName.toLowerCase())
}

/**
 * 创建提取房间的正则表达式
 */
function createRoomRegexp(): RegExp {
  if (!roomRegexp) {
    const regText = roomList.reduce((prev, value) => (prev ? `${prev}|${value}` : value), '')

    roomRegexp = new RegExp(regText, 'gi')
  }

  return roomRegexp
}

/**
 * 创建房间信息
 */
function createLocationInformation() {
  clearLocationCache() // 定时清理缓存

  if (locationMap && locationMap.size > 0) {
    return
  }

  const room = useRoomInformation()

  roomList = room.roomList
  aliasMap = room.aliasMap
  locationMap = room.locationMap
}

/**
 * 识别位置信息
 * @param text 原始文本
 * @return 文本中包含的位置信息列表
 * 性能 22317 字符 无缓存 2.4ms 有缓存 1.5ms
 */
function recognizeLocation(text: string): Array<string> {
  const locationSet = new Set<string>()

  createLocationInformation()
  createRoomRegexp()

  const matchResult = text.match(roomRegexp) || []

  matchResult.forEach(result => {
    locationSet.add(getLocation(result))
  })

  return Array.from(locationSet)
}

export default recognizeLocation
