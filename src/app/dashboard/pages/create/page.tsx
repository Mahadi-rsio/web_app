"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
  Container,
  Fade,
  InputAdornment,
  Chip,
} from "@mui/material"
import {
  Browsers,
  CaretLeft,
  RocketLaunch,
  CreditCard,
  Wrench,
  FolderOpen,
} from "@phosphor-icons/react"

const FRAMEWORKS = [
  { value: "react",   label: "React",   buildCmd: "npm run build", outDir: "build" },
  { value: "vue",     label: "Vue",     buildCmd: "npm run build", outDir: "dist" },
  { value: "angular", label: "Angular", buildCmd: "ng build",      outDir: "dist" },
  { value: "svelte",  label: "Svelte",  buildCmd: "npm run build", outDir: "public" },
  { value: "nextjs",  label: "Next.js", buildCmd: "next build",    outDir: "out" },
  { value: "nuxt",    label: "Nuxt",    buildCmd: "nuxt generate", outDir: ".output/public" },
  { value: "other",   label: "Other",   buildCmd: "npm run build", outDir: "dist" },
]

const HOSTING_PLANS = [
  { value: "free",    label: "Free",       bandwidth: "100 GB/mo",  price: "Free" },
  { value: "starter", label: "Starter",    bandwidth: "500 GB/mo",  price: "$5/mo" },
  { value: "pro",     label: "Pro",        bandwidth: "Unlimited",  price: "$15/mo" },
]

export default function CreatePageSite() {
  const router = useRouter()

  const [siteName, setSiteName] = useState("")
  const [framework, setFramework] = useState("react")
  const [buildCmd, setBuildCmd] = useState("npm run build")
  const [outDir, setOutDir] = useState("build")
  const [plan, setPlan] = useState("free")
  const [isLoading, setIsLoading] = useState(false)

  // Auto-fill build command and output dir when framework changes
  useEffect(() => {
    const fw = FRAMEWORKS.find((f) => f.value === framework)
    if (fw) {
      setBuildCmd(fw.buildCmd)
      setOutDir(fw.outDir)
    }
  }, [framework])

  const handleDeploy = () => {
    if (!siteName) return
    setIsLoading(true)
    setTimeout(() => {
      router.push("/dashboard/pages/")
    }, 2000)
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Button
        startIcon={<CaretLeft />}
        onClick={() => router.back()}
        sx={{ mb: 4, textTransform: "none", color: "text.secondary" }}
      >
        Back to Pages
      </Button>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          border: "1px solid #E0E4E8",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0px 4px 20px rgba(0,0,0,0.03)",
        }}
      >
        {/* Loading Overlay */}
        {isLoading && (
          <Fade in={isLoading}>
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "rgba(255,255,255,0.9)",
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(6px)",
              }}
            >
              <CircularProgress size={50} thickness={4} sx={{ color: "#1A1C1E", mb: 2 }} />
              <Typography variant="body1" fontWeight="700" sx={{ color: "#1A1C1E" }}>
                Deploying Site...
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Building and publishing your static site
              </Typography>
            </Box>
          </Fade>
        )}

        <Stack spacing={4}>
          {/* Title */}
          <Box>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
              <Box sx={{ bgcolor: "#F0F2F5", p: 1.5, borderRadius: 3 }}>
                <Browsers size={32} weight="fill" color="#1A1C1E" />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="800">
                  Deploy New Site
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Configure your static site deployment settings.
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Stack spacing={3}>
            {/* Site Name */}
            <TextField
              fullWidth
              label="Site Name"
              placeholder="my-awesome-site"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "text.disabled" }}>
                      https://
                    </Typography>
                  </InputAdornment>
                ),
                sx: { borderRadius: 3 },
              }}
            />

            {/* Framework */}
            <TextField
              select
              fullWidth
              label="Framework"
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              disabled={isLoading}
              InputProps={{
                startAdornment: <Browsers size={20} style={{ marginRight: 12, opacity: 0.6 }} />,
                sx: { borderRadius: 3 },
              }}
            >
              {FRAMEWORKS.map((fw) => (
                <MenuItem key={fw.value} value={fw.value}>
                  <Typography variant="body2" fontWeight="600">
                    {fw.label}
                  </Typography>
                </MenuItem>
              ))}
            </TextField>

            {/* Build Command */}
            <TextField
              fullWidth
              label="Build Command"
              value={buildCmd}
              onChange={(e) => setBuildCmd(e.target.value)}
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Wrench size={20} style={{ opacity: 0.6 }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: 3, fontFamily: "monospace" },
              }}
            />

            {/* Output Directory */}
            <TextField
              fullWidth
              label="Output Directory"
              value={outDir}
              onChange={(e) => setOutDir(e.target.value)}
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FolderOpen size={20} style={{ opacity: 0.6 }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: 3, fontFamily: "monospace" },
              }}
            />

            {/* Hosting Plan */}
            <TextField
              select
              fullWidth
              label="Hosting Plan"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              disabled={isLoading}
              InputProps={{ sx: { borderRadius: 3 } }}
            >
              {HOSTING_PLANS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }} alignItems="center">
                    <Box>
                      <Typography variant="body2" fontWeight="600">
                        {option.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {option.bandwidth} bandwidth
                      </Typography>
                    </Box>
                    <Chip
                      label={option.price}
                      size="small"
                      variant={option.price === "Free" ? "outlined" : "filled"}
                      sx={{
                        fontWeight: 700,
                        fontSize: "0.7rem",
                        bgcolor: option.price === "Free" ? "transparent" : "#F0F2F5",
                        color: "#1A1C1E",
                        pointerEvents: "none",
                      }}
                    />
                  </Stack>
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          {/* Billing Notice */}
          <Box sx={{ p: 2, bgcolor: "#F8F9FA", borderRadius: 3, border: "1px solid #E0E4E8" }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <CreditCard size={24} color="#666" />
              <Box>
                <Typography variant="caption" fontWeight="700" display="block">
                  Billing Information
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {plan === "free"
                    ? "No credit card required for the Free plan."
                    : "You will be billed monthly for this hosting plan."}
                </Typography>
              </Box>
            </Stack>
          </Box>

          {/* Submit */}
          <Button
            fullWidth
            size="large"
            variant="contained"
            disableElevation
            onClick={handleDeploy}
            disabled={!siteName || isLoading}
            startIcon={<RocketLaunch weight="bold" />}
            sx={{
              borderRadius: 3,
              py: 1.8,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 700,
              bgcolor: "#1A1C1E",
              "&:hover": { bgcolor: "#000" },
              "&.Mui-disabled": { bgcolor: "#F0F2F5" },
            }}
          >
            Deploy Site
          </Button>
        </Stack>
      </Paper>

      <Typography variant="caption" align="center" display="block" sx={{ mt: 3, color: "text.disabled" }}>
        Pages CDN v2.1 • Global edge network with automatic HTTPS
      </Typography>
    </Container>
  )
}
