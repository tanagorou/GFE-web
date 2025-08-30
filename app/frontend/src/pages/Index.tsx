import { Link } from "react-router-dom";

export default function Index(){
  return (
    <div>
      <h1>まずはユーザーを登録しよう！</h1>
      <Link to='/signup'>サインアップ</Link> | <Link to='/signin'>サインイン</Link>
    </div>
  )
}