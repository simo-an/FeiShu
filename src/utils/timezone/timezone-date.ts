/**
 * 标准时区	  夏令时区	  夏令时规则    	时区名	        中文	    英文
 * GMT-08:00	GMT-07:00	3月第2个星期日02:00到11月第1个星期天02:00	太平洋标准时间	洛杉矶	Los Angeles
 * GMT-06:00	GMT-05:00	同上          美国中部标准时间	芝加哥	Chicago
 * GMT-05:00	GMT-04:00	同上          北美东部标准时间	纽约	New York
 * GMT+00:00	GMT+01:00	3月最后一个星期日01:00到10月最后一个星期日02:00	格林威治标准时间	伦敦	London
 * GMT+01:00	GMT+02:00	3月最后一个星期日02:00到10月最后一个星期日03:00	欧洲中部时间	巴黎	Paris
 * GMT+03:00	-	-	      - -           莫斯科标准时间	莫斯科	  Moscow
 * GMT+04:00	-	-	      - -           海湾标准时间	  迪拜	    Dubai
 * GMT+07:00	-	-	      - -           印尼西部时间	  雅加达	  Jakarta
 * GMT+08:00	-	-	      - -           新加坡时间	    新加坡	  Singapore
 * GMT+08:00	-	-	      - -           中国标准时间	  北京	    Beijing
 * GMT+09:00	-	-	      - -           日本标准时间	  东京	    Tokyo
 * GMT+10:00	GMT+11:00	10月第一个星期天02:00到4月第一个星期天03:00	澳大利亚东部标准时间	悉尼	Sydney
 */

export interface TimeZoneItem {
  zoneId: string
  cnZoneName: string  // 中文显示名称
  usZoneName: string  // 英文显示名称
  gmtOffsetName: string
  gmtOffset: number
  dstOffset?: number
  dstOffsetName?: string
  inDST?: boolean,
  dstRule?: {
    dateEnd: string
    dateStart: string
    daylightDelta: string
    end: {
      day: number
      month: number
      week: number
      dayOfWeek: string
      hour: number // 2 === '02:00:00' 凌晨两点
    },
    start: {
      day: number
      month: number
      week: number
      dayOfWeek: string
      hour: number
    }
  } // 夏令时规则
}

