"use client"

import { motion, Variants } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User } from "@/lib/types"
import Link from "next/link"
import { Trash2, ArrowRight, Pencil } from 'lucide-react'

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
      ease: "easeOut"
    }
  }
}

export function UserCard({ user, onDelete, isDeleting = false }: UserCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Card className="border border-[#2dd4bf] hover:shadow-lg hover:shadow-[#ccfbf1] transition h-full flex flex-col">
        <CardContent className="p-4 flex-grow space-y-2">
          <h2 className="text-lg font-bold text-[#0d9488]">{user.name}</h2>
          <p className="text-sm text-[#0f766e]">{user.email}</p>
          <p className="text-sm text-gray-700">{user.company?.name}</p>
        </CardContent>
        
        <div className="p-4 border-t flex justify-between gap-4"> 
          <Link href={`/user/${user.id}`} className="flex-1">
            <Button 
              variant="outline" 
              className="border-[#14b8a6] text-[#0d9488] hover:bg-[#f0fdfa] w-full flex items-center gap-2"
            >
              <ArrowRight size={16} /> Подробнее
            </Button>
          </Link>
          
          <Button
            onClick={() => onDelete(user.id)}
            disabled={isDeleting}
            className="flex-1 flex items-center gap-2"
          >
            <Trash2 size={16} /> {isDeleting ? 'Удаление...' : 'Удалить'}
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}