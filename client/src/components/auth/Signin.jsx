import { useState } from 'react';
import SignInForm from './SignInForm';  // Import the SignInForm component
import CreateAccountForm from "./CreateAccountForm"; // Import the CreateAccountForm component

const SignIn = () => {
    const [showSignIn, setShowSignIn] = useState(false);

    const handleSignInClick = (e) => {
        e.preventDefault();
        setShowSignIn(true);
    };

    const handleBackClick = (e) => {
        e.preventDefault();
        setShowSignIn(false); // Go back to the Create Account form
    };

    return (
        <>
            {showSignIn ? (
                <SignInForm onBackClick={handleBackClick} />
            ) : (
                <CreateAccountForm onSignInClick={handleSignInClick} />
            )}
        </>
    );
};

export default SignIn;
