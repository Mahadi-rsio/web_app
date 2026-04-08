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
  Chip
} from "@mui/material"
import {
  FolderOpen,
  CaretLeft,
  RocketLaunch,
  CreditCard,
  HardDrive
} from "@phosphor-icons/react"

const STORAGE_PLANS = [
  { value: "free", label: "Free Tier", size: "500MB", price: "Free" },
  { value: "10gb", label: "Starter", size: "10GB", price: "$2/mo" },
  { value: "50gb", label: "Standard", size: "50GB", price: "$5/mo" },
  { value: "200gb", label: "Professional", size: "200GB", price: "$15/mo" },
  { value: "1tb", label: "Enterprise", size: "1TB", price: "$40/mo" },
]

export default function CreateStoragePage() {
  const router = useRouter()
  const [bucketName, setBucketName] = useState("")
  const [plan, setPlan] = useState("free")
  const [isLoading, setIsLoading] = useState(false)

  const handleCreate = () => {
    if (!bucketName) return
    setIsLoading(true)
    setTimeout(() => {
      router.push("/dashboard/storage/")
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
                Creating Bucket...
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Setting up your storage environment
              </Typography>
            </Box>
          </Fade>
        )}

        <Stack spacing={4}>
          <Box>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
              <Box sx={{ bgcolor: '#F0F2F5', p: 1.5, borderRadius: 3 }}>
                <FolderOpen size={32} weight="fill" color="#1A1C1E" />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="800">
                  Create New Bucket
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Configure your storage bucket and capacity limits.
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Stack spacing={3}>
            {/* Bucket Name */}
            <TextField
              fullWidth
              label="Bucket Name"
              placeholder="my-app-assets"
              value={bucketName}
              onChange={(e) => setBucketName(e.target.value)}
              disabled={isLoading}
              InputProps={{ sx: { borderRadius: 3 } }}
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
                    : "You will be charged monthly for this bucket."}
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
            disabled={!bucketName || isLoading}
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
            Create Storage Bucket
          </Button>
        </Stack>
      </Paper>

      <Typography variant="caption" align="center" display="block" sx={{ mt: 3, color: 'text.disabled' }}>
        Object Storage Engine v2.1 • CDN integration available on paid plans
      </Typography>
    </Container>
  )
}
