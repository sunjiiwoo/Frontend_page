import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Cart({ cart, updateCartQty, removeFromCart, clearCart }) {
  const navigate = useNavigate();

  const handleQtyChange = (product, selectedSize, delta) => {
    const item = cart.find(i => i.product.id === product.id && i.selectedSize === selectedSize);
    if (item) {
      const newQty = item.qty + delta;
      if (newQty <= 0) {
        removeFromCart(product.id, selectedSize);
      } else {
        updateCartQty(product.id, selectedSize, newQty);
      }
    }
  };

  // Pricing calculations
  const totalItemsCount = cart.reduce((acc, item) => acc + item.qty, 0);
  
  const totalOriginalPrice = cart.reduce((acc, item) => 
    acc + (item.product.originalPrice * item.qty), 0
  );

  const totalDiscountedPrice = cart.reduce((acc, item) => 
    acc + (item.product.price * item.qty), 0
  );

  const discountAmount = totalOriginalPrice - totalDiscountedPrice;
  const shippingCharges = totalDiscountedPrice > 1499 || totalDiscountedPrice === 0 ? 0 : 99;
  const finalPrice = totalDiscountedPrice + shippingCharges;

  if (cart.length === 0) {
    return (
      <div className="empty-cart-view" id="empty-cart-panel">
        <ShoppingBag size={64} style={{ color: 'var(--text-muted)', margin: '0 auto' }} />
        <h2>Your Cart is Empty!</h2>
        <p>Explore our catalog for the latest smart gadgets and trendy fashion items.</p>
        <Link to="/" className="shop-now-btn" id="empty-cart-shop-btn">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="cart-layout" id="cart-page-container">
      {/* LEFT COLUMN: Items List */}
      <div className="cart-items-container">
        <div className="cart-header-title">
          <h3>Shopping Cart ({totalItemsCount} items)</h3>
          <button 
            onClick={clearCart}
            style={{ border: 'none', background: 'none', color: 'var(--error)', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
            id="clear-all-cart-btn"
          >
            Clear All
          </button>
        </div>

        <div className="cart-list" id="cart-items-list">
          {cart.map((item, idx) => (
            <div key={`${item.product.id}-${item.selectedSize || 'none'}-${idx}`} className="cart-item" id={`cart-item-${item.product.id}`}>
              {/* Image */}
              <div className="cart-item-image-wrap">
                <img src={item.product.image} alt={item.product.name} className="cart-item-image" />
              </div>

              {/* Detail Text */}
              <div className="cart-item-details">
                <h4 className="cart-item-title">
                  <Link to={`/product/${item.product.id}`}>{item.product.name}</Link>
                </h4>
                
                {item.selectedSize && (
                  <div className="cart-item-meta" id={`cart-item-size-${item.product.id}`}>
                    Size Selected: <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{item.selectedSize}</span>
                  </div>
                )}

                <div className="cart-item-meta">
                  Category: {item.product.subCategory}
                </div>

                {/* Price Row */}
                <div className="cart-item-price-row">
                  <span className="discounted-price" style={{ fontSize: '16px' }}>
                    ₹{(item.product.price * item.qty).toLocaleString()}
                  </span>
                  <span className="original-price" style={{ fontSize: '12px' }}>
                    ₹{(item.product.originalPrice * item.qty).toLocaleString()}
                  </span>
                  <span className="discount-percentage" style={{ fontSize: '11px' }}>
                    ({item.product.discount})
                  </span>
                </div>

                {/* Action Controls */}
                <div className="cart-item-actions-row">
                  <div className="quantity-controller">
                    <button 
                      className="qty-btn"
                      onClick={() => handleQtyChange(item.product, item.selectedSize, -1)}
                      id={`qty-minus-${item.product.id}`}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="qty-value" id={`qty-value-${item.product.id}`}>{item.qty}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => handleQtyChange(item.product, item.selectedSize, 1)}
                      id={`qty-plus-${item.product.id}`}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button 
                    className="remove-item-btn"
                    onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                    id={`remove-btn-${item.product.id}`}
                  >
                    <Trash2 size={16} />
                    <span>Remove</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* RIGHT COLUMN: Bill Summary Panel (Flipkart Style) */}
      <div className="cart-summary-sidebar" id="cart-summary-sidebar">
        <h4 className="price-details-title">Price Details</h4>
        
        <table className="price-summary-table">
          <tbody>
            <tr>
              <td>Price ({totalItemsCount} items)</td>
              <td id="summary-original-price">₹{totalOriginalPrice.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Discount</td>
              <td style={{ color: 'var(--success)' }} id="summary-discount-price">
                - ₹{discountAmount.toLocaleString()}
              </td>
            </tr>
            <tr>
              <td>Delivery Charges</td>
              <td style={{ color: shippingCharges === 0 ? 'var(--success)' : 'inherit' }} id="summary-delivery-charge">
                {shippingCharges === 0 ? 'FREE Delivery' : `₹${shippingCharges}`}
              </td>
            </tr>
            <tr className="total-amount-row">
              <td>Total Amount</td>
              <td id="summary-total-amount">₹{finalPrice.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>

        {/* Place Order checkout navigate CTA */}
        <button 
          className="checkout-btn"
          onClick={() => navigate('/checkout')}
          id="proceed-checkout-btn"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight size={18} />
        </button>

        {/* Total Savings tag */}
        {discountAmount > 0 && (
          <p className="savings-tagline" id="summary-savings-banner">
            You will save ₹{discountAmount.toLocaleString()} on this order! 🎉
          </p>
        )}

        {/* Secure transactions banner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '11px', marginTop: '20px', justifyContent: 'center', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
          <ShieldCheck size={16} style={{ color: 'var(--success)', flexShrink: 0 }} />
          <span>Safe and Secure Payments. 100% Authentic products.</span>
        </div>
      </div>

    </div>
  );
}
