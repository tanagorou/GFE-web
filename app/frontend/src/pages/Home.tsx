import { Link } from 'react-router-dom'
import { useState } from "react"

export default function Home(){
  const [ currentUser, setCurrentUser ] = useState('')
  return (
    <div>
      Welecome To GFE-web
      <div>
        <Link to='/study'>勉強する</Link>
      </div>
    </div>
  )
}