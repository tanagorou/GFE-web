import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import LoadingProgress from "./LoadingProgress";

export const handleGoogleLogin = () => {
  window.location.href = 'http://localhost:3000/auth/google_oauth2'
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
          const response = await axios.post(
            'http://localhost:3000/api/v1/auth_token/google_login',
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
      // navigate('/signin')
    }
  },[navigate, search])

  return(
    <LoadingProgress />
  )
}