import React from 'react';
import { Mail, PhoneCall, ShieldAlert, Award, Truck, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      {/* Feature guarantee banners */}
      <div className="footer-content" style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Truck size={24} style={{ color: 'var(--secondary)' }} />
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 'bold' }}>Free Shipping</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>On orders above ₹1,499</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <RotateCcw size={24} style={{ color: 'var(--secondary)' }} />
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 'bold' }}>Easy Returns</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>30 days hassle-free policy</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Award size={24} style={{ color: 'var(--secondary)' }} />
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 'bold' }}>100% Authentic</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Direct brand warranties</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldAlert size={24} style={{ color: 'var(--secondary)' }} />
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 'bold' }}>Secure Payment</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>SSL encrypted checkouts</p>
          </div>
        </div>
      </div>

      <div className="footer-content">
        <div className="footer-col">
          <h3>ABOUT</h3>
          <ul className="footer-links">
            <li><Link to="/">Contact Us</Link></li>
            <li><Link to="/">About Us</Link></li>
            <li><Link to="/">Careers</Link></li>
            <li><Link to="/">Suriya Stories</Link></li>
            <li><Link to="/">Press Info</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>HELP</h3>
          <ul className="footer-links">
            <li><Link to="/">Payments</Link></li>
            <li><Link to="/">Shipping</Link></li>
            <li><Link to="/contact">Cancellation &amp; Returns</Link></li>
            <li><Link to="/contact">FAQ / Help Center</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>CONSUMER POLICY</h3>
          <ul className="footer-links">
            <li><Link to="/">Cancellation &amp; Returns</Link></li>
            <li><Link to="/">Terms Of Use</Link></li>
            <li><Link to="/">Security &amp; Privacy</Link></li>
            <li><Link to="/">Sitemap</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>CUSTOMER HELPLINE</h3>
          <div className="footer-helpline" id="footer-helpline-box">
            <p>For order queries, assistance, and support, contact us:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PhoneCall size={16} style={{ color: 'var(--secondary)' }} />
                <span>Phone: <a href="tel:97854673" id="footer-phone-link">97854673</a></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={16} style={{ color: 'var(--secondary)' }} />
                <span>Email: <a href="mailto:suriya@gmail.com" id="footer-email-link">suriya@gmail.com</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-brand" id="footer-brand">
          Suriya<span>.in</span>
        </div>
        <p>&copy; {new Date().getFullYear()} Suriya Retail Private Limited. All rights reserved.</p>
      </div>
    </footer>
  );
}
