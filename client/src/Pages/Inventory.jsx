import { useState, useEffect } from 'react';
import styles from './Inventory.module.css'; // Import CSS module
import { FaEdit, FaTrash } from "react-icons/fa";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    sold: '',
    qty: '',
    price: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('none');
  const [editingItem, setEditingItem] = useState(null); // State for editing an item
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

  // Fetch all products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from the backend API
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/inventory', {
        method: 'GET',
        headers: {
          'Authorization': `${token}`
        }
      });
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Add or update product
  const saveProduct = async () => {
    const { name, description, sold, qty, price } = formData;

    if (name && description && qty && price) {
      try {
        console.log(parseInt(sold || 0))
        const method = editingItem ? 'PUT' : 'POST';
        const endpoint = editingItem ? `http://localhost:3000/api/inventory/${editingItem._id}` : 'http://localhost:3000/api/inventory';
        const response = await fetch(endpoint, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
          },
          body: JSON.stringify({
            name,
            description,
            price: parseFloat(price),
            stockQuantity: parseInt(qty),
            itemsSold: parseInt(sold)
          })
        });

        const result = await response.json();

        if (response.ok) {
          fetchProducts(); // Refresh product list
          resetForm();
        } else {
          alert(result.message || 'Error saving product');
        }
      } catch (error) {
        console.error('Error saving product:', error);
      }
    } else {
      alert('Please fill out all fields.');
    }
  };

  // Reset form after save or cancel
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      sold: '',
      qty: '',
      price: ''
    });
    setEditingItem(null); // Reset editing state
    setFormVisible(false);
  };

  // Handle editing an item
  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      sold: item.itemsSold,
      qty: item.stockQuantity,
      price: item.price
    });
    setFormVisible(true);
  };

  // Handle deleting an item
  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/inventory/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${token}`
        }
      });

      if (response.ok) {
        fetchProducts(); // Refresh product list
      } else {
        const result = await response.json();
        alert(result.message || 'Error deleting product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Search and filter items
  const searchItems = () => {
    return items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  };

  const applyFilter = (filteredItems) => {
    let sortedItems = [...filteredItems];
    if (filterOption === 'sold') {
      sortedItems = sortedItems.sort((a, b) => b.itemsSold - a.itemsSold);
    } else if (filterOption === 'qty') {
      sortedItems = sortedItems.sort((a, b) => b.stockQuantity - a.stockQuantity);
    } else if (filterOption === 'price') {
      sortedItems = sortedItems.sort((a, b) => b.price - a.price);
    }
    return sortedItems;
  };

  const displayItems = applyFilter(searchItems());

  return (
    <div className={styles.container}>
      <h1 style={{ textAlign: 'center' }}>INVENTORY</h1>
      <header className={styles.header}>
        <input
          type="text"
          id="search"
          className={styles.searchBar}
          placeholder="Search by product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          id="filter"
          className={styles.filterDropdown}
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
        >
          <option value="none">Filter by</option>
          <option value="sold">Items Sold</option>
          <option value="qty">Quantity Available</option>
          <option value="price">Unit Price</option>
        </select>

        <button className={styles.createBtn} onClick={() => setFormVisible(true)}>
          + Create new
        </button>
      </header>

      <div className={styles.productCount}>
        Total Products: <span id="product-count">{items.length}</span>
      </div>

      {formVisible && (
        <div className={styles.addItemForm}>
          <input
            type="text"
            id="name"
            placeholder="Item Name"
            value={formData.name}
            onChange={handleInputChange}
            className={styles.formInput}
          />
          <input
            type="text"
            id="description"
            placeholder="Item Description"
            value={formData.description}
            onChange={handleInputChange}
            className={styles.formInput}
          />
          <input
            type="number"
            id="sold"
            placeholder="Items Sold"
            value={formData.sold}
            onChange={handleInputChange}
            className={styles.formInput}
          />
          <input
            type="number"
            id="qty"
            placeholder="Qty Available"
            value={formData.qty}
            onChange={handleInputChange}
            className={styles.formInput}
          />
          <input
            type="number"
            id="price"
            placeholder="Unit Price"
            value={formData.price}
            onChange={handleInputChange}
            className={styles.formInput}
          />
          <button onClick={saveProduct} className={styles.addItemBtn}>
            {editingItem ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      )}

      <table id="inventory-table" className={styles.inventoryTable}>
        <thead>
          <tr>
            <th>Item number</th>
            <th>Item name</th>
            <th>Item description</th>
            <th>Items sold</th>
            <th>Qty available</th>
            <th>Unit price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="table-body">
          {displayItems.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.itemsSold}</td>
              <td>{item.stockQuantity}</td>
              <td>{item.price}</td>
              <td>
                <FaEdit style={{ color: 'blue', cursor: 'pointer' }} onClick={() => handleEdit(item)} />
                <FaTrash style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }} onClick={() => handleDelete(item._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
