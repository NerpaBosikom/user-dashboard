"use client"

import { useEffect, useState, useCallback } from "react"
import { User } from "@/lib/types"

const LOCAL_STORAGE_KEY = "user-dashboard-data"

interface UsersState {
  users: User[]
  loading: boolean
  error: Error | null
  deletingId: number | null
}

interface LocalStorageData {
  localUsers: User[]
  deletedIds: number[]
}

export function useUsers() {
  const [state, setState] = useState<UsersState>({
    users: [],
    loading: true,
    error: null,
    deletingId: null
  })

  const saveToLocalStorage = useCallback((data: LocalStorageData) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
  }, [])

  const getLocalData = useCallback((): LocalStorageData => {
    const localData = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!localData) return { localUsers: [], deletedIds: [] }
    
    try {
      const parsed = JSON.parse(localData)
      return {
        localUsers: Array.isArray(parsed.localUsers) ? parsed.localUsers : [],
        deletedIds: Array.isArray(parsed.deletedIds) ? parsed.deletedIds : []
      }
    } catch {
      return { localUsers: [], deletedIds: [] }
    }
  }, [])

  // Добавляем функцию updateUser
  const updateUser = useCallback((updatedUser: User) => {
    setState(prev => {
      const { localUsers, deletedIds } = getLocalData()
  
      // Для всех пользователей (и API, и локальных) сохраняем изменения в localStorage
      const existingIndex = localUsers.findIndex(u => u.id === updatedUser.id)
      let newLocalUsers = [...localUsers]
      
      if (existingIndex !== -1) {
        newLocalUsers[existingIndex] = updatedUser
      } else {
        newLocalUsers.push(updatedUser)
      }
  
      saveToLocalStorage({ localUsers: newLocalUsers, deletedIds })
  
      // Обновляем состояние
      const userIndex = prev.users.findIndex(u => u.id === updatedUser.id)
      const updatedUsers = [...prev.users]
      
      if (userIndex !== -1) {
        updatedUsers[userIndex] = updatedUser
      }
  
      return { ...prev, users: updatedUsers }
    })
  }, [getLocalData, saveToLocalStorage])

  const fetchUsers = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      
      const apiResponse = await fetch("https://jsonplaceholder.typicode.com/users")
      if (!apiResponse.ok) throw new Error("Failed to fetch users")
      const apiUsers: User[] = await apiResponse.json()

      const { localUsers, deletedIds } = getLocalData()

      const filteredApiUsers = apiUsers.filter(user => !deletedIds.includes(user.id))
      const mergedUsers = [...filteredApiUsers]

      // добавляем локальных, заменяя если id совпадает
      localUsers.forEach(localUser => {
        const existingIndex = mergedUsers.findIndex(u => u.id === localUser.id)
        if (existingIndex !== -1) {
          mergedUsers[existingIndex] = localUser
        } else {
          mergedUsers.push(localUser)
        }
      })

      setState({
        users: mergedUsers,
        loading: false,
        error: null,
        deletingId: null
      })
    } catch (error) {
      setState({
        users: [],
        loading: false,
        error: error instanceof Error ? error : new Error("Unknown error"),
        deletingId: null
      })
    }
  }, [getLocalData])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const getNextId = useCallback(() => {
    const maxId = Math.max(0, ...state.users.map(user => user.id))
    return maxId + 1
  }, [state.users])

  const addUser = useCallback((newUser: Omit<User, 'id'>) => {
    const userWithId: User = {
      ...newUser,
      id: getNextId(),
      address: newUser.address || { street: "", suite: "", city: "", zipcode: "" },
      company: newUser.company || { name: "", catchPhrase: "", bs: "" }
    }
    
    setState(prev => {
      const { localUsers, deletedIds } = getLocalData()

      // заменяем, если id совпадает
      const existingIndex = localUsers.findIndex(u => u.id === userWithId.id)
      let updatedLocalUsers
      if (existingIndex !== -1) {
        updatedLocalUsers = [...localUsers]
        updatedLocalUsers[existingIndex] = userWithId
      } else {
        updatedLocalUsers = [...localUsers, userWithId]
      }
      
      saveToLocalStorage({ localUsers: updatedLocalUsers, deletedIds })

      const existingStateIndex = prev.users.findIndex(u => u.id === userWithId.id)
      let updatedUsers
      if (existingStateIndex !== -1) {
        updatedUsers = [...prev.users]
        updatedUsers[existingStateIndex] = userWithId
      } else {
        updatedUsers = [...prev.users, userWithId]
      }

      return { ...prev, users: updatedUsers }
    })
  }, [getLocalData, saveToLocalStorage, getNextId])

  const deleteUser = useCallback(async (id: number) => {
    if (!window.confirm('Вы уверены, что хотите удалить этого пользователя?')) return
    
    setState(prev => ({ ...prev, deletingId: id }))
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      setState(prev => {
        const isApiUser = id <= 10
        const { localUsers, deletedIds } = getLocalData()
        
        const newDeletedIds = isApiUser ? [...new Set([...deletedIds, id])] : deletedIds
        const newLocalUsers = localUsers.filter(user => user.id !== id)
        
        saveToLocalStorage({ 
          localUsers: newLocalUsers, 
          deletedIds: newDeletedIds 
        })
        
        return {
          ...prev,
          users: prev.users.filter(user => user.id !== id),
          deletingId: null
        }
      })
    } catch (error) {
      setState(prev => ({
        ...prev,
        deletingId: null,
        error: error instanceof Error ? error : new Error("Ошибка при удалении")
      }))
    }
  }, [getLocalData, saveToLocalStorage])

  return { 
    users: state.users, 
    loading: state.loading, 
    error: state.error,
    deletingId: state.deletingId,
    addUser, 
    deleteUser,
    updateUser, // Добавляем новую функцию в возвращаемый объект
    fetchUsers,
    getNextId
  }
}