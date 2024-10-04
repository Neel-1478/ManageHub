import { useState } from 'react';
import CustomerDetails from "./Pages/customerDetails";
import Inventory from "./Pages/Inventory";
import About from "./Pages/about";
import Sidebar from "./Pages/Sidebar";
import Invoice from "./Pages/Invoice";
import CustomerManagement from './Pages/customerManage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/auth/LoginPage';
import Profile from './Pages/Profile';
import SignUpPage from "./components/auth/SignUpPage";
import Contact from "./Pages/Contact";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  // Handles successful login
  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <Router>
      <div>
        {/* Display Sidebar only when logged in */}
        {isLoggedIn && <Sidebar handleLogOut={handleLogin}/>}
        <Routes>
          <Route path="/" element={isLoggedIn ? <CustomerManagement /> : <Navigate to='/signin' />} />
          <Route path="/customer-management" element={isLoggedIn ? <CustomerManagement /> : <Navigate to='/signin' />} />
          <Route path="/customer-details" element={isLoggedIn ? <CustomerDetails /> : <Navigate to='/signin' />} />
          <Route path="/inventory" element={isLoggedIn ? <Inventory /> : <Navigate to='/signin' />} />
          <Route path="/about" element={isLoggedIn ? <About /> : <Navigate to='/signin' />} />
          <Route path="/invoice" element={isLoggedIn ? <Invoice /> : <Navigate to='/signin' />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to='/signin' />} />
          <Route path="/contact" element={isLoggedIn ? <Contact /> : <Navigate to='/signin' />} />
          <Route path="/signin" element={isLoggedIn ? <Navigate to='/customer-management' /> : <LoginPage handleLogin={handleLogin} />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to='/customer-management' /> : <SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
