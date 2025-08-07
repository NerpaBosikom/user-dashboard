import React from "react"

interface UserFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  companyFilter: string
  onCompanyChange: (value: string) => void
  companies: string[]
}

export function UserFilters({
  searchTerm,
  onSearchChange,
  companyFilter,
  onCompanyChange,
  companies,
}: UserFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border rounded px-3 py-2 flex-1"
      />
      <select
        value={companyFilter}
        onChange={(e) => onCompanyChange(e.target.value)}
        className="border rounded px-3 py-2 w-60"
      >
        <option value="">All companies</option>
        {companies.map((company) => (
          <option key={company} value={company}>
            {company}
          </option>
        ))}
      </select>
    </div>
  )
}
