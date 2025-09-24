import Link from "next/link";

export default function Button({ as = "button", href = "#", children, variant = "primary", size = "md", className = "", ...props }) {
	const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "btn-md";
	const variantClass = variant === "ghost" ? "btn-ghost" : "btn-primary";
	const classes = `btn ${sizeClass} ${variantClass} ${className}`.trim();
	if (as === "a") {
		return (
			<Link href={href} className={classes} {...props}>
				{children}
			</Link>
		);
	}
	return (
		<button className={classes} {...props}>
			{children}
		</button>
	);
}
