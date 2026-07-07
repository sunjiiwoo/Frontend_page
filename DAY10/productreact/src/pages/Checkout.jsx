import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Calendar, Sparkles } from 'lucide-react';

export default function Checkout({ cart, clearCart }) {
  const navigate = useNavigate();

  // Pricing calculations
  const totalItemsCount = cart.reduce((acc, item) => acc + item.qty, 0);
  
  const totalOriginalPrice = cart.reduce((acc, item) => 
    acc + (item.product.originalPrice * item.qty), 0
  );

  const totalDiscountedPrice = cart.reduce((acc, item) => 
    acc + (item.product.price * item.qty), 0
  );

  const shippingCharges = totalDiscountedPrice > 1499 || totalDiscountedPrice === 0 ? 0 : 99;
  const finalPrice = totalDiscountedPrice + shippingCharges;

  // Clear cart upon loading the checkout confirmation page
  useEffect(() => {
    if (cart.length > 0) {
      // We clear the cart in a small delay or directly
      const timer = setTimeout(() => {
        clearCart();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const orderNumber = `SRY-ORD-${Math.floor(Math.random() * 90000000) + 10000000}`;
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 2);
  const formattedDelivery = estimatedDelivery.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="checkout-box" id="checkout-confirmation-panel">
      <CheckCircle size={64} style={{ color: 'var(--success)', margin: '0 auto 16px' }} />
      <h2>Order Placed Successfully!</h2>
      <p>Thank you for shopping at <strong>Suriya</strong>. Your payment was processed securely, and your order has been registered.</p>

      {/* Order details card */}
      <div className="order-details-card" id="checkout-order-card">
        <h4 style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '12px', fontWeight: 'bold' }}>
          Receipt & Details
        </h4>
        <div className="order-detail-row">
          <span style={{ color: 'var(--text-secondary)' }}>Order ID:</span>
          <span style={{ fontWeight: '600' }} id="order-confirm-id">{orderNumber}</span>
        </div>
        <div className="order-detail-row">
          <span style={{ color: 'var(--text-secondary)' }}>Items Ordered:</span>
          <span>{totalItemsCount} items</span>
        </div>
        <div className="order-detail-row">
          <span style={{ color: 'var(--text-secondary)' }}>Estimated Delivery:</span>
          <span style={{ fontWeight: '600', color: 'var(--success)' }}>{formattedDelivery}</span>
        </div>
        <div className="order-detail-row bold">
          <span>Amount Paid:</span>
          <span id="order-confirm-amount">₹{finalPrice.toLocaleString()}</span>
        </div>
      </div>

      <div style={{ backgroundColor: '#fdf2f8', border: '1px solid #fbcfe8', padding: '16px', borderRadius: '8px', marginBottom: '24px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Sparkles size={24} style={{ color: '#db2777', flexShrink: 0 }} />
        <p style={{ textAlign: 'left', fontSize: '13px', color: '#be185d', margin: 0 }}>
          An SMS confirmation has been sent to your registered mobile. For any support or helpline assistance regarding this order, call <strong>97854673</strong> referencing your Order ID.
        </p>
      </div>

      <Link to="/" className="shop-now-btn" id="order-confirm-home-btn">Continue Shopping</Link>
    </div>
  );
}
