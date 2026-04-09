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
  InputAdornment
} from "@mui/material"
import {
  Plus,
  Stack as StackIcon,
  Trash,
  Files,
  MagnifyingGlass,
  ArrowSquareOut
} from "@phosphor-icons/react"
import { useRouter } from "next/navigation"

const INITIAL_KV_STORES = [
  { id: 1, name: "session-cache", keys: 4210, region: "US-East", created: "Mar 15, 2026" },
  { id: 2, name: "feature-flags", keys: 38, region: "EU-West", created: "Feb 20, 2026" },
  { id: 3, name: "rate-limiter", keys: 1503, region: "AP-Southeast", created: "Jan 05, 2026" },
]

export default function KvStorageList() {
  const [search, setSearch] = useState("")
  const router = useRouter()

  const filteredStores = INITIAL_KV_STORES.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 5 }}>
        <Box>
          <Typography variant="h4" fontWeight="800" sx={{ color: '#1A1C1E', mb: 1 }}>
            KV Storage
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View and manage your key-value stores.
          </Typography>
        </Box>
        <Button
          onClick={() => router.push("/dashboard/kv-storage/1/overview")}
          variant="contained"
          disableElevation
          startIcon={<Plus weight="bold" />}
          sx={{ borderRadius: "10px", px: 3, py: 1.2, textTransform: 'none', fontWeight: 700 }}
        >
          Create KV Store
        </Button>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          placeholder="Search KV stores..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flexGrow: 1, '& .MuiOutlinedInput-root': { borderRadius: '10px', bgcolor: '#fff' } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MagnifyingGlass size={18} weight="bold" />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, bgcolor: '#F0F2F5', borderRadius: '10px' }}>
          <Files size={20} weight="duotone" style={{ marginRight: '8px' }} />
          <Typography variant="subtitle2" fontWeight="700">
            {filteredStores.length} Stores
          </Typography>
        </Box>
      </Stack>

      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #E0E4E8', borderRadius: '12px', overflow: 'hidden' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#F8F9FA' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Keys</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Region</TableCell>
              <TableCell sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Created At</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.75rem', color: 'text.secondary', textTransform: 'uppercase' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStores.map((store) => (
              <TableRow key={store.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box sx={{ p: 1, borderRadius: '8px', bgcolor: '#E8EBF0', display: 'flex' }}>
                      <StackIcon size={20} weight="fill" color="#475467" />
                    </Box>
                    <Typography variant="body2" fontWeight="600" color="#101828">
                      {store.name}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{store.keys.toLocaleString()}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{store.region}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">{store.created}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton size="small" title="View Details" href={`/dashboard/kv-storage/${store.id}/overview`}>
                      <ArrowSquareOut size={20} />
                    </IconButton>
                    <IconButton size="small" sx={{ color: '#D92D20' }} title="Delete Store">
                      <Trash size={20} />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            {filteredStores.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 10 }}>
                  <Typography color="text.secondary">No KV stores found matching "{search}"</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
