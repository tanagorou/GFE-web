import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import {setAccessToken, setCurrentUser, isExistUser, isExpired, isExistUserAndExpired, loggedIn} from "./Auth"
import { useLocation, useNavigate } from "react-router-dom";


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
    // console.log('ページ遷移しました')
    // console.log('now', new Date(Date.now()))
    // console.log('exp', new Date(authToken.auth.expires))
    if(isExistUserAndExpired(authToken)){
      (async () => {
        try{
          const response = await axios.post(
            'http://localhost:3000/api/v1/auth_token/refresh',
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


//リロード時にトークンを発行するように設定
// 原因: useStateが初期値に更新され、/signupに飛ばされてしまう
  useEffect(() => {
    (async() => {
      try{
        const respone = await axios.post(
          "http://localhost:3000/api/v1/auth_token/refresh",
          {},
          { 
            withCredentials: true,
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json",
            },
          }
        )
        const data = respone.data
        setAuthToken({...setCurrentUser(data),...setAccessToken(data)})
      } catch (err){
        console.log('リフレッシュトークンの有効期限が切れました。',err)
        navigate('/signin')
      }
    })()
  }, []);


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