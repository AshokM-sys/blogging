import './App.css'
import Navbar from './Components/Navbar'
import HomePage from './Components/HomePage'
import SignupForm from './Components/SignupForm'
import Login from './Components/Login'
import DashboardPage from './Components/DashboardPage'
import PostEditPage from './Components/PostEditPage'
import PostListPage from './Components/PostListPage'
import PostDetailPage from './Components/PostDetailsPage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react';

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route path='/' element={<><HomePage /></>} />
    <Route path='/signupForm' element={<><SignupForm /></>} />
    <Route path='/login' element={<><Login /></>} />
    <Route path='/dashboard' element={<><DashboardPage /></>} />
    <Route exact path="/edit/:id" component={<PostEditPage />} />
    <Route exact path="/posts" element={<PostListPage />} />
    <Route path="/post/:id" element={<PostDetailPage />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
