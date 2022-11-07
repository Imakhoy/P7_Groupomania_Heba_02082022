import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from '../Header'
import Home from '../../pages/Home'
import Posts from '../../pages/Posts'
import Error404 from '../../pages/Error404'

function index() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/posts" element={<Posts />}></Route>
        <Route path="/*" element={<Error404 />}></Route>
      </Routes>
    </Router>
  )
}

export default index
