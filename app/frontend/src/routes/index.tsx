import { Routes, Route } from "react-router-dom";
import SignIn from "../components/signin/SignIn";
import SignUp from "../components/signup/SignUp";
import Home from "../pages/Home";
import Layout from "../layouts/Layout";
import StudyPage from "../pages/StudyPage";



export default function AppRoutes(){
  return (
    <>
      <Routes>
        <Route path='/signin' element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/study/*" element={<StudyPage/>}/>
        </Route>
      </Routes>
      <StudyPage/>
    </>
  )
}