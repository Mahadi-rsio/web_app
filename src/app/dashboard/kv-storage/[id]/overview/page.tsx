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
  Chip
} from "@mui/material"
import {
  IdentificationCard,
  Receipt,
  Stack as StackIcon,
  ClockCounterClockwise,
  ArrowUpRight,
  Info
} from "@phosphor-icons/react"
import { useParams } from "next/navigation"

export default function Page() {
  const { id } = useParams<{ id: string }>()

  return (
    <Box>
      <Grid container spacing={4}>

        {/* Left Column */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={4}>

            {/* Store Identity Card */}
            <Card variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <IdentificationCard size={32} weight="duotone" color="#1976d2" />
                <Typography variant="h6" fontWeight="700">Store Identity</Typography>
              </Stack>

              <Grid container spacing={3}>
                <Grid size={6}>
                  <Typography variant="caption" color="text.secondary">STORE NAME</Typography>
                  <Typography variant="body1" fontWeight="600">session-cache</Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="caption" color="text.secondary">INTERNAL ID</Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>{id}</Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="caption" color="text.secondary">CREATED ON</Typography>
                  <Typography variant="body1">March 15, 2026</Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="caption" color="text.secondary">REGION</Typography>
                  <Typography variant="body1">US-East (N. Virginia)</Typography>
                </Grid>
              </Grid>
            </Card>

            {/* Usage Metrics */}
            <Card variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <StackIcon size={32} weight="duotone" color="#2e7d32" />
                  <Typography variant="h6" fontWeight="700">Usage Metrics</Typography>
                </Stack>
                <Chip label="Within Limits" color="success" size="small" variant="outlined" />
              </Stack>

              <Stack spacing={3}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2" fontWeight="600">Keys Stored</Typography>
                    <Typography variant="body2" color="text.secondary">4,210 / 10,000</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={42} sx={{ height: 8, borderRadius: 5, bgcolor: '#E8F5E9' }} />
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2" fontWeight="600">Monthly Read/Write Ops</Typography>
                    <Typography variant="body2" color="text.secondary">62k / 100k</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={62} color="warning" sx={{ height: 8, borderRadius: 5, bgcolor: '#FFF3E0' }} />
                </Box>
              </Stack>
            </Card>
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={4}>

            {/* Billing Card */}
            <Card sx={{ p: 3, borderRadius: 4, bgcolor: '#1A1C1E', color: '#fff' }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <Receipt size={24} weight="duotone" />
                <Typography variant="subtitle1" fontWeight="700">Estimated Billing</Typography>
              </Stack>
              <Typography variant="h3" fontWeight="800" sx={{ mb: 0.5 }}>$5.20</Typography>
              <Typography variant="body2" sx={{ opacity: 0.7, mb: 3 }}>Current period: April 2026</Typography>

              <Button
                fullWidth
                variant="contained"
                endIcon={<ArrowUpRight />}
                sx={{ bgcolor: '#fff', color: '#000', '&:hover': { bgcolor: '#f0f0f0' }, textTransform: 'none', fontWeight: 700 }}
              >
                Manage Invoices
              </Button>
            </Card>

            {/* Activity Log */}
            <Card variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <ClockCounterClockwise size={20} weight="bold" />
                <Typography variant="subtitle2" fontWeight="700">Recent Activity</Typography>
              </Stack>
              <Stack spacing={2}>
                {[
                  { msg: "1,200 keys written", time: "1h ago", user: "API" },
                  { msg: "TTL policy updated", time: "6h ago", user: "Alex" },
                  { msg: "Store created", time: "20d ago", user: "Alex" },
                ].map((item, i) => (
                  <Box key={i}>
                    <Typography variant="body2" fontWeight="600">{item.msg}</Typography>
                    <Typography variant="caption" color="text.secondary">{item.time} by {item.user}</Typography>
                    {i !== 2 && <Divider sx={{ mt: 1.5 }} />}
                  </Box>
                ))}
              </Stack>
            </Card>

            <Box sx={{ p: 2, bgcolor: '#F0F2F5', borderRadius: 3, display: 'flex', gap: 2 }}>
              <Info size={24} color="#666" />
              <Typography variant="caption" color="text.secondary">
                Need help with key expiration or TTL strategies? Check our <b>Documentation</b>.
              </Typography>
            </Box>
          </Stack>
        </Grid>

      </Grid>
    </Box>
  )
}
