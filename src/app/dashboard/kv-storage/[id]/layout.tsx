"use client"

import React from "react"
import { Box, Tab, Tabs, Container, Stack, Typography, Paper, Breadcrumbs } from "@mui/material"
import { ChartLineUp, Gear, Stack as StackIcon, CaretRight } from "@phosphor-icons/react"
import { useRouter, usePathname } from "next/navigation"

export default function KvStorageLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  const activeTab = pathname.split("/").pop() || "overview"

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    router.push(newValue)
  }

  return (
    <Box sx={{ bgcolor: "#FAFBFC", minHeight: "100vh" }}>
      <Paper elevation={0} sx={{ borderBottom: '1px solid #E0E4E8', bgcolor: '#fff', pt: 1 }}>
        <Container maxWidth="xl">
          <Stack spacing={1} sx={{ mb: 2 }}>
            <Breadcrumbs separator={<CaretRight size={12} weight="bold" />} aria-label="breadcrumb">
            </Breadcrumbs>
            <Typography variant="h5" fontWeight="800">KV Storage Dashboard</Typography>
          </Stack>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{ '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, minWidth: 100 } }}
          >
            <Tab value="overview" icon={<ChartLineUp size={20} />} iconPosition="start" label="Overview" />
            <Tab value="keys" icon={<StackIcon size={20} />} iconPosition="start" label="Keys" />
            <Tab value="settings" icon={<Gear size={20} />} iconPosition="start" label="Settings" />
          </Tabs>
        </Container>
      </Paper>

      <Box sx={{ py: 4 }}>
        {children}
      </Box>
    </Box>
  )
}
