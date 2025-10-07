export const metadata = {
  title: "Stores in Pakistan",
};

export default function StoreInPage() {
  const outlets = [
    {
      name: "Shahrah-e-Faisal Outlet",
      city: "Karachi",
      address: "Shahrah-e-Faisal, Karachi, Pakistan",
      note: "Prime location on the main thoroughfare.",
      phone: "+92 21 111 000 111",
      hours: "Mon - Sun, 10:00 AM - 10:00 PM",
      mapSrc:
        "https://www.google.com/maps?q=Shahrah-e-Faisal,+Karachi,+Pakistan&output=embed",
    },
    {
      name: "Lucky One Outlet",
      city: "Karachi",
      address: "Lucky One Mall, Karachi, Pakistan",
      note: "Inside Lucky One Mall for convenient access.",
      phone: "+92 21 111 222 333",
      hours: "Mon - Sun, 11:00 AM - 11:00 PM",
      mapSrc:
        "https://www.google.com/maps?q=Lucky+One+Mall,+Karachi,+Pakistan&output=embed",
    },
    {
      name: "Samanabad Town Outlet",
      city: "Lahore",
      address: "Samanabad Town, Lahore, Pakistan",
      note: "Serving the community in Samanabad Town.",
      phone: "+92 42 111 444 555",
      hours: "Mon - Sun, 10:00 AM - 10:00 PM",
      mapSrc:
        "https://www.google.com/maps?q=Samanabad+Town,+Lahore,+Pakistan&output=embed",
    },
  ];

  return (
    <section className="section">
      <div className="container section-inner" style={{ maxWidth: 1000 }}>
        <div className="card" style={{ padding: 16 }}>
          <h1 className="hero-title" style={{ fontSize: 32 }}>Our Stores in Pakistan</h1>
          <p className="hero-subtitle" style={{ marginTop: 8 }}>
            Explore our outlets across Pakistan. Visit the location nearest to you.
          </p>
        </div>

        <div className="grid" style={{ marginTop: 16, gap: 16, gridTemplateColumns: "1fr" }}>
          {outlets.map((o) => (
            <div key={o.name} className="card" style={{ padding: 16 }}>
              <div className="card-body">
                <h2 className="card-title">{o.name}</h2>
                <div className="card-text" style={{ marginTop: 8 }}>
                  <div><strong>City:</strong> {o.city}</div>
                  <div><strong>Address:</strong> {o.address}</div>
                  {o.phone && (
                    <div><strong>Phone:</strong> {o.phone}</div>
                  )}
                  {o.hours && (
                    <div><strong>Hours:</strong> {o.hours}</div>
                  )}
                  {o.note && (
                    <div style={{ marginTop: 4 }}>
                      <strong>Note:</strong> {o.note}
                    </div>
                  )}
                </div>
                {o.mapSrc && (
                  <div className="card" style={{ marginTop: 12, padding: 0, overflow: "hidden" }}>
                    <iframe
                      style={{ width: "100%", height: 220, border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={o.mapSrc}
                      title={`${o.name} map`}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
