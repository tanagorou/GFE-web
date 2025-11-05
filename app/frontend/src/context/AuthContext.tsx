import { createContext, useContext, useEffect, useState} from "react"
import {setAccessToken, setCurrentUser, isExistUserAndExpired} from "./Auth"
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../api/api";

type AuthContextType = {
  authToken: Record<string, any>
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [authToken, setAuthToken] = useState({user:{current: ''}, auth: {token: '', expires: 0, payload: {}}})
  useEffect(() => {
    console.log('リロード時にトークンを発行')
    const refreshToken = async() => {
      try{
        const response = await api.post(
          '/auth_token/refresh',
          {},
          {
            withCredentials: true,
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json",
            },
          }
        )
        const data = response.data
        setAuthToken({...setCurrentUser(data),...setAccessToken(data)})
      } catch (err){
        console.log('リフレッシュトークンの有効期限が切れました。',err)
        navigate('/signin')
      }
    }
    refreshToken()
  }, []);

  useEffect(() => {
    if(isExistUserAndExpired(authToken)){
      (async () => {
        try{
          const response = await api.post(
            '/auth_token/refresh',
            {},
            {
              withCredentials: true,
              headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": "application/json",
              },
            }
          )
          const data = response.data
          setAuthToken({...setCurrentUser(data),...setAccessToken(data)})
          navigate('/home')
        } catch (err){
          console.log(err)
          navigate('/signin')
        }
      })()
    }
  },[location.pathname])

  const login = (data: any) => {
    setAuthToken({...setCurrentUser(data), ...setAccessToken(data)})
  }

  const logout = () => {
    setAuthToken({user:{current: ''}, auth: {token: '', expires: 0, payload: {}}})
  }
  
  return (
    <AuthContext.Provider value={{authToken, login, logout}}>
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