"use client"

import { motion, Variants } from "framer-motion"
import { useParams, useSearchParams } from "next/navigation"
import { useUsers } from "@/hooks/useUsers"
import { UserDetailsSkeleton } from "@/components/users/UserDetailsSkeleton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { EditUserDialog } from "@/components/users/EditUserDialog" 
import { ErrorCard } from "@/components/users/ErrorCard"
import { Suspense } from "react"
import { ArrowLeft, Mail, Phone, Globe, Briefcase, MapPin } from "lucide-react"
import { ErrorBoundary } from "@/components/users/ErrorBoundary"

const pageVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: { opacity: 0, y: -20 }
}

function UserDetailsContent() {
  const { id } = useParams()
  const { users, loading, error, updateUser } = useUsers()
  const searchParams = useSearchParams()

  const userId = typeof id === 'string' ? parseInt(id) : Array.isArray(id) ? parseInt(id[0]) : 0
  const user = users.find((u) => u.id === userId)

  if (loading) return <UserDetailsSkeleton />
  if (error) return <ErrorCard error={error} />

  if (!user) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        variants={pageVariants}
        className="text-center py-10"
      >
        <p className="text-xl text-[#0d9488] mb-4">Пользователь не найден</p>
        <Link 
          href="/" 
          className="inline-flex items-center text-[#0d9488] hover:text-[#0f766e] transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Вернуться на главную
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={pageVariants}
      className="max-w-2xl mx-auto bg-white rounded-lg border border-[#ccfbf1] shadow-sm overflow-hidden"
    >
      <div className="bg-[#f0fdfa] backdrop-blur-sm px-6 py-4 border-b border-[#ccfbf1]">
        <h1 className="text-2xl font-semibold text-[#0d9488]">{user.name}</h1>
        <p className="text-[#0f766e] mt-1">@{user.username}</p>
      </div>

      <div className="p-6 space-y-5">
        <div className="space-y-4">
          <div className="flex items-start">
            <Mail className="h-5 w-5 text-[#2dd4bf] mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-gray-800">{user.email}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Phone className="h-5 w-5 text-[#2dd4bf] mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Телефон</p>
              <p className="text-gray-800">{user.phone}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Globe className="h-5 w-5 text-[#2dd4bf] mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-500">Вебсайт</p>
              <p className="text-gray-800">{user.website}</p>
            </div>
          </div>

          {user.company && (
            <div className="flex items-start">
              <Briefcase className="h-5 w-5 text-[#2dd4bf] mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Компания</p>
                <p className="text-gray-800">{user.company.name}</p>
              </div>
            </div>
          )}

          {user.address && (
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-[#2dd4bf] mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-500">Адрес</p>
                <p className="text-gray-800">
                  {user.address.street}{user.address.suite && `, ${user.address.suite}`}<br />
                  {user.address.city}, {user.address.zipcode}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between pt-4 border-t border-[#ccfbf1] gap-3">
          <Link href={`/?${searchParams.toString()}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full border-[#2dd4bf] text-[#0d9488] hover:bg-[#f0fdfa] flex items-center gap-2"
            >
              <ArrowLeft size={16} /> Назад
            </Button>
          </Link>

          <div className="flex-1">
            <EditUserDialog 
              user={user} 
              onSave={updateUser}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function UserDetailsPage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<UserDetailsSkeleton />}>
        <UserDetailsContent />
      </Suspense>
    </ErrorBoundary>
  )
}