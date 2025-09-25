export function Table({ children }) {
	return <table className="table">{children}</table>;
}

export function TableHeader({ children }) {
	return <thead>{children}</thead>;
}

export function TableBody({ children }) {
	return <tbody>{children}</tbody>;
}

export function TableRow({ children }) {
	return <tr>{children}</tr>;
}

export function TableHead({ children, style }) {
	return <th style={style}>{children}</th>;
}

export function TableCell({ children, style }) {
	return <td style={style}>{children}</td>;
}

