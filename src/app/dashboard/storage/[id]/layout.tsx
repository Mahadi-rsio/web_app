"use client"

import React from "react"
import { Box, Tab, Tabs, Container, Stack, Typography, Paper } from "@mui/material"
import { ChartLineUp, Gear, FolderOpen } from "@phosphor-icons/react"
import { useRouter, usePathname, useParams } from "next/navigation"

export default function StorageLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { id } = useParams<{ id: string }>()

  const activeTab = pathname.split("/").pop() || "overview"

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    router.push(`/dashboard/storage/${id}/${newValue}`)
  }

  return (
    <Box sx={{ bgcolor: "#FAFBFC", minHeight: "100vh" }}>
      {/* Persistent Header */}
      <Paper elevation={0} sx={{ borderBottom: '1px solid #E0E4E8', bgcolor: '#fff', pt: 1 }}>
        <Container maxWidth="xl">
          <Stack spacing={1} sx={{ mb: 2 }}>
            <Typography variant="h5" fontWeight="800">Storage Bucket</Typography>
          </Stack>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{ '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, minWidth: 100 } }}
          >
            <Tab value="overview" icon={<ChartLineUp size={20} />} iconPosition="start" label="Overview" />
            <Tab value="files" icon={<FolderOpen size={20} />} iconPosition="start" label="Files" />
            <Tab value="settings" icon={<Gear size={20} />} iconPosition="start" label="Settings" />
          </Tabs>
        </Container>
      </Paper>

      {/* Child page content */}
      <Box sx={{ py: 4 }}>
        {children}
      </Box>
    </Box>
  )
}
