import { ref, Ref } from 'vue'

export const logs: Ref<string[]> = ref([])
export const log: (s: string) => void = (s) => logs.value.unshift(s)
export const clearLogs = () => (logs.value = [])
