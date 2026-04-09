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
  CloudArrowUp,
  ClockCounterClockwise,
  ArrowUpRight,
  CheckCircle
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

            {/* Backup Identity Card */}
            <Card variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <IdentificationCard size={32} weight="duotone" color="#1976d2" />
                <Typography variant="h6" fontWeight="700">Backup Identity</Typography>
              </Stack>

              <Grid container spacing={3}>
                <Grid size={6}>
                  <Typography variant="caption" color="text.secondary">BACKUP NAME</Typography>
                  <Typography variant="body1" fontWeight="600">prod-backup-2026-04-09</Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="caption" color="text.secondary">INTERNAL ID</Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>{id}</Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="caption" color="text.secondary">CREATED ON</Typography>
                  <Typography variant="body1">April 09, 2026</Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="caption" color="text.secondary">RETENTION POLICY</Typography>
                  <Typography variant="body1">30 Days</Typography>
                </Grid>
              </Grid>
            </Card>

            {/* Storage Usage */}
            <Card variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <CloudArrowUp size={32} weight="duotone" color="#2e7d32" />
                  <Typography variant="h6" fontWeight="700">Storage Usage</Typography>
                </Stack>
                <Chip label="Within Limits" color="success" size="small" variant="outlined" />
              </Stack>

              <Stack spacing={3}>
                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2" fontWeight="600">Backup Storage</Typography>
                    <Typography variant="body2" color="text.secondary">3.2 MB / 10 GB</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={1} sx={{ height: 8, borderRadius: 5, bgcolor: '#E8F5E9' }} />
                </Box>

                <Box>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                    <Typography variant="body2" fontWeight="600">Monthly Backups</Typography>
                    <Typography variant="body2" color="text.secondary">9 / 30</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={30} color="info" sx={{ height: 8, borderRadius: 5, bgcolor: '#E3F2FD' }} />
                </Box>
              </Stack>
            </Card>
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={4}>

            {/* Status Card */}
            <Card sx={{ p: 3, borderRadius: 4, bgcolor: '#1A1C1E', color: '#fff' }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <Receipt size={24} weight="duotone" />
                <Typography variant="subtitle1" fontWeight="700">Backup Status</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                <CheckCircle size={28} color="#4caf50" weight="fill" />
                <Typography variant="h5" fontWeight="800">Completed</Typography>
              </Stack>
              <Typography variant="body2" sx={{ opacity: 0.7, mb: 3 }}>Last run: April 09, 2026 at 12:00 AM UTC</Typography>

              <Button
                fullWidth
                variant="contained"
                endIcon={<ArrowUpRight />}
                sx={{ bgcolor: '#fff', color: '#000', '&:hover': { bgcolor: '#f0f0f0' }, textTransform: 'none', fontWeight: 700 }}
              >
                Restore Backup
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
                  { msg: "Backup completed", time: "2h ago", user: "System" },
                  { msg: "Retention policy applied", time: "1d ago", user: "System" },
                  { msg: "Manual backup triggered", time: "3d ago", user: "Alex" },
                ].map((item, i) => (
                  <Box key={i}>
                    <Typography variant="body2" fontWeight="600">{item.msg}</Typography>
                    <Typography variant="caption" color="text.secondary">{item.time} by {item.user}</Typography>
                    {i !== 2 && <Divider sx={{ mt: 1.5 }} />}
                  </Box>
                ))}
              </Stack>
            </Card>
          </Stack>
        </Grid>

      </Grid>
    </Box>
  )
}
