import forestTheme from './forest'
import autumnTheme from './autumn'
import palaceTheme from './palace'

type CustomTheme = 'forest' | 'autumn' | 'palace' | string

function updateTheme(theme: CustomTheme) {
  localStorage.setItem('AppTheme', theme)

  const favicon: HTMLLinkElement = document.querySelector('link[rel="icon"]');

  if (favicon) {
    favicon.href = `${location.origin}/favicon-${theme}.png`
  }
}

function getAppTheme() {
  const theme: CustomTheme = localStorage.getItem('AppTheme')

  updateTheme(theme || 'autumn')

  if (theme === 'forest') {
    return forestTheme
  }

  if (theme === 'autumn') {
    return autumnTheme
  }

  if (theme === 'palace') {
    return palaceTheme
  }

  return autumnTheme
}

export {
  forestTheme,
  autumnTheme,
  palaceTheme,
  updateTheme,
  getAppTheme,
}