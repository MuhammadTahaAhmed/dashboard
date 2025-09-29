"use client";

import { useState, useCallback } from "react";

export default function ContactForm() {
    const [status, setStatus] = useState({ state: "idle", message: "" });
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [errorToast, setErrorToast] = useState("");

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
            setErrorToast("Please fill out all fields.");
            setTimeout(() => setErrorToast(""), 3500);
            return;
        }
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            setStatus({ state: "error", message: "Please enter a valid email address." });
            setErrorToast("Please enter a valid email address.");
            setTimeout(() => setErrorToast(""), 3500);
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
                setShowSuccessToast(true);
                setTimeout(() => setShowSuccessToast(false), 3500);
                form.reset();
            } else {
                const msg = data?.error || "Failed to send message.";
                setStatus({ state: "error", message: msg });
                setErrorToast(msg);
                setTimeout(() => setErrorToast(""), 3500);
            }
        } catch (err) {
            const msg = "Network error. Please try again.";
            setStatus({ state: "error", message: msg });
            setErrorToast(msg);
            setTimeout(() => setErrorToast(""), 3500);
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
            {/* Removed inline validation text per request */}

            {showSuccessToast && (
                <div
                    role="alert"
                    aria-live="assertive"
                    style={{
                        position: "fixed",
                        right: 16,
                        top: 16,
                        background: "#10b981",
                        color: "white",
                        padding: "12px 16px",
                        borderRadius: 8,
                        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
                        zIndex: 1000
                    }}
                >
                    Message sent successfully
                </div>
            )}

            {Boolean(errorToast) && (
                <div
                    role="alert"
                    aria-live="assertive"
                    style={{
                        position: "fixed",
                        right: 16,
                        top: 16,
                        transform: showSuccessToast ? "translateY(56px)" : undefined,
                        background: "#ef4444",
                        color: "white",
                        padding: "12px 16px",
                        borderRadius: 8,
                        boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
                        zIndex: 1001
                    }}
                >
                    {errorToast}
                </div>
            )}
        </form>
    );
}


