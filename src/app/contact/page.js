"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",	
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const serviceId = process.env.service_gcvlhas;
      const templateId = process.env.template_iyeztuk;
      const publicKey = process.env.DFSVMHQ3VofTukcR8;
      const toEmail = "mudassiralikhan420@gmail.com";

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Email service not configured");
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: toEmail,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section">
      <div className="container section-inner" style={{ maxWidth: 1000 }}>
        <div className="card" style={{ padding: 16 }}>
          <h1 className="hero-title" style={{ fontSize: 32 }}>
            Contact Us
          </h1>
          <p className="hero-subtitle" style={{ marginTop: 8 }}>
            Have a question or want to work together? We'd love to hear from
            you.
          </p>
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <div className="card-body">
            <div
              className="grid"
              style={{
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
                alignItems: "start",
              }}
            >
              <div>
                <h2 className="card-title">Send us a message</h2>
                <p className="card-text" style={{ marginTop: 8 }}>
                  Fill out the form and we'll get back to you within 24 hours.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="grid"
                  style={{ gridTemplateColumns: "1fr", gap: 12, marginTop: 16 }}
                >
                  <div>
                    <label className="label" htmlFor="name">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="email">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="label" htmlFor="message">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="input"
                      rows={6}
                      placeholder="Tell us about your project or question..."
                      required
                    />
                  </div>

                  {submitStatus.message && (
                    <div
                      className={`card-text ${
                        submitStatus.type === "success"
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      {submitStatus.message}
                    </div>
                  )}

                  <div
                    className="card-actions"
                    style={{ display: "flex", gap: 8 }}
                  >
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() =>
                        setFormData({ name: "", email: "", message: "" })
                      }
                    >
                      Clear
                    </Button>
                  </div>
                </form>
              </div>

              <div>
                <h2 className="card-title">Get in touch</h2>
                <div
                  className="grid"
                  style={{ gridTemplateColumns: "1fr", gap: 16, marginTop: 16 }}
                >
                  <div className="card" style={{ padding: 12 }}>
                    <h3 className="card-title">Email</h3>
                    <p className="card-text">mudassiralikhan420@gmail.com</p>
                  </div>
                  <div className="card" style={{ padding: 12 }}>
                    <h3 className="card-title">Response Time</h3>
                    <p className="card-text">Usually within 24 hours</p>
                  </div>
                  <div className="card" style={{ padding: 12 }}>
                    <h3 className="card-title">Business Hours</h3>
                    <p className="card-text">Monday - Friday, 9 AM - 6 PM</p>
                  </div>
                </div>

                <div
                  className="card"
                  style={{ marginTop: 16, padding: 0, overflow: "hidden" }}
                >
                  <iframe
                    style={{ width: "100%", height: 200, border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24175.79994262867!2d-74.0131207!3d40.7080809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a3168b1b6cf%3A0x2e3a3f1e4b1a7eb4!2sNew%20York%20City%20Hall!5e0!3m2!1sen!2sus!4v1686940000000"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
