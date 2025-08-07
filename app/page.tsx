"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useUsers } from "@/hooks/useUsers"
import { UserCard } from "@/components/users/UserCard"
import { AddUserDialog } from "@/components/users/AddUserDialog"
import { UserFilters } from "@/components/users/UserFilters"
import { UserCardSkeleton } from "@/components/users/UserCardSkeleton"

export default function HomePage() {
  const { users, addUser, deleteUser, nextId } = useUsers()

  const searchParams = useSearchParams()
  const router = useRouter()

  const initialSearchTerm = searchParams.get("search") ?? ""
  const initialCompanyFilter = searchParams.get("company") ?? ""

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
  const [companyFilter, setCompanyFilter] = useState(initialCompanyFilter)

  useEffect(() => {
    const params = new URLSearchParams()
    if (searchTerm) params.set("search", searchTerm)
    if (companyFilter) params.set("company", companyFilter)
    const queryString = params.toString()
    router.replace(queryString ? `/?${queryString}` : "/", { scroll: false })
  }, [searchTerm, companyFilter, router])

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

  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key="homepage"
        className="p-4 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.3 }}
      >
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
      </motion.main>
    </AnimatePresence>
  )
}
