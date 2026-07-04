/* ============================================================
   NovaMart — Advanced Catalog JavaScript
   ============================================================ */

// ===== PRODUCT DATA =====
const products = [
    {
        id: 1, name: "Wireless Noise-Cancelling Headphones", category: "electronics",
        price: 249.99, oldPrice: 349.99, rating: 4.8, reviews: 2340,
        emoji: "🎧", badge: "sale", tags: ["Bluetooth 5.3", "40h Battery", "ANC"],
        desc: "Premium over-ear headphones with adaptive noise cancellation, crystal-clear audio, and an ultra-comfortable fit for all-day listening.",
        gradient: "linear-gradient(135deg, #1a1a3e 0%, #2d1b69 100%)"
    },
    {
        id: 2, name: "Ultra-Slim Laptop Pro 16\"", category: "electronics",
        price: 1299.00, oldPrice: 1499.00, rating: 4.9, reviews: 1856,
        emoji: "💻", badge: "hot", tags: ["M4 Chip", "16GB RAM", "1TB SSD"],
        desc: "Blazing fast performance in an impossibly thin design. The perfect workstation for creators and developers.",
        gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)"
    },
    {
        id: 3, name: "Smart Fitness Watch Series X", category: "accessories",
        price: 399.00, oldPrice: null, rating: 4.7, reviews: 3120,
        emoji: "⌚", badge: "new", tags: ["GPS", "Heart Rate", "Water Resistant"],
        desc: "Track every workout, monitor your health, and stay connected with this advanced fitness smartwatch.",
        gradient: "linear-gradient(135deg, #0a1628 0%, #1a3a5c 100%)"
    },
    {
        id: 4, name: "Premium Leather Jacket", category: "fashion",
        price: 189.00, oldPrice: 259.00, rating: 4.6, reviews: 890,
        emoji: "🧥", badge: "sale", tags: ["Genuine Leather", "Slim Fit", "Unisex"],
        desc: "Timeless craftsmanship meets modern style. This genuine leather jacket is the ultimate wardrobe essential.",
        gradient: "linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 50%, #3d2b1f 100%)"
    },
    {
        id: 5, name: "Portable Bluetooth Speaker", category: "electronics",
        price: 79.99, oldPrice: 119.99, rating: 4.5, reviews: 4500,
        emoji: "🔊", badge: "sale", tags: ["360° Sound", "Waterproof", "12h Battery"],
        desc: "Big, bold sound in a compact package. Take the party anywhere with this rugged waterproof speaker.",
        gradient: "linear-gradient(135deg, #141e30 0%, #243b55 100%)"
    },
    {
        id: 6, name: "Designer Sunglasses UV400", category: "accessories",
        price: 129.00, oldPrice: null, rating: 4.4, reviews: 670,
        emoji: "🕶️", badge: "new", tags: ["UV400", "Polarized", "Titanium Frame"],
        desc: "Premium polarized lenses with a lightweight titanium frame. Stylish protection for every adventure.",
        gradient: "linear-gradient(135deg, #232526 0%, #414345 100%)"
    },
    {
        id: 7, name: "Minimalist Desk Lamp", category: "home",
        price: 59.99, oldPrice: 79.99, rating: 4.6, reviews: 1230,
        emoji: "💡", badge: null, tags: ["Touch Control", "Dimmable", "USB-C"],
        desc: "Elegant LED desk lamp with adjustable brightness and color temperature. Perfect for your workspace.",
        gradient: "linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 100%)"
    },
    {
        id: 8, name: "Running Sneakers Air Max", category: "fashion",
        price: 149.00, oldPrice: 199.00, rating: 4.7, reviews: 2890,
        emoji: "👟", badge: "hot", tags: ["Air Cushion", "Breathable", "Lightweight"],
        desc: "Engineered for performance and comfort. These sneakers feature responsive cushioning and a breathable mesh upper.",
        gradient: "linear-gradient(135deg, #1a0a2e 0%, #3a1c71 50%, #d76d77 100%)"
    },
    {
        id: 9, name: "Smart Home Hub Controller", category: "home",
        price: 129.99, oldPrice: null, rating: 4.5, reviews: 780,
        emoji: "🏠", badge: "new", tags: ["Voice Control", "WiFi 6", "ZigBee"],
        desc: "Control all your smart home devices from one sleek hub. Compatible with 500+ brands and voice assistants.",
        gradient: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)"
    },
    {
        id: 10, name: "Crossbody Messenger Bag", category: "fashion",
        price: 69.00, oldPrice: 89.00, rating: 4.3, reviews: 560,
        emoji: "👜", badge: null, tags: ["Vegan Leather", "RFID Block", "Compact"],
        desc: "Sleek and functional everyday bag with RFID-blocking pocket, multiple compartments, and premium vegan leather.",
        gradient: "linear-gradient(135deg, #2c1810 0%, #4a2c2a 100%)"
    },
    {
        id: 11, name: "Ceramic Aroma Diffuser", category: "home",
        price: 44.99, oldPrice: 64.99, rating: 4.8, reviews: 1950,
        emoji: "🕯️", badge: "sale", tags: ["Ultrasonic", "LED Mood Light", "Quiet"],
        desc: "Transform your space with soothing mist and ambient lighting. Whisper-quiet ultrasonic technology.",
        gradient: "linear-gradient(135deg, #1a0e2e 0%, #2d1f4e 100%)"
    },
    {
        id: 12, name: "Titanium Mechanical Keyboard", category: "electronics",
        price: 179.00, oldPrice: null, rating: 4.9, reviews: 1340,
        emoji: "⌨️", badge: "hot", tags: ["Hot-Swap", "RGB", "Wireless"],
        desc: "The ultimate typing experience. Hot-swappable switches, per-key RGB, and a premium titanium-alloy frame.",
        gradient: "linear-gradient(135deg, #0d0d2b 0%, #1a1a4e 100%)"
    }
];

