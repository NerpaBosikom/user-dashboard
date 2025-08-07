"use client"

import { useUsers } from "@/hooks/useUsers"
import { UserCard } from "@/components/users/UserCard"
import { AddUserDialog } from "@/components/users/AddUserDialog"

export default function HomePage() {
  const { users, addUser, deleteUser, nextId } = useUsers()

  return (
    <main className="p-4 max-w-7xl mx-auto">
      <AddUserDialog onAdd={addUser} nextId={nextId} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} user={user} onDelete={deleteUser} />
        ))}
      </div>
    </main>
  )
}
