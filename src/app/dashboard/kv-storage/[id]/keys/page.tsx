"use client"

import React, { useState } from "react"
import {
  Box,
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
  Button,
  Chip,
  TextField,
  InputAdornment,
  Container
} from "@mui/material"
import {
  Plus,
  Trash,
  MagnifyingGlass,
  Stack as StackIcon,
  PencilSimple,
  Clock
} from "@phosphor-icons/react"

const MOCK_KEYS = [
  { key: "session:abc123", value: '{"userId":42,"role":"admin"}', ttl: "1h 32m", type: "json" },
  { key: "flag:dark-mode", value: "true", ttl: "No expiry", type: "string" },
  { key: "rate:192.168.1.1", value: "47", ttl: "12s", type: "number" },
  { key: "cache:home-feed", value: "[...]", ttl: "5m 10s", type: "json" },
]

export default function Page() {
  const [search, setSearch] = useState("")

  const filteredKeys = MOCK_KEYS.filter(k =>
    k.key.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight="700">Key Explorer</Typography>
        <Button
          variant="contained"
          disableElevation
          startIcon={<Plus weight="bold" />}
          sx={{ borderRadius: "10px", textTransform: 'none', fontWeight: 700 }}
        >
          Add Key
        </Button>
      </Stack>

      <TextField
        fullWidth
        placeholder="Search keys..."
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#fff' } }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MagnifyingGlass size={18} weight="bold" />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E0E4E8', borderRadius: '12px', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#F8F9FA' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Key</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Value</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>TTL</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredKeys.map((item, i) => (
              <TableRow key={i} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ p: 1, borderRadius: '8px', bgcolor: '#E8EBF0', display: 'flex' }}>
                      <StackIcon size={18} weight="fill" color="#475467" />
                    </Box>
                    <Typography variant="body2" fontWeight="600" sx={{ fontFamily: 'monospace', color: '#101828' }}>
                      {item.key}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {item.value}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip label={item.type} size="small" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary' }}>
                    <Clock size={14} />
                    <Typography variant="caption">{item.ttl}</Typography>
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton size="small" title="Edit Key">
                      <PencilSimple size={18} />
                    </IconButton>
                    <IconButton size="small" sx={{ color: '#D92D20' }} title="Delete Key">
                      <Trash size={18} />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {filteredKeys.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                  <Typography color="text.secondary">No keys found matching "{search}"</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
