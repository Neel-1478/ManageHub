import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './customerDetails.module.css'; // Import the CSS module

const CustomerDetails = () => {
  const location = useLocation();
  const userInfoId = location.state.userinfoId; // Replace with dynamic id if needed

  // State variables initialized with empty or null values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    transactionDate: '',
    paymentType: '',
    transactionStatus: '',
  });
  const [products, setProducts] = useState([
    { productId: '', productName: '', price: '', quantity: '', discount: '' }
  ]);
  const [productArray, setProductArray] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/userinfo/${userInfoId}`, {
          headers: { 'Authorization': `${localStorage.getItem('token')} `}
        });
        const data = await response.json();
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setBalance(data.outstandingBalance);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    const getProductDetails = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/inventory", {
          headers: { 'Authorization':` ${localStorage.getItem('token')}` }
        });
        const data = await response.json();
        setProductArray(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/invoices?userInfoId=${userInfoId}`, {
          headers: { 'Authorization': `${localStorage.getItem('token')}` }
        });
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    getProductDetails();
    fetchUserDetails();
    fetchTransactions(); // Fetch transactions when component mounts
  }, []); // Added dependency array to prevent infinite loop

  // Handle transaction form changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle product selection
  const handleProductSelect = (index, e) => {
    const selectedProduct = productArray.find(product => product._id === e.target.value);

    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      productId: selectedProduct._id,
      productName: selectedProduct.name,
      price: selectedProduct.price,
    };
    setProducts(updatedProducts);
  };

  // Handle quantity and discount change
  const handleProductChange = (index, e) => {
    const updatedProducts = [...products];
    updatedProducts[index][e.target.name] = e.target.value;
    setProducts(updatedProducts);
  };

  // Add a new product row
  const handleAddProduct = () => {
    setProducts([...products, { productId: '', productName: '', price: '', quantity: '', discount: '' }]);
  };

  // Calculate the total amount for a transaction
  const calculateTotalAmount = () => {
    return products.reduce((acc, product) => {
      const price = parseFloat(product.price || 0);
      const quantity = parseInt(product.quantity || 0);
      const discount = parseFloat(product.discount || 0);
      const totalProductAmount = price * quantity * (1 - discount / 100);
      return acc + totalProductAmount;
    }, 0);
  };

  // Handle submission of a new transaction
  const handleSubmitTransaction = async () => {
    if (
      formData.transactionDate &&
      formData.paymentType &&
      formData.transactionStatus &&
      products.every(product => product.productId && product.price && product.quantity)
    ) {
      const totalAmount = calculateTotalAmount();

      // Sample payload structure
      const payload = {
        userInfoId,
        products: products.map(product => ({
          productId: product.productId,
          name: product.productName,
          price: parseFloat(product.price),
          discount: parseFloat(product.discount),
          quantity: parseInt(product.quantity),
        })),
        totalAmount, // Automatically calculated
        paymentType: formData.paymentType.toLowerCase(), // "cash" or "check"
        paymentStatus: formData.transactionStatus.toLowerCase(), // "completed", "pending", "failed"
      };

      try {
        const response = await fetch('http://localhost:3000/api/invoices', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`, // Token from localStorage
          },
          body: JSON.stringify(payload), // Payload to send
        });

        if (response.ok) {
          const result = await response.json();
          console.log('Transaction successful:', result);

          // Add the new transaction to the state
          setTransactions([
            ...transactions,
            {
              date: formData.transactionDate,
              paymentType: formData.paymentType,
              status: formData.transactionStatus,
              totalAmount,
              products,
            },
          ]);

          // Clear form and product fields
          setFormData({
            transactionDate: '',
            paymentType: '',
            transactionStatus: '',
          });
          setProducts([{ productId: '', productName: '', price: '', quantity: '', discount: '' }]);
          setShowForm(false);
        } else {
          console.error('Failed to create transaction:', await response.text());
          alert('Transaction creation failed.');
        }
      } catch (error) {
        console.error('Error during transaction submission:', error);
      }
    } else {
      alert("Please fill out all transaction and product fields");
    }
  };

  const totalTransactions = transactions.reduce((acc, cur) => acc + cur.totalAmount, 0);
  const updatedBalance = (balance || 0) - totalTransactions;

  return (
    <div className={styles.containerDetails}>
      <h1>Customer Details</h1>
      <div className={styles.customerInfo}>
        <h2>Name: {name}</h2>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Outstanding Balance:</strong> ${updatedBalance.toFixed(2)}</p>
      </div>

      <h3>Transaction History</h3>
      <button onClick={() => setShowForm(true)} style={{ backgroundColor: "#134074" }}>Add New Transaction</button>

      <table className={styles.tableDetails}>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Date</th>
            <th>Total Amount</th>
            <th>Payment Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{index + 1}</td> {/* Added Serial Number */}
              <td>{new Date(transaction.createdAt).toLocaleDateString()}</td> {/* Use createdAt for date */}
              <td>${transaction.totalAmount.toFixed(2)}</td>
              <td>{transaction.paymentType}</td>
              <td>{transaction.paymentStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className={styles.transactionForm}>
          <h3>Add Transaction</h3>
          <input
            type="date"
            id="transactionDate"
            value={formData.transactionDate}
            onChange={handleInputChange}
            required
          />
          <select
            id="paymentType"
            value={formData.paymentType}
            onChange={handleInputChange}
            required
          >
            <option value="">Payment Type</option>
            <option value="Cash">Cash</option>
            <option value="Check">Check</option>
          </select>
          <select
            id="transactionStatus"
            value={formData.transactionStatus}
            onChange={handleInputChange}
            required
          >
            <option value="">Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Failed">Failed</option>
          </select>

          <h4>Products</h4>
          {products.map((product, index) => (
            <div key={index}>
              <select
                onChange={(e) => handleProductSelect(index, e)}
              >
                <option value="">Select Product</option>
                {productArray.map(item => (
                  <option key={item._id} value={item._id}>{item.name}</option>
                ))}
              </select>
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={product.quantity}
                onChange={(e) => handleProductChange(index, e)}
              />
              <input
                type="number"
                name="discount"
                placeholder="Discount (%)"
                value={product.discount}
                onChange={(e) => handleProductChange(index, e)}
              />
            </div>
          ))}
          <button onClick={handleAddProduct}>Add Product</button>
          <button onClick={handleSubmitTransaction}>Submit Transaction</button>
        </div>
      )}
    </div>
  );
};

export default CustomerDetails;