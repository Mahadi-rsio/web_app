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
  Tooltip,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
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
  Funnel,
  Database,
  MagnifyingGlass,
  TerminalWindow,
  Code,
  Table as TableIcon
} from "@phosphor-icons/react"

// Mock Schema Data
const DB_SCHEMA = [
  { name: "users_table", rows: 1240, type: "system" },
  { name: "products", rows: 85, type: "user" },
  { name: "orders_archive", rows: 5420, type: "user" },
  { name: "settings", rows: 12, type: "config" },
]

const MOCK_COLUMNS = ["id", "username", "email", "role", "status"]
const MOCK_ROWS = [
  { id: 1, username: "alex_dev", email: "alex@example.com", role: "Admin", status: "Active" },
  { id: 2, username: "sarah_k", email: "sarah@design.io", role: "User", status: "Inactive" },
  { id: 3, username: "mike_db", email: "mike@data.com", role: "Editor", status: "Active" },
]

export default function SQLiteExplorer() {
  const [activeTable, setActiveTable] = useState("users_table")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isLocked, setIsLocked] = useState(false)
  const [showConsole, setShowConsole] = useState(false)

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#F4F7F9' }}>

      {/* LEFT SIDEBAR: Table Navigator */}
      <Box sx={{ width: 280, borderRight: '1px solid #E0E4E8', bgcolor: '#fff', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #F0F2F5' }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <Database size={24} weight="fill" color="#3f51b5" />
            <Typography variant="subtitle1" fontWeight="700">Production_DB</Typography>
          </Stack>
          <TextField
            fullWidth
            size="small"
            placeholder="Search tables..."
            InputProps={{
              startAdornment: <InputAdornment position="start"><MagnifyingGlass size={16} /></InputAdornment>,
              sx: { borderRadius: 2, bgcolor: '#F8F9FA' }
            }}
          />
        </Box>

        <List sx={{ flexGrow: 1, overflowY: 'auto', p: 1 }}>
          <Typography variant="caption" fontWeight="700" color="text.secondary" sx={{ px: 2, mb: 1, display: 'block' }}>
            TABLES ({DB_SCHEMA.length})
          </Typography>
          {DB_SCHEMA.map((table) => (
            <ListItem
              key={table.name}
              disablePadding
              secondaryAction={
                <Tooltip title="Quick Insert">
                  <IconButton edge="end" size="small"><Plus size={14} /></IconButton>
                </Tooltip>
              }
            >
              <ListItemButton
                selected={activeTable === table.name}
                onClick={() => setActiveTable(table.name)}
                sx={{ borderRadius: 2, mb: 0.5 }}
              >
                <ListItemIcon sx={{ minWidth: 32 }}><TableIcon size={18} weight={activeTable === table.name ? "fill" : "regular"} /></ListItemIcon>
                <ListItemText
                  primary={table.name}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: activeTable === table.name ? 600 : 400 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* MAIN CONTENT AREA */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Top Header */}
        <Box sx={{ p: 3, bgcolor: '#fff', borderBottom: '1px solid #E0E4E8' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Typography variant="h5" fontWeight="800">{activeTable}</Typography>
                <Chip
                  label={isLocked ? "Read Only" : "Auto-commit On"}
                  color={isLocked ? "warning" : "success"}
                  size="small"
                  variant="soft"
                  sx={{ borderRadius: '6px', fontWeight: 600 }}
                />
              </Stack>
              <Typography variant="caption" color="text.secondary">
                SQLite 3.41.2 • Last vacuumed: 2 hours ago
              </Typography>
            </Box>

            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                startIcon={<TerminalWindow />}
                onClick={() => setShowConsole(!showConsole)}
                sx={{ borderRadius: 2, textTransform: 'none' }}
              >
                {showConsole ? "Close Console" : "SQL Console"}
              </Button>
              <Button variant="contained" disableElevation startIcon={<Plus weight="bold" />} sx={{ borderRadius: 2, textTransform: 'none', bgcolor: '#1A1C1E' }}>
                Add Row
              </Button>
              <IconButton onClick={handleMenuOpen} sx={{ border: '1px solid #E0E4E8', borderRadius: 2 }}>
                <DotsThreeVertical weight="bold" />
              </IconButton>
            </Stack>
          </Stack>
        </Box>

        {/* SQL Console Panel (Optional Feature) */}
        {showConsole && (
          <Box sx={{ p: 2, bgcolor: '#1E1E1E', color: '#00FF41' }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
              <Code size={18} />
              <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#aaa' }}>SELECT * FROM {activeTable} LIMIT 100;</Typography>
              <Button size="small" variant="contained" color="success" sx={{ ml: 'auto', height: 24, fontSize: 10 }}>Run Query</Button>
            </Stack>
            <Divider sx={{ borderColor: '#333', mb: 1 }} />
          </Box>
        )}

        {/* Stats & Filters Bar */}
        <Box sx={{ px: 3, py: 1.5, display: 'flex', alignItems: 'center', gap: 3, borderBottom: '1px solid #E0E4E8', bgcolor: '#fff' }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Rows size={16} />
            <Typography variant="caption"><b>1,240</b> Rows</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Columns size={16} />
            <Typography variant="caption"><b>{MOCK_COLUMNS.length}</b> Columns</Typography>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Button size="small" startIcon={<Funnel />} sx={{ textTransform: 'none', color: 'text.secondary' }}>Add Filter</Button>
          <Button size="small" startIcon={<Export />} sx={{ textTransform: 'none', color: 'text.secondary', ml: 'auto' }}>Export</Button>
        </Box>

        {/* Data Grid */}
        <Box sx={{ p: 3, flexGrow: 1, overflow: 'auto' }}>
          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3, maxHeight: '100%' }}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  {MOCK_COLUMNS.map((col) => (
                    <TableCell key={col} sx={{ bgcolor: '#F8F9FA', fontWeight: 700, py: 2 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="caption" sx={{ color: 'primary.main', opacity: 0.7, fontWeight: 800 }}>T</Typography>
                        <Typography variant="body2">{col.toUpperCase()}</Typography>
                      </Stack>
                    </TableCell>
                  ))}
                  <TableCell align="right" sx={{ bgcolor: '#F8F9FA' }} />
                </TableRow>
              </TableHead>
              <TableBody>
                {MOCK_ROWS.map((row) => (
                  <TableRow key={row.id} hover>
                    {MOCK_COLUMNS.map((col) => (
                      <TableCell key={col} sx={{
                        fontFamily: col === 'id' ? 'monospace' : 'inherit',
                        cursor: 'cell',
                        '&:hover': { bgcolor: '#F0F7FF' }
                      }}>
                        {row[col as keyof typeof row]}
                      </TableCell>
                    ))}
                    <TableCell align="right">
                      <IconButton size="small"><DotsThreeVertical /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Settings Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => { setIsLocked(!isLocked); handleMenuClose(); }}>
          <ListItemIcon>{isLocked ? <LockOpen size={20} /> : <Lock size={20} />}</ListItemIcon>
          <ListItemText>{isLocked ? 'Enable Editing' : 'Lock Table'}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon><Export size={20} /></ListItemIcon>
          <ListItemText>Export Schema (SQL)</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon><Trash size={20} color="currentColor" /></ListItemIcon>
          <ListItemText>Delete Table</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}

