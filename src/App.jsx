// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import UserForm from './pages/UserForm';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/admin-login">Admin Login</Link>
            </li>
            <li>
              <Link to="/user-form">User Form</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          {/* Define the routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/user-form" element={<UserForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
