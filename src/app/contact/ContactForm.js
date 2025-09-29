"use client";

import { useState, useCallback } from "react";

export default function ContactForm() {
    const [status, setStatus] = useState({ state: "idle", message: "" });

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setStatus({ state: "submitting", message: "" });

        const form = e.currentTarget;
        const formData = new FormData(form);
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const message = String(formData.get("message") || "").trim();

        if (!name || !email || !message) {
            setStatus({ state: "error", message: "Please fill out all fields." });
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setStatus({ state: "error", message: "Please enter a valid email address." });
            return;
        }

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "content-type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ name, email, message }).toString(),
            });
            const data = await res.json().catch(() => ({ ok: false, error: "Unexpected response" }));

            if (res.ok && data?.ok) {
                const extra = data.previewUrl ? " (Preview available in console)" : "";
                if (data.previewUrl) console.log("Email preview:", data.previewUrl);
                setStatus({ state: "success", message: "Message sent successfully." + extra });
                form.reset();
            } else {
                setStatus({ state: "error", message: data?.error || "Failed to send message." });
            }
        } catch (err) {
            setStatus({ state: "error", message: "Network error. Please try again." });
        }
    }, []);

    const isSubmitting = status.state === "submitting";

    return (
        <form onSubmit={handleSubmit} className="form" style={{ display: "grid", gap: 12 }} noValidate>
            <div>
                <label className="label">Name</label>
                <input required type="text" name="name" className="input" placeholder="Your name" />
            </div>
            <div>
                <label className="label">Email</label>
                <input required type="email" name="email" className="input" placeholder="you@example.com" />
            </div>
            <div>
                <label className="label">Message</label>
                <textarea required name="message" className="textarea" placeholder="How can we help?"></textarea>
            </div>
            <button type="submit" className="btn btn-md btn-primary" disabled={isSubmitting} aria-busy={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
            </button>
            <div role="status" aria-live="polite" style={{ minHeight: 20, color: status.state === "error" ? "#ef4444" : status.state === "success" ? "#10b981" : undefined }}>
                {status.message}
            </div>
        </form>
    );
}


