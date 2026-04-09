"use client"

import React from "react"
import {
  Box,
  Typography,
  Stack,
  Container,
  Chip,
  Divider,
  Paper
} from "@mui/material"
import { CheckCircle, XCircle, Timer } from "@phosphor-icons/react"

const LOGS = [
  { time: "2026-04-09 00:00:01", message: "Job started", level: "info" },
  { time: "2026-04-09 00:00:01", message: "Fetching report data...", level: "info" },
  { time: "2026-04-09 00:00:02", message: "Report generated successfully (84 rows)", level: "info" },
  { time: "2026-04-09 00:00:02", message: "Email sent to admin@example.com", level: "info" },
  { time: "2026-04-09 00:00:02", message: "Job completed in 1.2s", level: "success" },
  { time: "2026-04-08 00:00:01", message: "Job started", level: "info" },
  { time: "2026-04-08 00:00:01", message: "Fetching report data...", level: "info" },
  { time: "2026-04-08 00:00:02", message: "Job completed in 1.1s", level: "success" },
  { time: "2026-04-06 00:00:01", message: "Job started", level: "info" },
  { time: "2026-04-06 00:00:01", message: "Error: Unable to connect to SMTP server", level: "error" },
  { time: "2026-04-06 00:00:01", message: "Job failed after 1 retry", level: "error" },
]

const levelColor: Record<string, "default" | "success" | "error" | "info"> = {
  info: "info",
  success: "success",
  error: "error",
}

export default function Page() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Timer size={28} weight="duotone" color="#1976d2" />
        <Typography variant="h6" fontWeight="700">Execution Logs</Typography>
      </Stack>

      <Paper variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Box sx={{ bgcolor: '#1E1E1E', p: 0 }}>
          {LOGS.map((log, i) => (
            <Box key={i}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ px: 3, py: 1.2, '&:hover': { bgcolor: 'rgba(255,255,255,0.04)' } }}
              >
                <Typography
                  variant="caption"
                  sx={{ fontFamily: 'monospace', color: '#888', minWidth: 180, flexShrink: 0 }}
                >
                  {log.time}
                </Typography>
                {log.level === "success" && <CheckCircle size={16} color="#4caf50" weight="fill" />}
                {log.level === "error" && <XCircle size={16} color="#ef5350" weight="fill" />}
                {log.level === "info" && <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: '#555', flexShrink: 0 }} />}
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: 'monospace',
                    color: log.level === "error" ? "#ef9a9a" : log.level === "success" ? "#a5d6a7" : "#ccc",
                    flexGrow: 1
                  }}
                >
                  {log.message}
                </Typography>
                <Chip
                  label={log.level}
                  size="small"
                  color={levelColor[log.level]}
                  sx={{ height: 20, fontSize: '0.65rem' }}
                />
              </Stack>
              {i !== LOGS.length - 1 && <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />}
            </Box>
          ))}
        </Box>
      </Paper>
    </Container>
  )
}
