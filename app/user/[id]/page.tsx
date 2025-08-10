// app/user/[id]/page.tsx
"use client"

import { motion, Variants } from "framer-motion"
import { useParams, useSearchParams } from "next/navigation"
import { useUsers } from "@/hooks/useUsers"
import { UserDetailsSkeleton } from "@/components/users/UserDetailsSkeleton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { EditUserClient } from "@/components/users/EditUserClient"
import { User } from "@/lib/types"
import { ErrorCard } from "@/components/users/ErrorCard"

// 1. Добавляем правильный тип для variants
const pageVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
}

export default function UserDetailsPage() {
  const { id } = useParams()
  const { users, loading, error, updateUser } = useUsers()
  const searchParams = useSearchParams()

  // 2. Безопасное преобразование id в число
  const userId = typeof id === 'string' ? parseInt(id) : Array.isArray(id) ? parseInt(id[0]) : 0
  const user = users.find((u) => u.id === userId)

  if (loading) {
    return <UserDetailsSkeleton />
  }

  if (error) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        variants={pageVariants}
        className="max-w-xl mx-auto"
      >
        <ErrorCard error={error} />
      </motion.div>
    )
  }

  if (!user) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        variants={pageVariants}
        className="text-center py-10"
      >
        <p className="text-xl text-teal-700">User not found</p>
        <Link 
          href="/" 
          className="text-teal-600 hover:underline mt-4 inline-block"
        >
          Back to home
        </Link>
      </motion.div>
    )
  }

  const handleSave = (updatedUser: User) => {
    updateUser(updatedUser)
  }

  // 3. Проверка наличия адреса и компании перед отображением
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageVariants}
      className="max-w-xl mx-auto p-6 space-y-4 border border-teal-300 rounded-lg shadow-sm bg-white"
    >
      <h1 className="text-2xl font-bold text-teal-700">{user.name}</h1>
      <div className="space-y-2 text-teal-800">
        <p><span className="font-medium">Username:</span> {user.username}</p>
        <p><span className="font-medium">Email:</span> {user.email}</p>
        <p><span className="font-medium">Phone:</span> {user.phone}</p>
        <p><span className="font-medium">Website:</span> {user.website}</p>
        {user.company && (
          <p><span className="font-medium">Company:</span> {user.company.name}</p>
        )}
        
        {user.address && (
          <div className="pt-2 border-t border-teal-100">
            <h3 className="font-medium">Address:</h3>
            <p>{user.address.street}</p>
            {user.address.suite && <p>{user.address.suite}</p>}
            <p>{user.address.city}, {user.address.zipcode}</p>
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4">
  <Link
    href={`/?search=${searchParams.get("search") ?? ""}&company=${searchParams.get("company") ?? ""}`}
  >
    <Button
      variant="outline"
      className="border-teal-400 text-teal-700 hover:bg-teal-50 hover:border-teal-500 transition-colors"
    >
      Back
    </Button>
  </Link>

  <EditUserClient user={user} onSave={handleSave} />
</div>
    </motion.div>
  )
}