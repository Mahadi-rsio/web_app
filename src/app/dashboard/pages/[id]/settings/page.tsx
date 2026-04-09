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
  Paper,
  Alert,
  AlertTitle,
} from "@mui/material"
import {
  Gear,
  Globe,
  Wrench,
  FolderOpen,
  Plus,
  Trash,
  WarningOctagon,
  Info,
  FloppyDisk,
} from "@phosphor-icons/react"

interface EnvVar {
  key: string
  value: string
}

export default function PageSiteSettings() {
  const [siteName, setSiteName] = useState("marketing-site")
  const [customDomain, setCustomDomain] = useState("www.mycompany.com")
  const [buildCmd, setBuildCmd] = useState("next build")
  const [outDir, setOutDir] = useState("out")
  const [envVars, setEnvVars] = useState<EnvVar[]>([
    { key: "NEXT_PUBLIC_API_URL", value: "https://api.example.com" },
    { key: "NEXT_PUBLIC_GA_ID", value: "G-XXXXXXXXXX" },
  ])

  const handleEnvChange = (index: number, field: "key" | "value", val: string) => {
    setEnvVars((prev) => prev.map((e, i) => (i === index ? { ...e, [field]: val } : e)))
  }

  const handleAddEnv = () => {
    setEnvVars((prev) => [...prev, { key: "", value: "" }])
  }

  const handleRemoveEnv = (index: number) => {
    setEnvVars((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" fontWeight="800" gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure your site name, domain, build settings, and environment variables.
        </Typography>
      </Box>

      <Stack spacing={4}>

        {/* General */}
        <Box>
          <Typography variant="h6" fontWeight="700" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <Gear size={24} weight="duotone" /> General
          </Typography>
          <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Site Name"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                InputProps={{ sx: { borderRadius: 2 } }}
              />
              <TextField
                fullWidth
                label="Custom Domain"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                InputProps={{
                  startAdornment: <Globe size={20} style={{ marginRight: 12, opacity: 0.6 }} />,
                  sx: { borderRadius: 2 },
                }}
                helperText="Point your DNS CNAME record to pages.dev to use a custom domain."
              />
            </Stack>
          </Card>
        </Box>

        {/* Build Settings */}
        <Box>
          <Typography variant="h6" fontWeight="700" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <Wrench size={24} weight="duotone" /> Build Settings
          </Typography>
          <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Build Command"
                value={buildCmd}
                onChange={(e) => setBuildCmd(e.target.value)}
                InputProps={{
                  startAdornment: <Wrench size={20} style={{ marginRight: 12, opacity: 0.6 }} />,
                  sx: { borderRadius: 2, fontFamily: "monospace" },
                }}
              />
              <TextField
                fullWidth
                label="Output Directory"
                value={outDir}
                onChange={(e) => setOutDir(e.target.value)}
                InputProps={{
                  startAdornment: <FolderOpen size={20} style={{ marginRight: 12, opacity: 0.6 }} />,
                  sx: { borderRadius: 2, fontFamily: "monospace" },
                }}
              />
            </Stack>
          </Card>
        </Box>

        {/* Environment Variables */}
        <Box>
          <Typography variant="h6" fontWeight="700" sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <FolderOpen size={24} weight="duotone" /> Environment Variables
          </Typography>
          <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Stack spacing={2}>
              {envVars.map((env, i) => (
                <Stack key={i} direction={{ xs: "column", sm: "row" }} spacing={1} alignItems={{ xs: "stretch", sm: "center" }}>
                  <TextField
                    size="small"
                    label="Key"
                    value={env.key}
                    onChange={(e) => handleEnvChange(i, "key", e.target.value)}
                    sx={{ flex: 1, "& input": { fontFamily: "monospace" } }}
                    InputProps={{ sx: { borderRadius: 2 } }}
                  />
                  <TextField
                    size="small"
                    label="Value"
                    value={env.value}
                    onChange={(e) => handleEnvChange(i, "value", e.target.value)}
                    sx={{ flex: 1, "& input": { fontFamily: "monospace" } }}
                    InputProps={{ sx: { borderRadius: 2 } }}
                  />
                  <IconButton
                    onClick={() => handleRemoveEnv(i)}
                    sx={{ color: "#D92D20", flexShrink: 0 }}
                    size="small"
                    title="Remove variable"
                  >
                    <Trash size={20} />
                  </IconButton>
                </Stack>
              ))}
              <Button
                startIcon={<Plus weight="bold" />}
                onClick={handleAddEnv}
                sx={{ textTransform: "none", alignSelf: "flex-start" }}
                size="small"
              >
                Add Variable
              </Button>
            </Stack>
          </Card>
        </Box>

        {/* Save Button */}
        <Button
          variant="contained"
          disableElevation
          startIcon={<FloppyDisk weight="bold" />}
          sx={{
            borderRadius: 3,
            py: 1.5,
            px: 4,
            textTransform: "none",
            fontWeight: 700,
            bgcolor: "#1A1C1E",
            "&:hover": { bgcolor: "#000" },
            alignSelf: "flex-start",
          }}
        >
          Save Changes
        </Button>

        <Divider />

        {/* Danger Zone */}
        <Box>
          <Typography variant="h6" fontWeight="700" sx={{ mb: 2, color: "#D92D20", display: "flex", alignItems: "center", gap: 1 }}>
            <WarningOctagon size={24} weight="duotone" /> Danger Zone
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              borderRadius: 3,
              borderColor: "#FDA29B",
              borderStyle: "dashed",
            }}
          >
            <Stack spacing={3}>
              <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2}>
                <Box>
                  <Typography variant="body2" fontWeight="700">Delete Site</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Permanently remove this site and all associated deployments.
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="error"
                  disableElevation
                  startIcon={<Trash />}
                  sx={{ textTransform: "none", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}
                >
                  Delete Site
                </Button>
              </Stack>

              <Alert severity="warning" icon={<Info size={20} />} sx={{ borderRadius: 2 }}>
                <AlertTitle sx={{ fontWeight: 700 }}>Action is Irreversible</AlertTitle>
                Deleting the site will immediately take it offline and remove all deployment history.
              </Alert>
            </Stack>
          </Paper>
        </Box>

      </Stack>
    </Container>
  )
}
