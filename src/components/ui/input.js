import { cn } from "./cn";

export function Input({ className = "", ...props }) {
	return <input className={cn("input", className)} {...props} />;
}

