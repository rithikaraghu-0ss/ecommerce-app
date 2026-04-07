function Cart({ items, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <section className="panel">
        <h2>Shopping Cart</h2>
        <p>Your cart is empty. Add products from the listing.</p>
      </section>
    );
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Shopping Cart</h2>
          <p>Review your cart items and update quantities.</p>
        </div>
        <button onClick={onClearCart}>Clear cart</button>
      </div>

      <div className="cart-list">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <div>
              <h3>{item.name}</h3>
              <p>Price: ₹{item.price}</p>
              <div className="quantity-row">
                <label>
                  Qty
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.id, Number(e.target.value))}
                  />
                </label>
              </div>
            </div>
            <div className="cart-item-actions">
              <strong>₹{item.price * item.quantity}</strong>
              <button onClick={() => onRemoveItem(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      <div className="checkout-box">
        <div>
          <p>Total</p>
          <strong>₹{total}</strong>
        </div>
        <button onClick={() => alert('Checkout ready! Add payment flow later.')}>Checkout</button>
      </div>
    </section>
  );
}

export default Cart;
