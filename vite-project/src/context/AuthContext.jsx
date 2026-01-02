import React, { useEffect, useState } from 'react'
import authService from '../services/authService'

const AuthContext = React.createContext()

const LOCAL_STORAGE_KEY = 'gelul-auth-token'
const USER_STORAGE_KEY = 'gelul-user-data'

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window === 'undefined') {
      return null
    }

    try {
      const savedUser = window.localStorage.getItem(USER_STORAGE_KEY)
      return savedUser ? JSON.parse(savedUser) : null
    } catch (error) {
      console.warn('Impossible de récupérer les données utilisateur', error)
      return null
    }
  })

  const [token, setToken] = useState(() => {
    if (typeof window === 'undefined') {
      return null
    }

    try {
      return window.localStorage.getItem(LOCAL_STORAGE_KEY)
    } catch (error) {
      console.warn('Impossible de récupérer le token', error)
      return null
    }
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Sauvegarder le token dans le localStorage
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      if (token) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, token)
      } else {
        window.localStorage.removeItem(LOCAL_STORAGE_KEY)
      }
    } catch (error) {
      console.warn('Impossible de sauvegarder le token', error)
    }
  }, [token])

  // Sauvegarder l'utilisateur dans le localStorage
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      if (user) {
        window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
      } else {
        window.localStorage.removeItem(USER_STORAGE_KEY)
      }
    } catch (error) {
      console.warn('Impossible de sauvegarder les données utilisateur', error)
    }
  }, [user])

  const login = async (email, password) => {
    setLoading(true)
    setError(null)

    try {
      const response = await authService.login(email, password)
      
      setUser(response.user)
      setToken(response.token)
      setLoading(false)
      return { success: true }
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de la connexion')
      setLoading(false)
      return { success: false, error: err.message }
    }
  }

  const register = async (email, password, name) => {
    setLoading(true)
    setError(null)

    try {
      const response = await authService.register(email, password, name)
      
      setUser(response.user)
      setToken(response.token)
      setLoading(false)
      return { success: true }
    } catch (err) {
      setError(err.message || "Une erreur est survenue lors de l'inscription")
      setLoading(false)
      return { success: false, error: err.message }
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    setError(null)
  }

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }))
  }

  const isAuthenticated = !!user && !!token

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }

