import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, SlidersHorizontal, ArrowUpDown, FilterX, Sparkles } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    badge: "Big Tech Festival",
    title: "Suriya ProMax Ultra 5G",
    desc: "Up to 17% Off + Extra No-Cost EMI. Professional-grade 108MP camera, 120Hz display.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80",
    linkTo: "/product/g1"
  },
  {
    id: 2,
    badge: "Cozy Winter Fashion",
    title: "Flat 50% Off Hoodies",
    desc: "Heavyweight premium organic French terry cotton. Explore the new winter arrivals.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80",
    linkTo: "/product/f3"
  },
  {
    id: 3,
    badge: "Performance & Style",
    title: "AeroPace Running Shoes",
    desc: "Experience ultimate cushioning & flight-knit mesh. Save 41% today.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80",
    linkTo: "/product/f1"
  },
  {
    id: 4,
    badge: "Smart Home Sale",
    title: "HomePure Robot Vacuum",
    desc: "LiDAR smart mapping, 2700Pa suction. Up to 48% off on home essentials.",
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&auto=format&fit=crop&q=80",
    linkTo: "/product/h2"
  },
  {
    id: 5,
    badge: "Sports & Fitness",
    title: "Iron Hex Dumbbell Set",
    desc: "Complete 5-25kg set with rubber hex coating. Build your home gym — save 41%.",
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop&q=80",
    linkTo: "/product/s3"
  },
  {
    id: 6,
    badge: "Food & Nutrition",
    title: "Premium Dark Chocolate Box",
    desc: "16 handcrafted 70-90% cacao chocolates. Rated 4.8 ★ — Save 38% today!",
    image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&auto=format&fit=crop&q=80",
    linkTo: "/product/fd2"
  },
  {
    id: 7,
    badge: "Back to School",
    title: "EduPad Student Tablet",
    desc: "10.4\" FHD display + stylus pen included FREE. Perfect for classes — 40% off!",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80",
    linkTo: "/product/st1"
  }
];

