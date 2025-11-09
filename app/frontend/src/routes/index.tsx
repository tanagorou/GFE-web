import { Routes, Route, Outlet } from "react-router-dom";
import SignIn from "../components/signin/SignIn";
import SignUp from "../components/signup/SignUp";
import Home from "../pages/Home";
import Layout from "../layouts/Layout";
import StudyPage from "../pages/StudyPage";
import Logout from "../components/logout/Logout";
import { StudyTimeProvider } from "../context/StudyContext";
import { StudyRecordList } from "../components/StudyRecordList";
import { NotificationPermissionProvider } from "../context/NotificationPermissionContext";
import NotFound from "../pages/NotFound";
import { GoogleCallback } from "../components/GoogleCallback";

export default function AppRoutes(){
  return (
    <>
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/logout" element={<Logout />} />
        <Route path="/auth/callback" element={<GoogleCallback />} />
        <Route path="*" element={<NotFound />} />
        <Route element={
          <NotificationPermissionProvider>
            <StudyTimeProvider>
               <Outlet />
            </StudyTimeProvider>
          </NotificationPermissionProvider>
          }>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/study/*" element={<StudyPage/>}/>
            <Route path="/study_record_list" element={<StudyRecordList/>}/>
          </Route>
        </Route>
      </Routes>
    </>
  )
}