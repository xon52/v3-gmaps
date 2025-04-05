/**
 * Creates and returns a complete options object for a circle by combining base options with component props
 * @param baseOptions Initial options object (like map instance)
 * @param props The component props containing circle properties
 * @returns A new options object with all properties resolved
 */
export function resolveCircleOptions(
	baseOptions: Record<string, any>,
	props: Record<string, any>
): Record<string, any> {
	// Start with base options and options from props.options
	const options = { ...baseOptions, ...props.options, ...props };

	return options;
}
