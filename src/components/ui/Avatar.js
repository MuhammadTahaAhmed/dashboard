export default function Avatar({ src, alt = "", size = 56, className = "" }) {
	const dimension = typeof size === "number" ? `${size}px` : size;
	return (
		<div
			className={`ui-avatar ${className}`.trim()}
			style={{ width: dimension, height: dimension }}
		>
			{src ? (
				// eslint-disable-next-line @next/next/no-img-element
				<img src={src} alt={alt} className="ui-avatar-img" />
			) : (
				<div className="ui-avatar-fallback" />
			)}
		</div>
	);
}


