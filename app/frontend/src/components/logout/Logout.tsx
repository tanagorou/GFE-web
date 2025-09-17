import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosCaseConverter from "simple-axios-case-converter";
import { useEffect } from "react";
import { log } from "console";

axiosCaseConverter(axios)

// すごく低確率だが、ログアウトをしてもクッキーにリフレッシュトークンが保存されており
// リロード時にサイレントリフレッシュが働くようになってしまっている。
// 現在の仕様上、リロード時にはサイレントリフレッシュを行うように設定しているので、このままで行く。
// 仕様が変更次第変える
export default function Logout (){
  const navigate = useNavigate()
  const { logout } = useAuth()
  useEffect(() => {
    (async() => {
      try{
        const response = await axios.delete(
          'http://localhost:3000/api/v1/auth_token',
          {
            withCredentials: true,
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json",
            },
          }
        )
        console.log('ログアウト成功:', response)
        logout()
        navigate('/signin')
      } catch (err){
        console.log('ログアウト失敗:', err)
      }
    })()
  },[logout, navigate])

  return null
}