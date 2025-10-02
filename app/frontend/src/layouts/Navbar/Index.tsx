import { Link } from "react-router-dom"
import './Navbar.css'

export const Navbar = () => {
  return (
    <nav className="nav">
      <div className="logo">
        <h4>GFE-web</h4>
      </div>
      <ul className="nav-links">
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/study'>Study</Link></li>
        <li><Link to='/signin'>Login</Link></li>
        <li><Link to='/logout'>Logout</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
      </ul>
    </nav>
  )
}