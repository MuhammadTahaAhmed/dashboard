export default function Badge({ children, variant = "default", className = "" }) {
	const v = variant === "outline" ? "ui-badge-outline" : variant === "secondary" ? "ui-badge-secondary" : "ui-badge";
	return <span className={`${v} ${className}`.trim()}>{children}</span>;
}


