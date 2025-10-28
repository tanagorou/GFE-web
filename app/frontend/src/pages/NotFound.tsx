import { Link } from "react-router-dom";

export default function NotFound(){
  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <h1>404 Not Found</h1>
      <Link to='/home'>ホームに戻る</Link>
    </div>
  )
}