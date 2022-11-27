import extractDateTime from "./useDateExtractor";

function dateFormat(date: Date, fmt: string = "YYYY-MM-DD HH:mm") {
  const opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "M+": (date.getMonth() + 1).toString(),     // 月
    "D+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "m+": date.getMinutes().toString(),         // 分
    "s+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (const k in opt) {
    const ret = new RegExp("(" + k + ")").exec(fmt);

    if (ret) {
      fmt = fmt.replace(
        ret[1],
        (ret[1].length == 1)
          ? (opt[k])
          : (opt[k].padStart(ret[1].length, "0"))
      )
    }
  }

  return fmt;
}

/**
 * 1 YYYY-MM-DD 2022-01-01 2022-1-01 2022-01-1 2022-1-1
 * 2 YY-MM-DD 22-01-01 22-1-01 22-01-1 22-1-1
 * 3 YYYY/MM/DD 2022/01/01 2022/1/01 2022/01/1 2022/1/1
 * 4 YY/MM/DD 22/01/01 22/1/01 22/01/1 22/1/1
 *
 * 5 MM/DD/YYYY 01/01/2022 1/01/2022 01/1/2022 1/1/2022
 * 6 MM/DD/YY 01/01/22 1/02/22 01/1/22 1/1/22
 *
 * 7 YYYY年MM月DD日 2022年01月01日 2022年1月01日 2022年01月1日 2022年1月1日
 * 8 YY年MM月DD日 22年01月01日 22年1月01日 22年01月1日 22年1月1日
 * 9 YYYY年MM月DD号 2022年01月01号 2022年1月01号 2022年01月1号 2022年1月1号
 * 10 YY年MM月DD号 22年01月01号 22年1月01号 22年01月1号 22年1月1号
 */
const fullTimeCaseList = [
  '我们在2022-09-04开会', '我们在2022-9-04开会', '我们在2022-09-4开会', '我们在2022-9-4开会',
  '我们在2022/09/04开会', '我们在2022/9/04开会', '我们在2022/09/4开会', '我们在2022/9/4开会',
  '我们在2022年01月01日开会', '我们在2022年1月01日开会', '我们在2022年01月1日开会', '我们在2022年1月1日开会',
  '我们在2022年01月01号开会', '我们在2022年1月01号开会', '我们在2022年01月1号开会', '我们在2022年1月1号开会',

  '我们在22-09-04开会', '我们在22-9-14开会', '我们在22-09-4开会', '我们在22-9-4开会',
  '我们在22/09/04开会', '我们在22/9/14开会', '我们在22/09/4开会', '我们在22/9/4开会',
  '我们在22年01月01日开会', '我们在22年1月01日开会', '我们在22年01月1日开会', '我们在22年1月1日开会',
  '我们在22年01月01号开会', '我们在22年1月01号开会', '我们在22年01月1号开会', '我们在22年1月1号开会',


  '我们在09/04/2022开会', '我们在9/04/2022开会', '我们在09/4/2022开会', '我们在9/4/2022开会',
  '我们在09/04/22开会', '我们在9/04/22开会', '我们在09/4/22开会', '我们在9/4/22开会',
]

fullTimeCaseList.forEach(time => {
  const dateTimeList = extractDateTime(time)

  console.warn(`${time}`, dateTimeList.map(dateTime => dateFormat(dateTime)))
})


const specialTimeCastList = [
  '我们要在今天开会',
  '我们要在明天开会',
  '我们要在后天开会',
  '我们要在昨天开会',
  '我们要在周一开会',
  '我们要在本周一开会',
  '我们要在这周一开会',
  '我们要在星期一开会',
  '我们要在礼拜一开会',
  '我们要在下周一开会',
  '我们要在下星期一开会',
  '我们要在下礼拜一开会',
  '我们要在周末开会',
  '我们要在下周末开会',
]

specialTimeCastList.forEach(time => {
  const dateTimeList = extractDateTime(time)

  console.warn(`${time}`, dateTimeList.map(dateTime => dateFormat(dateTime)))
})

const specialTimeCaseList = [
  '我们要在15:30开会',
  '我们要在3点30分开会',
  '我们要在3时30分开会',
  '我们要在15点30分开会',
  '我们要在15时30分开会',
  '我们要在下午3点30分开会',
  '我们要在下午3时30分开会',
  '我们要在晚上8点30分开会',
  '我们要在晚上8时30分开会',

  '我们要在晚八点开会',

  '我们要在三点三十分开会',
  '我们要在三时三十分开会',
  '我们要在3点半开会',

  '我们要在3点一刻开会',
  '我们要在3点三刻开会',
]

specialTimeCaseList.forEach(time => {
  const dateTimeList = extractDateTime(time)

  console.warn(`${time}`, dateTimeList.map(dateTime => dateFormat(dateTime)))
})


const rangeTimeCaseList = [
  '例如：1月1日至1月5日，计入待办时',
  '例如：15:00至16:00，计入待办时',
  '例如：1月1日5点至1月2日10点，计入待办时',
  '例如：1月1日5点至7点，计入待办时'
]

rangeTimeCaseList.forEach(time => {
  const dateTimeList = extractDateTime(time)

  console.warn(`${time}`, dateTimeList.map(dateTime => dateFormat(dateTime)))
})
