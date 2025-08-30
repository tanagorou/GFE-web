import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from './components/signup/SignUp';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Index from './pages/Index';
import SignIn from './components/signin/SignIn';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/index' element={<Index />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
