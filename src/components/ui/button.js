import { cn } from "./cn";

export function Button({ className = "", size = "md", variant = "primary", type = "button", ...props }) {
    const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "btn-md";
    const variantClass =
        variant === "ghost"
            ? "btn-ghost"
            : variant === "secondary"
            ? "btn-secondary"
            : variant === "accent"
            ? "btn-accent"
            : variant === "success"
            ? "btn-success"
            : variant === "warning"
            ? "btn-warning"
            : variant === "danger"
            ? "btn-danger"
            : "btn-primary";
    return <button type={type} className={cn("btn", sizeClass, variantClass, className)} {...props} />;
}

