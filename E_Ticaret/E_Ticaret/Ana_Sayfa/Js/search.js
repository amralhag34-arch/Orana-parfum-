// Sample product data (in a real application, this would come from a database)
const products = [
    {
        id: 1,
        name: "Cerruti 1881 Reve de Roses EDP for Women",
        price: 89.99,
        originalPrice: 129.99,
        image: "../img/urun.png",
        category: "kadın",
        description: "Gül, yasemin ve amber notalarının muhteşem uyumu",
        badge: "Bestseller"
    },
    {
        id: 2,
        name: "Blue De Chanel EDP for Men",
        price: 120.99,
        originalPrice: 150.99,
        image: "../img/urun.png",
        category: "erkek",
        description: "Odunsu ve aromatik notalar",
        badge: "Yeni"
    },
    {
        id: 3,
        name: "La Vie Est Belle Lancome for Women",
        price: 95.99,
        originalPrice: 135.99,
        image: "../img/urun.png",
        category: "kadın",
        description: "Iris ve vanilya notaları",
        badge: "En çok satan"
    }
];

// Search functionality
function searchProducts(query) {
    query = query.toLowerCase();
    return products.filter(product => {
        return (
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
        );
    });
}

// Function to generate HTML for a single product card
function generateProductCard(product) {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    return `
        <div class="product-card">
            <div class="badge">${product.badge}</div>
            <div class="product-image">
                <a href="product-details.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                </a>
                <button class="wishlist">
                    <i class="fa-regular fa-heart"></i>
                </button>
            </div>
            <div class="product-info">
                <a href="product-details.html?id=${product.id}">
                    <h3>${product.name}</h3>
                </a>
                <div class="price-info">
                    <span class="current-price">$${product.price}</span>
                    <span class="original-price">$${product.originalPrice}</span>
                    <span class="discount">%${discount} İndirim</span>
                </div>
                <a href="#" class="cart-link" aria-label="Add to Cart" title="Add to Cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                </a>
            </div>
        </div>
    `;
}

// Function to display search results
function displaySearchResults(results) {
    const resultsContainer = document.getElementById('search-results');
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">Aradığınız ürün bulunamadı.</p>';
        return;
    }

    const resultsHTML = results.map(product => generateProductCard(product)).join('');
    resultsContainer.innerHTML = resultsHTML;
}

// Handle search form submission
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.research');
    const searchInput = document.getElementById('search-input');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            // Store the search query in sessionStorage
            sessionStorage.setItem('searchQuery', query);
            window.location.href = 'search-results.html';
        }
    });

    // If we're on the search results page, perform the search
    if (window.location.pathname.includes('search-results.html')) {
        const query = sessionStorage.getItem('searchQuery') || '';
        searchInput.value = query;
        const results = searchProducts(query);
        displaySearchResults(results);
        
        // Update results count
        const resultsCount = document.getElementById('results-count');
        if (resultsCount) {
            resultsCount.textContent = `${results.length} ürün bulundu`;
        }
    }
});
