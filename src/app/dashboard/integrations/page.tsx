"use client"

import React, { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material"
import {
  CheckCircle,
  Link,
  LinkBreak,
} from "@phosphor-icons/react"

interface Integration {
  id: string
  name: string
  description: string
  logoText: string
  logoColor: string
  logoBg: string
  connected: boolean
  category: string
}

const INTEGRATIONS: Integration[] = [
  {
    id: "cloudflare",
    name: "Cloudflare",
    description: "Connect to Cloudflare for CDN, DNS management, DDoS protection, and edge functions.",
    logoText: "CF",
    logoColor: "#fff",
    logoBg: "#F48120",
    connected: false,
    category: "Infrastructure",
  },
  {
    id: "neon",
    name: "Neon",
    description: "Serverless Postgres with instant branching, autoscaling, and a generous free tier.",
    logoText: "N",
    logoColor: "#fff",
    logoBg: "#00E599",
    connected: false,
    category: "Database",
  },
  {
    id: "supabase",
    name: "Supabase",
    description: "Open-source Firebase alternative with Postgres, Auth, Storage, and Realtime.",
    logoText: "SB",
    logoColor: "#fff",
    logoBg: "#3ECF8E",
    connected: false,
    category: "Database",
  },
  {
    id: "upstash",
    name: "Upstash",
    description: "Serverless Redis and Kafka for low-latency data caching and message streaming.",
    logoText: "UP",
    logoColor: "#fff",
    logoBg: "#00C07F",
    connected: false,
    category: "Cache",
  },
  {
    id: "google-drive",
    name: "Google Drive",
    description: "Access and manage your Google Drive files and folders directly from the dashboard.",
    logoText: "GD",
    logoColor: "#fff",
    logoBg: "#4285F4",
    connected: false,
    category: "Storage",
  },
]

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>(INTEGRATIONS)

  function toggleConnection(id: string) {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, connected: !item.connected } : item
      )
    )
  }

  const connectedCount = integrations.filter((i) => i.connected).length

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 5 }}>
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ color: "#1A1C1E", mb: 1 }}>
            Integrations
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Connect your workspace to third-party services and platforms.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
            py: 1,
            bgcolor: "#F0F2F5",
            borderRadius: "10px",
          }}
        >
          <Link size={20} weight="duotone" style={{ marginRight: 8 }} />
          <Typography variant="subtitle2" fontWeight="700">
            {connectedCount} / {integrations.length} Connected
          </Typography>
        </Box>
      </Stack>

      {/* Integration Cards */}
      <Grid container spacing={3}>
        {integrations.map((integration) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={integration.id}>
            <Card
              elevation={0}
              sx={{
                border: "1px solid",
                borderColor: integration.connected ? "success.light" : "#E0E4E8",
                borderRadius: "14px",
                height: "100%",
                transition: "border-color 0.2s",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 2 }}>
                  {/* Logo */}
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "12px",
                      bgcolor: integration.logoBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        color: integration.logoColor,
                        fontWeight: 800,
                        fontSize: "0.85rem",
                        letterSpacing: "-0.5px",
                      }}
                    >
                      {integration.logoText}
                    </Typography>
                  </Box>

                  {/* Status chip */}
                  {integration.connected ? (
                    <Chip
                      icon={<CheckCircle size={14} />}
                      label="Connected"
                      color="success"
                      size="small"
                      variant="outlined"
                    />
                  ) : (
                    <Chip
                      label="Not connected"
                      size="small"
                      variant="outlined"
                      sx={{ color: "text.secondary", borderColor: "#D0D5DD" }}
                    />
                  )}
                </Stack>

                {/* Name & category */}
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                  <Typography variant="subtitle1" fontWeight={700} color="#101828">
                    {integration.name}
                  </Typography>
                  <Chip
                    label={integration.category}
                    size="small"
                    sx={{ bgcolor: "#F0F2F5", color: "text.secondary", fontSize: "0.7rem", height: 20 }}
                  />
                </Stack>

                {/* Description */}
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 48 }}>
                  {integration.description}
                </Typography>

                {/* Connect / Disconnect button */}
                <Button
                  fullWidth
                  variant={integration.connected ? "outlined" : "contained"}
                  color={integration.connected ? "error" : "primary"}
                  disableElevation
                  startIcon={integration.connected ? <LinkBreak size={16} /> : <Link size={16} />}
                  onClick={() => toggleConnection(integration.id)}
                  sx={{
                    borderRadius: "10px",
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  {integration.connected ? "Disconnect" : "Connect"}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
