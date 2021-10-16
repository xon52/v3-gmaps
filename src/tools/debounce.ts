export const debounce = (fn: Function, wait = 300, maxWait = 1000) => {
  let timer: number | null
  let maxTimer: number | null
  return (...args: any) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      if (maxTimer) clearTimeout(maxTimer)
      maxTimer = null
      fn(...args)
    }, wait)
    if (maxWait && !maxTimer) {
      maxTimer = setTimeout(() => {
        if (timer) clearTimeout(timer)
        maxTimer = null
        fn(...args)
      }, maxWait)
    }
  }
}
