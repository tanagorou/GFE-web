import { Link } from 'react-router-dom'
import { useState } from "react"
import './Layout.css'

export default function Home(){
  const [ currentUser, setCurrentUser ] = useState('')
  return (
    <div className='layout'>
      Welecome To GFE-web
      <div>
        <Link to='/study'>勉強する</Link>
      </div>
    </div>
  )
}