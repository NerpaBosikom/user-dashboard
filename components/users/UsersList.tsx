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

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  },
  exit: { opacity: 0 }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 }
  },
  exit: { opacity: 0, y: -20 }
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
          variants={listVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`skeleton-${i}`}
              variants={itemVariants}
            >
              <UserCardSkeleton />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          key="users-list"
          variants={listVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence>
            {users.map((user) => (
              <motion.div
                key={`user-${user.id}-${user.username}`}
                variants={itemVariants}
                layout
                transition={{ duration: 0.3 }}
              >
                <UserCard 
                  user={user}
                  onDelete={onDelete}
                  isDeleting={deletingId === user.id}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}