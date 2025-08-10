// components/users/UserCard.tsx
"use client"

import { motion, Variants } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User } from "@/lib/types"
import Link from "next/link"

interface UserCardProps {
  user: User
  onDelete: (id: number) => void
  isDeleting?: boolean
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const
    }
  }
}

export function UserCard({ 
  user, 
  onDelete, 
  isDeleting = false 
}: UserCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="border border-teal-300 hover:shadow-lg hover:shadow-teal-200 transition">
        <CardContent className="p-4 space-y-2">
          <h2 className="text-lg font-bold text-teal-700">{user.name}</h2>
          <p className="text-sm text-teal-600">{user.email}</p>
          <p className="text-sm text-gray-700">{user.company?.name}</p>
          <div className="flex justify-between pt-2">
            <Link href={`/user/${user.id}`}>
              <Button
                variant="outline"
                className="border-teal-500 text-teal-600 hover:bg-teal-50"
              >
                Details
              </Button>
            </Link>
            <Button
              variant="destructive"
              onClick={() => onDelete(user.id)}
              disabled={isDeleting}
              className="transition-colors"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}