export default function Home({ products, cart, addToCart, searchQuery }) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Filtering states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');

  // Slide rotation logic
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  // Filter & Sort Logic
  const filteredProducts = products.filter(product => {
    // 1. Search Query filter (matches name, description, category, subcategory)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matches = 
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.subCategory.toLowerCase().includes(q);
      if (!matches) return false;
    }

    // 2. Category tab filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // 3. Subcategory sidebar filter
    if (selectedSubCategory !== 'all' && product.subCategory !== selectedSubCategory) {
      return false;
    }

    // 4. Price range filter
    if (priceRange.min !== '' && product.price < parseFloat(priceRange.min)) {
      return false;
    }
    if (priceRange.max !== '' && product.price > parseFloat(priceRange.max)) {
      return false;
    }

    // 5. Rating filter
    if (selectedRating !== 'all') {
      const minRating = parseFloat(selectedRating);
      if (product.rating < minRating) return false;
    }

    return true;
  });

  // Sort logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    }
    if (sortBy === 'price-high') {
      return b.price - a.price;
    }
    if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0; // relevance (default array order)
  });

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedSubCategory('all');
    setPriceRange({ min: '', max: '' });
    setSelectedRating('all');
    setSortBy('relevance');
  };

  const isItemInCart = (id) => {
    return cart.some(item => item.product.id === id);
  };

  const CATEGORY_META = {
    all:           { label: 'All Products' },
    'smart-gadgets':{ label: 'Smart Gadgets' },
    fashion:       { label: 'Fashion Hub' },
    home:          { label: 'Home Requirements' },
    sports:        { label: 'Sports & Fitness' },
    food:          { label: 'Food & Nutrition' },
    study:         { label: 'Study Materials' },
  };

  const getSubcategories = () => {
    const map = {
      'smart-gadgets': [
        { value: 'phones', label: 'Phones' },
        { value: 'laptops', label: 'Laptops' },
        { value: 'accessories', label: 'Accessories' },
      ],
      fashion: [
        { value: 'clothes', label: 'Clothing' },
        { value: 'shoes', label: 'Shoes' },
      ],
      home: [
        { value: 'appliances', label: 'Appliances' },
        { value: 'cleaning', label: 'Cleaning' },
        { value: 'lighting', label: 'Lighting' },
      ],
      sports: [
        { value: 'fitness', label: 'Fitness' },
        { value: 'cricket', label: 'Cricket' },
      ],
      food: [
        { value: 'superfoods', label: 'Superfoods' },
        { value: 'snacks', label: 'Snacks' },
        { value: 'beverages', label: 'Beverages' },
      ],
      study: [
        { value: 'gadgets', label: 'Gadgets' },
        { value: 'stationery', label: 'Stationery' },
        { value: 'furniture', label: 'Furniture' },
      ],
    };
    if (selectedCategory !== 'all') return map[selectedCategory] || [];
    // All categories — show every sub
    return Object.values(map).flat();
  };

  return (
    <div className="home-page-container">
      {/* 1. Hero Promotional Slider */}
      {!searchQuery && (
        <div className="hero-container" id="promo-hero-slider">
          <div className="hero-slide">
            <div className="hero-text">
              <span className="hero-badge">{HERO_SLIDES[currentSlide].badge}</span>
              <h2 className="hero-title">{HERO_SLIDES[currentSlide].title}</h2>
              <p className="hero-desc">{HERO_SLIDES[currentSlide].desc}</p>
              <button 
                className="hero-btn" 
                onClick={() => navigate(HERO_SLIDES[currentSlide].linkTo)}
                id={`hero-slide-btn-${currentSlide}`}
              >
                Shop Now
              </button>
            </div>
            <div className="hero-image-wrap">
              <img 
                src={HERO_SLIDES[currentSlide].image} 
                alt={HERO_SLIDES[currentSlide].title} 
                className="hero-image"
              />
            </div>
          </div>
          <div className="hero-dot-indicators">
            {HERO_SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* 2. Top Category Quick Filters */}
      <div className="category-tabs" id="catalog-category-tabs" style={{ flexWrap: 'wrap' }}>
        {[
          { key: 'all',           emoji: '🛍️', label: 'All Products' },
          { key: 'smart-gadgets', emoji: '📱', label: 'Smart Gadgets' },
          { key: 'fashion',       emoji: '👗', label: 'Fashion' },
          { key: 'home',          emoji: '🏠', label: 'Home' },
          { key: 'sports',        emoji: '🏏', label: 'Sports' },
          { key: 'food',          emoji: '🍫', label: 'Food' },
          { key: 'study',         emoji: '📚', label: 'Study' },
        ].map(cat => (
          <button
            key={cat.key}
            className={`category-tab ${selectedCategory === cat.key ? 'active' : ''}`}
            onClick={() => { setSelectedCategory(cat.key); setSelectedSubCategory('all'); }}
            id={`category-tab-${cat.key}`}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      {/* 3. Main Catalog Section (Sidebar + Grid) */}
      <div className="catalog-layout">
        {/* Sidebar Filters */}
        <aside className="catalog-sidebar" id="catalog-filters-sidebar">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SlidersHorizontal size={18} /> Filters
            </h3>
            {(selectedSubCategory !== 'all' || priceRange.min !== '' || priceRange.max !== '' || selectedRating !== 'all' || sortBy !== 'relevance') && (
              <button 
                onClick={clearFilters}
                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '2px' }}
                id="clear-filters-sidebar-btn"
              >
                <FilterX size={12} /> Clear All
              </button>
            )}
          </div>

          {/* Subcategory selection */}
          <div className="filter-section">
            <h4>Sub-Category</h4>
            <div className="filter-group">
              <label className="filter-checkbox-label">
                <input
                  type="radio"
                  name="subcategory"
                  checked={selectedSubCategory === 'all'}
                  onChange={() => setSelectedSubCategory('all')}
                  id="subcat-all"
                />
                All Subcategories
              </label>
              {getSubcategories().map((sub) => (
                <label key={sub.value} className="filter-checkbox-label">
                  <input
                    type="radio"
                    name="subcategory"
                    checked={selectedSubCategory === sub.value}
                    onChange={() => setSelectedSubCategory(sub.value)}
                    id={`subcat-${sub.value}`}
                  />
                  {sub.label}
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="filter-section">
            <h4>Price Range (₹)</h4>
            <div className="price-range-inputs">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                id="filter-price-min"
              />
              <span style={{ color: 'var(--text-secondary)' }}>to</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                id="filter-price-max"
              />
            </div>
          </div>

          {/* Rating filter */}
          <div className="filter-section">
            <h4>Customer Ratings</h4>
            <div className="filter-group">
              <label className="filter-checkbox-label">
                <input
                  type="radio"
                  name="rating-filter"
                  checked={selectedRating === 'all'}
                  onChange={() => setSelectedRating('all')}
                  id="rating-all"
                />
                Any Rating
              </label>
              <label className="filter-checkbox-label">
                <input
                  type="radio"
                  name="rating-filter"
                  checked={selectedRating === '4.5'}
                  onChange={() => setSelectedRating('4.5')}
                  id="rating-4-5"
                />
                4.5 ★ & above
              </label>
              <label className="filter-checkbox-label">
                <input
                  type="radio"
                  name="rating-filter"
                  checked={selectedRating === '4.0'}
                  onChange={() => setSelectedRating('4.0')}
                  id="rating-4-0"
                />
                4.0 ★ & above
              </label>
              <label className="filter-checkbox-label">
                <input
                  type="radio"
                  name="rating-filter"
                  checked={selectedRating === '3.5'}
                  onChange={() => setSelectedRating('3.5')}
                  id="rating-3-5"
                />
                3.5 ★ & above
              </label>
            </div>
          </div>

          {/* Offer Badge Panel */}
          <div style={{ backgroundColor: '#fff9e6', border: '1px solid #ffe8cc', borderRadius: '8px', padding: '12px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
            <Sparkles size={18} style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h5 style={{ fontWeight: 'bold', fontSize: '13px', color: '#663c00' }}>Suriya Offers!</h5>
              <p style={{ fontSize: '11px', color: '#805b22', marginTop: '2px', lineHeight: '1.4' }}>Use card offers for up to 10% instant checkout discount!</p>
            </div>
          </div>
        </aside>

        {/* Catalog Main Main Grid */}
        <main className="catalog-main">
          {/* Main Top Header sort bar */}
          <div className="catalog-header-bar">
            <div>
              <h2>
              {CATEGORY_META[selectedCategory]?.label || 'All Products'}
            </h2>
              <span className="products-count" id="catalog-products-count">
                Showing {sortedProducts.length} of {products.length} items
              </span>
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowUpDown size={16} style={{ color: 'var(--text-secondary)' }} />
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                id="catalog-sort-select"
              >
                <option value="relevance">Sort by: Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className="products-grid" id="catalog-products-grid">
              {sortedProducts.map((product) => {
                const inCart = isItemInCart(product.id);
                return (
                  <div 
                    key={product.id} 
                    className="product-card"
                    onClick={() => navigate(`/product/${product.id}`)}
                    id={`product-card-${product.id}`}
                  >
                    {/* Offer Tag */}
                    <span className="product-card-badge">
                      {product.discount}
                    </span>

                    {/* Image */}
                    <div className="product-image-container">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="product-card-image"
                        loading="lazy"
                      />
                    </div>

                    {/* Details content */}
                    <div className="product-details-container">
                      <h3 className="product-card-title">{product.name}</h3>
                      
                      {/* Ratings */}
                      <div style={{ display: 'flex', alignItems: 'center', margin: '4px 0 8px' }}>
                        <span className="rating-badge">
                          {product.rating} <Star size={11} fill="white" style={{ verticalAlign: 'middle', marginTop: '-1px' }} />
                        </span>
                        <span className="rating-count">({product.ratingCount})</span>
                      </div>

                      {/* Prices */}
                      <div className="product-price-row">
                        <span className="discounted-price">₹{product.price.toLocaleString()}</span>
                        <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
                        <span className="discount-percentage">({product.discount})</span>
                      </div>

                      {/* Quick CTA */}
                      <button
                        className={`product-card-action-btn ${inCart ? 'in-cart' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation(); // Avoid triggering details card navigation click
                          if (inCart) {
                            navigate('/cart');
                          } else {
                            // If it's a clothing or shoe product, force selection inside detail page
                            if (product.sizes && product.sizes.length > 0) {
                              navigate(`/product/${product.id}?selectSize=true`);
                            } else {
                              addToCart(product, null);
                            }
                          }
                        }}
                        id={`product-card-btn-${product.id}`}
                      >
                        <ShoppingCart size={15} />
                        {inCart ? 'Go to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="no-products-view" id="no-products-alert">
              <FilterX size={48} style={{ color: 'var(--text-muted)' }} />
              <h3>No Products Found</h3>
              <p>We couldn't find any products matching your active filter options. Try resetting filters.</p>
              <button 
                className="clear-filters-btn" 
                onClick={clearFilters}
                style={{ maxWidth: '200px', margin: '20px auto 0' }}
                id="no-products-clear-btn"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
