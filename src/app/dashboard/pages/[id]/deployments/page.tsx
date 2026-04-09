"use client"

import React from "react"
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
  Chip,
} from "@mui/material"
import { ArrowClockwise, GitBranch, GitCommit } from "@phosphor-icons/react"

type DeployStatus = "Live" | "Building" | "Failed"

const STATUS_PROPS: Record<DeployStatus, "success" | "warning" | "error"> = {
  Live:     "success",
  Building: "warning",
  Failed:   "error",
}

const DEPLOYMENTS = [
  {
    id: "d1a2b3c",
    branch: "main",
    commit: "feat: update hero section copy",
    status: "Live" as DeployStatus,
    triggeredBy: "Alex",
    timestamp: "Apr 09, 2026 · 10:14 AM",
    duration: "42s",
  },
  {
    id: "e4f5g6h",
    branch: "main",
    commit: "fix: navbar overflow on mobile",
    status: "Live" as DeployStatus,
    triggeredBy: "Alex",
    timestamp: "Apr 09, 2026 · 04:30 AM",
    duration: "38s",
  },
  {
    id: "i7j8k9l",
    branch: "feat/dark-mode",
    commit: "chore: add dark mode tokens",
    status: "Failed" as DeployStatus,
    triggeredBy: "Sarah",
    timestamp: "Apr 08, 2026 · 07:55 PM",
    duration: "1m 12s",
  },
  {
    id: "m0n1o2p",
    branch: "main",
    commit: "chore: bump dependencies",
    status: "Live" as DeployStatus,
    triggeredBy: "System",
    timestamp: "Apr 07, 2026 · 12:00 AM",
    duration: "55s",
  },
]

export default function DeploymentsPage() {
  return (
    <Container maxWidth="xl">
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={2} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h5" fontWeight="800" gutterBottom>
            Deployments
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Full history of all deployments for this site.
          </Typography>
        </Box>
      </Stack>

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ border: "1px solid #E0E4E8", borderRadius: "12px", overflow: "hidden" }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: "#F8F9FA" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary", textTransform: "uppercase" }}>
                Commit
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary", textTransform: "uppercase" }}>
                Branch
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary", textTransform: "uppercase" }}>
                Status
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary", textTransform: "uppercase" }}>
                Triggered By
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary", textTransform: "uppercase" }}>
                Timestamp
              </TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: "0.75rem", color: "text.secondary", textTransform: "uppercase" }}>
                Duration
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
            {DEPLOYMENTS.map((d) => (
              <TableRow key={d.id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                {/* Commit */}
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <GitCommit size={18} color="#475467" />
                    <Box>
                      <Typography variant="body2" fontWeight="600" color="#101828">
                        {d.commit}
                      </Typography>
                      <Typography variant="caption" sx={{ fontFamily: "monospace", color: "text.secondary" }}>
                        {d.id}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>

                {/* Branch */}
                <TableCell>
                  <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: "text.secondary" }}>
                    <GitBranch size={16} />
                    <Typography variant="caption" sx={{ fontFamily: "monospace" }}>
                      {d.branch}
                    </Typography>
                  </Stack>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Chip
                    label={d.status}
                    color={STATUS_PROPS[d.status]}
                    size="small"
                    sx={{ fontWeight: 700, borderRadius: "6px" }}
                  />
                </TableCell>

                {/* Triggered By */}
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {d.triggeredBy}
                  </Typography>
                </TableCell>

                {/* Timestamp */}
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {d.timestamp}
                  </Typography>
                </TableCell>

                {/* Duration */}
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {d.duration}
                  </Typography>
                </TableCell>

                {/* Actions */}
                <TableCell align="right">
                  <IconButton size="small" title="Redeploy">
                    <ArrowClockwise size={20} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
