import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import { Navbar } from "./Navbar/Index";

export default function Layout(){
  return(
    <div style={{'minHeight': '100vh'}}>
      <Navbar />
      <div style={{flex: 1, display: "flex"}}>
        <Sidebar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}