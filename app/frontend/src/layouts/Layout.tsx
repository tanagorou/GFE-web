import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { Navbar } from "./Navbar/Index";
import { SidebarProvider } from "../context/SidebarContext";
import "./Layout.css";


export default function Layout(){
  return(
    <SidebarProvider>
      <div className="fullheight">
        <Navbar />
        <div style={{height: '92%',display: "flex"}}>
          <Sidebar />
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>

  )
}