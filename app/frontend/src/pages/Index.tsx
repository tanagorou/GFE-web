import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Index(){
  const navigate = useNavigate()
  // const { setToken, currentUser} = useAuth()

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search)
  //   const token = params.get('token')

  //   if(token){
  //     setToken(token)
  //     localStorage.setItem('authToken',token)
  //   }
  // },[setToken, navigate])

  // const handleGoogleAuth = (e) => {
  //   e.preventDefault()
  //   const form = document.createElement('form')
  //   form.method = "GET"
  //   form.action = `http://localhost:3000/auth/google_oauth2`
  //   document.body.appendChild(form)
  //   form.submit()
  // }

  return (
    <div>
      <h1>まずはユーザーを登録しよう！</h1>
      {/* <Link to='/signup'>サインアップ</Link> | <Link to='/signin'>サインイン</Link>
      <button onClick={handleGoogleAuth}>Googleログイン</button> */}
    </div>
  )
}