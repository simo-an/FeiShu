export function toBase64(text: string) {
  return Buffer.from(text, 'utf8').toString('base64');
}

export function toText(base64: string) {
  return Buffer.from(base64, 'base64').toString('utf8');
}