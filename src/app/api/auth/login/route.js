const users = globalThis.__users || (globalThis.__users = new Map());

export async function POST(request) {
	const contentType = request.headers.get("content-type") || "";
	const data = contentType.includes("application/json") ? await request.json() : Object.fromEntries((await request.formData()).entries());
	const email = String(data.email || "").toLowerCase().trim();
	const password = String(data.password || "").trim();

	const user = users.get(email);
	if (!user || user.password !== password) {
		return new Response(JSON.stringify({ ok: false, error: "Invalid credentials" }), { status: 401, headers: { "content-type": "application/json" } });
	}
	const headers = new Headers({ "content-type": "application/json" });
	headers.append("set-cookie", `session=${encodeURIComponent(email)}; Path=/; HttpOnly; SameSite=Lax`);
	return new Response(JSON.stringify({ ok: true, user: { name: user.name, email } }), { status: 200, headers });
}
