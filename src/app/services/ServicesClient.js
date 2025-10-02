"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card as MuiCard,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

const services = [
  {
    title: "Web Development",
    description: "High-performance websites built with Next.js and React.",
    imageSrc: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    tags: ["web", "react", "nextjs"],
  },
  {
    title: "UI/UX Design",
    description: "Clean, minimal interfaces focused on usability.",
    imageSrc: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["design", "ui", "ux"],
  },
  {
    title: "SEO & Performance",
    description:
      "Technical SEO and speed optimization for better rankings.",
    imageSrc: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    tags: ["seo", "performance"],
  },
  {
    title: "Dashboards",
    description: "Insightful dashboards with charts and real-time data.",
    imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["web", "data"],
  },
  {
    title: "Brand Systems",
    description: "Design systems and component libraries at scale.",
    imageSrc: "https://plus.unsplash.com/premium_photo-1726869653071-2c688572de09?q=80&w=1134&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["design", "system"],
  },
  {
    title: "App Development",
    description: "App development for iOS and Android.",
    imageSrc: "https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["app", "development"],
  },
];

export default function ServicesClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const categories = [
    { key: "all", label: "All" },
    { key: "web", label: "Web" },
    { key: "design", label: "Design" },
    { key: "seo", label: "SEO" },
    { key: "performance", label: "Performance" },
    { key: "data", label: "Data" },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter((s) => {
      const matchesText =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q);
      const matchesCat = category === "all" || s.tags.includes(category);
      return matchesText && matchesCat;
    });
  }, [query, category]);

  return (
    <Box component="section" sx={{ py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={2}
        >
          <Box>
            <Typography variant="h4" component="h1" fontWeight={700}>
              Our Services
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }} color="text.secondary">
              Explore what we can build for you.
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              startIcon={<RocketLaunchIcon />}
              href="/contact"
            >
              Start a project
            </Button>
          </Stack>
        </Stack>

        {/* Search & Filters */}
        <MuiCard variant="outlined" sx={{ p: 2, mt: 3 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            <TextField
              fullWidth
              size="small"
              placeholder="Search services"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                ),
              }}
            />
            <Stack direction="row" spacing={1} alignItems="center">
              <FilterAltIcon color="action" />
              <ToggleButtonGroup
                exclusive
                size="small"
                value={category}
                onChange={(_, v) => v && setCategory(v)}
              >
                {categories.map((c) => (
                  <ToggleButton key={c.key} value={c.key}>
                    {c.label}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Stack>
          </Stack>
        </MuiCard>

        {/* Services Grid */}
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {filtered.map((s, i) => (
            <Grid item xs={12} sm={6} md={4} key={`${s.title}-${i}`}>
              <MuiCard
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                variant="outlined"
              >
                <CardMedia
                  component="img"
                  image={s.imageSrc}
                  alt={s.title}
                  sx={{ width: "100%", height: 200, objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight={700}>
                    {s.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {s.description}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ mt: 1, flexWrap: "wrap" }}
                  >
                    {s.tags.map((t) => (
                      <Chip key={t} size="small" label={t} variant="outlined" />
                    ))}
                  </Stack>
                </CardContent>
                <Stack direction="row" spacing={1} sx={{ p: 2, pt: 0 }}>
                  <Button size="small" variant="outlined" onClick={() => { setActive(s); setOpen(true); }}>
                    Details
                  </Button>
                  <Button size="small" variant="contained">
                    Get started
                  </Button>
                </Stack>
              </MuiCard>
            </Grid>
          ))}
          {filtered.length === 0 ? (
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                No services match your filters.
              </Typography>
            </Grid>
          ) : null}
        </Grid>

        {/* Details Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{active?.title || "Service details"}</DialogTitle>
          <DialogContent dividers>
            {active ? (
              <Stack spacing={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <CardMedia component="img" image={active.imageSrc} alt={active.title} sx={{ width: 96, height: 96, objectFit: "cover", borderRadius: 1 }} />
                  <Typography variant="body1" color="text.secondary">{active.description}</Typography>
                </Box>
                <Divider />
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>What you get</Typography>
                  <ul style={{ paddingLeft: 18, margin: 0 }}>
                    <li>Discovery call and requirements capture</li>
                    <li>Design review and iterations</li>
                    <li>Production-ready delivery</li>
                  </ul>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>Tags</Typography>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                    {active.tags?.map(t => (
                      <Chip key={t} size="small" label={t} />
                    ))}
                  </Stack>
                </Box>
              </Stack>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button variant="text" onClick={() => setOpen(false)}>Close</Button>
            <Button variant="contained" href="/contact">Get started</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}


