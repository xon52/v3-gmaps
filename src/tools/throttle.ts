export const throttle = (func: Function, timeout: number | undefined = 500) => {
  let ready = true
  return (...args: any) => {
    if (!ready) return
    ready = false
    func(...args)
    setTimeout(() => {
      ready = true
    }, timeout)
  }
}
