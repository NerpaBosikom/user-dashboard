"use client"

import { useParams, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useUsers } from "@/hooks/useUsers"
import EditUserClient from "@/components/users/EditUserClient"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserDetailsSkeleton } from "@/components/users/UserDetailsSkeleton"

export default function UserPage() {
  const { id } = useParams()
  const searchParams = useSearchParams()
  const { users, editUser } = useUsers()

  const user = users.find((u) => u.id === Number(id))

  // Получаем параметры фильтров из URL
  const search = searchParams.get("search") ?? ""
  const company = searchParams.get("company") ?? ""

  // Формируем query строку с фильтрами для возврата на главную
  const queryString = new URLSearchParams()
  if (search) queryString.set("search", search)
  if (company) queryString.set("company", company)
  const backHref = queryString.toString() ? `/?${queryString.toString()}` : "/"

  const variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  }

  if (!user) {
    return (
      <AnimatePresence mode="wait">
        <motion.main
          key="userdetails-skeleton"
          className="max-w-xl mx-auto p-6 space-y-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          <UserDetailsSkeleton />
        </motion.main>
      </AnimatePresence>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={`userpage-${user.id}`}
        className="max-w-xl mx-auto p-6 space-y-4"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.3 }}
      >
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
          <Link href={backHref}>
            <Button variant="outline">Назад</Button>
          </Link>
          <EditUserClient user={user} onSave={editUser} />
        </div>
      </motion.main>
    </AnimatePresence>
  )
}
