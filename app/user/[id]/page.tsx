import { User } from "@/lib/types"
import Link from "next/link"
import { Button } from "@/components/ui/button"

async function getUser(id: string): Promise<User> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)

  if (!res.ok) {
    throw new Error("Failed to fetch user")
  }

  return res.json()
}

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id)

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
        <p className="text-sm text-gray-500">{user.company.catchPhrase}</p>
      </div>

      <div className="flex gap-4 pt-4">
        <Link href="/">
          <Button variant="outline">Назад</Button>
        </Link>
        <Button disabled>Редактировать</Button>
      </div>
    </main>
  )
}
