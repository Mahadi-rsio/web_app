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
  InputAdornment
} from "@mui/material"

// Phosphor Icons
import {
  Plus,
  Database,
  Trash,
  Files,
  MagnifyingGlass,
  ArrowSquareOut,
  HardDrive
} from "@phosphor-icons/react"

// Mock list of created SQLite database files
const INITIAL_DATABASES = [
  { id: 1, filename: "analytics_main.sqlite", size: "12.4 MB", path: "/usr/db/storage/v1", created: "Apr 02, 2026" },
  { id: 2, filename: "user_preferences.db", size: "450 KB", path: "/usr/db/storage/v1", created: "Mar 28, 2026" },
  { id: 3, filename: "legacy_backup_final.sqlite", size: "1.2 GB", path: "/usr/db/backups", created: "Jan 15, 2026" },
]

export default function DatabaseList() {
  const [search, setSearch] = useState("")

  const filteredDbs = INITIAL_DATABASES.filter(db =>
    db.filename.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Top Header Section */}
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 5 }}>
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ color: '#1A1C1E', mb: 1 }}>
            Database Inventory
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View and manage your SQLite database files.
          </Typography>
        </Box>
        <Button
          variant="contained"
          disableElevation
          startIcon={<Plus weight="bold" />}
          sx={{
            borderRadius: "10px",
            px: 3,
            py: 1.2,
            textTransform: 'none',
            fontWeight: 700,
          }}
        >
          Create New Database
        </Button>
      </Stack>

      {/* Filter & Stats Bar */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          placeholder="Search by filename..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            flexGrow: 1,
            '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#fff' }
          }}
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
            {filteredDbs.length} Files
          </Typography>
        </Box>
      </Stack>

      {/* Database File Table */}
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E0E4E8', borderRadius: '12px', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#F8F9FA' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>File Name</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>File Path</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Size</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Created At</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDbs.map((db) => (
              <TableRow key={db.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ p: 1, borderRadius: '8px', bgcolor: '#E8EBF0', display: 'flex' }}>
                      <Database size={20} weight="fill" color="#475467" />
                    </Box>
                    <Typography variant="body2" fontWeight="600" color="#101828">
                      {db.filename}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary' }}>
                    <HardDrive size={16} />
                    <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>{db.path}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{db.size}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{db.created}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton size="small" title="Open Location" href='/dashboard/database/tables'>
                      <ArrowSquareOut size={20} />
                    </IconButton>
                    <IconButton size="small" sx={{ color: '#D92D20' }} title="Delete File">
                      <Trash size={20} />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {filteredDbs.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                  <Typography color="text.secondary">No database files found matching "{search}"</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

