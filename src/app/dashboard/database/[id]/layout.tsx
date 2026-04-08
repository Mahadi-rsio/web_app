"use client"

import React from "react"
import { Box, Tab, Tabs, Container, Stack, Typography, Paper, Breadcrumbs } from "@mui/material"
import { ChartLineUp, Gear, Database, CaretRight } from "@phosphor-icons/react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

export default function DatabaseLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  // Determine active tab based on the URL suffix
  const activeTab = pathname.split("/").pop() || "overview"

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    // Navigate to the child route (e.g., /database/123/settings)
    router.push(newValue)
  }

  return (
    <Box sx={{ bgcolor: "#FAFBFC", minHeight: "100vh" }}>
      {/* Persistent Header */}
      <Paper elevation={0} sx={{ borderBottom: '1px solid #E0E4E8', bgcolor: '#fff', pt: 1 }}>
        <Container maxWidth="xl">
          <Stack spacing={1} sx={{ mb: 2 }}>
            <Breadcrumbs separator={<CaretRight size={12} weight="bold" />} aria-label="breadcrumb">
            </Breadcrumbs>
            <Typography variant="h5" fontWeight="800">Project Dashboard</Typography>
          </Stack>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{ '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, minWidth: 100 } }}
          >
            {/* Value must match the folder name */}
            <Tab value="overview" icon={<ChartLineUp size={20} />} iconPosition="start" label="Overview" />
            <Tab value="tables" icon={<Database size={20} />} iconPosition="start" label="Data" />
            <Tab value="settings" icon={<Gear size={20} />} iconPosition="start" label="Settings" />
          </Tabs>
        </Container>
      </Paper>

      {/* This renders the content of the child page.tsx files */}
      <Box sx={{ py: 4 }}>
        {children}
      </Box>
    </Box>
  )
}

