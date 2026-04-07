import './ProductList.css';

function ProductList({ products, loading, search, category, minPrice, maxPrice, setSearch, setCategory, setMinPrice, setMaxPrice, onAddToCart, onRefresh }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Products</h2>
          <p>Search or filter products before adding to the cart.</p>
        </div>
        <button onClick={onRefresh}>Refresh</button>
      </div>

      <div className="filters">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search product" />
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
        <input type="number" min="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} placeholder="Min price" />
        <input type="number" min="0" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} placeholder="Max price" />
      </div>

      {loading && <p>Loading products...</p>}
      {!loading && products.length === 0 && <p>No products available. Add some via Admin.</p>}

      <div className="grid">
        {products.map((product) => (
          <div key={product._id} className="card">
            <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} />
            <div className="card-body">
              <h3>{product.name}</h3>
              <p>{product.description || 'No description provided.'}</p>
              <div className="card-meta">
                <span>{product.category}</span>
                <strong>₹{product.price}</strong>
              </div>
              <button onClick={() => onAddToCart(product)}>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductList;
