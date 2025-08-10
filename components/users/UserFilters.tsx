"use client"

import { Input } from "@/components/ui/input"
import { AddUserDialog } from "./AddUserDialog"
import { User } from "@/lib/types"

interface UserFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  companyFilter: string
  companies: string[]
  onCompanyFilterChange: (value: string) => void
  onAddUser: (newUser: Omit<User, 'id'>) => void
}

export function UserFilters({
  search,
  onSearchChange,
  companyFilter,
  companies,
  onCompanyFilterChange,
  onAddUser
}: UserFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-3 items-start">
      <Input
        placeholder="Search by name or username..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border-teal-500 focus-visible:ring-teal-500 flex-1"
      />
      
      <div className="relative flex-1">
        <Input
          list="companies-list"
          placeholder="Filter by company"
          value={companyFilter}
          onChange={(e) => onCompanyFilterChange(e.target.value)}
          className="border-teal-500 focus-visible:ring-teal-500 w-full"
        />
        <datalist id="companies-list">
          <option value="">All companies</option>
          {companies.map(company => (
            <option key={`company-opt-${company}`} value={company} />
          ))}
        </datalist>
      </div>

      <AddUserDialog 
        onAdd={onAddUser}
        nextId={Date.now()}
      />
    </div>
  )
}