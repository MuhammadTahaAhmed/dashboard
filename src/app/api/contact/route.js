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

	// Validate email format
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return new Response(JSON.stringify({ ok: false, error: "Invalid email format" }), { status: 400, headers: { "content-type": "application/json" } });
	}

	try {

		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: process.env.GMAIL_USER || "mudassiralikhan420@gmail.com",
				pass: process.env.GMAIL_APP_PASSWORD, 
			},
		});

		// Email content
		const mailOptions = {
			from: process.env.GMAIL_USER || "mudassiralikhan420@gmail.com",
			to: "mudassiralikhan420@gmail.com",
			subject: `New Contact Form Message from ${name}`,
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
						New Contact Form Submission
					</h2>
					
					<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
						<h3 style="color: #495057; margin-top: 0;">Contact Details</h3>
						<p><strong>Name:</strong> ${name}</p>
						<p><strong>Email:</strong> ${email}</p>
						<p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
					</div>
					
					<div style="background-color: #ffffff; padding: 20px; border: 1px solid #dee2e6; border-radius: 8px;">
						<h3 style="color: #495057; margin-top: 0;">Message</h3>
						<p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
					</div>
					
					<div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 8px; font-size: 14px; color: #6c757d;">
						<p style="margin: 0;">This message was sent from your website contact form.</p>
					</div>
				</div>
			`,
			text: `
				New Contact Form Submission
				
				Name: ${name}
				Email: ${email}
				Date: ${new Date().toLocaleString()}
				
				Message:
				${message}
				
				---
				This message was sent from your website contact form.
			`,
		};

		// Send email
		await transporter.sendMail(mailOptions);

		console.log("Contact form email sent successfully:", { name, email });

		return new Response(JSON.stringify({ ok: true, message: "Message sent successfully" }), { 
			status: 200, 
			headers: { "content-type": "application/json" } 
		});

	} catch (error) {
		console.error("Error sending email:", error);
		
		return new Response(JSON.stringify({ 
			ok: false, 
			error: "Failed to send message. Please try again later." 
		}), { 
			status: 500, 
			headers: { "content-type": "application/json" } 
		});
	}
}
