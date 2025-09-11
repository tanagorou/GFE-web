import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from './components/signup/SignUp';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Index from './pages/Index';
import SignIn from './components/signin/SignIn';
import Home from './pages/Home';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './layouts/Navbar/Index';
import Timer from './components/Timer';
import StudyPage from './pages/StudyPage';
import Sidebar from './components/Sidebar/Sidebar';
import { GoogleIcon } from './components/GoogleIcon';
import AppRoutes from './routes';


// function App() {
//   return (
//     <div className="App">
//       <AuthProvider>
//        <BrowserRouter>
//        <Navbar />
//        <div className='main'>
//         <div className='sidebar'>
//           <Sidebar />
//         </div>
//           <div className='content'>
//           <GoogleIcon />
//           <Routes>
//             <Route path='/index' element={<Index />} />
//             <Route path='/signup' element={<SignUp />} />
//             <Route path='/signin' element={<SignIn />} />
//             <Route path='/' element={<Home />} />
//           </Routes>
//           <StudyPage />
//           </div>
//        </div>
//         </BrowserRouter>
//       </AuthProvider>
//     </div>
//   );
// }

function App(){
  return (
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
  )
}

export default App;
