"use client"

import React from "react"
import {
  Box,
  Typography,
  Grid,
  Card,
  Stack,
  Button,
  Divider,
  Chip
} from "@mui/material"
import {
  IdentificationCard,
  Timer,
  ClockCounterClockwise,
  ArrowUpRight,
  CheckCircle,
  Play,
  Pause
} from "@phosphor-icons/react"
import { useParams } from "next/navigation"

const RUN_HISTORY = [
  { time: "Apr 09, 2026 12:00 AM", duration: "1.2s", status: "success" },
  { time: "Apr 08, 2026 12:00 AM", duration: "1.1s", status: "success" },
  { time: "Apr 07, 2026 12:00 AM", duration: "0.9s", status: "success" },
  { time: "Apr 06, 2026 12:00 AM", duration: "—", status: "failed" },
]

export default function Page() {
  const { id } = useParams<{ id: string }>()

  return (
    <Box>
      <Grid container spacing={4}>

        {/* Left Column */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Stack spacing={4}>

            {/* Job Identity */}
            <Card variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <IdentificationCard size={32} weight="duotone" color="#1976d2" />
                <Typography variant="h6" fontWeight="700">Job Identity</Typography>
              </Stack>

              <Grid container spacing={3}>
                <Grid size={6}>
                  <Typography variant="caption" color="text.secondary">JOB NAME</Typography>
                  <Typography variant="body1" fontWeight="600">daily-report</Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="caption" color="text.secondary">INTERNAL ID</Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>{id}</Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="caption" color="text.secondary">SCHEDULE</Typography>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>0 0 * * *</Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="caption" color="text.secondary">TIMEZONE</Typography>
                  <Typography variant="body1">UTC</Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="caption" color="text.secondary">CREATED ON</Typography>
                  <Typography variant="body1">March 01, 2026</Typography>
                </Grid>
                <Grid size={6}>
                  <Typography variant="caption" color="text.secondary">NEXT RUN</Typography>
                  <Typography variant="body1">Apr 10, 2026 12:00 AM</Typography>
                </Grid>
              </Grid>
            </Card>

            {/* Run History */}
            <Card variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Timer size={32} weight="duotone" color="#2e7d32" />
                <Typography variant="h6" fontWeight="700">Run History</Typography>
              </Stack>

              <Stack spacing={0}>
                {RUN_HISTORY.map((run, i) => (
                  <Box key={i}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1.5 }}>
                      <Typography variant="body2" color="text.secondary">{run.time}</Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography variant="caption" color="text.secondary">{run.duration}</Typography>
                        <Chip
                          label={run.status}
                          color={run.status === "success" ? "success" : "error"}
                          size="small"
                          variant="outlined"
                        />
                      </Stack>
                    </Stack>
                    {i !== RUN_HISTORY.length - 1 && <Divider />}
                  </Box>
                ))}
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
                <Timer size={24} weight="duotone" />
                <Typography variant="subtitle1" fontWeight="700">Job Status</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                <CheckCircle size={28} color="#4caf50" weight="fill" />
                <Typography variant="h5" fontWeight="800">Active</Typography>
              </Stack>
              <Typography variant="body2" sx={{ opacity: 0.7, mb: 3 }}>Last run: Apr 09, 2026 at 12:00 AM UTC</Typography>

              <Stack spacing={1}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Play weight="fill" />}
                  sx={{ bgcolor: '#fff', color: '#000', '&:hover': { bgcolor: '#f0f0f0' }, textTransform: 'none', fontWeight: 700 }}
                >
                  Run Now
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Pause />}
                  sx={{ borderColor: '#555', color: '#fff', '&:hover': { borderColor: '#fff' }, textTransform: 'none', fontWeight: 700 }}
                >
                  Pause Job
                </Button>
              </Stack>
            </Card>

            {/* Activity Log */}
            <Card variant="outlined" sx={{ p: 3, borderRadius: 4 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                <ClockCounterClockwise size={20} weight="bold" />
                <Typography variant="subtitle2" fontWeight="700">Recent Activity</Typography>
              </Stack>
              <Stack spacing={2}>
                {[
                  { msg: "Job completed successfully", time: "2h ago", user: "System" },
                  { msg: "Schedule updated", time: "3d ago", user: "Alex" },
                  { msg: "Job created", time: "40d ago", user: "Alex" },
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
