import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Workouts from './components/Workouts';
import Contact from './components/Contact';
import Food from './components/Food';
import Login from './components/Login';
import Register from './components/Register';
import './styles/App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="app">
        <header className="top-nav">
          <div className="logo">
            <h1>FitTrack</h1>
          </div>
          <nav className="navbar">
            <ul>
              {isAuthenticated ? (
                <>
                  <li><Link to="/dashboard">Dashboard</Link></li>
                  <li><Link to="/workouts">Workouts</Link></li>
                  <li><Link to="/food">Food</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li>
                    <Link to="/login" onClick={handleLogout}>Logout</Link>
                  </li>
                </>
              ) : (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              )}
            </ul>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Dashboard /> : <Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {isAuthenticated ? (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/food" element={<Food />} />
                <Route path="/contact" element={<Contact />} />
              </>
            ) : null}
            <Route path="*" element={isAuthenticated ? <Dashboard /> : <Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
