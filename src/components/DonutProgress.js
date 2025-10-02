"use client";

export default function DonutProgress({ value = 0, label = "", size = 180, stroke = 14, color = "#6366f1", frameless = false }) {
    const radius = (size - stroke) / 2;
    const circumference = 2 * Math.PI * radius;
    const clamped = Math.max(0, Math.min(100, Number(value) || 0));
    const dash = (clamped / 100) * circumference;

    const content = (
        <div style={{ position: "relative", width: size, height: size }}>
            <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
                <circle cx={size/2} cy={size/2} r={radius} stroke="#e5e7eb" strokeWidth={stroke} fill="none" />
                <circle
                    cx={size/2}
                    cy={size/2}
                    r={radius}
                    stroke={color}
                    strokeWidth={stroke}
                    fill="none"
                    strokeDasharray={`${dash} ${circumference}`}
                    strokeLinecap="round"
                />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 700 }}>{clamped}%</div>
                {label ? <div style={{ fontSize: 12, color: "#6b7280" }}>{label}</div> : null}
            </div>
        </div>
    );

    if (frameless) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {content}
            </div>
        );
    }

    return (
        <div className="card" style={{ padding: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {content}
        </div>
    );
}


