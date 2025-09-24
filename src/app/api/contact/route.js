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

	// In a real app, send email or store in DB here
	console.log("Contact form submission:", { name, email, message });

	return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "content-type": "application/json" } });
}
