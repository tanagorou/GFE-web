import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function Index(){
  return (
    <div>
      <h1>まずはユーザーを登録しよう！</h1>
    </div>
  )
}