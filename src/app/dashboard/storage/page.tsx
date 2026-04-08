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
import {
  Plus,
  HardDrive,
  Trash,
  Files,
  MagnifyingGlass,
  ArrowSquareOut,
  FolderOpen
} from "@phosphor-icons/react"
import { useRouter } from "next/navigation"

const INITIAL_BUCKETS = [
  { id: 1, name: "user-uploads", size: "3.2 GB", path: "/storage/buckets/user-uploads", created: "Apr 01, 2026" },
  { id: 2, name: "static-assets", size: "820 MB", path: "/storage/buckets/static-assets", created: "Mar 20, 2026" },
  { id: 3, name: "backups-archive", size: "14.7 GB", path: "/storage/buckets/backups", created: "Jan 10, 2026" },
]

export default function StorageList() {
  const [search, setSearch] = useState("")
  const router = useRouter()

  const filteredBuckets = INITIAL_BUCKETS.filter(bucket =>
    bucket.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Top Header Section */}
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 5 }}>
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ color: '#1A1C1E', mb: 1 }}>
            Storage Inventory
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View and manage your storage buckets and files.
          </Typography>
        </Box>
        <Button
          onClick={() => { router.push("/dashboard/storage/create") }}
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
          Create New Bucket
        </Button>
      </Stack>

      {/* Filter & Stats Bar */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          placeholder="Search by bucket name..."
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
            {filteredBuckets.length} Buckets
          </Typography>
        </Box>
      </Stack>

      {/* Storage Bucket Table */}
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E0E4E8', borderRadius: '12px', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#F8F9FA' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Bucket Name</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Path</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Size</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Created At</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBuckets.map((bucket) => (
              <TableRow key={bucket.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ p: 1, borderRadius: '8px', bgcolor: '#E8EBF0', display: 'flex' }}>
                      <FolderOpen size={20} weight="fill" color="#475467" />
                    </Box>
                    <Typography variant="body2" fontWeight="600" color="#101828">
                      {bucket.name}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary' }}>
                    <HardDrive size={16} />
                    <Typography variant="caption" sx={{ fontFamily: 'monospace' }}>{bucket.path}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{bucket.size}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{bucket.created}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton size="small" title="Open Bucket" href={`/dashboard/storage/${bucket.id}/overview`}>
                      <ArrowSquareOut size={20} />
                    </IconButton>
                    <IconButton size="small" sx={{ color: '#D92D20' }} title="Delete Bucket">
                      <Trash size={20} />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {filteredBuckets.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                  <Typography color="text.secondary">No buckets found matching "{search}"</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
