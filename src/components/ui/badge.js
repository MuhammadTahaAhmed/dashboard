import { cn } from "./cn";

export function Badge({ className = "", variant = "default", ...props }) {
	const variantClass =
		variant === "success"
			? "badge-success"
			: variant === "info"
			? "badge-info"
			: variant === "warning"
			? "badge-warning"
			: variant === "danger"
			? "badge-danger"
			: undefined;
	return <span className={cn("badge", variantClass, className)} {...props} />;
}

