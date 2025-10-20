import { SidebarData } from "./SidebarData"
import './Sidebar.css'
import { useNavigate } from "react-router-dom"
import { styled } from "@material-ui/core"
import { useSidebarOpen } from "../../context/SidebarContext"

export default function Sidebar(){
  const {sidebarOpen} = useSidebarOpen()
  const navigate = useNavigate()
  return(
      <div className={`Sidebar ${sidebarOpen ? 'open' : 'close'}`}>
        <ul className="SidebarList">
          {SidebarData.map((val, key) => {
            return(
              <li key={key} className="row" onClick={() => navigate(val.link)}>
                <div className="icon">{val.icon}</div>
                <div className="title">{val.title}</div>
              </li>
            )
          })}
        </ul>
      </div>
  )
}