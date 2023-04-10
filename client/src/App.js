import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';

const App = () => (
  <BrowserRouter>
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
          <Route path="/" element={<Navigate replace to="/posts" />} />
          <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home/>} />
      </Routes>
    </Container>
  </BrowserRouter>
);

export default App;