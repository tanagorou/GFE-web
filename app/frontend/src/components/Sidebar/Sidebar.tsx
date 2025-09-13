import { SidebarData } from "./SidebarData"
import './Sidebar.css'
import { useNavigate } from "react-router-dom"

export default function Sidebar(){
  const navigate = useNavigate()
  return(
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return(
            <li key={key} className="row" onClick={() => navigate(val.link)}>
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}