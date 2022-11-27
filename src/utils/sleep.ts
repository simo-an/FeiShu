function sleep(timeout: number = 0): Promise<void> {
  return new Promise((resolve, reject) => setTimeout(resolve, timeout))
}

export default sleep