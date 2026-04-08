"use client"

import { useState } from "react"
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
  Chip
} from "@mui/material"
import {
  Database,
  CaretLeft,
  RocketLaunch,
  CreditCard,
  HardDrive
} from "@phosphor-icons/react"

// Storage Plans Data
const STORAGE_PLANS = [
  { value: "free", label: "Free Tier", size: "100MB", price: "Free" },
  { value: "512mb", label: "Micro", size: "512MB", price: "$1/mo" },
  { value: "1gb", label: "Standard", size: "1GB", price: "$2/mo" },
  { value: "2gb", label: "Professional", size: "2GB", price: "$4/mo" },
  { value: "5gb", label: "Enterprise", size: "5GB", price: "$7/mo" },
]

export default function CreateDatabasePage() {
  const router = useRouter()

  // State
  const [dbName, setDbName] = useState("")
  const [plan, setPlan] = useState("free")
  const [isLoading, setIsLoading] = useState(false)

  const handleCreate = () => {
    if (!dbName) return

    setIsLoading(true)

    // Simulate provisioning the database
    setTimeout(() => {
      router.push(`/dashboard/database/`)
    }, 2000)
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Button
        startIcon={<CaretLeft />}
        onClick={() => router.back()}
        sx={{ mb: 4, textTransform: 'none', color: 'text.secondary' }}
      >
        Back to Dashboard
      </Button>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          border: '1px solid #E0E4E8',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0px 4px 20px rgba(0,0,0,0.03)'
        }}
      >
        {/* Loading Overlay */}
        {isLoading && (
          <Fade in={isLoading}>
            <Box sx={{
              position: 'absolute',
              inset: 0,
              bgcolor: 'rgba(255,255,255,0.9)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(6px)'
            }}>
              <CircularProgress size={50} thickness={4} sx={{ color: '#1A1C1E', mb: 2 }} />
              <Typography variant="body1" fontWeight="700" sx={{ color: '#1A1C1E' }}>
                Provisioning Storage...
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Setting up your SQLite environment
              </Typography>
            </Box>
          </Fade>
        )}

        <Stack spacing={4}>
          <Box>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
              <Box sx={{ bgcolor: '#F0F2F5', p: 1.5, borderRadius: 3 }}>
                <Database size={32} weight="fill" color="#1A1C1E" />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="800">
                  Create New Database
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Configure your SQLite instance and storage limits.
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Stack spacing={3}>
            {/* Database Name */}
            <TextField
              fullWidth
              label="Database Name"
              placeholder="my_app_production"
              value={dbName}
              onChange={(e) => setDbName(e.target.value)}
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.disabled' }}>sqlite://</Typography>
                  </InputAdornment>
                ),
                sx: { borderRadius: 3 }
              }}
            />

            {/* Storage Plan Dropdown */}
            <TextField
              select
              fullWidth
              label="Select Storage Plan"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              disabled={isLoading}
              InputProps={{
                startAdornment: <HardDrive size={20} style={{ marginRight: 12, opacity: 0.6 }} />,
                sx: { borderRadius: 3 }
              }}
            >
              {STORAGE_PLANS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }} alignItems="center">
                    <Box>
                      <Typography variant="body2" fontWeight="600">{option.label}</Typography>
                      <Typography variant="caption" color="text.secondary">{option.size} Storage</Typography>
                    </Box>
                    <Chip
                      label={option.price}
                      size="small"
                      variant={option.price === "Free" ? "outlined" : "filled"}
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.7rem',
                        bgcolor: option.price === "Free" ? 'transparent' : '#F0F2F5',
                        color: '#1A1C1E',
                        // ADD THIS LINE:
                        pointerEvents: 'none'
                      }}
                    />
                  </Stack>
                </MenuItem>
              ))}

            </TextField>
          </Stack>

          <Box sx={{ p: 2, bgcolor: '#F8F9FA', borderRadius: 3, border: '1px solid #E0E4E8' }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <CreditCard size={24} color="#666" />
              <Box>
                <Typography variant="caption" fontWeight="700" display="block">
                  Billing Information
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {plan === 'free'
                    ? "No credit card required for the Free Tier."
                    : "You will be charged monthly for this instance."}
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Button
            fullWidth
            size="large"
            variant="contained"
            disableElevation
            onClick={handleCreate}
            disabled={!dbName || isLoading}
            startIcon={<RocketLaunch weight="bold" />}
            sx={{
              borderRadius: 3,
              py: 1.8,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 700,
              bgcolor: '#1A1C1E',
              '&:hover': { bgcolor: '#000' },
              '&.Mui-disabled': { bgcolor: '#F0F2F5' }
            }}
          >
            Create Database Instance
          </Button>
        </Stack>
      </Paper>

      <Typography variant="caption" align="center" display="block" sx={{ mt: 3, color: 'text.disabled' }}>
        SQLite Cloud Engine v3.4 • Auto-scaling not enabled for small tiers
      </Typography>
    </Container>
  )
}

