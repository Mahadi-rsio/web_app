"use client"

import React from "react"
import { Box, Tab, Tabs, Container, Stack, Typography, Paper, Breadcrumbs } from "@mui/material"
import { ChartLineUp, GitBranch, Gear, CaretRight } from "@phosphor-icons/react"
import { useRouter, usePathname, useParams } from "next/navigation"
import Link from "next/link"

export default function PageSiteLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { id } = useParams<{ id: string }>()

  const activeTab = pathname.split("/").pop() || "overview"

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    router.push(`/dashboard/pages/${id}/${newValue}`)
  }

  return (
    <Box sx={{ bgcolor: "#FAFBFC", minHeight: "100vh" }}>
      {/* Persistent Header */}
      <Paper elevation={0} sx={{ borderBottom: "1px solid #E0E4E8", bgcolor: "#fff", pt: 1 }}>
        <Container maxWidth="xl">
          <Stack spacing={1} sx={{ mb: 2 }}>
            <Breadcrumbs separator={<CaretRight size={12} weight="bold" />} aria-label="breadcrumb">
              <Link href="/dashboard/pages" style={{ color: "inherit", textDecoration: "none", fontSize: "0.875rem" }}>
                Pages
              </Link>
              <Typography variant="body2" color="text.primary" fontWeight={600}>
                Site #{id}
              </Typography>
            </Breadcrumbs>
            <Typography variant="h5" fontWeight="800">
              Site Dashboard
            </Typography>
          </Stack>

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ "& .MuiTab-root": { textTransform: "none", fontWeight: 600, minWidth: 100 } }}
          >
            <Tab value="overview"    icon={<ChartLineUp size={20} />} iconPosition="start" label="Overview" />
            <Tab value="deployments" icon={<GitBranch size={20} />}   iconPosition="start" label="Deployments" />
            <Tab value="settings"    icon={<Gear size={20} />}        iconPosition="start" label="Settings" />
          </Tabs>
        </Container>
      </Paper>

      {/* Child page content */}
      <Box sx={{ py: 4 }}>{children}</Box>
    </Box>
  )
}
