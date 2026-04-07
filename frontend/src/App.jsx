import { useEffect, useMemo, useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import AdminPanel from './components/AdminPanel';
import './App.css';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));
  const [token, setToken] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('products');

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const filterParams = useMemo(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category) params.set('category', category);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    return params.toString();
  }, [search, category, minPrice, maxPrice]);

  const loadProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const url = `${API_BASE}/api/products${filterParams ? `?${filterParams}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to load products');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Unable to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [filterParams]);

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product._id);
      if (existing) {
        return current.map((item) =>
          item.id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { id: product._id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart((current) =>
      current
        .map((item) => (item.id === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((current) => current.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      setToken(data.token);
      setIsAdmin(data.isAdmin);
      setUser({ name: data.name, email: data.email });
      setCurrentView('admin');
    } catch (err) {
      setError(err.message || 'Unable to login');
    }
  };

  const handleLogout = () => {
    setToken('');
    setIsAdmin(false);
    setUser(null);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>E-Commerce Project 2</h1>
          <p>Product listing, search, cart, and admin management.</p>
        </div>
        <nav>
          <button onClick={() => setCurrentView('products')} className={currentView === 'products' ? 'active' : ''}>
            Products
          </button>
          <button onClick={() => setCurrentView('cart')} className={currentView === 'cart' ? 'active' : ''}>
            Cart ({cart.length})
          </button>
          <button onClick={() => setCurrentView('admin')} className={currentView === 'admin' ? 'active' : ''}>
            Admin
          </button>
        </nav>
      </header>

      <main className="app-main">
        {error && <div className="app-error">{error}</div>}

        {currentView === 'products' && (
          <ProductList
            products={products}
            loading={loading}
            search={search}
            category={category}
            minPrice={minPrice}
            maxPrice={maxPrice}
            setSearch={setSearch}
            setCategory={setCategory}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            onAddToCart={addToCart}
            onRefresh={loadProducts}
          />
        )}

        {currentView === 'cart' && (
          <Cart
            items={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onClearCart={clearCart}
          />
        )}

        {currentView === 'admin' && (
          <AdminPanel
            apiBase={API_BASE}
            token={token}
            isAdmin={isAdmin}
            user={user}
            products={products}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onProductsUpdated={loadProducts}
          />
        )}
      </main>
    </div>
  );
}

export default App;
