import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Star, ShoppingCart, ShieldCheck, Truck, RefreshCw, Calendar, Check, AlertCircle, Award } from 'lucide-react';

export default function ProductDetail({ products, updateProductReviews, addToCart, cart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Find product by id
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
        <h2>Product Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '12px 0 24px' }}>The product you are looking for does not exist or has been removed.</p>
        <button className="shop-now-btn" onClick={() => navigate('/')}>Back to Catalog</button>
      </div>
    );
  }

  // Active view states
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  // Review Form state
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Handle direct url size select prompt
  useEffect(() => {
    if (location.search.includes('selectSize=true')) {
      setSizeError(true);
    }
  }, [location.search]);

  // Sync state if product changes
  useEffect(() => {
    setSelectedImage(product.image);
    setSelectedSize(null);
    setSizeError(false);
    setDeliveryStatus(null);
  }, [product]);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setSizeError(false);
  };

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.trim().length >= 5) {
      setDeliveryStatus('Delivery available in 1-2 days. Free delivery & cash on delivery (COD) available.');
    } else {
      setDeliveryStatus('Invalid pincode. Please enter at least 5 digits.');
    }
  };

  const handleAddToCart = () => {
    // If product has sizes and none is selected
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart(product, selectedSize);
  };

  const handleBuyNow = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    addToCart(product, selectedSize);
    navigate('/checkout');
  };

  const isItemInCart = () => {
    return cart.some(item => 
      item.product.id === product.id && 
      (product.sizes.length === 0 || item.selectedSize === selectedSize)
    );
  };

  // Submit Review Handler
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      alert('Please fill out all fields before submitting.');
      return;
    }

    const newReview = {
      id: Date.now(),
      user: reviewName,
      rating: reviewRating,
      comment: reviewComment,
      date: new Date().toISOString().split('T')[0]
    };

    updateProductReviews(product.id, newReview);
    setReviewSuccess(true);
    setReviewName('');
    setReviewComment('');
    setReviewRating(5);

    setTimeout(() => {
      setReviewSuccess(false);
    }, 4000);
  };

  // Calculate review breakdown percentages for representation
  const totalReviewsCount = product.reviews.length;
  const ratingSum = product.reviews.reduce((acc, r) => acc + r.rating, 0);
  const avgRating = totalReviewsCount > 0 ? (ratingSum / totalReviewsCount).toFixed(1) : product.rating;

  const getRatingBarPercentage = (ratingVal) => {
    if (totalReviewsCount === 0) return 0;
    const matchingCount = product.reviews.filter(r => Math.floor(r.rating) === ratingVal).length;
    return (matchingCount / totalReviewsCount) * 100;
  };

  return (
    <div className="product-detail-container" id={`product-detail-${product.id}`}>
      
      {/* LEFT COLUMN: Gallery Panel and Action CTA */}
      <div className="detail-image-panel">
        <div className="main-image-viewport">
          <img src={selectedImage} alt={product.name} className="main-image" id="detail-main-image" />
        </div>

        {/* Thumbnail Selector list */}
        <div className="thumbnails-row" id="detail-thumbnails-row">
          {product.images.map((img, i) => (
            <button
              key={i}
              className={`thumbnail-btn ${selectedImage === img ? 'active' : ''}`}
              onClick={() => setSelectedImage(img)}
              id={`detail-thumb-${i}`}
            >
              <img src={img} alt={`view-${i}`} className="thumbnail-image" />
            </button>
          ))}
        </div>

        {/* Primary Action Buttons */}
        <div className="action-buttons-container">
          <button 
            className="detail-btn detail-btn-cart"
            onClick={handleAddToCart}
            id="detail-add-to-cart-btn"
          >
            <ShoppingCart size={20} />
            {isItemInCart() ? 'Add Another' : 'Add to Cart'}
          </button>
          <button 
            className="detail-btn detail-btn-buy"
            onClick={handleBuyNow}
            id="detail-buy-now-btn"
          >
            Buy Now
          </button>
        </div>

        {/* Product Policies list */}
        <div style={{ borderTop: '1px solid var(--border)', marginTop: '20px', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <ShieldCheck size={18} style={{ color: 'var(--success)' }} />
            <span>1 Year Domestic Warranty for manufacturing defects.</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <RefreshCw size={18} style={{ color: 'var(--success)' }} />
            <span>7 Days Replacement Policy available on delivery checks.</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Product Specifications & Details Panel */}
      <div className="detail-info-panel">
        {/* Breadcrumbs */}
        <div className="detail-breadcrumbs">
          Home &gt; {product.category === 'fashion' ? 'Fashion' : 'Smart Gadgets'} &gt; {product.subCategory} &gt; {product.name}
        </div>

        <h1 className="detail-title" id="detail-product-title">{product.name}</h1>

        {/* Ratings details */}
        <div className="detail-rating-row">
          <span className="rating-badge" id="detail-avg-rating-badge">
            {avgRating} <Star size={12} fill="white" style={{ verticalAlign: 'middle', marginTop: '-1px' }} />
          </span>
          <span className="rating-count" style={{ fontSize: '14px', fontWeight: '600' }} id="detail-ratings-count">
            {totalReviewsCount} Ratings & reviews
          </span>
        </div>

        {/* Price layout */}
        <div className="detail-price-box">
          <div className="detail-price-row">
            <span className="detail-discounted-price" id="detail-discounted-price">₹{product.price.toLocaleString()}</span>
            <span className="detail-original-price">₹{product.originalPrice.toLocaleString()}</span>
            <span className="detail-discount-percent">({product.discount})</span>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--success)', fontWeight: '600', marginTop: '6px' }}>
            Inclusive of all taxes
          </p>
        </div>

        {/* Bank & Promotional Offers (Flipkart Style) */}
        <div className="detail-offers-box" id="detail-offers-panel">
          <h4>Available Offers</h4>
          <ul className="offers-list">
            {product.offers.map((offer, index) => (
              <li key={index} className="offer-item">
                <Award size={16} className="offer-tag-icon" />
                <span><strong>Special Promo:</strong> {offer}</span>
              </li>
            ))}
            <li className="offer-item">
              <Award size={16} className="offer-tag-icon" />
              <span><strong>Helpline Support:</strong> Extra benefits & phone assistance available by dialling 97854673.</span>
            </li>
          </ul>
        </div>

        {/* SIZES SELECTOR PANEL (Conditional: Clothes/Shoes) */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="detail-size-box" id="size-selector-panel">
            <div className="size-header-row">
              <span className="size-label">Select Size</span>
              <button className="size-guide-btn" onClick={() => alert(`Size guide for ${product.name}: Standard fit measurements.`)}>
                Size Guide
              </button>
            </div>
            <div className="sizes-grid">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`size-pill ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => handleSizeClick(size)}
                  id={`size-pill-${size}`}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && (
              <div className="size-error-msg" id="size-selection-error">
                <AlertCircle size={16} />
                <span>Please select a size before adding this product to cart.</span>
              </div>
            )}
          </div>
        )}

        {/* Delivery check pincode Box */}
        <div className="detail-delivery-box">
          <h4>Delivery & Service Checks</h4>
          <form className="pincode-input-group" onSubmit={handlePincodeCheck}>
            <input
              type="text"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
              maxLength={6}
              id="detail-pincode-input"
            />
            <button type="submit" id="detail-pincode-btn">Check</button>
          </form>
          {deliveryStatus && (
            <p className="delivery-status-msg" id="detail-delivery-status" style={{ color: deliveryStatus.includes('Invalid') ? 'var(--error)' : 'var(--success)' }}>
              {deliveryStatus.includes('Invalid') ? <AlertCircle size={14} /> : <Truck size={14} />}
              {deliveryStatus}
            </p>
          )}
        </div>

        {/* Description Panel */}
        <div className="detail-desc-box">
          <h3>Product Description</h3>
          <p className="detail-desc-text">{product.description}</p>
        </div>

        {/* Specifications Table */}
        <div className="specs-table-container">
          <h3>Specifications</h3>
          <table className="specs-table">
            <tbody>
              {Object.entries(product.specifications).map(([key, val]) => (
                <tr key={key}>
                  <td className="specs-key">{key}</td>
                  <td className="specs-value">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* INTERACTIVE RATINGS & REVIEWS SECTION */}
        <div className="reviews-section" id="reviews-ratings-panel">
          <h3>Customer Reviews</h3>

          {/* Rating Breakdown card summary */}
          <div className="reviews-summary">
            <div className="rev-sum-big">
              <div className="rev-sum-num" id="reviews-avg-num">{avgRating}</div>
              <div className="rev-sum-stars">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    size={16}
                    fill={idx < Math.round(avgRating) ? "var(--accent-gold)" : "none"}
                    color="var(--accent-gold)"
                    style={{ marginRight: '2px' }}
                  />
                ))}
              </div>
              <div className="rev-sum-total">{totalReviewsCount} Ratings</div>
            </div>

            <div className="rev-bars-container">
              {[5, 4, 3, 2, 1].map((ratingVal) => (
                <div key={ratingVal} className="rev-bar-row">
                  <span className="rev-bar-num">{ratingVal}</span>
                  <Star size={11} fill="currentColor" style={{ color: '#aaa', marginRight: '4px' }} />
                  <div className="rev-bar-fill-bg">
                    <div 
                      className="rev-bar-fill" 
                      style={{ 
                        width: `${getRatingBarPercentage(ratingVal)}%`,
                        backgroundColor: ratingVal >= 4 ? 'var(--success)' : ratingVal === 3 ? 'var(--accent-gold)' : 'var(--error)'
                      }} 
                    />
                  </div>
                  <span style={{ width: '30px', textAlign: 'right', color: 'var(--text-secondary)' }}>
                    {Math.round(getRatingBarPercentage(ratingVal))}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active list of reviews */}
          <div className="reviews-list">
            {product.reviews.map((rev) => (
              <div key={rev.id} className="review-item">
                <div className="review-item-header">
                  <span className="rating-badge" style={{ padding: '1px 4px', fontSize: '10px' }}>
                    {rev.rating} <Star size={8} fill="white" />
                  </span>
                  <span className="review-item-user">{rev.user}</span>
                  <span style={{ color: 'var(--success)', display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '11px', fontWeight: 'bold' }}>
                    <Check size={12} /> Certified Buyer
                  </span>
                  <span className="review-item-date">
                    <Calendar size={12} style={{ verticalAlign: 'middle', marginRight: '4px', marginTop: '-2px' }} />
                    {rev.date}
                  </span>
                </div>
                <p className="review-item-comment">{rev.comment}</p>
              </div>
            ))}
          </div>

          {/* Write a New Review Interactive form card */}
          <div className="write-review-card">
            <h4>Write a Review for this product</h4>
            <form onSubmit={handleReviewSubmit}>
              <div className="review-form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Suriya Kumar"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  required
                  id="review-form-name"
                />
              </div>

              <div className="review-form-group">
                <label>Overall Rating</label>
                <div className="stars-rating-select-row" id="review-stars-select">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`star-select-btn ${star <= reviewRating ? 'active' : ''}`}
                      onClick={() => setReviewRating(star)}
                      aria-label={`Rate ${star} Stars`}
                      id={`star-select-btn-${star}`}
                    >
                      <Star size={24} fill={star <= reviewRating ? "var(--accent-gold)" : "none"} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="review-form-group">
                <label>Your Comment / Review Description</label>
                <textarea
                  rows="4"
                  placeholder="Write details of your experience with the product..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  required
                  id="review-form-comment"
                />
              </div>

              <button type="submit" className="review-submit-btn" id="review-submit-btn">Submit Review</button>

              {reviewSuccess && (
                <div className="review-success-alert" id="review-success-message">
                  Review submitted successfully! Thank you for rating Suriya products.
                </div>
              )}
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
