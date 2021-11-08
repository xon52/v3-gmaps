import { ref, Ref } from 'vue'

export const logs: Ref<string[]> = ref([])
export const clearLogs = () => (logs.value = [])
export const log: (s: string) => void = (s) => {
  // console.log(s)
  logs.value.unshift(s)
}
