import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './customerManage.module.css';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    balance: 0.0,
  });
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token'); // Assume token is stored in local storage

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/userinfo', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token, // Add token directly
        },
      });
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleInputChange = (e) => {
    console.log(formData)
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmitCustomer = async () => {
    if (formData.name && formData.email && formData.phone) {
      try {
        if (editIndex !== null) {
          // Update existing customer
          await fetch(`http://localhost:3000/api/userinfo/${customers[editIndex]._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token,
            },
            body: JSON.stringify(formData),
          });
        } else {
          console.log(formData)
          // Add new customer
          await fetch('http://localhost:3000/api/userinfo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token,
            },
            body: JSON.stringify(formData),
          });
        }
        fetchCustomers(); // Refresh customers list
        // Clear form and reset
        setFormData({
          name: '',
          email: '',
          phone: '',
          balance: 0.0,
        });
        setShowForm(false);
        setEditIndex(null);
      } catch (error) {
        console.error('Error submitting customer:', error);
      }
    }
  };

  // Pass only the customer ID to the navigate function
  const openCustomerDetails = (customerId) => {
    navigate('/customer-details', {
      state: {
        userinfoId: customerId,
      },
    });
  };

  const handleEditCustomer = (index) => {
    setFormData(customers[index]);
    setShowForm(true);
    setEditIndex(index);
  };

  const handleDeleteCustomer = async (index) => {
    try {
      await fetch(`http://localhost:3000/api/userinfo/${customers[index]._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
        },
      });
      fetchCustomers(); // Refresh customer list after deletion
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Customer Management</h1>

      <div className={styles.searchAddContainer}>
        <input
          type="text"
          id="searchCustomers"
          placeholder="Search Customers..."
          className={styles.searchInput}
        />
        <button className={styles.addBtn} onClick={() => setShowForm(true)}>
          + Add New Customer
        </button>
      </div>

      {showForm && (
        <div className={styles.customerForm}>
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className={styles.formInput}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className={styles.formInput}
          />
          <input
            type="text"
            id="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={styles.formInput}
          />
          <input
            type="number"
            id="balance"
            placeholder="Outstanding Balance"
            value={formData.balance}
            onChange={handleInputChange}
            className={styles.formInput}
          />
          <div className={styles.formButtons}>
            <button onClick={handleSubmitCustomer} className={styles.submitBtn}>
              {editIndex !== null ? 'Update Customer' : 'Add Customer'}
            </button>
            <button onClick={() => setShowForm(false)} className={styles.closeBtn}>
              Close
            </button>
          </div>
        </div>
      )}

      <table className={styles.customerTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Outstanding Balance</th>
            <th>Last Transaction</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td
                onDoubleClick={() => openCustomerDetails(customer._id)} // Pass only the customer ID
                style={{ cursor: 'pointer' }}
              >
                {customer.name}
              </td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>${customer.outstandingBalance}</td>
              <td>-</td>
              <td className={styles.actionsCell}>
                <i
                  className="fas fa-edit"
                  onClick={() => handleEditCustomer(index)}
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                ></i>
                <i
                  className="fas fa-trash"
                  onClick={() => handleDeleteCustomer(index)}
                  style={{ cursor: 'pointer', color: 'red' }}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerManagement;
