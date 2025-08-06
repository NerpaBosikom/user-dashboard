"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User } from "@/lib/types"

interface NewUser {
  name: string
  username: string
  email: string
  phone: string
  website: string
  companyName: string
}

interface Props {
  onAdd: (user: User) => void
  nextId: number
}

export function AddUserDialog({ onAdd, nextId }: Props) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<NewUser>({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    companyName: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    const newUser: User = {
      id: nextId,
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
      },
      company: {
        name: formData.companyName,
        catchPhrase: "",
        bs: "",
      },
    }
    onAdd(newUser)
    setFormData({
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
      companyName: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">Добавить пользователя</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить нового пользователя</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-3"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <Input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <Input
            name="website"
            placeholder="Website"
            value={formData.website}
            onChange={handleChange}
          />
          <Input
            name="companyName"
            placeholder="Company"
            value={formData.companyName}
            onChange={handleChange}
          />
          <Button type="submit" className="mt-2 w-full">
            Добавить
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
