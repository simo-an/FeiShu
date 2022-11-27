function createRegexp(text: string, flag?: string, format?: Record<string, string>) {
  if (!format) {
    return new RegExp(text,flag)
  }

  let regexpText = text

  Object.keys(format).forEach(key => {
    regexpText = regexpText.replace(
      new RegExp(`{${key}}`, 'g'),
      format[key]
    )
  })

  return new RegExp(regexpText, flag)
}

type RepeatMode = '?' | '+' | '*'

function createOrRegexp(
  textList: Array<string>,
  repeat?: RepeatMode,
  flag: string = 'g',
  format?: Record<string, string>
): RegExp {
  let regexpText = textList.join('|')

  if (repeat) {
    regexpText = `(${regexpText})${repeat}`
  }

  if (format) {
    Object.keys(format).forEach(key => {
      regexpText = regexpText.replace(
        new RegExp(`{${key}}`, 'g'),
        format[key]
      )
    })
  }

  return new RegExp(regexpText, flag)
}

function createExistRegexp(textList: Array<string>, repeat?: RepeatMode, flag: string = 'g'): RegExp {
  let regexpText = `${textList.join('?')}?`

  if (repeat) {
    regexpText = `(${regexpText})${repeat}`
  }

  return new RegExp(regexpText, flag)
}

export {
  createRegexp,
  createOrRegexp,
  createExistRegexp
}