// ===== STATE =====
let cart = [];
let wishlist = new Set();
let activeCategory = 'all';
let searchQuery = '';
let sortBy = 'featured';
let modalQty = 1;
let currentModalProduct = null;

// ===== DOM REFS =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const navbar = $('#navbar');
const searchInput = $('#search-input');
const searchClear = $('#search-clear');
const themeToggle = $('#theme-toggle');
const themeIcon = $('#theme-icon');
const cartToggle = $('#cart-toggle');
const cartBadge = $('#cart-badge');
const cartSidebar = $('#cart-sidebar');
const cartOverlay = $('#cart-overlay');
const cartClose = $('#cart-close');
const cartItemsEl = $('#cart-items');
const cartEmptyEl = $('#cart-empty');
const cartTotal = $('#cart-total');
const cartFooter = $('#cart-footer');
const checkoutBtn = $('#checkout-btn');
const productGrid = $('#product-grid');
const emptyState = $('#empty-state');
const resultsCount = $('#results-count');
const activeFilterEl = $('#active-filter');
const filterText = $('#filter-text');
const clearFilterBtn = $('#clear-filter');
const sortSelect = $('#sort-select');
const modalOverlay = $('#modal-overlay');
const modalClose = $('#modal-close');
const modalImage = $('#modal-image');
const modalCategory = $('#modal-category');
const modalTitle = $('#modal-title');
const modalRating = $('#modal-rating');
const modalDesc = $('#modal-desc');
const modalTags = $('#modal-tags');
const modalPrice = $('#modal-price');
const modalOldPrice = $('#modal-old-price');
const qtyMinus = $('#qty-minus');
const qtyPlus = $('#qty-plus');
const qtyValue = $('#qty-value');
const modalAddBtn = $('#modal-add-btn');
const toastContainer = $('#toast-container');

// ===== HELPERS =====
function formatPrice(p) { return '$' + p.toFixed(2); }

function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

