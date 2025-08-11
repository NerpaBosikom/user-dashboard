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
import { UserCardSkeleton } from "@/components/users/UserCardSkeleton"

export function HomePageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { users, addUser, deleteUser, loading, error, deletingId, fetchUsers } = useUsers()

  const [search, setSearch] = useState(searchParams.get("search") ?? "")
  const [companyFilter, setCompanyFilter] = useState(searchParams.get("company") ?? "")
  const [isInitialLoad, setIsInitialLoad] = useState(true)

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

  useEffect(() => {
    const searchParam = searchParams.get("search")
    const companyParam = searchParams.get("company")
    
    if (searchParam) setSearch(searchParam)
    if (companyParam) setCompanyFilter(companyParam)
  }, [searchParams])

  useEffect(() => {
    if (users.length > 0) {
      setIsInitialLoad(false)
    }
  }, [users])

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
          users={users} 
          onCompanyFilterChange={(value) => {
            setCompanyFilter(value)
            updateUrl(search, value)
          }}
          onAddUser={addUser}
        />

        {isInitialLoad || loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <UserCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <UsersList
            users={filteredUsers}
            loading={loading}
            onDelete={deleteUser}
            deletingId={deletingId}
          />
        )}
      </motion.div>
    </ErrorBoundary>
  )
}