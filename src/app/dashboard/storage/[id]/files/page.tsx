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
  DotsThreeVertical,
  Trash,
  Export,
  Plus,
  Funnel,
  FolderOpen,
  MagnifyingGlass,
  CloudArrowUp,
  Image,
  File,
  FilePdf,
  FileZip,
  Download
} from "@phosphor-icons/react"

const MOCK_FOLDERS = [
  { name: "avatars", files: 340, type: "system" },
  { name: "documents", files: 85, type: "user" },
  { name: "exports", files: 22, type: "user" },
  { name: "temp", files: 6, type: "config" },
]

const MOCK_FILES = [
  { id: 1, name: "profile_alex.png", folder: "avatars", size: "48 KB", type: "image", modified: "Apr 05, 2026" },
  { id: 2, name: "invoice_march.pdf", folder: "documents", size: "210 KB", type: "pdf", modified: "Apr 02, 2026" },
  { id: 3, name: "data_export.zip", folder: "exports", size: "1.4 MB", type: "zip", modified: "Mar 30, 2026" },
]

function FileTypeIcon({ type }: { type: string }) {
  if (type === "image") return <Image size={20} weight="fill" color="#4CAF50" />
  if (type === "pdf") return <FilePdf size={20} weight="fill" color="#F44336" />
  if (type === "zip") return <FileZip size={20} weight="fill" color="#FF9800" />
  return <File size={20} weight="fill" color="#9E9E9E" />
}

export default function StorageFileBrowser() {
  const [activeFolder, setActiveFolder] = useState("avatars")
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)

  const visibleFiles = MOCK_FILES.filter(f => f.folder === activeFolder)

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#F4F7F9' }}>

      {/* LEFT SIDEBAR: Folder Navigator */}
      <Box sx={{ width: 280, borderRight: '1px solid #E0E4E8', bgcolor: '#fff', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #F0F2F5' }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <FolderOpen size={24} weight="fill" color="#3f51b5" />
            <Typography variant="subtitle1" fontWeight="700">user-uploads</Typography>
          </Stack>
          <TextField
            fullWidth
            size="small"
            placeholder="Search folders..."
            InputProps={{
              startAdornment: <InputAdornment position="start"><MagnifyingGlass size={16} /></InputAdornment>,
              sx: { borderRadius: 2, bgcolor: '#F8F9FA' }
            }}
          />
        </Box>

        <List sx={{ flexGrow: 1, overflowY: 'auto', p: 1 }}>
          <Typography variant="caption" fontWeight="700" color="text.secondary" sx={{ px: 2, mb: 1, display: 'block' }}>
            FOLDERS ({MOCK_FOLDERS.length})
          </Typography>
          {MOCK_FOLDERS.map((folder) => (
            <ListItem
              key={folder.name}
              disablePadding
              secondaryAction={
                <Tooltip title="Upload to folder">
                  <IconButton edge="end" size="small"><Plus size={14} /></IconButton>
                </Tooltip>
              }
            >
              <ListItemButton
                selected={activeFolder === folder.name}
                onClick={() => setActiveFolder(folder.name)}
                sx={{ borderRadius: 2, mb: 0.5 }}
              >
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <FolderOpen size={18} weight={activeFolder === folder.name ? "fill" : "regular"} />
                </ListItemIcon>
                <ListItemText
                  primary={folder.name}
                  primaryTypographyProps={{ variant: 'body2', fontWeight: activeFolder === folder.name ? 600 : 400 }}
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
                <Typography variant="h5" fontWeight="800">{activeFolder}</Typography>
                <Chip
                  label="Public"
                  color="info"
                  size="small"
                  variant="soft"
                  sx={{ borderRadius: '6px', fontWeight: 600 }}
                />
              </Stack>
              <Typography variant="caption" color="text.secondary">
                Object Storage • Last synced: 10 minutes ago
              </Typography>
            </Box>

            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                startIcon={<CloudArrowUp />}
                sx={{ borderRadius: 2, textTransform: 'none' }}
              >
                Upload File
              </Button>
              <Button variant="contained" disableElevation startIcon={<Plus weight="bold" />} sx={{ borderRadius: 2, textTransform: 'none', bgcolor: '#1A1C1E' }}>
                New Folder
              </Button>
              <IconButton onClick={handleMenuOpen} sx={{ border: '1px solid #E0E4E8', borderRadius: 2 }}>
                <DotsThreeVertical weight="bold" />
              </IconButton>
            </Stack>
          </Stack>
        </Box>

        {/* Stats & Filters Bar */}
        <Box sx={{ px: 3, py: 1.5, display: 'flex', alignItems: 'center', gap: 3, borderBottom: '1px solid #E0E4E8', bgcolor: '#fff' }}>
          <Typography variant="caption"><b>{visibleFiles.length}</b> Files</Typography>
          <Divider orientation="vertical" flexItem />
          <Button size="small" startIcon={<Funnel />} sx={{ textTransform: 'none', color: 'text.secondary' }}>Filter</Button>
          <Button size="small" startIcon={<Export />} sx={{ textTransform: 'none', color: 'text.secondary', ml: 'auto' }}>Export List</Button>
        </Box>

        {/* File Table */}
        <Box sx={{ p: 3, flexGrow: 1, overflow: 'auto' }}>
          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ bgcolor: '#F8F9FA', fontWeight: 700 }}>Name</TableCell>
                  <TableCell sx={{ bgcolor: '#F8F9FA', fontWeight: 700 }}>Type</TableCell>
                  <TableCell sx={{ bgcolor: '#F8F9FA', fontWeight: 700 }}>Size</TableCell>
                  <TableCell sx={{ bgcolor: '#F8F9FA', fontWeight: 700 }}>Last Modified</TableCell>
                  <TableCell align="right" sx={{ bgcolor: '#F8F9FA' }} />
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleFiles.length > 0 ? visibleFiles.map((file) => (
                  <TableRow key={file.id} hover>
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <FileTypeIcon type={file.type} />
                        <Typography variant="body2" fontWeight="600">{file.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip label={file.type} size="small" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">{file.size}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">{file.modified}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                        <IconButton size="small" title="Download"><Download size={18} /></IconButton>
                        <IconButton size="small" sx={{ color: '#D92D20' }} title="Delete"><Trash size={18} /></IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                      <Typography color="text.secondary">No files in this folder yet.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Context Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon><Export size={20} /></ListItemIcon>
          <ListItemText>Export Folder</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon><Trash size={20} color="currentColor" /></ListItemIcon>
          <ListItemText>Delete Folder</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}
