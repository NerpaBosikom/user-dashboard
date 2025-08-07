"use client"

import { useParams, useRouter } from "next/navigation"
import { useUsers } from "@/hooks/useUsers"
import EditUserClient from "@/components/users/EditUserClient"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserDetailsSkeleton } from "@/components/users/UserDetailsSkeleton"

export default function UserPage() {
  const { id } = useParams()
  const router = useRouter()
  const { users, editUser } = useUsers()

  const user = users.find((u) => u.id === Number(id))

  if (!user) {
    return <UserDetailsSkeleton />
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">{user.name}</h1>
      <p className="text-gray-600">Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: {user.website}</p>

      <div>
        <h2 className="font-semibold mt-4">Address</h2>
        <p>
          {user.address.street}, {user.address.city}, {user.address.zipcode}
        </p>
      </div>

      <div>
        <h2 className="font-semibold mt-4">Company</h2>
        <p>{user.company.name}</p>
      </div>

      <div className="flex gap-4 pt-4">
        <Link href="/">
          <Button variant="outline">Назад</Button>
        </Link>
        <EditUserClient user={user} onSave={editUser} />
      </div>
    </main>
  )
}
