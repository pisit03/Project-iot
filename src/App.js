import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HowTo from './pages/HowtoPage';
import HomePage from './pages/HomePage';
import StationDetail from './pages/StationDetail';
import WelcomePage from './pages/WelcomePage';
import AboutPage from './pages/AboutPage'; 
import Footer from './components/Footer';


const App = () => {
  const [headerTitle, setHeaderTitle] = useState('Water QA');
  const [headerImage, setHeaderImage] = useState(''); 

  return (
    <Router >
      <Header title={headerTitle} headerImage={headerImage} /> 
      <Routes>
        <Route 
          path="/" 
          element={<WelcomePage setHeaderTitle={setHeaderTitle} setHeaderImage={setHeaderImage} />} 
        />
        <Route 
          path="/home" 
          element={<HomePage setHeaderTitle={setHeaderTitle} setHeaderImage={setHeaderImage} />} 
        />
        <Route 
          path="/station/:id" 
          element={<StationDetail setHeaderTitle={setHeaderTitle} setHeaderImage={setHeaderImage} />} 
        />
        <Route 
          path="/about" 
          element={<AboutPage setHeaderTitle={setHeaderTitle} setHeaderImage={setHeaderImage} />} 
        />
        <Route
          path="/howto"
          element={<HowTo setHeaderTitle={setHeaderTitle} setHeaderImage={setHeaderImage} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
