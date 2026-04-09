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
  Chip,
} from "@mui/material"
import {
  Plus,
  Browsers,
  Trash,
  MagnifyingGlass,
  ArrowSquareOut,
  Globe,
} from "@phosphor-icons/react"
import { useRouter } from "next/navigation"

const FRAMEWORK_COLORS: Record<string, { bg: string; color: string }> = {
  React:   { bg: "#E3F2FD", color: "#1565C0" },
  Vue:     { bg: "#E8F5E9", color: "#2E7D32" },
  Angular: { bg: "#FCE4EC", color: "#AD1457" },
  Svelte:  { bg: "#FFF3E0", color: "#E65100" },
  "Next.js": { bg: "#F3E5F5", color: "#6A1B9A" },
  Nuxt:    { bg: "#E0F2F1", color: "#00695C" },
  Other:   { bg: "#F5F5F5", color: "#424242" },
}

const STATUS_PROPS: Record<string, "success" | "warning" | "error"> = {
  Live:     "success",
  Building: "warning",
  Error:    "error",
}

const INITIAL_SITES = [
  {
    id: 1,
    name: "marketing-site",
    framework: "Next.js",
    status: "Live",
    url: "https://marketing-site.pages.dev",
    lastDeployed: "Apr 07, 2026",
  },
  {
    id: 2,
    name: "docs-portal",
    framework: "Vue",
    status: "Live",
    url: "https://docs-portal.pages.dev",
    lastDeployed: "Apr 05, 2026",
  },
  {
    id: 3,
    name: "admin-dashboard",
    framework: "React",
    status: "Building",
    url: "https://admin-dashboard.pages.dev",
    lastDeployed: "Apr 09, 2026",
  },
  {
    id: 4,
    name: "landing-v2",
    framework: "Angular",
    status: "Error",
    url: "https://landing-v2.pages.dev",
    lastDeployed: "Mar 30, 2026",
  },
]

export default function PagesListPage() {
  const [search, setSearch] = useState("")
  const router = useRouter()

  const filtered = INITIAL_SITES.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "flex-start" }}
        spacing={2}
        sx={{ mb: 5 }}
      >
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ color: "#1A1C1E", mb: 1 }}>
            Pages
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Deploy and manage your static sites (React, Vue, Angular, and more).
          </Typography>
        </Box>
        <Button
          onClick={() => router.push("/dashboard/pages/create")}
          variant="contained"
          disableElevation
          startIcon={<Plus weight="bold" />}
          sx={{
            borderRadius: "10px",
            px: 3,
            py: 1.2,
            textTransform: "none",
            fontWeight: 700,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          Deploy New Site
        </Button>
      </Stack>

      {/* Search & Count */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          placeholder="Search by site name..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            flexGrow: 1,
            "& .MuiOutlinedInput-root": { borderRadius: "10px", bgcolor: "#fff" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MagnifyingGlass size={18} weight="bold" />
              </InputAdornment>
            ),
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            px: 2,
            bgcolor: "#F0F2F5",
            borderRadius: "10px",
          }}
        >
          <Browsers size={20} weight="duotone" style={{ marginRight: "8px" }} />
          <Typography variant="subtitle2" fontWeight="700">
            {filtered.length} Sites
          </Typography>
        </Box>
      </Stack>

      {/* Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: "1px solid #E0E4E8", borderRadius: "12px", overflow: "hidden" }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: "#F8F9FA" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary", textTransform: "uppercase" }}>
                Site Name
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary", textTransform: "uppercase" }}>
                Framework
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary", textTransform: "uppercase" }}>
                URL
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary", textTransform: "uppercase" }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary", textTransform: "uppercase" }}>
                Last Deployed
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary", textTransform: "uppercase" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((site) => {
              const fw = FRAMEWORK_COLORS[site.framework] ?? FRAMEWORK_COLORS.Other
              return (
                <TableRow key={site.id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  {/* Site Name */}
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box sx={{ p: 1, borderRadius: "8px", bgcolor: "#E8EBF0", display: "flex" }}>
                        <Browsers size={20} weight="fill" color="#475467" />
                      </Box>
                      <Typography variant="body2" fontWeight="600" color="#101828">
                        {site.name}
                      </Typography>
                    </Stack>
                  </TableCell>

                  {/* Framework */}
                  <TableCell>
                    <Chip
                      label={site.framework}
                      size="small"
                      sx={{
                        bgcolor: fw.bg,
                        color: fw.color,
                        fontWeight: 700,
                        fontSize: "0.7rem",
                        borderRadius: "6px",
                      }}
                    />
                  </TableCell>

                  {/* URL */}
                  <TableCell>
                    <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: "text.secondary" }}>
                      <Globe size={16} />
                      <Typography
                        variant="caption"
                        sx={{ fontFamily: "monospace", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                      >
                        {site.url}
                      </Typography>
                    </Stack>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Chip
                      label={site.status}
                      color={STATUS_PROPS[site.status] ?? "default"}
                      size="small"
                      sx={{ fontWeight: 700, borderRadius: "6px" }}
                    />
                  </TableCell>

                  {/* Last Deployed */}
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {site.lastDeployed}
                    </Typography>
                  </TableCell>

                  {/* Actions */}
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <IconButton
                        size="small"
                        title="Open Site"
                        href={`/dashboard/pages/${site.id}/overview`}
                      >
                        <ArrowSquareOut size={20} />
                      </IconButton>
                      <IconButton size="small" sx={{ color: "#D92D20" }} title="Delete Site">
                        <Trash size={20} />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              )
            })}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 10 }}>
                  <Typography color="text.secondary">
                    No sites found matching &ldquo;{search}&rdquo;
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
