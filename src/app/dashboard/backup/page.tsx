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
  CloudArrowUp,
  Trash,
  Files,
  MagnifyingGlass,
  ArrowSquareOut,
  CheckCircle,
  Clock
} from "@phosphor-icons/react"
import { useRouter } from "next/navigation"

const INITIAL_BACKUPS = [
  { id: 1, name: "prod-backup-2026-04-09", size: "3.2 MB", created: "Apr 09, 2026", status: "completed" },
  { id: 2, name: "prod-backup-2026-04-08", size: "3.1 MB", created: "Apr 08, 2026", status: "completed" },
  { id: 3, name: "prod-backup-2026-04-07", size: "2.9 MB", created: "Apr 07, 2026", status: "pending" },
]

export default function BackupList() {
  const [search, setSearch] = useState("")
  const router = useRouter()

  const filteredBackups = INITIAL_BACKUPS.filter(b =>
    b.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 5 }}>
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ color: '#1A1C1E', mb: 1 }}>
            Backup
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View and manage your project backups.
          </Typography>
        </Box>
        <Button
          onClick={() => router.push("/dashboard/backup/1/overview")}
          variant="contained"
          disableElevation
          startIcon={<Plus weight="bold" />}
          sx={{ borderRadius: "10px", px: 3, py: 1.2, textTransform: 'none', fontWeight: 700 }}
        >
          Create Backup
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          placeholder="Search backups..."
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
            {filteredBackups.length} Backups
          </Typography>
        </Box>
      </Stack>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E0E4E8', borderRadius: '12px', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#F8F9FA' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Size</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Created At</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBackups.map((backup) => (
              <TableRow key={backup.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ p: 1, borderRadius: '8px', bgcolor: '#E8EBF0', display: 'flex' }}>
                      <CloudArrowUp size={20} weight="fill" color="#475467" />
                    </Box>
                    <Typography variant="body2" fontWeight="600" color="#101828">
                      {backup.name}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{backup.size}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{backup.created}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={backup.status === "completed" ? <CheckCircle size={14} /> : <Clock size={14} />}
                    label={backup.status === "completed" ? "Completed" : "Pending"}
                    color={backup.status === "completed" ? "success" : "warning"}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton size="small" title="View Details" href={`/dashboard/backup/${backup.id}/overview`}>
                      <ArrowSquareOut size={20} />
                    </IconButton>
                    <IconButton size="small" sx={{ color: '#D92D20' }} title="Delete Backup">
                      <Trash size={20} />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {filteredBackups.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                  <Typography color="text.secondary">No backups found matching "{search}"</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
