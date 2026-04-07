import { useState } from 'react';

function AdminPanel({ apiBase, token, isAdmin, user, products, onLogin, onLogout, onProductsUpdated }) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdminRegister, setIsAdminRegister] = useState(false);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [stock, setStock] = useState('');
  const [editingProductId, setEditingProductId] = useState(null);
  const [message, setMessage] = useState('');

  const registerUser = async (event) => {
    event.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`${apiBase}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          isAdmin: isAdminRegister
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to register');
      setMessage('Registration successful! You can now login.');
      setMode('login');
      setName('');
      setEmail('');
      setPassword('');
      setIsAdminRegister(false);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const clearProductForm = () => {
    setProductName('');
    setDescription('');
    setPrice('');
    setCategory('');
    setImage('');
    setStock('');
    setEditingProductId(null);
  };

  const editProduct = (product) => {
    setEditingProductId(product._id);
    setProductName(product.name || '');
    setDescription(product.description || '');
    setPrice(product.price || '');
    setCategory(product.category || '');
    setImage(product.image || '');
    setStock(product.stock || '');
    setMessage('Editing product. Update the values and submit.');
  };

  const saveProduct = async (event) => {
    event.preventDefault();
    setMessage('');

    const method = editingProductId ? 'PUT' : 'POST';
    const url = editingProductId ? `${apiBase}/api/products/${editingProductId}` : `${apiBase}/api/products`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: productName,
          description,
          price: Number(price),
          category,
          image,
          stock: Number(stock)
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to save product');
      setMessage(editingProductId ? 'Product updated successfully.' : 'Product added successfully.');
      clearProductForm();
      onProductsUpdated();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await fetch(`${apiBase}/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Unable to delete');
      setMessage('Product deleted.');
      onProductsUpdated();
    } catch (err) {
      setMessage(err.message);
    }
  };

  if (!isAdmin) {
    return (
      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>{mode === 'login' ? 'Admin Login' : 'Register Account'}</h2>
            <p>{mode === 'login' ? 'Log in with an admin account to manage products.' : 'Create a new account for the app.'}</p>
          </div>
          <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
            {mode === 'login' ? 'Register' : 'Login'}
          </button>
        </div>

        {mode === 'login' ? (
          <form className="form-grid" onSubmit={(event) => {
            event.preventDefault();
            onLogin(email, password);
          }}>
            <label>
              Email
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </label>
            <label>
              Password
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
            </label>
            <button type="submit">Login</button>
          </form>
        ) : (
          <form className="form-grid" onSubmit={registerUser}>
            <label>
              Name
              <input value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            <label>
              Email
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
            </label>
            <label>
              Password
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
            </label>
            <label>
              <input type="checkbox" checked={isAdminRegister} onChange={(e) => setIsAdminRegister(e.target.checked)} />
              Create admin user
            </label>
            <button type="submit">Register</button>
          </form>
        )}

        {message && <div className="app-error">{message}</div>}
      </section>
    );
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Admin Panel</h2>
          <p>Welcome back, {user?.name || 'admin'}. Manage products here.</p>
        </div>
        <button onClick={onLogout}>Logout</button>
      </div>

      <form className="form-grid" onSubmit={saveProduct}>
        <h3>{editingProductId ? 'Edit product' : 'Add new product'}</h3>
        <label>
          Product name
          <input value={productName} onChange={(e) => setProductName(e.target.value)} required />
        </label>
        <label>
          Description
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" />
        </label>
        <label>
          Price
          <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" min="0" required />
        </label>
        <label>
          Category
          <input value={category} onChange={(e) => setCategory(e.target.value)} required />
        </label>
        <label>
          Image URL
          <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Optional" />
        </label>
        <label>
          Stock
          <input value={stock} onChange={(e) => setStock(e.target.value)} type="number" min="0" required />
        </label>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button type="submit">{editingProductId ? 'Update product' : 'Add product'}</button>
          {editingProductId && (
            <button type="button" onClick={clearProductForm} style={{ background: '#ef4444' }}>
              Cancel edit
            </button>
          )}
        </div>
      </form>

      {message && <div className="app-error">{message}</div>}

      <div className="panel">
        <h3>Product inventory</h3>
        {products.length === 0 ? (
          <p>No products available yet.</p>
        ) : (
          <div className="grid">
            {products.map((product) => (
              <div key={product._id} className="card">
                <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} />
                <div className="card-body">
                  <h4>{product.name}</h4>
                  <p>{product.category} • ₹{product.price}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button onClick={() => editProduct(product)}>Edit</button>
                    <button onClick={() => removeProduct(product._id)} style={{ background: '#ef4444' }}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminPanel;
