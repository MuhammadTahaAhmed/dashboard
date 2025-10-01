"use client";

import { useMemo, useState } from "react";
import Avatar from "@/components/ui/Avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import Separator from "@/components/ui/Separator";
import Progress from "@/components/ui/Progress";

export default function AboutPage() {
    const [expandedMemberId, setExpandedMemberId] = useState("");
    const [readMore, setReadMore] = useState(false);

    const team = useMemo(() => ([
        { id: "1", name: "Ava Patel", role: "Product Lead", img: "", bio: "Drives product strategy and user experience across the platform." },
        { id: "2", name: "Marcus Lee", role: "Engineering", img: "", bio: "Builds performant, resilient systems with a focus on DX." },
        { id: "3", name: "Nora Campos", role: "Design", img: "", bio: "Crafts accessible, beautiful interfaces and design systems." },
        { id: "4", name: "Samir Khan", role: "Data", img: "", bio: "Turns data into decisions and insights that guide the roadmap." },
    ]), []);

    const roadmap = [
        { label: "Accessibility", value: 90 },
        { label: "Performance", value: 85 },
        { label: "Documentation", value: 70 },
        { label: "Components", value: 80 },
    ];

    return (
        <section className="section">
            <div className="container section-inner" style={{ maxWidth: 1000 }}>
                <div className="card" style={{ padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                        <h1 className="hero-title" style={{ fontSize: 32 }}>About Us</h1>
                        <Button size="sm" variant="primary" onClick={() => document.getElementById("contact-cta")?.scrollIntoView({ behavior: "smooth" })}>Contact</Button>
                    </div>
                    <p className="hero-subtitle" style={{ marginTop: 8 }}>
                        We build modern, fast, and accessible web experiences using Next.js and React. Our focus is on clean design, performance, and delightful user interactions.
                    </p>
                    <p className="hero-subtitle" style={{ marginTop: 8 }}>
                        This starter showcases best practices, a minimal aesthetic, and a scalable structure so you can move fast.
                    </p>
                </div>

                <div className="card" style={{ marginTop: 16 }}>
                    <div className="card-body">
                        <Tabs defaultValue="mission">
                            <TabsList>
                                <TabsTrigger value="mission">Mission</TabsTrigger>
                                <TabsTrigger value="team">Team</TabsTrigger>
                                <TabsTrigger value="tech">Tech</TabsTrigger>
                                <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                            </TabsList>

                            <Separator className="mt-2" />

                            <TabsContent value="mission">
                                <div className="grid" style={{ gridTemplateColumns: "2fr 1fr", gap: 16 }}>
                                    <div>
                                        <h2 className="card-title">Our Mission</h2>
                                        <p className="card-text" style={{ marginTop: 8 }}>
                                            {readMore
                                                ? "We exist to make high‑quality web apps accessible to every team. By blending thoughtful design with robust engineering, we deliver tools that feel delightful and scale with your ambitions."
                                                : "We exist to make high‑quality web apps accessible to every team."}
                                        </p>
                                        <div className="card-actions" style={{ marginTop: 12 }}>
                                            <Button size="sm" variant="ghost" onClick={() => setReadMore(!readMore)}>
                                                {readMore ? "Show less" : "Read more"}
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="card" style={{ padding: 12 }}>
                                        <h3 className="card-title">Highlights</h3>
                                        <ul className="card-text" style={{ marginTop: 8 }}>
                                            <li>Design system first</li>
                                            <li>Performance budgets in CI</li>
                                            <li>Accessibility as a feature</li>
                                        </ul>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="team">
                                <div className="grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
                                    {team.map(member => (
                                        <div key={member.id} className="card" style={{ padding: 12, display: "flex", gap: 12, alignItems: "center" }}>
                                            <Avatar size={56} src={member.img} alt={member.name} />
                                            <div style={{ flex: 1 }}>
                                                <p className="card-title">{member.name}</p>
                                                <p className="card-text">{member.role}</p>
                                                {expandedMemberId === member.id && (
                                                    <p className="card-text" style={{ marginTop: 8 }}>{member.bio}</p>
                                                )}
                                            </div>
                                            <Button size="sm" variant="ghost" onClick={() => setExpandedMemberId(expandedMemberId === member.id ? "" : member.id)}>
                                                {expandedMemberId === member.id ? "Hide" : "Details"}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="tech">
                                <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                    <div className="card" style={{ padding: 12 }}>
                                        <h3 className="card-title">Stack</h3>
                                        <ul className="card-text" style={{ marginTop: 8 }}>
                                            <li>Next.js App Router</li>
                                            <li>React server + client components</li>
                                            <li>shadcn-inspired UI primitives</li>
                                        </ul>
                                    </div>
                                    <div className="card" style={{ padding: 12 }}>
                                        <h3 className="card-title">Principles</h3>
                                        <ul className="card-text" style={{ marginTop: 8 }}>
                                            <li>Accessibility inclusive</li>
                                            <li>Performance oriented</li>
                                            <li>DX focused</li>
                                        </ul>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="roadmap">
                                <div className="grid" style={{ gridTemplateColumns: "1fr", gap: 12 }}>
                                    {roadmap.map(item => (
                                        <div key={item.label} className="card" style={{ padding: 12 }}>
                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                <p className="card-title">{item.label}</p>
                                                <span className="badge">{item.value}%</span>
                                            </div>
                                            <Progress value={item.value} className="mt-2" />
                                        </div>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                <div id="contact-cta" className="card" style={{ marginTop: 16, padding: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                        <div>
                            <h2 className="hero-title" style={{ fontSize: 20 }}>Want to work with us?</h2>
                            <p className="hero-subtitle" style={{ marginTop: 8 }}>Tell us about your project and timeline.</p>
                        </div>
                        <a className="btn btn-primary btn-sm" href="/contact">Get in touch</a>
                    </div>
                </div>
            </div>
        </section>
    );
}
