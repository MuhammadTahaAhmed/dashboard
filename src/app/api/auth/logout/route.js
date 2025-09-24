export async function POST() {
	const headers = new Headers({ "content-type": "application/json" });
	headers.append("set-cookie", `session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
	return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
}
