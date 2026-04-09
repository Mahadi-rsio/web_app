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
  TextField
} from "@mui/material"
import {
  Trash,
  CloudArrowUp,
  ArrowClockwise,
  ShieldCheck,
  WarningOctagon,
  Info,
  Clock
} from "@phosphor-icons/react"

export default function Page() {
  const [retentionDays, setRetentionDays] = useState("30")

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" fontWeight="800" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure backup schedule, retention policy, and lifecycle.
        </Typography>
      </Box>

      <Stack spacing={4}>

        {/* Backup Schedule */}
        <Box>
          <Typography variant="h6" fontWeight="700" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Clock size={24} weight="duotone" /> Backup Schedule
          </Typography>
          <Card variant="outlined" sx={{ p: 0, borderRadius: 3, overflow: 'hidden' }}>
            <Box sx={{ p: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" fontWeight="600">Automated Daily Backups</Typography>
                  <Typography variant="caption" color="text.secondary">Snapshot taken every day at 12:00 AM UTC.</Typography>
                </Box>
                <Switch defaultChecked />
              </Stack>
            </Box>
            <Divider />
            <Box sx={{ p: 2, bgcolor: '#F8F9FA' }}>
              <Button startIcon={<ArrowClockwise />} size="small" sx={{ textTransform: 'none' }}>
                Trigger Manual Backup
              </Button>
            </Box>
          </Card>
        </Box>

        {/* Retention Policy */}
        <Box>
          <Typography variant="h6" fontWeight="700" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CloudArrowUp size={24} weight="duotone" /> Retention Policy
          </Typography>
          <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="body2" fontWeight="600" sx={{ mb: 1 }}>
              Retention Period (Days)
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                size="small"
                type="number"
                value={retentionDays}
                onChange={(e) => setRetentionDays(e.target.value)}
                sx={{ width: 120 }}
              />
              <Button variant="outlined" sx={{ textTransform: 'none' }}>
                Save
              </Button>
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1.5, display: 'block' }}>
              Backups older than the retention period will be automatically deleted.
            </Typography>
          </Card>
        </Box>

        {/* Security */}
        <Box>
          <Typography variant="h6" fontWeight="700" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShieldCheck size={24} weight="duotone" /> Security
          </Typography>
          <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Stack spacing={3}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label={
                  <Box>
                    <Typography variant="body2" fontWeight="600">Encrypt Backups at Rest</Typography>
                    <Typography variant="caption" color="text.secondary">All backup files are encrypted using AES-256.</Typography>
                  </Box>
                }
              />
              <Divider />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label={
                  <Box>
                    <Typography variant="body2" fontWeight="600">Notify on Failure</Typography>
                    <Typography variant="caption" color="text.secondary">Send an email alert if a scheduled backup fails.</Typography>
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
                  <Typography variant="body2" fontWeight="700">Delete Backup</Typography>
                  <Typography variant="caption" color="text.secondary">Permanently remove this backup snapshot.</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="error"
                  disableElevation
                  startIcon={<Trash />}
                  sx={{ textTransform: 'none', fontWeight: 700 }}
                >
                  Delete Backup
                </Button>
              </Stack>

              <Alert severity="warning" icon={<Info size={20} />} sx={{ borderRadius: 2 }}>
                <AlertTitle sx={{ fontWeight: 700 }}>Action is Irreversible</AlertTitle>
                Deleting this backup will permanently remove all associated data.
              </Alert>
            </Stack>
          </Paper>
        </Box>

      </Stack>
    </Container>
  )
}
