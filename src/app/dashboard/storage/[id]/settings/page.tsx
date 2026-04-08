"use client"

import React, { useState } from "react"
import {
  Box,
  Typography,
  Card,
  Button,
  Stack,
  Container,
  TextField,
  IconButton,
  Divider,
  Switch,
  FormControlLabel,
  Paper,
  Alert,
  AlertTitle
} from "@mui/material"
import {
  Key,
  Trash,
  CloudArrowUp,
  Files,
  ArrowClockwise,
  ShieldCheck,
  WarningOctagon,
  Copy,
  Info,
  Globe
} from "@phosphor-icons/react"

export default function Page() {
  const [accessKey, setAccessKey] = useState("ak_live_83X...72mp4")
  const [showKey, setShowKey] = useState(false)

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" fontWeight="800" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure access, backups, and bucket lifecycle.
        </Typography>
      </Box>

      <Stack spacing={4}>

        {/* Access Keys Section */}
        <Box>
          <Typography variant="h6" fontWeight="700" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Key size={24} weight="duotone" /> Access Keys
          </Typography>
          <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="body2" fontWeight="600" sx={{ mb: 1 }}>
              Secret Access Key
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                fullWidth
                size="small"
                type={showKey ? "text" : "password"}
                value={accessKey}
                disabled
                sx={{ bgcolor: '#F8F9FA' }}
              />
              <Button
                variant="outlined"
                startIcon={<ArrowClockwise />}
                sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
              >
                Regenerate
              </Button>
              <IconButton onClick={() => navigator.clipboard.writeText(accessKey)}>
                <Copy size={20} />
              </IconButton>
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
              Your access key is used to authenticate programmatic requests. Keep it secret.
            </Typography>
          </Card>
        </Box>

        {/* Backups Section */}
        <Box>
          <Typography variant="h6" fontWeight="700" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CloudArrowUp size={24} weight="duotone" /> Backups
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
              <Button startIcon={<Files />} size="small" sx={{ textTransform: 'none' }}>
                View Backup History
              </Button>
              <Button startIcon={<CloudArrowUp />} size="small" sx={{ textTransform: 'none', ml: 2 }}>
                Trigger Manual Backup
              </Button>
            </Box>
          </Card>
        </Box>

        {/* Security & Access Control */}
        <Box>
          <Typography variant="h6" fontWeight="700" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShieldCheck size={24} weight="duotone" /> Security & Access Control
          </Typography>
          <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Stack spacing={3}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label={
                  <Box>
                    <Typography variant="body2" fontWeight="600">Public Read Access</Typography>
                    <Typography variant="caption" color="text.secondary">Allow unauthenticated reads for public assets.</Typography>
                  </Box>
                }
              />
              <Divider />
              <FormControlLabel
                control={<Switch />}
                label={
                  <Box>
                    <Typography variant="body2" fontWeight="600">CORS Enforcement</Typography>
                    <Typography variant="caption" color="text.secondary">Restrict bucket access to allowed origins only.</Typography>
                  </Box>
                }
              />
              <Divider />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label={
                  <Box>
                    <Typography variant="body2" fontWeight="600">Versioning</Typography>
                    <Typography variant="caption" color="text.secondary">Keep previous versions of overwritten files.</Typography>
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
            sx={{
              p: 3,
              borderRadius: 3,
              borderColor: '#FDA29B',
              borderStyle: 'dashed'
            }}
          >
            <Stack spacing={3}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography variant="body2" fontWeight="700">Delete Bucket</Typography>
                  <Typography variant="caption" color="text.secondary">Permanently remove this bucket and all stored files.</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="error"
                  disableElevation
                  startIcon={<Trash />}
                  sx={{ textTransform: 'none', fontWeight: 700 }}
                >
                  Delete Bucket
                </Button>
              </Stack>

              <Alert severity="warning" icon={<Info size={20} />} sx={{ borderRadius: 2 }}>
                <AlertTitle sx={{ fontWeight: 700 }}>Action is Irreversible</AlertTitle>
                Deleting the bucket will permanently remove all files and cannot be undone.
              </Alert>
            </Stack>
          </Paper>
        </Box>

      </Stack>
    </Container>
  )
}
