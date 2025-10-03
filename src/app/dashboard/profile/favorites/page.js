"use client";
import Button from "@/components/Button";
import { useState } from "react";

export default function FavoritesPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const items = [
    {
      title: "Work Space",
      img: "https://images.unsplash.com/photo-1522199710521-72d69614c702?w=1200&auto=format&fit=crop&q=60",
      desc: "Workshop: Product design systems for scalable teams.",
    },
    {
      title: "Research",
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&auto=format&fit=crop&q=60",
      desc: "Case study: Improving onboarding with UX writing.",
    },
    {
      title: "Sustainability",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=60",
      desc: "Talk: Accessibility-first design culture at scale.",
    },
    {
      title: "Technology",
      img: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&auto=format&fit=crop&q=60",
      desc: "Guide: Practical Figma workflows for teams.",
    },
    {
      title: "Leadership",
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=60",
      desc: "Panel: Leading cross‑functional collaboration.",
    },
    {
      title: "Community",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=60",
      desc: "Article: Metrics that matter in UX research.",
    },
  ];
  return (
    <div className="card" style={{ padding: 16 }}>
      <div className="grid grid-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="card"
            style={{
              height: "100%",
              display: "grid",
              gap: 10,
              gridTemplateRows: "auto auto 1fr auto",
            }}
          >
            <div
              className="card-media"
              style={{
                backgroundImage: `url(${item.img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <h3 className="card-title">{item.title}</h3>
            <p
              className="card-text"
            //   style={{ visibility: openIndex === idx ? "visible" : "hidden" }}
            >
              {item.desc}
            </p>
            <div className="card-actions" style={{ alignSelf: "end" }}> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
