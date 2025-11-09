import { isExistUser } from "../../context/Auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { api } from '../../api/api'

export default function Logout (){
  const navigate = useNavigate()
  const { authToken, logout } = useAuth()
  useEffect(() => {
    if(!isExistUser(authToken)) return
    (async() => {
      try{
        const response = await api.delete(
          '/auth_token',
          {
            withCredentials: true,
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json",
            },
          }
        )
        // console.log('ログアウト成功:', response)
        logout()
        navigate('/signin')
      } catch (err){
        // console.log('ログアウト失敗:', err)
        navigate('/signin')
      }
    })()
  },[logout, navigate])
  return null
}