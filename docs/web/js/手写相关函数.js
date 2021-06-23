function throttle(callback, wait) {
  let timer = ''
  const startTime = new Date()
  return (...args) => {
    const now = new Date()
    if (now - startTime >= wait) {
      callback(args[0])
    } else {
      clearTimeout(timer)
      timer = setTimeout(callback, wait)
    }
  }
}
