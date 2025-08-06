import { Card, CardContent } from "@/components/ui/card"
import { User } from "@/lib/types"

async function getUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")
  if (!res.ok) throw new Error("Failed to fetch users")
  return res.json()
}

export default async function HomePage() {
  const users = await getUsers()

  return (
    <main className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <Card key={user.id}>
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm">{user.company.name}</p>
          </CardContent>
        </Card>
      ))}
    </main>
  )
}
