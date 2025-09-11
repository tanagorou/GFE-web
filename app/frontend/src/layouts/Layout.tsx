import Sidebar from "../components/Sidebar/Sidebar";
import { Navbar } from "./Navbar/Index";

export default function Layout(){
  return(
    <div style={{'minHeight': '100vh'}}>
      <Navbar />
      <div style={{'height':'100%'}}>
        <Sidebar />
      </div>
    </div>
  )
}