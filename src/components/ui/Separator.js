export default function Separator({ orientation = "horizontal", className = "" }) {
	const isVertical = orientation === "vertical";
	return <div className={`ui-separator ${isVertical ? "vertical" : "horizontal"} ${className}`.trim()} />;
}


