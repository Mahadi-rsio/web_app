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
  Function as FunctionIcon,
  Trash,
  Files,
  MagnifyingGlass,
  ArrowSquareOut,
  CheckCircle,
  WarningCircle,
  Play
} from "@phosphor-icons/react"

const INITIAL_FUNCTIONS = [
  { id: 1, name: "send-welcome-email", runtime: "Node.js 20", invocations: 1240, status: "active", updated: "Apr 08, 2026" },
  { id: 2, name: "resize-image", runtime: "Node.js 20", invocations: 5820, status: "active", updated: "Apr 05, 2026" },
  { id: 3, name: "sync-crm-data", runtime: "Python 3.12", invocations: 88, status: "error", updated: "Apr 01, 2026" },
]

export default function FunctionsList() {
  const [search, setSearch] = useState("")

  const filteredFns = INITIAL_FUNCTIONS.filter(fn =>
    fn.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 5 }}>
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ color: '#1A1C1E', mb: 1 }}>
            Functions
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Deploy and manage serverless functions.
          </Typography>
        </Box>
        <Button
          variant="contained"
          disableElevation
          startIcon={<Plus weight="bold" />}
          sx={{ borderRadius: "10px", px: 3, py: 1.2, textTransform: 'none', fontWeight: 700 }}
        >
          Deploy Function
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          placeholder="Search functions..."
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
            {filteredFns.length} Functions
          </Typography>
        </Box>
      </Stack>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E0E4E8', borderRadius: '12px', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#F8F9FA' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Function Name</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Runtime</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Invocations</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Last Updated</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFns.map((fn) => (
              <TableRow key={fn.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ p: 1, borderRadius: '8px', bgcolor: '#E8EBF0', display: 'flex' }}>
                      <FunctionIcon size={20} weight="fill" color="#475467" />
                    </Box>
                    <Typography variant="body2" fontWeight="600" color="#101828" sx={{ fontFamily: 'monospace' }}>
                      {fn.name}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{fn.runtime}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{fn.invocations.toLocaleString()}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    icon={fn.status === "active" ? <CheckCircle size={14} /> : <WarningCircle size={14} />}
                    label={fn.status === "active" ? "Active" : "Error"}
                    color={fn.status === "active" ? "success" : "error"}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{fn.updated}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton size="small" title="Invoke">
                      <Play size={18} weight="fill" />
                    </IconButton>
                    <IconButton size="small" title="View Logs">
                      <ArrowSquareOut size={20} />
                    </IconButton>
                    <IconButton size="small" sx={{ color: '#D92D20' }} title="Delete Function">
                      <Trash size={20} />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {filteredFns.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                  <Typography color="text.secondary">No functions found matching "{search}"</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
