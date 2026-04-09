"use client"

import React, { useState } from "react"
import {
  Box,
  Typography,
  Card,
  Button,
  Stack,
  Container,
  Switch,
  FormControlLabel,
  Divider,
  Paper,
  Alert,
  AlertTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material"
import {
  Trash,
  ShieldCheck,
  WarningOctagon,
  Info,
  Timer
} from "@phosphor-icons/react"

export default function Page() {
  const [schedule, setSchedule] = useState("0 0 * * *")
  const [timezone, setTimezone] = useState("UTC")

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" fontWeight="800" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure the schedule, notifications, and lifecycle of this cron job.
        </Typography>
      </Box>

      <Stack spacing={4}>

        {/* Schedule Configuration */}
        <Box>
          <Typography variant="h6" fontWeight="700" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Timer size={24} weight="duotone" /> Schedule
          </Typography>
          <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" fontWeight="600" sx={{ mb: 1 }}>Cron Expression</Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField
                    size="small"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    sx={{ width: 200, '& input': { fontFamily: 'monospace' } }}
                  />
                  <Button variant="outlined" sx={{ textTransform: 'none' }}>Save</Button>
                </Stack>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Uses standard cron syntax: minute hour day month weekday
                </Typography>
              </Box>
              <Divider />
              <FormControl size="small" sx={{ width: 200 }}>
                <InputLabel>Timezone</InputLabel>
                <Select
                  value={timezone}
                  label="Timezone"
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  <MenuItem value="UTC">UTC</MenuItem>
                  <MenuItem value="America/New_York">America/New_York</MenuItem>
                  <MenuItem value="Europe/London">Europe/London</MenuItem>
                  <MenuItem value="Asia/Tokyo">Asia/Tokyo</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Card>
        </Box>

        {/* Notifications */}
        <Box>
          <Typography variant="h6" fontWeight="700" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShieldCheck size={24} weight="duotone" /> Notifications
          </Typography>
          <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Stack spacing={3}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label={
                  <Box>
                    <Typography variant="body2" fontWeight="600">Notify on Failure</Typography>
                    <Typography variant="caption" color="text.secondary">Send an email alert when a job run fails.</Typography>
                  </Box>
                }
              />
              <Divider />
              <FormControlLabel
                control={<Switch />}
                label={
                  <Box>
                    <Typography variant="body2" fontWeight="600">Notify on Success</Typography>
                    <Typography variant="caption" color="text.secondary">Send a confirmation email on every successful run.</Typography>
                  </Box>
                }
              />
            </Stack>
          </Card>
        </Box>

        {/* Danger Zone */}
        <Box>
          <Typography variant="h6" fontWeight="700" sx={{ mb: 2, color: '#D92D20', display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarningOctagon size={24} weight="duotone" /> Danger Zone
          </Typography>
          <Paper
            variant="outlined"
            sx={{ p: 3, borderRadius: 3, borderColor: '#FDA29B', borderStyle: 'dashed' }}
          >
            <Stack spacing={3}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" fontWeight="700">Delete Cron Job</Typography>
                  <Typography variant="caption" color="text.secondary">Permanently remove this job and all its run history.</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="error"
                  disableElevation
                  startIcon={<Trash />}
                  sx={{ textTransform: 'none', fontWeight: 700 }}
                >
                  Delete Job
                </Button>
              </Stack>

              <Alert severity="warning" icon={<Info size={20} />} sx={{ borderRadius: 2 }}>
                <AlertTitle sx={{ fontWeight: 700 }}>Action is Irreversible</AlertTitle>
                All run logs and configuration for this job will be permanently deleted.
              </Alert>
            </Stack>
          </Paper>
        </Box>

      </Stack>
    </Container>
  )
}
