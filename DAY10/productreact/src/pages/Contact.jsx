import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, CheckCircle2, Clock } from 'lucide-react';

export default function Contact() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('order-status');
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormName('');
      setFormEmail('');
      setFormMessage('');
      setFormSubject('order-status');
    }, 1500);
  };

  return (
    <div className="contact-container" id="contact-page-wrapper">
      
      {/* LEFT COLUMN: Helpline Channel Details */}
      <div className="contact-info-panel" id="helpline-contact-info">
        <h2>Suriya Helpline</h2>
        <p className="contact-intro-text">
          Have an issue with your order, payment, or delivery? Our dedicated customer care support is online 24/7 to assist you. Get in touch via any of our channels below.
        </p>

        <div className="contact-channels">
          {/* Phone channel */}
          <div className="contact-channel-item">
            <div className="contact-channel-icon">
              <Phone size={22} />
            </div>
            <div className="channel-details">
              <h4>Customer Support Hotlines</h4>
              <p style={{ margin: '4px 0 2px' }}>
                <a href="tel:97854673" id="contact-phone-anchor" style={{ fontSize: '18px', fontWeight: '800' }}>97854673</a>
              </p>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Toll-free, 24/7 Support</span>
            </div>
          </div>

          {/* Email channel */}
          <div className="contact-channel-item">
            <div className="contact-channel-icon">
              <Mail size={22} />
            </div>
            <div className="channel-details">
              <h4>Email Assistance</h4>
              <p style={{ margin: '4px 0 2px' }}>
                <a href="mailto:suriya@gmail.com" id="contact-email-anchor" style={{ fontSize: '16px', fontWeight: '700' }}>suriya@gmail.com</a>
              </p>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Expected response: Under 4 hours</span>
            </div>
          </div>

          {/* SLA Timing details */}
          <div className="contact-channel-item">
            <div className="contact-channel-icon">
              <Clock size={22} />
            </div>
            <div className="channel-details">
              <h4>Support Timings</h4>
              <p style={{ margin: '4px 0 2px', fontSize: '14px', fontWeight: '600' }}>Mon - Sun: 12:00 AM - 11:59 PM</p>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Round the clock coverage (including national holidays)</span>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#f1f5f9', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--primary)', marginTop: '30px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <MessageSquare size={16} style={{ color: 'var(--primary)' }} /> Live Chat (Coming Soon)
          </h4>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            We are working to implement real-time chat support to assist you with active order tracking and instant refunds directly.
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Query Contact Form */}
      <div className="contact-form-panel">
        <h3>Submit a Support Ticket</h3>
        <form onSubmit={handleSubmit} id="support-ticket-form">
          <div className="form-group">
            <label htmlFor="ticket-name">Full Name</label>
            <input
              type="text"
              id="ticket-name"
              placeholder="e.g. Suriya Kumar"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ticket-email">Email Address</label>
            <input
              type="email"
              id="ticket-email"
              placeholder="e.g. support@suriya.in"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="ticket-subject">Subject of Inquiry</label>
            <select
              id="ticket-subject"
              value={formSubject}
              onChange={(e) => setFormSubject(e.target.value)}
              className="form-select"
            >
              <option value="order-status">Order Delivery & Status Check</option>
              <option value="product-inquiry">Product Specifications & Queries</option>
              <option value="payment-issue">Transaction & Payment Failure</option>
              <option value="returns">Refund & Returns Assistance</option>
              <option value="other">General Feedback / Other Matters</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="ticket-message">Description of Query</label>
            <textarea
              id="ticket-message"
              rows="5"
              placeholder="Please provide details (Order ID, product details, sizes etc.) to help our helpline agents resolve your issues quickly..."
              value={formMessage}
              onChange={(e) => setFormMessage(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="form-submit-btn" 
            disabled={isSubmitting}
            id="ticket-submit-btn"
          >
            {isSubmitting ? (
              <span>Submitting Ticket...</span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Send size={16} /> Send Message
              </span>
            )}
          </button>

          {submitSuccess && (
            <div className="form-success-banner" id="ticket-success-banner">
              <CheckCircle2 size={24} style={{ color: 'var(--success)', margin: '0 auto 8px' }} />
              <h4>Ticket Raised Successfully!</h4>
              <p style={{ fontSize: '12px', marginTop: '4px' }}>
                Your reference ID is <strong>#SRY-{Math.floor(Math.random() * 900000) + 100000}</strong>. An email confirmation has been sent to you. Support agents will respond shortly.
              </p>
            </div>
          )}
        </form>
      </div>

    </div>
  );
}
