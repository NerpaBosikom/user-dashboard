"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User } from "@/lib/types"

interface Props {
  onAdd: (user: Omit<User, 'id'>) => void
  nextId: number
}

export function AddUserDialog({ onAdd, nextId }: Props) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    companyName: "",
    street: "",
    city: "",
    zipcode: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newUser: Omit<User, 'id'> = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      address: {
        street: formData.street,
        suite: "",
        city: formData.city,
        zipcode: formData.zipcode
      },
      company: {
        name: formData.companyName,
        catchPhrase: "",
        bs: ""
      }
    }
    
    onAdd(newUser)
    setFormData({
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
      companyName: "",
      street: "",
      city: "",
      zipcode: ""
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-teal-600 text-white hover:bg-teal-700">
          Add User
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            name="name"
            placeholder="Full Name"
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
          <Input
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
          />
          <Input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          <Input
            name="zipcode"
            placeholder="Zip Code"
            value={formData.zipcode}
            onChange={handleChange}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
              Add User
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}