"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import { useUsers } from "@/hooks/useUsers"
import { ErrorCard } from "@/components/users/ErrorCard"
import { ErrorBoundary } from "@/components/users/ErrorBoundary"
import { UserFilters } from "@/components/users/UserFilters"
import { UsersList } from "@/components/users/UsersList"
import { User } from "@/lib/types"

export function HomePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { users, addUser, deleteUser, loading, error, deletingId, fetchUsers } = useUsers()

  const [search, setSearch] = useState(searchParams.get("search") ?? "")
  const [companyFilter, setCompanyFilter] = useState(searchParams.get("company") ?? "")

  // Список компаний для фильтра
  const companies = useMemo(() => {
    const uniqueCompanies = new Set<string>()
    users.forEach((user: User) => {
      if (user.company?.name) {
        uniqueCompanies.add(user.company.name)
      }
    })
    return Array.from(uniqueCompanies).sort()
  }, [users])

  const filteredUsers = useMemo(() => {
    const searchLower = search.toLowerCase()
    const companyLower = companyFilter.toLowerCase()
    
    return users.filter((user: User) => {
      const matchesSearch = search === "" ||
        user.name.toLowerCase().includes(searchLower) ||
        user.username.toLowerCase().includes(searchLower)
      
      const matchesCompany = companyFilter === "" ||
        (user.company?.name ?? "").toLowerCase().includes(companyLower)
      
      return matchesSearch && matchesCompany
    })
  }, [users, search, companyFilter])

  const updateUrl = (newSearch: string, newCompany: string) => {
    const params = new URLSearchParams()
    if (newSearch) params.set("search", newSearch)
    if (newCompany) params.set("company", newCompany)
    router.push(`/?${params.toString()}`, { scroll: false })
  }

  // Восстановление состояния из URL при монтировании
  useEffect(() => {
    const searchParam = searchParams.get("search")
    const companyParam = searchParams.get("company")
    
    if (searchParam) setSearch(searchParam)
    if (companyParam) setCompanyFilter(companyParam)
  }, [searchParams])

  return (
    <ErrorBoundary>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {error && <ErrorCard error={error} onRetry={fetchUsers} />}

        <UserFilters
          search={search}
          onSearchChange={(value) => {
            setSearch(value)
            updateUrl(value, companyFilter)
          }}
          companyFilter={companyFilter}
          companies={companies}
          onCompanyFilterChange={(value) => {
            setCompanyFilter(value)
            updateUrl(search, value)
          }}
          onAddUser={addUser}
        />

        <UsersList
          users={filteredUsers}
          loading={loading}
          onDelete={deleteUser}
          deletingId={deletingId}
        />
      </motion.div>
    </ErrorBoundary>
  )
}