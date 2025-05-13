// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/home';
import About from '../src/pages/about';
import Services from './pages/Services';
import Contact from './pages/contact';

import SignUp from './pages/SignUp';
import Login from './pages/Login';


function App() {
  return (

      
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/service" element={<Services />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
  );
}

export default App;