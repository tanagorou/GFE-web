import { Login } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Link from '@mui/material/Link';

export const GoogleIcon = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const token = query.get('token')
    // if(token){
    //   try{
    //     (async() => {
    //       const response = await axios.post(
    //         'http://localhost:3000/api/v1/auth_token',
    //         {},
    //         {
    //           withCredentials: true,
    //           headers: {
    //             "X-Requested-With": "XMLHttpRequest",
    //             "Content-Type": "application/json",
    //           },
    //         }
    //       )
    //       console.log("成功",response)
    //       Login(response.data)
    //     })
    //   }catch(err){
    //     console.log('err',err)
    //   }
    // } else {
    //   console.log('tokenを取得できませんでした。')
    //   navigate('/signin')
    // }
  },[navigate])

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google_oauth2'
  }

  return(
    <Link
      component="button"
      variant="body2"
      onClick={() => {
        console.info("google認証が始まりました...");
        handleGoogleLogin()
      }}
      >
      Googleでログイン
    </Link>
  )
}