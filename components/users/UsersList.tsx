"use client"

import { AnimatePresence, motion } from "framer-motion"
import { UserCardSkeleton } from "./UserCardSkeleton"
import { UserCard } from "./UserCard"
import { User } from "@/lib/types"

interface UsersListProps {
  users: User[]
  loading: boolean
  onDelete: (id: number) => void
  deletingId?: number | null
}

export function UsersList({
  users,
  loading,
  onDelete,
  deletingId = null
}: UsersListProps) {
  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="skeletons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <UserCardSkeleton key={`skeleton-${i}`} />
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="users-list"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {users.map((user) => (
            <UserCard 
              key={`user-${user.id}-${user.username}`} // Уникальный ключ
              user={user}
              onDelete={onDelete}
              isDeleting={deletingId === user.id}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}