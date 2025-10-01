import Card from "@/components/Card";

export const metadata = {
	title: "Services",
	description: "Explore our services and offerings.",
};

const services = [
	{ title: "Web Development", description: "High-performance websites built with Next.js and React.", imageSrc: "/window.svg" },
	{ title: "UI/UX Design", description: "Clean, minimal interfaces focused on usability.", imageSrc: "/file.svg" },
	{ title: "SEO & Performance", description: "Technical SEO and speed optimization for better rankings.", imageSrc: "/globe.svg" },
];

export default function ServicesPage() {
	return (
		<section className="section">
			<div className="container section-inner">
				<h1 className="hero-title" style={{ fontSize: 32 }}>Our Services</h1>
				<div className="spacer-md"></div>
				<div className="grid grid-3">
					{services.map((s, i) => (
						<Card key={i} title={s.title} description={s.description} imageSrc={s.imageSrc} href="#" />
					))}
				</div>
			</div>
		</section>
	);
}
