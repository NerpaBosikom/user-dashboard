"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User } from "@/lib/types"
import { Pencil, X } from "lucide-react"
import { motion } from "framer-motion"

interface Props {
  user: User
  onSave: (user: User) => void
  className?: string
  children?: React.ReactNode
}

export function EditUserDialog({ 
  user, 
  onSave, 
  className = "",
  children 
}: Props) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    website: user.website,
    companyName: user.company.name
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const updatedUser: User = {
      ...user,
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      company: {
        ...user.company,
        name: formData.companyName
      }
    }
    
    onSave(updatedUser)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button 
            className={`bg-[#0d9488] hover:bg-[#0f766e] text-white flex items-center gap-2 ${className}`}
          >
            <Pencil size={16} /> Редактировать
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <DialogHeader>
            <DialogTitle className="text-[#0d9488]">Редактировать пользователя</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {[
                { name: "name", placeholder: "Полное имя", required: true },
                { name: "username", placeholder: "Имя пользователя", required: true },
                { name: "email", placeholder: "Email", type: "email", required: true },
                { name: "phone", placeholder: "Телефон" },
                { name: "website", placeholder: "Вебсайт" },
                { name: "companyName", placeholder: "Компания" }
              ].map((field) => (
                <motion.div
                  key={field.name}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <Input
                    name={field.name}
                    type={field.type || "text"}
                    placeholder={field.placeholder}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    required={field.required}
                    className="border-[#2dd4bf] focus:ring-[#0d9488]"
                  />
                </motion.div>
              ))}
            </motion.div>

            <div className="flex justify-between pt-4 gap-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => setOpen(false)}
                className="border-[#2dd4bf] text-[#0d9488] hover:bg-[#f0fdfa] flex items-center gap-2 flex-1"
              >
                <X size={16} /> Отмена
              </Button>
              <Button 
                type="submit" 
                className="bg-[#0d9488] hover:bg-[#0f766e] flex-1"
              >
                Сохранить
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}