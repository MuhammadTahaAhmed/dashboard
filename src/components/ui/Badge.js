export default function Badge({ children, variant = "default", className = "", ...props }) {
	const variantClass = variant === "outline"
		? "ui-badge-outline"
		: variant === "secondary"
			? "ui-badge-secondary"
			: "ui-badge";
	const classes = `${variantClass} ${className}`.trim();
	return (
		<span className={classes} {...props}>
			{children}
		</span>
	);
}


