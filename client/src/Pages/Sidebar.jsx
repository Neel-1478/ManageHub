import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { useState, useEffect } from 'react'; // Import useState and useEffect
import axios from 'axios'; // Import axios for making API calls
import styles from './Sidebar.module.css'; // Import CSS module

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("/customer-management"); // Initialize active item state
  const [userName, setUserName] = useState("User"); // Default name
  const [userEmail, setUserEmail] = useState("user@example.com"); // Default email
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const navItems = [
    { href: "/customer-management", icon: "fas fa-th-large", label: "Customer Management" },
    { href: "/inventory", icon: "fas fa-check-circle", label: "Inventory" },
    { href: "/about", icon: "fas fa-bell", label: "About Us" },
    { href: "/contact", icon: "fas fa-cog", label: "Contact Us" },
    { href: "/invoice", icon: "fas fa-file-invoice", label: "Invoice" },
  ];

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/profile', {
          headers: {
            'Authorization': localStorage.getItem('token'), // Add token from localStorage
          },
        });
        // Set userName and userEmail from the response
        setUserName(response.data.name);
        setUserEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array to run once on component mount

  // Handle log out
  const handleLogout = ({handleLogOut}) => {
    // Remove token from localStorage
    localStorage.removeItem('token');

    handleLogOut();
    // setTimeout(()=>{},1000)
    // Navigate to the login page
    navigate('/');
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logoSection}>
        <img src="managelogo.jpg" alt="Logo" className={styles.logo} />
        <h2 className={styles.brandName}>ManageHub</h2>
      </div>

      <nav className={styles.navLinks}>
        {navItems.map((item) => (
          <Link 
            key={item.label} 
            to={item.href} 
            className={`${styles.navItem} ${activeItem === item.href ? styles.active : ''}`} 
            onClick={() => setActiveItem(item.href)} // Set active item on click
          >
            <i className={item.icon}></i> {item.label}
          </Link>
        ))}
      </nav>

      <div className={styles.userSection}>
        <div className={styles.profile}>
          <i className="fas fa-user-circle"></i> {/* Replace with your profile icon */}
          <div className={styles.profileInfo}>
            <Link to="/profile" className={styles.userName} onClick={() => setActiveItem("/profile")}>
              {userName} {/* Display fetched name */}
            </Link>
            <span className={styles.userEmail}>{userEmail}</span> {/* Display fetched email */}
          </div>
        </div>
      </div>

      {/* Log Out button at the bottom */}
      <div className={styles.logoutSection}>
        <button onClick={handleLogout} className={styles.logoutButton}>
          <i className="fas fa-sign-out-alt"></i> Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
