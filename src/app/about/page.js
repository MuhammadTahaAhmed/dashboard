export const metadata = {
	title: "About",
	description: "Learn about our mission and what we do.",
};

export default function AboutPage() {
	return (
		<section className="section">
			<div className="container section-inner" style={{ maxWidth: 800 }}>
				<h1 className="hero-title" style={{ fontSize: 32 }}>About Us</h1>
				<p className="hero-subtitle" style={{ marginTop: 8 }}>
					We build modern, fast, and accessible web experiences using Next.js and React. Our focus is on clean design, performance, and delightful user interactions.
				</p>
				<p className="hero-subtitle" style={{ marginTop: 8 }}>
					This starter showcases bests practices, a minimal aesthetic, and a scalable structure so you can move fast.
				</p>
			</div>
		</section>
	);
}
