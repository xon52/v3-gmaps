declare module '*.vue' {
	import { DefineComponent } from 'vue';
	const component: DefineComponent<
		Record<string, any>,
		Record<string, any>,
		any // eslint-disable-line @typescript-eslint/no-explicit-any
	>;
	export default component;
}
