import nodemailer from "nodemailer";

export async function POST(request) {
	const contentType = request.headers.get("content-type") || "";
	let body = {};
	if (contentType.includes("application/json")) {
		body = await request.json();
	} else if (contentType.includes("application/x-www-form-urlencoded")) {
		const formData = await request.formData();
		body = Object.fromEntries(formData.entries());
	} else if (contentType.includes("multipart/form-data")) {
		const formData = await request.formData();
		body = Object.fromEntries(formData.entries());
	} else {
		// Fallback attempt as form-encoded
		try {
			const formData = await request.formData();
			body = Object.fromEntries(formData.entries());
		} catch (e) {}
	}

	const name = String(body.name || "").trim();
	const email = String(body.email || "").trim();
	const message = String(body.message || "").trim();

	if (!name || !email || !message) {
		return new Response(JSON.stringify({ ok: false, error: "Missing required fields" }), { status: 400, headers: { "content-type": "application/json" } });
	}

    // Send an email to the address the user entered
    // Configure SMTP via environment vars
    const host = process.env.SMTP_HOST;
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const from = process.env.SMTP_FROM || user;

    try {
        let transporter;
        let usingTestAccount = false;
        if (!host || !user || !pass) {
            // Dev fallback: create an ethereal.email test account
            const testAccount = await nodemailer.createTestAccount();
            transporter = nodemailer.createTransport({
                host: testAccount.smtp.host,
                port: testAccount.smtp.port,
                secure: testAccount.smtp.secure,
                auth: { user: testAccount.user, pass: testAccount.pass },
            });
            usingTestAccount = true;
        } else {
            transporter = nodemailer.createTransport({
                host,
                port,
                secure: port === 465,
                auth: { user, pass },
            });
        }

        const siteOwnerEmail = process.env.CONTACT_TO_EMAIL || "testingforcursor1@gmail.com";
        const info = await transporter.sendMail({
            from,
            to: siteOwnerEmail, // deliver to site owner's inbox
            replyTo: email, // so you can reply directly to the visitor
            subject: `New message from ${name} via Contact Form`,
            text: `From: ${name} <${email}>\n\n${message}`,
            html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p><strong>Message:</strong></p><blockquote>${escapeHtml(message)}</blockquote>`,
        });

        const previewUrl = usingTestAccount ? nodemailer.getTestMessageUrl(info) : undefined;
        return new Response(JSON.stringify({ ok: true, previewUrl }), { status: 200, headers: { "content-type": "application/json" } });
    } catch (err) {
        console.error("Contact email send failed:", err);
        return new Response(JSON.stringify({ ok: false, error: "Failed to send email" }), { status: 500, headers: { "content-type": "application/json" } });
    }
}

function escapeHtml(input) {
    return String(input)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
