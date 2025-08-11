"use client"

import { Input } from "@/components/ui/input"
import { AddUserDialog } from "./AddUserDialog"
import { User } from "@/lib/types"
import { Search, Building, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useMemo } from "react"

interface UserFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  companyFilter: string
  users: User[]
  onCompanyFilterChange: (value: string) => void
  onAddUser: (newUser: Omit<User, 'id'>) => void
}

export function UserFilters({
  search,
  onSearchChange,
  companyFilter,
  users,
  onCompanyFilterChange,
  onAddUser
}: UserFiltersProps) {
  const resetFilters = () => {
    onSearchChange("")
    onCompanyFilterChange("")
  }


  const filteredCompanies = useMemo(() => {
    const companySet = new Set<string>()
    
    users.forEach(user => {
      const matchesSearch = search === "" || 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase())
      
      if (matchesSearch && user.company?.name?.trim()) {
        companySet.add(user.company.name.trim())
      }
    })
    
    return Array.from(companySet).sort()
  }, [users, search]) 

  return (
    <div className="bg-[#f0fdfa] p-4 rounded-lg border border-[#ccfbf1] mb-6 space-y-3">
      <div className="flex flex-col md:flex-row gap-3 items-start">
        <motion.div 
          className="relative flex-1 w-full"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#0d9488]" />
          <Input
            placeholder="Поиск по имени или username..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-white border-[#2dd4bf] focus-visible:ring-[#0d9488] pl-9 w-full 
                      placeholder:text-gray-400 text-gray-700"
          />
        </motion.div>
        
        <motion.div 
          className="relative flex-1 w-full"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#0d9488]" />
          <Input
            list="companies-list"
            placeholder="Фильтр по компании"
            value={companyFilter}
            onChange={(e) => onCompanyFilterChange(e.target.value)}
            className="bg-white border-[#2dd4bf] focus-visible:ring-[#0d9488] pl-9 w-full
                      placeholder:text-gray-400 text-gray-700"
          />
          <datalist id="companies-list">
            <option value="">Все компании</option>
            {filteredCompanies.map(company => (
              <option key={`company-opt-${company}`} value={company} />
            ))}
          </datalist>
        </motion.div>

        <AddUserDialog 
          onAdd={onAddUser}
          nextId={Date.now()}
        />
      </div>
      
      <AnimatePresence>
        {(search || companyFilter) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3"
          >
            <Button
              variant="outline"
              onClick={resetFilters}
              className="flex items-center gap-2 border-[#2dd4bf] text-[#0d9488] hover:bg-[#f0fdfa]"
            >
              <X size={14} /> Сбросить фильтры
            </Button>
            <span className="text-sm text-[#0d9488]">
              Активные фильтры: 
              {search && <span className="ml-1">&quot;{search}&quot;</span>}
              {companyFilter && <span className="ml-1">компания &quot;{companyFilter}&quot;</span>}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}