function showToast(message, icon = '✓') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> ${message}`;
    toastContainer.appendChild(toast);
    setTimeout(() => { toast.classList.add('removing'); }, 2500);
    setTimeout(() => { toast.remove(); }, 2800);
}

// ===== THEME =====
function initTheme() {
    const saved = localStorage.getItem('novamart-theme');
    if (saved === 'light') { document.documentElement.setAttribute('data-theme', 'light'); themeIcon.textContent = '☀️'; }
}
themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
        localStorage.setItem('novamart-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeIcon.textContent = '☀️';
        localStorage.setItem('novamart-theme', 'light');
    }
});

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== SEARCH =====
searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    searchClear.classList.toggle('hidden', !searchQuery);
    renderProducts();
});
searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    searchClear.classList.add('hidden');
    renderProducts();
});

// ===== CATEGORIES =====
$('#categories').addEventListener('click', (e) => {
    const btn = e.target.closest('.cat-btn');
    if (!btn) return;
    $$('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.category;
    renderProducts();
});

clearFilterBtn.addEventListener('click', () => {
    activeCategory = 'all';
    searchQuery = '';
    searchInput.value = '';
    searchClear.classList.add('hidden');
    $$('.cat-btn').forEach(b => b.classList.remove('active'));
    $$('.cat-btn')[0].classList.add('active');
    renderProducts();
});

// ===== SORT =====
sortSelect.addEventListener('change', (e) => {
    sortBy = e.target.value;
    renderProducts();
});

// ===== FILTER & SORT LOGIC =====
function getFilteredProducts() {
    let filtered = [...products];

    // Category
    if (activeCategory !== 'all') {
        filtered = filtered.filter(p => p.category === activeCategory);
    }

    // Search
    if (searchQuery) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchQuery) ||
            p.category.toLowerCase().includes(searchQuery) ||
            p.tags.some(t => t.toLowerCase().includes(searchQuery))
        );
    }

    // Sort
    switch (sortBy) {
        case 'price-low': filtered.sort((a, b) => a.price - b.price); break;
        case 'price-high': filtered.sort((a, b) => b.price - a.price); break;
        case 'rating': filtered.sort((a, b) => b.rating - a.rating); break;
        case 'name': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
        default: break; // featured = original order
    }

    return filtered;
}

// ===== RENDER PRODUCTS =====
function renderProducts() {
    const filtered = getFilteredProducts();
    productGrid.innerHTML = '';

    // Update results info
    resultsCount.textContent = `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;

    const hasActiveFilter = activeCategory !== 'all' || searchQuery;
    activeFilterEl.classList.toggle('hidden', !hasActiveFilter);
    if (hasActiveFilter) {
        let text = '';
        if (activeCategory !== 'all') text += activeCategory;
        if (searchQuery) text += (text ? ' · ' : '') + `"${searchQuery}"`;
        filterText.textContent = text;
    }

    // Empty state
    emptyState.classList.toggle('hidden', filtered.length > 0);
    productGrid.classList.toggle('hidden', filtered.length === 0);

    // Render cards
    filtered.forEach((product, index) => {
        const card = createProductCard(product, index);
        productGrid.appendChild(card);
    });

    // Trigger scroll reveal
    requestAnimationFrame(() => {
        $$('.product-card').forEach((card, i) => {
            setTimeout(() => card.classList.add('visible'), i * 60);
        });
    });
}

function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;

    const badgeHTML = product.badge
        ? `<span class="card-badge badge-${product.badge}">${product.badge === 'sale' ? 'Sale' : product.badge === 'new' ? 'New' : 'Hot'}</span>`
        : '';

    const oldPriceHTML = product.oldPrice
        ? `<span class="card-old-price">${formatPrice(product.oldPrice)}</span>`
        : '';

    const isLiked = wishlist.has(product.id);

    card.innerHTML = `
        <div class="card-image">
            <div class="card-image-bg" style="background:${product.gradient}"></div>
            ${badgeHTML}
            <button class="card-wishlist ${isLiked ? 'liked' : ''}" data-id="${product.id}" aria-label="Toggle wishlist">
                ${isLiked ? '❤️' : '🤍'}
            </button>
            <span class="card-emoji">${product.emoji}</span>
        </div>
        <div class="card-body">
            <div class="card-category">${product.category}</div>
            <div class="card-title">${product.name}</div>
            <div class="card-rating">
                <span class="card-stars">${renderStars(product.rating)}</span>
                <span class="card-rating-num">${product.rating} (${product.reviews.toLocaleString()})</span>
            </div>
            <div class="card-price-row">
                <div>
                    <span class="card-price">${formatPrice(product.price)}</span>
                    ${oldPriceHTML}
                </div>
                <button class="card-add-btn" data-id="${product.id}" aria-label="Add to cart">+</button>
            </div>
        </div>
    `;

    // Click card → open modal (but not on buttons)
    card.addEventListener('click', (e) => {
        if (e.target.closest('.card-add-btn') || e.target.closest('.card-wishlist')) return;
        openModal(product);
    });

    // Add to cart button
    card.querySelector('.card-add-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(product, 1);
    });

    // Wishlist
    card.querySelector('.card-wishlist').addEventListener('click', (e) => {
        e.stopPropagation();
        toggleWishlist(product.id, e.currentTarget);
    });

    return card;
}

