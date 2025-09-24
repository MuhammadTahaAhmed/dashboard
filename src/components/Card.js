import Image from "next/image";
import Button from "./Button";

export default function Card({ imageSrc, title, description, ctaText = "Learn more", href = "#" }) {
	return (
		<div className="card">
			<div className="card-media">
				{imageSrc ? (
					<Image src={imageSrc} alt={title} fill className="object-cover" />
				) : null}
			</div>
			<h3 className="card-title">{title}</h3>
			<p className="card-text">{description}</p>
			<div className="card-actions">
				<Button as="a" href={href} variant="primary" size="sm">
					{ctaText}
				</Button>
			</div>
		</div>
	);
}
