import { cn } from "./cn";

export function Button({ className = "", size = "md", variant = "primary", type = "button", ...props }) {
	const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "btn-md";
	const variantClass = variant === "ghost" ? "btn-ghost" : "btn-primary";
	return <button type={type} className={cn("btn", sizeClass, variantClass, className)} {...props} />;
}

