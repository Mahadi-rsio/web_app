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
  ChartPieSlice,
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

        {/* Left Column: Bucket Identity & Usage */}
        <Grid item xs={12} md={8}>
          <Stack spacing={4}>

            {/* Bucket Metadata Card */}
            <Card variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <IdentificationCard size={32} weight="duotone" color="#1976d2" />
                <Typography variant="h6" fontWeight="700">Bucket Identity</Typography>
              </Stack>

              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">BUCKET NAME</Typography>
                  <Typography variant="body1" fontWeight="600">user-uploads</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">INTERNAL ID</Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>{id}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">CREATED ON</Typography>
                  <Typography variant="body1">April 1, 2026</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">REGION</Typography>
                  <Typography variant="body1">US-East (N. Virginia)</Typography>
                </Grid>
              </Grid>
            </Card>

            {/* Storage Usage */}
            <Card variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <ChartPieSlice size={32} weight="duotone" color="#2e7d32" />
                  <Typography variant="h6" fontWeight="700">Storage Usage</Typography>
                </Stack>
                <Chip label="Within Limits" color="success" size="small" variant="soft" />
              </Stack>

              <Stack spacing={3}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2" fontWeight="600">Disk Space</Typography>
                    <Typography variant="body2" color="text.secondary">3.2 GB / 10.0 GB</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={32} sx={{ height: 8, borderRadius: 5, bgcolor: '#E8F5E9' }} />
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2" fontWeight="600">Monthly Bandwidth</Typography>
                    <Typography variant="body2" color="text.secondary">42 GB / 100 GB</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={42} color="info" sx={{ height: 8, borderRadius: 5, bgcolor: '#E3F2FD' }} />
                </Box>
              </Stack>
            </Card>
          </Stack>
        </Grid>

        {/* Right Column: Billing & Recent Activity */}
        <Grid item xs={12} md={4}>
          <Stack spacing={4}>

            {/* Billing Card */}
            <Card sx={{ p: 3, borderRadius: 4, bgcolor: '#1A1C1E', color: '#fff' }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <Receipt size={24} weight="duotone" />
                <Typography variant="subtitle1" fontWeight="700">Estimated Billing</Typography>
              </Stack>
              <Typography variant="h3" fontWeight="800" sx={{ mb: 0.5 }}>$5.00</Typography>
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
                  { msg: "File uploaded", time: "1h ago", user: "Alex" },
                  { msg: "Bucket policy updated", time: "3h ago", user: "System" },
                  { msg: "Access token rotated", time: "2d ago", user: "Alex" },
                ].map((item, i) => (
                  <Box key={i}>
                    <Typography variant="body2" fontWeight="600">{item.msg}</Typography>
                    <Typography variant="caption" color="text.secondary">{item.time} by {item.user}</Typography>
                    {i !== 2 && <Divider sx={{ mt: 1.5 }} />}
                  </Box>
                ))}
              </Stack>
            </Card>

            {/* Quick Support Link */}
            <Box sx={{ p: 2, bgcolor: '#F0F2F5', borderRadius: 3, display: 'flex', gap: 2 }}>
              <Info size={24} color="#666" />
              <Typography variant="caption" color="text.secondary">
                Need help managing your files? Check our <b>Documentation</b>.
              </Typography>
            </Box>
          </Stack>
        </Grid>

      </Grid>
    </Box>
  )
}
