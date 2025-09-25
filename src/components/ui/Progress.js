export default function Progress({ value = 0, className = "" }) {
	const clamped = Math.max(0, Math.min(100, value));
	return (
		<div className={`ui-progress ${className}`.trim()} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={clamped}>
			<div className="ui-progress-bar" style={{ width: `${clamped}%` }} />
		</div>
	);
}


