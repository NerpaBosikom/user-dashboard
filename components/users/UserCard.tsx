"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User } from "@/lib/types"

interface Props {
  user: User
  onDelete: (id: number) => void
}

export function UserCard({ user, onDelete }: Props) {
  const router = useRouter()

  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">{user.name}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
        <p className="text-sm">{user.company.name}</p>
        <div className="flex justify-between pt-2">
          <Button variant="outline" onClick={() => router.push(`/user/${user.id}`)}>
            Подробнее
          </Button>
          <Button variant="destructive" onClick={() => onDelete(user.id)}>
            Удалить
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
