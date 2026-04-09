"use client"

import React from "react"
import {
  Box,
  Typography,
  Grid,
  Card,
  Stack,
  LinearProgress,
  Button,
  Divider,
  Chip,
  Container,
} from "@mui/material"
import {
  IdentificationCard,
  Receipt,
  ChartPieSlice,
  ClockCounterClockwise,
  ArrowUpRight,
  Info,
  CheckCircle,
} from "@phosphor-icons/react"
import { useParams } from "next/navigation"

const RECENT_DEPLOYMENTS = [
  { msg: "feat: update hero section", time: "1h ago", status: "Live" },
  { msg: "fix: navbar overflow on mobile", time: "6h ago", status: "Live" },
  { msg: "chore: bump dependencies", time: "2d ago", status: "Live" },
]

export default function PageSiteOverview() {
  const { id } = useParams<{ id: string }>()

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>

        {/* Left Column */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={4}>

            {/* Site Identity */}
            <Card variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <IdentificationCard size={32} weight="duotone" color="#1976d2" />
                <Typography variant="h6" fontWeight="700">Site Identity</Typography>
              </Stack>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">SITE NAME</Typography>
                  <Typography variant="body1" fontWeight="600">marketing-site</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">INTERNAL ID</Typography>
                  <Typography variant="body1" sx={{ fontFamily: "monospace" }}>{id}</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">FRAMEWORK</Typography>
                  <Typography variant="body1">Next.js</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="caption" color="text.secondary">CREATED ON</Typography>
                  <Typography variant="body1">March 12, 2026</Typography>
                </Grid>
                <Grid size={12}>
                  <Typography variant="caption" color="text.secondary">LIVE URL</Typography>
                  <Typography variant="body1" sx={{ fontFamily: "monospace", color: "#1976d2" }}>
                    https://marketing-site.pages.dev
                  </Typography>
                </Grid>
              </Grid>
            </Card>

            {/* Performance Metrics */}
            <Card variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <ChartPieSlice size={32} weight="duotone" color="#2e7d32" />
                  <Typography variant="h6" fontWeight="700">Performance</Typography>
                </Stack>
                <Chip label="All Systems Normal" color="success" size="small" />
              </Stack>

              <Stack spacing={3}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2" fontWeight="600">Uptime (30 days)</Typography>
                    <Typography variant="body2" color="text.secondary">99.97%</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={99.97} sx={{ height: 8, borderRadius: 5, bgcolor: "#E8F5E9" }} />
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2" fontWeight="600">Bandwidth Used</Typography>
                    <Typography variant="body2" color="text.secondary">38 GB / 100 GB</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={38} color="info" sx={{ height: 8, borderRadius: 5, bgcolor: "#E3F2FD" }} />
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2" fontWeight="600">Last Build Time</Typography>
                    <Typography variant="body2" color="text.secondary">42s</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={28} color="warning" sx={{ height: 8, borderRadius: 5, bgcolor: "#FFF3E0" }} />
                </Box>
              </Stack>
            </Card>
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={4}>

            {/* Billing */}
            <Card sx={{ p: 3, borderRadius: 4, bgcolor: "#1A1C1E", color: "#fff" }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <Receipt size={24} weight="duotone" />
                <Typography variant="subtitle1" fontWeight="700">Estimated Billing</Typography>
              </Stack>
              <Typography variant="h3" fontWeight="800" sx={{ mb: 0.5 }}>
                $5.00
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, mb: 3 }}>
                Current period: April 2026
              </Typography>
              <Button
                fullWidth
                variant="contained"
                endIcon={<ArrowUpRight />}
                sx={{ bgcolor: "#fff", color: "#000", "&:hover": { bgcolor: "#f0f0f0" }, textTransform: "none", fontWeight: 700 }}
              >
                Manage Invoices
              </Button>
            </Card>

            {/* Recent Deployments */}
            <Card variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <ClockCounterClockwise size={20} weight="bold" />
                <Typography variant="subtitle2" fontWeight="700">Recent Deployments</Typography>
              </Stack>
              <Stack spacing={2}>
                {RECENT_DEPLOYMENTS.map((item, i) => (
                  <Box key={i}>
                    <Stack direction="row" spacing={1} alignItems="flex-start">
                      <CheckCircle size={16} weight="fill" color="#2e7d32" style={{ marginTop: 2, flexShrink: 0 }} />
                      <Box>
                        <Typography variant="body2" fontWeight="600">{item.msg}</Typography>
                        <Typography variant="caption" color="text.secondary">{item.time} · {item.status}</Typography>
                      </Box>
                    </Stack>
                    {i !== RECENT_DEPLOYMENTS.length - 1 && <Divider sx={{ mt: 1.5 }} />}
                  </Box>
                ))}
              </Stack>
            </Card>

            {/* Docs */}
            <Box sx={{ p: 2, bgcolor: "#F0F2F5", borderRadius: 3, display: "flex", gap: 2 }}>
              <Info size={24} color="#666" style={{ flexShrink: 0 }} />
              <Typography variant="caption" color="text.secondary">
                Learn how to configure custom domains, environment variables, and build caching in our <b>Documentation</b>.
              </Typography>
            </Box>
          </Stack>
        </Grid>

      </Grid>
    </Container>
  )
}
