"use client"

import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User } from "@/lib/types"
import { useState } from "react"

interface Props {
  user: User
  onSave: (user: User) => void
}

export default function EditUserClient({ user, onSave }: Props) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<User>(user)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === "companyName") {
      setFormData((prev) => ({
        ...prev,
        company: { ...prev.company, name: value },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSave = () => {
    onSave(formData)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Редактировать</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать пользователя</DialogTitle>
        </DialogHeader>

        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <Input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
          <Input name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
          <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
          <Input name="website" value={formData.website} onChange={handleChange} placeholder="Website" />
          <Input
            name="companyName"
            value={formData.company.name}
            onChange={handleChange}
            placeholder="Company"
          />
          <Button type="button" onClick={handleSave}>
            Сохранить
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