// ===== WISHLIST =====
function toggleWishlist(id, btn) {
    if (wishlist.has(id)) {
        wishlist.delete(id);
        btn.classList.remove('liked');
        btn.innerHTML = '🤍';
        showToast('Removed from wishlist', '💔');
    } else {
        wishlist.add(id);
        btn.classList.add('liked');
        btn.innerHTML = '❤️';
        showToast('Added to wishlist', '❤️');
    }
}

// ===== MODAL =====
function openModal(product) {
    currentModalProduct = product;
    modalQty = 1;
    qtyValue.textContent = 1;

    modalImage.style.background = product.gradient;
    modalImage.innerHTML = `<span style="font-size:6rem;filter:drop-shadow(0 8px 24px rgba(0,0,0,.4))">${product.emoji}</span>`;
    modalCategory.textContent = product.category;
    modalTitle.textContent = product.name;
    modalRating.textContent = `${renderStars(product.rating)} ${product.rating} · ${product.reviews.toLocaleString()} reviews`;
    modalDesc.textContent = product.desc;
    modalPrice.textContent = formatPrice(product.price);

    if (product.oldPrice) {
        modalOldPrice.textContent = formatPrice(product.oldPrice);
        modalOldPrice.classList.remove('hidden');
    } else {
        modalOldPrice.textContent = '';
        modalOldPrice.classList.add('hidden');
    }

    modalTags.innerHTML = product.tags.map(t => `<span class="modal-tag">${t}</span>`).join('');

    modalOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.add('hidden');
    document.body.style.overflow = '';
    currentModalProduct = null;
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

qtyMinus.addEventListener('click', () => {
    if (modalQty > 1) { modalQty--; qtyValue.textContent = modalQty; }
});
qtyPlus.addEventListener('click', () => {
    if (modalQty < 20) { modalQty++; qtyValue.textContent = modalQty; }
});

modalAddBtn.addEventListener('click', () => {
    if (currentModalProduct) {
        addToCart(currentModalProduct, modalQty);
        closeModal();
    }
});

// ===== CART =====
function addToCart(product, qty = 1) {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ ...product, qty });
    }
    updateCartUI();
    showToast(`${product.name} added to cart`, '🛒');
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartItemQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty < 1) {
        removeFromCart(id);
        return;
    }
    updateCartUI();
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

    // Badge
    if (totalItems > 0) {
        cartBadge.textContent = totalItems;
        cartBadge.classList.remove('hidden');
    } else {
        cartBadge.classList.add('hidden');
    }

    // Cart items
    cartItemsEl.innerHTML = '';
    if (cart.length === 0) {
        cartEmptyEl.classList.remove('hidden');
        cartFooter.style.display = 'none';
    } else {
        cartEmptyEl.classList.add('hidden');
        cartFooter.style.display = '';

        cart.forEach(item => {
            const el = document.createElement('div');
            el.className = 'cart-item';
            el.innerHTML = `
                <div class="cart-item-icon" style="background:${item.gradient}">${item.emoji}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${formatPrice(item.price * item.qty)}</div>
                </div>
                <div class="cart-item-qty">
                    <button class="cart-qty-btn" data-id="${item.id}" data-delta="-1">−</button>
                    <span class="cart-qty-num">${item.qty}</span>
                    <button class="cart-qty-btn" data-id="${item.id}" data-delta="1">+</button>
                </div>
                <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove item">🗑</button>
            `;
            cartItemsEl.appendChild(el);
        });

        // Event delegation
        cartItemsEl.querySelectorAll('.cart-qty-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                updateCartItemQty(parseInt(btn.dataset.id), parseInt(btn.dataset.delta));
            });
        });
        cartItemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                removeFromCart(parseInt(btn.dataset.id));
                showToast('Item removed', '🗑');
            });
        });
    }

    cartTotal.textContent = formatPrice(totalPrice);
}

// Cart sidebar toggle
cartToggle.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}
function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.add('hidden');
    document.body.style.overflow = '';
}

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    showToast(`Order placed! Total: ${formatPrice(total)}`, '🎉');
    cart = [];
    updateCartUI();
    closeCart();
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (!modalOverlay.classList.contains('hidden')) closeModal();
        else if (cartSidebar.classList.contains('open')) closeCart();
    }
    // Ctrl+K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
});

// ===== INIT =====
initTheme();
renderProducts();
updateCartUI();
