import { useState } from 'react';
import styles from './Profile.module.css'; // Import the CSS module

const ProfileForm = () => {
  // Define state variables for the form fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    taxNumber: '',
    address: '',
    city: '',
    country: '',
  });

  const [errors, setErrors] = useState({
    email: false,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Dynamically set the field name
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    // Simple email validation logic
    if (formData.email === '') {
      setErrors({ ...errors, email: true });
      valid = false;
    } else {
      setErrors({ ...errors, email: false });
    }

    // If form is valid, show alert or perform further actions
    if (valid) {
      alert('Form submitted successfully!');
      console.log('Form Data:', formData);
      // You can add logic here to send the formData to an API or handle it as needed
    }
  };

  return (
    <div className={styles.container}>
      <form id="profileForm" onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Profile Information</h2>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Nick"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Patel"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="codeblog25@gmail.com"
          />
          {/* Email error message conditionally rendered */}
          {errors.email && <span className={styles.error}>The email field is required.</span>}
        </div>

        <h2 className={styles.heading}>Billing Details</h2>
        <div className={styles.formGroup}>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="ManageHub"
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="taxNumber">Tax Number:</label>
            <input
              type="text"
              id="taxNumber"
              name="taxNumber"
              value={formData.taxNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="country">Country:</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            >
              <option value="">-- Select Country --</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
              {/* Add more countries as needed */}
            </select>
          </div>
        </div>

        <button type="submit" className={styles.btn}>Update</button>
      </form>
    </div>
  );
};

export default ProfileForm;
