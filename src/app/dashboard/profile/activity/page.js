"use client";

import { useMemo, useState } from "react";

const seedActivities = [
  {
    id: "a1",
    type: "save",
    title: "Inclusive Leadership Workshop",
    date: "2025-10-02T14:12:00Z",
    meta: { by: "You" },
  },
  {
    id: "a2",
    type: "comment",
    title: "Mental health resources",
    date: "2025-10-01T09:33:00Z",
    meta: { by: "You", snippet: "Great list, thanks for sharing!" },
  },
  {
    id: "a3",
    type: "join",
    title: "Product Design Meetup",
    date: "2025-09-29T18:01:00Z",
    meta: { location: "Remote" },
  },
  {
    id: "a4",
    type: "like",
    title: "Accessibility checklist v2",
    date: "2025-09-29T10:25:00Z",
    meta: { by: "You" },
  },
  {
    id: "a5",
    type: "save",
    title: "Next.js performance tips",
    date: "2025-09-28T16:45:00Z",
    meta: { by: "You" },
  },
];

const typeToLabel = {
  save: "Saved",
  comment: "Commented",
  join: "Joined",
  like: "Liked",
};

export default function ActivityPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [visible, setVisible] = useState(4);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return seedActivities
      .filter((a) => type === "all" || a.type === type)
      .filter((a) => !q || a.title.toLowerCase().includes(q))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [query, type]);

  const groupedByDate = useMemo(() => {
    const map = new Map();
    for (const a of filtered.slice(0, visible)) {
      const d = new Date(a.date);
      const key = d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(a);
    }
    return Array.from(map.entries());
  }, [filtered, visible]);

  return (
    <div className="card" style={{ padding: 16 }}>
      <div className="card" style={{ padding: 12, display: "grid", gap: 10 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            className="input"
            placeholder="Search activity"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1 }}
          />
          <select
            className="input"
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{ width: 160 }}
          >
            <option value="all">All types</option>
            <option value="save">Saved</option>
            <option value="comment">Commented</option>
            <option value="join">Joined</option>
            <option value="like">Liked</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card" style={{ padding: 20, textAlign: "center" }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>
            No activity found
          </div>
          <div className="text-muted">
            Try adjusting your search or filters.
          </div>
        </div>
      ) : (
        <ul
          style={{
            display: "grid",
            gap: 16,
            listStyle: "none",
            margin: 16,
            marginTop: 16,
            padding: 0,
          }}
        >
          {groupedByDate.map(([dateLabel, items]) => (
            <li key={dateLabel}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 0.4,
                  marginBottom: 8,
                }}
                className="text-muted"
              >
                {dateLabel}
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {items.map((a) => (
                  <div
                    key={a.id}
                    className="card"
                    style={{
                      padding: 14,
                      display: "flex",
                      gap: 10,
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      aria-hidden
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 999,
                        marginTop: 6,
                        background:
                          a.type === "comment"
                            ? "#3b82f6"
                            : a.type === "save"
                            ? "#22c55e"
                            : a.type === "join"
                            ? "#a855f7"
                            : "#f59e0b",
                      }}
                    />
                    <div style={{ display: "grid", gap: 2 }}>
                      <div style={{ fontWeight: 600 }}>
                        {typeToLabel[a.type]}: {a.title}
                      </div>
                      <div className="text-muted" style={{ fontSize: 12 }}>
                        {new Date(a.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      {a.type === "comment" && a.meta?.snippet ? (
                        <div
                          className="card"
                          style={{ padding: 10, fontSize: 13 }}
                        >
                          {a.meta.snippet}
                        </div>
                      ) : null}
                    </div>
                    <div
                      style={{ marginLeft: "auto", display: "flex", gap: 8 }}
                    >
                      <button className="btn btn-sm btn-ghost" onClick={() => { setActive(a); setOpen(true); }}>View</button>
                      {a.type === "save" ? (
                        <button className="btn btn-sm">Open</button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}

      {filtered.length > visible ? (
        <div
          style={{ display: "flex", justifyContent: "center", paddingTop: 8 }}
        >
          <button style={{cursor: "pointer", border: "1px solid rgba(0, 0, 0, 0)", borderRadius: "10px", outline: "none", justifyContent: "center", alignItems: "center", fontWeight: "600", transition: "all .2s", display: "inline-flex",height: "40px",width: "150px"}} onClick={() => setVisible((v) => v + 4)}>
            Load more
          </button>
        </div>
      ) : null}

      {open ? (
        <div role="dialog" aria-modal="true" className="drawer-overlay open" onClick={() => setOpen(false)}>
          <div className="card" style={{ maxWidth: 560, margin: "10vh auto", padding: 16 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontWeight: 700 }}>{active ? `${typeToLabel[active.type]}: ${active.title}` : "Activity"}</div>
              <button className="btn btn-sm btn-ghost" onClick={() => setOpen(false)}>Close</button>
            </div>
            {active ? (
              <div style={{ display: "grid", gap: 10 }}>
                <div className="text-muted" style={{ fontSize: 12 }}>
                  {new Date(active.date).toLocaleString()}
                </div>
                {active.type === "comment" && active.meta?.snippet ? (
                  <div className="card" style={{ padding: 12 }}>{active.meta.snippet}</div>
                ) : null}
                {active.type === "join" && active.meta?.location ? (
                  <div className="card" style={{ padding: 12 }}>Location: {active.meta.location}</div>
                ) : null}
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                  <button className="btn btn-sm btn-ghost" onClick={() => { try { navigator.clipboard.writeText(JSON.stringify(active, null, 2)); } catch {} }}>Copy JSON</button>
                  {active.type === "save" ? <a href="#" className="btn btn-sm">Open</a> : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
