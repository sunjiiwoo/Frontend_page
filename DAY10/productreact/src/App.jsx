import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import { initialProducts } from './data/products';
import './App.css';

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Dark mode — persisted in localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('suriya-dark-mode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('suriya-dark-mode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  // Cart operations
  const addToCart = (product, selectedSize) => {
    setCart((prevCart) => {
      // Find if item already exists in cart with matching product ID AND selected size
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingItemIndex > -1) {
        // Increment quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].qty += 1;
        return updatedCart;
      } else {
        // Add new item
        return [...prevCart, { product, selectedSize, qty: 1 }];
      }
    });
  };

  const updateCartQty = (productId, selectedSize, qty) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.selectedSize === selectedSize
          ? { ...item, qty }
          : item
      )
    );
  };

  const removeFromCart = (productId, selectedSize) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Add review to a product & update its average rating and count
  const updateProductReviews = (productId, newReview) => {
    setProducts((prevProducts) =>
      prevProducts.map((prod) => {
        if (prod.id === productId) {
          const updatedReviews = [newReview, ...prod.reviews];
          const totalRating = updatedReviews.reduce((sum, rev) => sum + rev.rating, 0);
          const newAvgRating = parseFloat((totalRating / updatedReviews.length).toFixed(1));
          
          return {
            ...prod,
            reviews: updatedReviews,
            rating: newAvgRating,
            ratingCount: updatedReviews.length
          };
        }
        return prod;
      })
    );
  };

  // Total cart item count helper
  const totalCartCount = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Top Sticky Navigation bar */}
        <Navbar 
          cartCount={totalCartCount} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />

        {/* Dynamic Route Pages */}
        <main>
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  products={products} 
                  cart={cart}
                  addToCart={addToCart} 
                  searchQuery={searchQuery}
                />
              } 
            />
            <Route 
              path="/product/:id" 
              element={
                <ProductDetail 
                  products={products} 
                  updateProductReviews={updateProductReviews}
                  addToCart={addToCart}
                  cart={cart}
                />
              } 
            />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  cart={cart} 
                  updateCartQty={updateCartQty} 
                  removeFromCart={removeFromCart} 
                  clearCart={clearCart}
                />
              } 
            />
            <Route 
              path="/contact" 
              element={<Contact />} 
            />
            <Route 
              path="/checkout" 
              element={
                <Checkout 
                  cart={cart} 
                  clearCart={clearCart} 
                />
              } 
            />
          </Routes>
        </main>

        {/* Footer info panel */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
