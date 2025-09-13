import axios from "axios"
import axiosCaseConverter from "simple-axios-case-converter";
import { createContext, useContext, useEffect, useState } from "react"
import {setAccessToken, setCurrentUser, isExistUser, isExpired, isExistUserAndExpired} from "./Auth"


type AuthContextType = {
  // isAuthenticated: boolean
  // token: string | null
  login: (token: string) => void
  logout: () => void
  // getToken: () => string | null
  // setToken: (v:string | null) => void
  // currentUser: string | null
  // setCurrentUser: (v: string | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  // const [currentUser, setCurrentUser] = useState<string | null>(null)

  const [authToken, setAuthToken] = useState({user:{current: null}, auth: {token: null, expires: 0, payload: {}}})

  // useEffect(() => {
  //   const query = new URLSearchParams(window.location.search)
  //   const tokenFromUrl = query.get('token')
  //   if(tokenFromUrl){
  //     setToken(tokenFromUrl)
  //     localStorage.setItem('authToken',tokenFromUrl)
  //   } else {
  //     const storedToken = localStorage.getItem('authToken')
  //     if(storedToken){
  //       setToken(storedToken)
  //     }
  //   }
  // },[])
  useEffect(() => {
    console.log(authToken)
  },[authToken])


  const login = (data: any) => {
    const user = setCurrentUser(data)
    const accessToken = setAccessToken(data)
    const merge = {...user, ...accessToken}
    setAuthToken({...setCurrentUser(data), ...setAccessToken(data)})
    // console.log(user,accessToken)
    console.log(merge)
    console.log(authToken)
  }

  const logout = () => {
    
  }

  // const getToken = () => token
  
  return (
    <AuthContext.Provider value={{ login, logout}}>
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