// GMT-08:00	GMT-07:00	3月第2个星期日02:00到11月第1个星期日02:00	太平洋标准时间	洛杉矶	Los Angeles
const LosAngeles: TimeZoneItem = {
  zoneId:"Pacific_Standard_Time",
  cnZoneName:"美国 洛杉矶",
  usZoneName:"Los Angeles",
  gmtOffset:-28800,
  dstOffset: -25200,
  gmtOffsetName:"-08:00",
  dstOffsetName:"-07:00",
  dstRule: {
    dateStart:"2007-01-01 00:00:00",
    dateEnd:"9999-12-31 00:00:00",
    daylightDelta:"01:00:00",
    start:{
      day:7,
      month:3,
      week:2,
      dayOfWeek:"Sunday",
      hour:2 // 2 hours 02:00:00
    },
    end:{
      day:7,
      month:11,
      week:1,
      dayOfWeek:"Sunday",
      hour:2
    }
  }
}
// GMT-06:00	GMT-05:00	同上          美国中部标准时间	芝加哥	Chicago
const Chicago: TimeZoneItem = {
  zoneId:"Central_Standard_Time",
  cnZoneName:"美国 芝加哥",
  usZoneName:"Chicago",
  gmtOffset: -21600,
  dstOffset:-18000,
  gmtOffsetName:"-06:00",
  dstOffsetName:"-05:00",
  dstRule: {
    dateStart:"2007-01-01 00:00:00",
    dateEnd:"9999-12-31 00:00:00",
    daylightDelta:"01:00:00",
    start:{
      day:7,
      month:3,
      week:2,
      dayOfWeek:"Sunday",
      hour:2
    },
    end:{
      day:7,
      month:11,
      week:1,
      dayOfWeek:"Sunday",
      hour:2
    }
  }
}
// GMT-05:00	GMT-04:00	同上          北美东部标准时间	纽约	New York
const NewYork: TimeZoneItem = {
  zoneId:"Eastern_Standard_Time",
  cnZoneName:"美国 纽约",
  usZoneName:"New York",
  gmtOffset:-18000,
  dstOffset:-14400,
  gmtOffsetName:"-05:00",
  dstOffsetName:"-04:00",
  dstRule: {
    dateStart:"2007-01-01 00:00:00",
    dateEnd:"9999-12-31 00:00:00",
    daylightDelta:"01:00:00",
    start:{
      day:7,
      month:3,
      week:2,
      dayOfWeek:"Sunday",
      hour:2
    },
    end:{
      day:7,
      month:11,
      week:1,
      dayOfWeek:"Sunday",
      hour:2
    }
  }
}
// GMT+00:00	GMT+01:00	3月最后一个星期日01:00到10月最后一个星期日02:00	格林威治标准时间	伦敦	London
const London: TimeZoneItem = {
  zoneId:"GMT_Standard_Time",
  cnZoneName:"英国 伦敦",
  usZoneName:"London",
  gmtOffset:0,
  dstOffset: 3600,
  gmtOffsetName:"+00:00",
  dstOffsetName:"+01:00",
  dstRule: {
    dateStart:"0001-01-01 00:00:00",
    dateEnd:"9999-12-31 00:00:00",
    daylightDelta:"01:00:00",
    start:{
      day:7,
      month:3,
      week:Infinity,    // 无穷大标识最后一周
      dayOfWeek:"Sunday",
      hour:1
    },
    end:{
      day:7,
      month:10,
      week:Infinity,
      dayOfWeek:"Sunday",
      hour:2
    }
  }
}
// GMT+01:00	GMT+02:00	3月最后一个星期日02:00到10月最后一个星期日03:00	欧洲中部时间	巴黎	Paris
const Paris: TimeZoneItem = {
  zoneId:"Romance_Standard_Time",
  cnZoneName:"法国 巴黎",
  usZoneName:"Paris",
  gmtOffset:3600,
  dstOffset:7200,
  gmtOffsetName:"+01:00",
  dstOffsetName:"+02:00",
  dstRule: {
    dateStart:"0001-01-01 00:00:00",
    dateEnd:"9999-12-31 00:00:00",
    daylightDelta:"01:00:00",
    start:{
      day:7,
      month:3,
      week:Infinity,    // 无穷大标识最后一周
      dayOfWeek:"Sunday",
      hour:2
    },
    end:{
      day:7,
      month:10,
      week:Infinity,
      dayOfWeek:"Sunday",
      hour:3
    }
  }
}
// GMT+03:00	-	-	      - -           莫斯科标准时间	莫斯科	  Moscow
const Moscow: TimeZoneItem = {
  zoneId:"Russian_Standard_Time",
  cnZoneName:"俄罗斯 莫斯科",
  usZoneName:"Moscow",
  gmtOffset:10800,
  gmtOffsetName:"+03:00",
}
// GMT+04:00	-	-	      - -           海湾标准时间	  迪拜	    Dubai
const Dubai: TimeZoneItem = {
  zoneId:"Georgian_Standard_Time",
  cnZoneName:"迪拜",
  usZoneName:"Dubai",
  gmtOffset:14400,
  gmtOffsetName:"+04:00",
}
// GMT+07:00	-	-	      - -           印尼西部时间	  雅加达	  Jakarta
const Jakarta: TimeZoneItem = {
  zoneId:"SE_Asia_Standard_Time",
  cnZoneName:"印度尼西亚 雅加达",
  usZoneName:"Jakarta",
  gmtOffset:25200,
  gmtOffsetName:"+07:00",
}
// GMT+08:00	-	-	      - -           新加坡时间	    新加坡	  Singapore
const Singapore: TimeZoneItem = {
  zoneId:"Singapore_Standard_Time",
  cnZoneName:"新加坡",
  usZoneName:"Singapore",
  gmtOffset:28800,
  gmtOffsetName:"+08:00",
}
// GMT+08:00	-	-	      - -           中国标准时间	  北京	    Beijing
const Beijing: TimeZoneItem = {
  zoneId:"China_Standard_Time",
  cnZoneName:"中国 北京",
  usZoneName:"Beijing",
  gmtOffset:28800,
  gmtOffsetName:"+08:00",
}
// GMT+09:00	-	-	      - -           日本标准时间	  东京	    Tokyo
const Tokyo: TimeZoneItem = {
  zoneId:"Tokyo_Standard_Time",
  cnZoneName:"日本 东京",
  usZoneName:"Tokyo",
  gmtOffset:32400,
  gmtOffsetName:"+09:00",
}
// GMT+10:00	GMT+11:00	10月第一个星期天02:00到4月第一个星期天03:00	澳大利亚东部标准时间	悉尼	Sydney
const Sydney: TimeZoneItem = {
  zoneId:"AUS_Eastern_Standard_Time",
  cnZoneName:"澳大利亚 悉尼",
  usZoneName:"Sydney",
  gmtOffset:36000,
  dstOffset:39600,
  gmtOffsetName:"+10:00",
  dstOffsetName:"+11:00",
  dstRule: {
    dateStart:"2007-01-01 00:00:00",
    dateEnd:"9999-12-31 00:00:00",
    daylightDelta:"01:00:00",
    start:{
      day:7,
      month:10,
      week:1,
      dayOfWeek:"Sunday",
      hour:2
    },
    end:{
      day:7,
      month:4,
      week:1,
      dayOfWeek:"Sunday",
      hour:3
    }
  }
}

export const timeZoneList: TimeZoneItem[] = [
  LosAngeles, Chicago, NewYork, London, Paris,
  Moscow, Dubai,
  Jakarta, Beijing, Tokyo,
  Sydney
]

export const defaultTimeZone = Beijing

//////////////// 一些工具方法

export const getTimeZone = (): TimeZoneItem => {
  const offset = -new Date().getTimezoneOffset()*60

  return timeZoneList.find(tz => tz.gmtOffset === offset) || Beijing
}


export const getTimeZoneText = (date?: Date): string => {
  const offset = -(date || new Date()).getTimezoneOffset()

  const hour = String((Math.abs(offset) / 60) | 0).padStart(2, '0')
  const minute = String(((Math.abs(offset) / 60) % 1) * 60).padStart(2, '0')

  return `${offset >= 0 ? '+' : '-'}${hour}:${minute}`
}
