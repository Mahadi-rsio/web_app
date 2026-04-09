"use client"

import React from "react"
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
  ShieldCheck,
  WarningOctagon,
  Info,
  Clock
} from "@phosphor-icons/react"

export default function Page() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" fontWeight="800" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure TTL defaults, access policies, and lifecycle options.
        </Typography>
      </Box>

      <Stack spacing={4}>

        {/* TTL Default */}
        <Box>
          <Typography variant="h6" fontWeight="700" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Clock size={24} weight="duotone" /> Default TTL
          </Typography>
          <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="body2" fontWeight="600" sx={{ mb: 1 }}>
              Default Key Expiration (seconds)
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                size="small"
                type="number"
                defaultValue="3600"
                sx={{ width: 160 }}
              />
              <Button variant="outlined" sx={{ textTransform: 'none' }}>
                Save
              </Button>
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1.5, display: 'block' }}>
              Keys without an explicit TTL will use this value. Set to 0 for no expiry.
            </Typography>
          </Card>
        </Box>

        {/* Access Control */}
        <Box>
          <Typography variant="h6" fontWeight="700" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShieldCheck size={24} weight="duotone" /> Access Control
          </Typography>
          <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Stack spacing={3}>
              <FormControlLabel
                control={<Switch defaultChecked />}
                label={
                  <Box>
                    <Typography variant="body2" fontWeight="600">Read-Only Mode</Typography>
                    <Typography variant="caption" color="text.secondary">Prevent any write operations via the API.</Typography>
                  </Box>
                }
              />
              <Divider />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label={
                  <Box>
                    <Typography variant="body2" fontWeight="600">Enforce Token Authentication</Typography>
                    <Typography variant="caption" color="text.secondary">All requests must include a valid API token.</Typography>
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
                  <Typography variant="body2" fontWeight="700">Delete KV Store</Typography>
                  <Typography variant="caption" color="text.secondary">Permanently remove this store and all its keys.</Typography>
                </Box>
                <Button
                  variant="contained"
                  color="error"
                  disableElevation
                  startIcon={<Trash />}
                  sx={{ textTransform: 'none', fontWeight: 700 }}
                >
                  Delete Store
                </Button>
              </Stack>

              <Alert severity="warning" icon={<Info size={20} />} sx={{ borderRadius: 2 }}>
                <AlertTitle sx={{ fontWeight: 700 }}>Action is Irreversible</AlertTitle>
                All keys and values will be permanently deleted.
              </Alert>
            </Stack>
          </Paper>
        </Box>

      </Stack>
    </Container>
  )
}
