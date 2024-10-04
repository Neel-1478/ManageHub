import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import styles from './signup.module.css';

const SignUpPage = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate(); // Initialize navigate for programmatic navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await axios.post('http://localhost:3000/api/auth/register', {
                name: `${firstname} ${lastname}`,
                email,
                password,
            });
            // Redirect to the login page after successful signup
            navigate('/signin');
        } catch (error) {
            setError('Failed to create account. Please try again.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.signupContainer}>
            <h2>Sign Up</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} className={styles.formInput}>
                <label>First Name</label>
                <input 
                    type="text" 
                    required 
                    value={firstname} 
                    onChange={(e) => setFirstname(e.target.value)} 
                    placeholder="Enter your first name"
                />
                <label>Last Name</label>
                <input 
                    type="text" 
                    required 
                    value={lastname} 
                    onChange={(e) => setLastname(e.target.value)} 
                    placeholder="Enter your last name"
                />
                <label>Email</label>
                <input 
                    type="email" 
                    required 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="example.email@gmail.com"
                />
                <label>Password</label>
                <input 
                    type="password" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter at least 8+ characters"
                />
                <button type="submit">Sign Up</button>
            </form>
            <div className={styles.C}>
                <p>Already have an account? 
                    <Link to="/signin"> Sign In</Link>
                </p>
            </div>
        </div>
        <div className={styles.img}>
            <img src="logo-removebg-preview.png" alt="Logo" />
        </div>
        </div>
    );
};

export default SignUpPage;
