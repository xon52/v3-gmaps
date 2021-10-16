declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    any // eslint-disable-line @typescript-eslint/no-explicit-any
  >
  export default component
}
