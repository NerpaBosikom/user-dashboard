// components/users/EditUserClient.tsx
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User } from "@/lib/types"

interface Props {
  user: User
  onSave: (user: User) => void
}

const dialogVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export function EditUserClient({ user, onSave }: Props) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    phone: user.phone,
    website: user.website,
    companyName: user.company.name,
    street: user.address.street,
    city: user.address.city,
    zipcode: user.address.zipcode
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
      address: {
        ...user.address,
        street: formData.street,
        city: formData.city,
        zipcode: formData.zipcode
      },
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
        <Button 
          variant="default" 
          className="bg-teal-600 hover:bg-teal-700"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={dialogVariants}
        >
          <DialogHeader>
            <DialogTitle className="text-teal-700">Edit User</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border-teal-200 focus:border-teal-400"
            />
            <Input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              className="border-teal-200 focus:border-teal-400"
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border-teal-200 focus:border-teal-400"
            />
            <Input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border-teal-200 focus:border-teal-400"
            />
            <Input
              name="website"
              placeholder="Website"
              value={formData.website}
              onChange={handleChange}
              className="border-teal-200 focus:border-teal-400"
            />
            <Input
              name="companyName"
              placeholder="Company"
              value={formData.companyName}
              onChange={handleChange}
              className="border-teal-200 focus:border-teal-400"
            />
            <Input
              name="street"
              placeholder="Street"
              value={formData.street}
              onChange={handleChange}
              className="border-teal-200 focus:border-teal-400"
            />
            <Input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="border-teal-200 focus:border-teal-400"
            />
            <Input
              name="zipcode"
              placeholder="Zip Code"
              value={formData.zipcode}
              onChange={handleChange}
              className="border-teal-200 focus:border-teal-400"
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
                className="border-teal-400 text-teal-700 hover:bg-teal-50"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-teal-600 hover:bg-teal-700"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}