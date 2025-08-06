"use client"

import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User } from "@/lib/types"
import { useState } from "react"

interface Props {
  user: User
  onSave: (updatedUser: User) => void
}

export function EditUserDialog({ user, onSave }: Props) {
  const [formData, setFormData] = useState<User>(user)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    onSave(formData)
  }

  return (
    <Dialog>
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
            name="company.name"
            value={formData.company.name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                company: { ...prev.company, name: e.target.value },
              }))
            }
            placeholder="Company"
          />
          <Button type="button" onClick={handleSubmit}>
            Сохранить
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
