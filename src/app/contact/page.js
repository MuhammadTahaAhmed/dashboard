export const metadata = {
    title: "Contact",
    description: "Get in touch with us.",
};
import ContactForm from "./ContactForm";

export default function ContactPage() {
    return (
        <section className="section">
            <div className="container section-inner">
                <h1 className="hero-title" style={{ fontSize: 32 }}>Contact Us</h1>
                <div className="spacer-md"></div>
                <div className="grid-2" style={{ alignItems: "start" }}>
                    <ContactForm />
                    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                        <iframe
                            style={{ width: "100%", minHeight: 300, border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24175.79994262867!2d-74.0131207!3d40.7080809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a3168b1b6cf%3A0x2e3a3f1e4b1a7eb4!2sNew%20York%20City%20Hall!5e0!3m2!1sen!2sus!4v1686940000000">
                        </iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
