"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export function UserCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border border-gray-200 shadow-sm h-full flex flex-col">
        <CardContent className="p-4 flex-grow space-y-3">
          <div className="h-7 w-3/4 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-5 w-5/6 bg-gray-200 rounded-lg animate-pulse" />
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full bg-gray-200 rounded-lg animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </CardContent>
        <div className="p-4 border-t border-gray-200 flex justify-between gap-3">
          <div className="h-9 flex-1 bg-gray-200 rounded-md animate-pulse" />
          <div className="h-9 flex-1 bg-gray-200 rounded-md animate-pulse" />
        </div>
      </Card>
    </motion.div>
  )
}