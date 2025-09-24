export default function Footer() {
	return (
		<footer className="footer">
			<div className="container footer-inner">
				<p>© {new Date().getFullYear()} BrandName. All rights reserved.</p>
				<div className="footer-links">
					<a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
					<a href="https://x.com" target="_blank" rel="noreferrer">X</a>
					<a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
				</div>
			</div>
		</footer>
	);
}
