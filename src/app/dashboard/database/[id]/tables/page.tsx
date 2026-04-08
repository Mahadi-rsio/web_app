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
  Container,
  Button,
  Chip,
  Tooltip,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from "@mui/material"
import {
  CaretLeft,
  DotsThreeVertical,
  Trash,
  Eraser,
  Lock,
  LockOpen,
  Export,
  Plus,
  Rows,
  Columns,
  Lightning,
  Funnel
} from "@phosphor-icons/react"

// Mock data for a "Users" table
const MOCK_COLUMNS = ["id", "username", "email", "role", "created_at"]
const MOCK_ROWS = [
  { id: 1, username: "alex_dev", email: "alex@example.com", role: "Admin", created_at: "2026-01-12" },
  { id: 2, username: "sarah_k", email: "sarah@design.io", role: "User", created_at: "2026-02-05" },
  { id: 3, username: "mike_db", email: "mike@data.com", role: "Editor", created_at: "2026-03-10" },
  { id: 4, username: "emily_99", email: "emily@tech.com", role: "User", created_at: "2026-04-01" },
]

export default function TableViewerPage() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isLocked, setIsLocked] = useState(false)

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Navigation & Breadcrumbs */}
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <Button
          startIcon={<CaretLeft />}
          size="small"
          sx={{ textTransform: 'none', color: 'text.secondary' }}
        >
          Back to Databases
        </Button>
      </Stack>

      {/* Table Header Section */}
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 4 }}>
        <Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h4" fontWeight="800">
              users_table
            </Typography>
            {isLocked ? (
              <Chip icon={<Lock size={14} weight="fill" />} label="Read Only" color="warning" size="small" sx={{ borderRadius: '6px' }} />
            ) : (
              <Chip icon={<LockOpen size={14} weight="fill" />} label="Editable" color="success" size="small" variant="outlined" sx={{ borderRadius: '6px' }} />
            )}
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Schema: main | Storage: SQLite 3.0
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<Export size={18} />} sx={{ borderRadius: 2, textTransform: 'none' }}>
            Export CSV
          </Button>
          <Button
            variant="contained"
            disableElevation
            startIcon={<Plus size={18} weight="bold" />}
            sx={{ borderRadius: 2, textTransform: 'none', bgcolor: '#1A1C1E' }}
            disabled={isLocked}
          >
            Insert Row
          </Button>
          <IconButton onClick={handleMenuOpen} sx={{ border: '1px solid #E0E4E8', borderRadius: 2 }}>
            <DotsThreeVertical weight="bold" />
          </IconButton>
        </Stack>
      </Stack>

      {/* Quick Insights Bar */}
      <Paper variant="outlined" sx={{ p: 1.5, mb: 3, borderRadius: 3, bgcolor: '#F8F9FA', borderStyle: 'dashed' }}>
        <Stack direction="row" spacing={4} divider={<Divider orientation="vertical" flexItem />}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Rows size={20} color="#666" />
            <Typography variant="body2"><b>4</b> Total Rows</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Columns size={20} color="#666" />
            <Typography variant="body2"><b>5</b> Columns</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Lightning size={20} color="#EAB308" weight="fill" />
            <Typography variant="body2">Query Time: <b>0.002s</b></Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: 'auto !important' }}>
            <Button size="small" startIcon={<Funnel />} sx={{ textTransform: 'none' }}>Filter</Button>
          </Stack>
        </Stack>
      </Paper>

      {/* Main Data Table */}
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E0E4E8', borderRadius: 4 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {MOCK_COLUMNS.map((col) => (
                <TableCell key={col} sx={{ bgcolor: '#fff', fontWeight: 700, color: 'text.secondary', borderBottom: '2px solid #F0F2F5' }}>
                  {col.toUpperCase()}
                </TableCell>
              ))}
              <TableCell align="right" sx={{ bgcolor: '#fff', borderBottom: '2px solid #F0F2F5' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {MOCK_ROWS.map((row) => (
              <TableRow key={row.id} hover>
                {MOCK_COLUMNS.map((col) => (
                  <TableCell key={col} sx={{ py: 1.5 }}>
                    <Typography variant="body2" sx={{ fontFamily: col === 'id' ? 'monospace' : 'inherit' }}>
                      {row[col as keyof typeof row]}
                    </Typography>
                  </TableCell>
                ))}
                <TableCell align="right">
                  <Tooltip title="Edit Row">
                    <IconButton size="small" disabled={isLocked}><Plus size={16} /></IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dangerous Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ sx: { borderRadius: 3, mt: 1, minWidth: 200, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' } }}
      >
        <MenuItem onClick={() => { setIsLocked(!isLocked); handleMenuClose(); }}>
          <ListItemIcon>{isLocked ? <LockOpen size={20} /> : <Lock size={20} />}</ListItemIcon>
          <ListItemText>{isLocked ? 'Unlock Table' : 'Lock Table'}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'warning.main' }}>
          <ListItemIcon><Eraser size={20} color="currentColor" /></ListItemIcon>
          <ListItemText>Truncate Table</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon><Trash size={20} color="currentColor" /></ListItemIcon>
          <ListItemText>Drop Table</ListItemText>
        </MenuItem>
      </Menu>
    </Container>
  )
}

