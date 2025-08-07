"use client"

import { useState, useMemo } from "react"
import { useUsers } from "@/hooks/useUsers"
import { UserCard } from "@/components/users/UserCard"
import { AddUserDialog } from "@/components/users/AddUserDialog"
import { UserFilters } from "@/components/users/UserFilters"
import { UserCardSkeleton } from "@/components/users/UserCardSkeleton"

export default function HomePage() {
  const { users, addUser, deleteUser, nextId } = useUsers()
  const [searchTerm, setSearchTerm] = useState("")
  const [companyFilter, setCompanyFilter] = useState("")

  const companies = useMemo(() => {
    const unique = Array.from(new Set(users.map((u) => u.company.name)))
    return unique.sort()
  }, [users])

  const filteredUsers = users.filter((user) => {
    const matchesName = user.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCompany = companyFilter ? user.company.name === companyFilter : true
    return matchesName && matchesCompany
  })

  const isLoading = users.length === 0

  return (
    <main className="p-4 max-w-7xl mx-auto">
      <AddUserDialog onAdd={addUser} nextId={nextId} />

      <UserFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        companyFilter={companyFilter}
        onCompanyChange={setCompanyFilter}
        companies={companies}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <UserCardSkeleton key={i} />)
          : filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} onDelete={deleteUser} />
            ))}
      </div>
    </main>
  )
}
