import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingProgress from "./LoadingProgress";
import { api, baseURL } from "../api/api";

export const handleGoogleLogin = () => {
  window.location.href = baseURL + '/auth/google_oauth2'
}

export const GoogleCallback = () => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const { login } = useAuth()
  useEffect(() => {
    const query = new URLSearchParams(search)
    const token = query.get('token')
    if(token){
      try{
        (async() => {
          const response = await api.post(
            '/auth_token/google_login',
            {},
            {
              withCredentials: true,
              headers: {
                "Authorization": `Bearer ${token}`,
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": "application/json",
              },
            }
          )
          console.log("成功",response)
          login(response.data)
          navigate('/home')
        })()
      }catch(err){
        console.log('err',err)
      }
    } else {
      console.log('tokenを取得できませんでした。')
      navigate('/signin')
    }
  },[navigate, search])

  return(
    <LoadingProgress />
  )
}