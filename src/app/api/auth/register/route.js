const users = globalThis.__users || (globalThis.__users = new Map());

export async function POST(request) {
	const contentType = request.headers.get("content-type") || "";
	const data = contentType.includes("application/json") ? await request.json() : Object.fromEntries((await request.formData()).entries());
	const name = String(data.name || "").trim();
	const email = String(data.email || "").toLowerCase().trim();
	const password = String(data.password || "").trim();

	if (!name || !email || !password) {
		return new Response(JSON.stringify({ ok: false, error: "Missing fields" }), { status: 400, headers: { "content-type": "application/json" } });
	}
	if (users.has(email)) {
		return new Response(JSON.stringify({ ok: false, error: "User already exists" }), { status: 409, headers: { "content-type": "application/json" } });
	}
	users.set(email, { name, email, password });

	return new Response(JSON.stringify({ ok: true, user: { name, email } }), { status: 200, headers: { "content-type": "application/json" } });
}
