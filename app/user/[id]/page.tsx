"use client"

import { useEffect, useState } from "react"
import { User } from "@/lib/types"
import { UserCard } from "@/components/users/UserCard"
import { AddUserDialog } from "@/components/users/AddUserDialog"

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then(setUsers)
  }, [])

  const handleDelete = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id))
  }

  const handleAdd = (newUser: User) => {
    setUsers((prev) => [...prev, newUser])
  }

  const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1

  return (
    <main className="p-4 max-w-7xl mx-auto">
      <AddUserDialog onAdd={handleAdd} nextId={nextId} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} onDelete={handleDelete} />
        ))}
      </div>
    </main>
  )
}
