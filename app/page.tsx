"use client"

import { useEffect, useState } from "react"
import { User } from "@/lib/types"
import { UserCard } from "@/components/users/UserCard"

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

  return (
    <main className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onDelete={handleDelete} />
      ))}
    </main>
  )
}
