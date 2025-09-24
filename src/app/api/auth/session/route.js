const users = globalThis.__users || (globalThis.__users = new Map());

function parseCookies(header) {
	const out = {};
	(header || "").split(/;\s*/).forEach(p => {
		const [k, ...rest] = p.split("=");
		if (!k) return;
		out[k] = decodeURIComponent(rest.join("="));
	});
	return out;
}

export async function GET(request) {
	const cookies = parseCookies(request.headers.get("cookie") || "");
	const email = cookies.session;
	if (!email) return Response.json({ ok: true, user: null });
	const user = users.get(email);
	if (!user) return Response.json({ ok: true, user: null });
	return Response.json({ ok: true, user: { name: user.name, email: user.email } });
}
