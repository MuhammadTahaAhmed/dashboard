"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import Separator from "@/components/ui/Separator";
import Progress from "@/components/ui/Progress";

export default function AboutPage() {
  const [expandedMemberId, setExpandedMemberId] = useState("");
  const [readMore, setReadMore] = useState(false);
  const [activeTab, setActiveTab] = useState("mission");
  const [isVisible, setIsVisible] = useState({});
  const [counters, setCounters] = useState({
    clients: 0,
    projects: 0,
    satisfaction: 0,
    years: 0,
  });

  const statsRef = useRef(null);
  const timelineRef = useRef(null);

  // Animated counter effect
  useEffect(() => {
    const targetStats = {
      clients: 200,
      projects: 3000,
      satisfaction: 98,
      years: 8,
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          Object.keys(targetStats).forEach((key) => {
            animateCounter(key, targetStats[key]);
          });
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounter = (key, target) => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      setCounters((prev) => ({ ...prev, [key]: Math.floor(current) }));
    }, duration / steps);
  };

  const team = useMemo(
    () => [
      {
        id: "1",
        name: "Sarah Chen",
        role: "CEO & Founder",
        img: "",
        bio: "Visionary leader with 12+ years in tech. Previously at Google and Microsoft. Stanford MBA.",
        skills: ["Strategy", "Leadership", "Product Vision"],
        social: { linkedin: "#", twitter: "#", email: "sarah@company.com" },
      },
      {
        id: "2",
        name: "Marcus Rodriguez",
        role: "CTO",
        img: "",
        bio: "Full-stack architect specializing in scalable systems. Expert in React, Node.js, and cloud infrastructure.",
        skills: ["React", "Node.js", "DevOps"],
        social: { linkedin: "#", github: "#", email: "marcus@company.com" },
      },
      {
        id: "3",
        name: "Aisha Patel",
        role: "Head of Design",
        img: "",
        bio: "UX/UI designer with a passion for accessible, user-centered design. Award-winning portfolio.",
        skills: ["UI/UX", "Design Systems", "Accessibility"],
        social: { linkedin: "#", dribbble: "#", email: "aisha@company.com" },
      },
      {
        id: "4",
        name: "David Kim",
        role: "Lead Developer",
        img: "",
        bio: "Senior full-stack developer with expertise in modern web technologies and performance optimization.",
        skills: ["JavaScript", "React", "Performance"],
        social: { linkedin: "#", github: "#", email: "david@company.com" },
      },
    ],
    []
  );

  const companyStats = [
    { label: "Happy Clients", value: counters.clients, suffix: "+" },
    { label: "Projects Completed", value: counters.projects, suffix: "+" },
    { label: "Client Satisfaction", value: counters.satisfaction, suffix: "%" },
    { label: "Years of Experience", value: counters.years, suffix: "" },
  ];

  const technologies = [
    { name: "React", level: 95, icon: "⚛️" },
    { name: "Next.js", level: 90, icon: "▲" },
    { name: "TypeScript", level: 88, icon: "🔷" },
    { name: "Node.js", level: 85, icon: "🟢" },
    { name: "Python", level: 80, icon: "🐍" },
    { name: "AWS", level: 85, icon: "☁️" },
  ];

  const companyTimeline = [
    {
      year: "2016",
      title: "Company Founded",
      description: "Started with a vision to transform digital experiences",
    },
    {
      year: "2017",
      title: "First Major Client",
      description: "Secured partnership with Fortune 500 company",
    },
    {
      year: "2019",
      title: "Team Expansion",
      description: "Grew to 15+ talented professionals",
    },
    {
      year: "2021",
      title: "Award Recognition",
      description: "Won 'Best Digital Agency' award",
    },
    {
      year: "2023",
      title: "Global Reach",
      description: "Expanded services to international markets",
    },
    {
      year: "2024",
      title: "Innovation Lab",
      description: "Launched R&D division for emerging technologies",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Jennifer Walsh",
      role: "VP of Technology, TechCorp",
      content:
        "Outstanding work! They delivered beyond our expectations and transformed our digital presence completely.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Founder, StartupXYZ",
      content:
        "Professional, efficient, and incredibly talented. Our project was delivered on time and exceeded all requirements.",
      rating: 5,
    },
    {
      id: 3,
      name: "Lisa Rodriguez",
      role: "Marketing Director, RetailPlus",
      content:
        "The team's attention to detail and user experience focus resulted in a 300% increase in our conversion rates.",
      rating: 5,
    },
  ];

  const values = [
    {
      title: "Innovation First",
      description:
        "We embrace cutting-edge technologies and creative solutions to solve complex problems.",
      icon: "💡",
    },
    {
      title: "Client Success",
      description:
        "Your success is our success. We're committed to delivering results that drive your business forward.",
      icon: "🎯",
    },
    {
      title: "Quality Craftsmanship",
      description:
        "Every line of code, every design element is crafted with precision and attention to detail.",
      icon: "⚡",
    },
    {
      title: "Collaborative Spirit",
      description:
        "We believe the best solutions come from working closely with our clients as partners.",
      icon: "🤝",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="card">
        <div
          className="card-header"
          style={{
            padding: "60px 40px",
            background:
              "linear-gradient(135deg, var(--surface) 0%, color-mix(in oklab, var(--primary) 6%, transparent) 100%)",
            borderRadius: "16px 16px 0 0",
            textAlign: "center",
          }}
        >
          <h1
            className="hero-title"
            style={{ fontSize: 48, fontWeight: 800, marginBottom: 16 }}
          >
            About Our Company
          </h1>
          <p
            className="hero-subtitle"
            style={{
              fontSize: 20,
              marginBottom: 32,
              maxWidth: "600px",
              margin: "0 auto 32px",
            }}
          >
            We're a passionate team of developers, designers, and innovators
            creating exceptional digital experiences that drive business growth.
          </p>
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              size="lg"
              onClick={() =>
                document
                  .getElementById("contact-cta")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              style={{
                background: "var(--primary)",
                color: "white",
                padding: "12px 32px",
              }}
            >
              Get In Touch
            </Button>
            <Link href="/services" className="btn btn-ghost btn-lg">
              Our Services
            </Link>
          </div>
        </div>
      </div>

      {/* Company Stats */}
      <div ref={statsRef} className="card">
        <div style={{ padding: "40px" }}>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            Our Impact in Numbers
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "32px",
            }}
          >
            {companyStats.map((stat, index) => (
              <div
                key={stat.label}
                style={{
                  textAlign: "center",
                  padding: "24px",
                  background:
                    "color-mix(in oklab, var(--primary) 4%, transparent)",
                  borderRadius: "16px",
                  border:
                    "1px solid color-mix(in oklab, var(--primary) 20%, transparent)",
                }}
              >
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 800,
                    color: "var(--primary)",
                    marginBottom: 8,
                  }}
                >
                  {stat.value}
                  {stat.suffix}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "var(--muted)",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Values */}
      <div className="card">
        <div style={{ padding: "40px" }}>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            Our Core Values
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {values.map((value, index) => (
              <div
                key={value.title}
                style={{
                  padding: "32px 24px",
                  background:
                    "color-mix(in oklab, var(--foreground) 2%, transparent)",
                  borderRadius: "16px",
                  border: "1px solid var(--border)",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>
                  {value.icon}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>
                  {value.title}
                </h3>
                <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Tabs Content */}
      <div className="card">
        <div style={{ padding: "40px" }}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList
              style={{
                padding: "8px",
                background:
                  "color-mix(in oklab, var(--foreground) 6%, transparent)",
                display: "flex",
                justifyContent: "center",
                marginBottom: 32,
              }}
            >
              <TabsTrigger
                value="mission"
                style={{ padding: "12px 24px", fontSize: "16px" }}
              >
                Mission & Vision
              </TabsTrigger>
              <TabsTrigger
                value="team"
                style={{ padding: "12px 24px", fontSize: "16px" }}
              >
                Our Team
              </TabsTrigger>
              <TabsTrigger
                value="tech"
                style={{ padding: "12px 24px", fontSize: "16px" }}
              >
                Technology
              </TabsTrigger>
              <TabsTrigger
                value="history"
                style={{ padding: "12px 24px", fontSize: "16px" }}
              >
                Our Story
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mission">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "32px",
                }}
              >
                <div
                  style={{
                    padding: "32px",
                    background:
                      "color-mix(in oklab, var(--foreground) 2%, transparent)",
                    borderRadius: "16px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      marginBottom: 16,
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    🎯 Our Mission
                  </h3>
                  <p
                    style={{
                      color: "var(--muted)",
                      lineHeight: 1.7,
                      marginBottom: 16,
                    }}
                  >
                    To empower businesses with cutting-edge digital solutions
                    that drive growth, enhance user experiences, and create
                    lasting value in an ever-evolving digital landscape.
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setReadMore(!readMore)}
                    style={{ marginTop: 16 }}
                  >
                    {readMore ? "Show Less" : "Read More"}
                  </Button>
                  {readMore && (
                    <p
                      style={{
                        color: "var(--muted)",
                        lineHeight: 1.7,
                        marginTop: 16,
                      }}
                    >
                      We believe technology should be accessible, intuitive, and
                      transformative. Our team combines technical expertise with
                      creative vision to deliver solutions that not only meet
                      today's needs but anticipate tomorrow's challenges.
                    </p>
                  )}
                </div>

                <div
                  style={{
                    padding: "32px",
                    background:
                      "color-mix(in oklab, var(--foreground) 2%, transparent)",
                    borderRadius: "16px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: 24,
                      fontWeight: 700,
                      marginBottom: 16,
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    🔮 Our Vision
                  </h3>
                  <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
                    To be the leading digital transformation partner, recognized
                    for innovation, reliability, and our commitment to client
                    success across all industries.
                  </p>
                  <div style={{ marginTop: 24 }}>
                    <h4
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        marginBottom: 12,
                      }}
                    >
                      Key Principles:
                    </h4>
                    <ul style={{ color: "var(--muted)", lineHeight: 1.6 }}>
                      <li style={{ marginBottom: 8 }}>
                        🚀 Innovation-driven development
                      </li>
                      <li style={{ marginBottom: 8 }}>
                        🎨 User-centered design approach
                      </li>
                      <li style={{ marginBottom: 8 }}>
                        ⚡ Performance & accessibility focus
                      </li>
                      <li style={{ marginBottom: 8 }}>
                        🤝 Collaborative partnerships
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="team">
              <div>
                <h3
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    textAlign: "center",
                    marginBottom: 40,
                  }}
                >
                  Meet Our Amazing Team
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "24px",
                  }}
                >
                  {team.map((member) => (
                    <div
                      key={member.id}
                      style={{
                        padding: "32px 24px",
                        background:
                          "color-mix(in oklab, var(--foreground) 2%, transparent)",
                        borderRadius: "16px",
                        border: "1px solid var(--border)",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow =
                          "0 12px 30px rgba(0,0,0,0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <Avatar
                        size={80}
                        src={member.img}
                        alt={member.name}
                        style={{ margin: "0 auto 16px" }}
                      />
                      <h4
                        style={{
                          fontSize: 20,
                          fontWeight: 700,
                          marginBottom: 4,
                        }}
                      >
                        {member.name}
                      </h4>
                      <p
                        style={{
                          color: "var(--primary)",
                          fontWeight: 600,
                          marginBottom: 16,
                        }}
                      >
                        {member.role}
                      </p>

                      {expandedMemberId === member.id && (
                        <div style={{ marginBottom: 20 }}>
                          <p
                            style={{
                              color: "var(--muted)",
                              lineHeight: 1.6,
                              marginBottom: 16,
                            }}
                          >
                            {member.bio}
                          </p>
                          <div style={{ marginBottom: 16 }}>
                            <h5
                              style={{
                                fontSize: 14,
                                fontWeight: 600,
                                marginBottom: 8,
                                color: "var(--muted)",
                              }}
                            >
                              EXPERTISE
                            </h5>
                            <div
                              style={{
                                display: "flex",
                                gap: "8px",
                                justifyContent: "center",
                                flexWrap: "wrap",
                              }}
                            >
                              {member.skills.map((skill) => (
                                <span
                                  key={skill}
                                  style={{
                                    padding: "4px 12px",
                                    background:
                                      "color-mix(in oklab, var(--primary) 10%, transparent)",
                                    color: "var(--primary)",
                                    borderRadius: "12px",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                  }}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "12px",
                              justifyContent: "center",
                            }}
                          >
                            {Object.entries(member.social).map(
                              ([platform, link]) => (
                                <a
                                  key={platform}
                                  href={link}
                                  style={{
                                    padding: "8px",
                                    background:
                                      "color-mix(in oklab, var(--foreground) 8%, transparent)",
                                    borderRadius: "8px",
                                    color: "var(--muted)",
                                    textDecoration: "none",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                    transition: "all 0.2s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                      "var(--primary)";
                                    e.currentTarget.style.color = "white";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                      "color-mix(in oklab, var(--foreground) 8%, transparent)";
                                    e.currentTarget.style.color =
                                      "var(--muted)";
                                  }}
                                >
                                  {platform}
                                </a>
                              )
                            )}
                          </div>
                        </div>
                      )}

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          setExpandedMemberId(
                            expandedMemberId === member.id ? "" : member.id
                          )
                        }
                        style={{ marginTop: 16 }}
                      >
                        {expandedMemberId === member.id
                          ? "Show Less"
                          : "Learn More"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tech">
              <div>
                <h3
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    textAlign: "center",
                    marginBottom: 40,
                  }}
                >
                  Our Technology Stack
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                    marginBottom: 40,
                  }}
                >
                  {technologies.map((tech) => (
                    <div
                      key={tech.name}
                      style={{
                        padding: "24px",
                        background:
                          "color-mix(in oklab, var(--foreground) 2%, transparent)",
                        borderRadius: "12px",
                        border: "1px solid var(--border)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 12,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                          }}
                        >
                          <span style={{ fontSize: 24 }}>{tech.icon}</span>
                          <span style={{ fontSize: 18, fontWeight: 600 }}>
                            {tech.name}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: "var(--primary)",
                          }}
                        >
                          {tech.level}%
                        </span>
                      </div>
                      <Progress value={tech.level} style={{ height: "8px" }} />
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "24px",
                  }}
                >
                  <div
                    style={{
                      padding: "24px",
                      background:
                        "color-mix(in oklab, var(--foreground) 2%, transparent)",
                      borderRadius: "16px",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        marginBottom: 16,
                      }}
                    >
                      🚀 Frontend Excellence
                    </h4>
                    <ul style={{ color: "var(--muted)", lineHeight: 1.6 }}>
                      <li>Modern React with hooks and context</li>
                      <li>Next.js for SSR and optimization</li>
                      <li>TypeScript for type safety</li>
                      <li>Responsive design with CSS-in-JS</li>
                    </ul>
                  </div>

                  <div
                    style={{
                      padding: "24px",
                      background:
                        "color-mix(in oklab, var(--foreground) 2%, transparent)",
                      borderRadius: "16px",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        marginBottom: 16,
                      }}
                    >
                      ⚡ Backend Power
                    </h4>
                    <ul style={{ color: "var(--muted)", lineHeight: 1.6 }}>
                      <li>Node.js and Express.js APIs</li>
                      <li>Database design and optimization</li>
                      <li>RESTful and GraphQL services</li>
                      <li>Microservices architecture</li>
                    </ul>
                  </div>

                  <div
                    style={{
                      padding: "24px",
                      background:
                        "color-mix(in oklab, var(--foreground) 2%, transparent)",
                      borderRadius: "16px",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        marginBottom: 16,
                      }}
                    >
                      ☁️ Cloud & DevOps
                    </h4>
                    <ul style={{ color: "var(--muted)", lineHeight: 1.6 }}>
                      <li>AWS cloud infrastructure</li>
                      <li>Docker containerization</li>
                      <li>CI/CD pipeline automation</li>
                      <li>Monitoring and analytics</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <div>
                <h3
                  style={{
                    fontSize: 28,
                    fontWeight: 700,
                    textAlign: "center",
                    marginBottom: 40,
                  }}
                >
                  Our Journey So Far
                </h3>
                <div
                  ref={timelineRef}
                  style={{ position: "relative", paddingLeft: "40px" }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "20px",
                      top: "0",
                      bottom: "0",
                      width: "2px",
                      background:
                        "linear-gradient(to bottom, var(--primary), color-mix(in oklab, var(--primary) 30%, transparent))",
                    }}
                  />
                  {companyTimeline.map((milestone, index) => (
                    <div
                      key={milestone.year}
                      style={{
                        position: "relative",
                        marginBottom: "32px",
                        paddingLeft: "40px",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: "-28px",
                          top: "8px",
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          background: "var(--primary)",
                          border: "4px solid var(--surface)",
                          boxShadow: "0 0 0 2px var(--primary)",
                        }}
                      />
                      <div
                        style={{
                          padding: "24px",
                          background:
                            "color-mix(in oklab, var(--foreground) 2%, transparent)",
                          borderRadius: "12px",
                          border: "1px solid var(--border)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: 8,
                          }}
                        >
                          <span
                            style={{
                              padding: "4px 12px",
                              background: "var(--primary)",
                              color: "white",
                              borderRadius: "12px",
                              fontSize: "14px",
                              fontWeight: 600,
                            }}
                          >
                            {milestone.year}
                          </span>
                          <h4 style={{ fontSize: 20, fontWeight: 700 }}>
                            {milestone.title}
                          </h4>
                        </div>
                        <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Client Testimonials */}
      <div className="card">
        <div style={{ padding: "40px" }}>
          <h2
            style={{
              fontSize: 32,
              fontWeight: 700,
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            What Our Clients Say
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
              gap: "24px",
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                style={{
                  padding: "32px 24px",
                  background:
                    "color-mix(in oklab, var(--foreground) 2%, transparent)",
                  borderRadius: "16px",
                  border: "1px solid var(--border)",
                  position: "relative",
                }}
              >
                <div style={{ marginBottom: 16 }}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span
                      key={i}
                      style={{ color: "#fbbf24", fontSize: "20px" }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <blockquote
                  style={{
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: "var(--muted)",
                    marginBottom: 20,
                    fontStyle: "italic",
                  }}
                >
                  "{testimonial.content}"
                </blockquote>
                <div>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>
                    {testimonial.name}
                  </div>
                  <div style={{ color: "var(--muted)", fontSize: 14 }}>
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div id="contact-cta" className="card">
        <div
          style={{
            padding: "60px 40px",
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--primary) 8%, transparent), color-mix(in oklab, var(--primary) 4%, transparent))",
            borderRadius: "16px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>
            Ready to Start Your Project?
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "var(--muted)",
              marginBottom: 32,
              maxWidth: "500px",
              margin: "0 auto 32px",
            }}
          >
            Let's discuss how we can help transform your ideas into exceptional
            digital experiences.
          </p>
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/contact" className="btn btn-primary btn-lg">
              Get Started Today
            </Link>
            <Link href="/services" className="btn btn-ghost btn-lg">
              View Our Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
