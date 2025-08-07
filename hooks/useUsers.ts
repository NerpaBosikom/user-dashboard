import { useState, useEffect } from "react"
import { User } from "@/lib/types"

const STORAGE_KEY = "users"

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setUsers(JSON.parse(saved))
    } else {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => {
          setUsers(data)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
        })
    }
  }, [])

  const saveUsers = (newUsers: User[]) => {
    setUsers(newUsers)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUsers))
  }

  const addUser = (newUser: User) => {
    saveUsers([...users, newUser])
  }

  const deleteUser = (id: number) => {
    saveUsers(users.filter((u) => u.id !== id))
  }

  const editUser = (updatedUser: User) => {
    saveUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)))
  }

  const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1

  return { users, addUser, deleteUser, editUser, nextId }
}
