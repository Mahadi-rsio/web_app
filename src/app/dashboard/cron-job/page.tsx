"use client"

import React, { useState } from "react"
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Stack,
  Container,
  TextField,
  InputAdornment,
  Chip
} from "@mui/material"
import {
  Plus,
  Timer,
  Trash,
  Files,
  MagnifyingGlass,
  ArrowSquareOut,
  CheckCircle,
  Pause,
  Play
} from "@phosphor-icons/react"
import { useRouter } from "next/navigation"

const INITIAL_CRON_JOBS = [
  { id: 1, name: "daily-report", schedule: "0 0 * * *", lastRun: "Apr 09, 2026 12:00 AM", status: "active" },
  { id: 2, name: "cleanup-sessions", schedule: "*/30 * * * *", lastRun: "Apr 09, 2026 10:30 AM", status: "active" },
  { id: 3, name: "sync-analytics", schedule: "0 6 * * 1", lastRun: "Apr 07, 2026 06:00 AM", status: "paused" },
]

export default function CronJobList() {
  const [search, setSearch] = useState("")
  const router = useRouter()

  const filteredJobs = INITIAL_CRON_JOBS.filter(j =>
    j.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 5 }}>
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ color: '#1A1C1E', mb: 1 }}>
            Cron Jobs
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Schedule and manage recurring background jobs.
          </Typography>
        </Box>
        <Button
          onClick={() => router.push("/dashboard/cron-job/1/overview")}
          variant="contained"
          disableElevation
          startIcon={<Plus weight="bold" />}
          sx={{ borderRadius: "10px", px: 3, py: 1.2, textTransform: 'none', fontWeight: 700 }}
        >
          Create Cron Job
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          placeholder="Search cron jobs..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flexGrow: 1, '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#fff' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MagnifyingGlass size={18} weight="bold" />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, bgcolor: '#F0F2F5', borderRadius: '10px' }}>
          <Files size={20} weight="duotone" style={{ marginRight: '8px' }} />
          <Typography variant="subtitle2" fontWeight="700">
            {filteredJobs.length} Jobs
          </Typography>
        </Box>
      </Stack>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E0E4E8', borderRadius: '12px', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#F8F9FA' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Job Name</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Schedule</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Last Run</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow key={job.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ p: 1, borderRadius: '8px', bgcolor: '#E8EBF0', display: 'flex' }}>
                      <Timer size={20} weight="fill" color="#475467" />
                    </Box>
                    <Typography variant="body2" fontWeight="600" color="#101828">
                      {job.name}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>{job.schedule}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{job.lastRun}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={job.status === "active" ? <CheckCircle size={14} /> : <Pause size={14} />}
                    label={job.status === "active" ? "Active" : "Paused"}
                    color={job.status === "active" ? "success" : "default"}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton size="small" title={job.status === "active" ? "Pause" : "Resume"}>
                      {job.status === "active" ? <Pause size={18} /> : <Play size={18} weight="fill" />}
                    </IconButton>
                    <IconButton size="small" title="View Details" href={`/dashboard/cron-job/${job.id}/overview`}>
                      <ArrowSquareOut size={20} />
                    </IconButton>
                    <IconButton size="small" sx={{ color: '#D92D20' }} title="Delete Job">
                      <Trash size={20} />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {filteredJobs.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                  <Typography color="text.secondary">No cron jobs found matching "{search}"</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
