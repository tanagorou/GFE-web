import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"

type AuthContextType = {
  isAuthenticated: boolean
  token: string | null
  login: (token: string) => void
  logout: () => void
  getToken: () => string | null
  setToken: (v:string | null) => void
  currentUser: string | null
  setCurrentUser: (v: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const [token, setToken] =  useState<string | null>(localStorage.getItem('token'))
  const [currentUser, setCurrentUser] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if(storedToken){
      setToken(storedToken)
    }
  },[])

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const tokenFromUrl = query.get('token')
    if(tokenFromUrl){
      setToken(tokenFromUrl)
      localStorage.setItem('authToken',tokenFromUrl)
    } else {
      const storedToken = localStorage.getItem('authToken')
      if(storedToken){
        setToken(storedToken)
      }
    }
  },[])


  const login = (newToken: string) => {
    localStorage.setItem('accessToken', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setToken(null)
  }

  const getToken = () => token
  
  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, token, login, logout, getToken, setToken, currentUser, setCurrentUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if(!context){
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}