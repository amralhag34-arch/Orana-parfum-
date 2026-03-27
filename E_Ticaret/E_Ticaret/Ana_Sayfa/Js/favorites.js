// Function to add a product to favorites
function addToFavorites(productId, productName, productPrice, productImage) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Check if product is already in favorites
    const isProductInFavorites = favorites.some(item => item.id === productId);
    
    if (!isProductInFavorites) {
        favorites.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage
        });
        
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateHeartIcon(productId, true);
        showNotification('Ürün favorilere eklendi!', 'success');
    } else {
        // Remove from favorites if already exists
        favorites = favorites.filter(item => item.id !== productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateHeartIcon(productId, false);
        showNotification('Ürün favorilerden çıkarıldı!', 'info');
    }
}

// Function to update heart icon appearance
function updateHeartIcon(productId, isFavorite) {
    const heartIcon = document.querySelector(`[data-product-id="${productId}"] .heart-icon`);
    if (heartIcon) {
        if (isFavorite) {
            heartIcon.classList.remove('fa-regular');
            heartIcon.classList.add('fa-solid');
            heartIcon.style.color = '#ff0000';
        } else {
            heartIcon.classList.remove('fa-solid');
            heartIcon.classList.add('fa-regular');
            heartIcon.style.color = '#000';
        }
    }
}

// Function to show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Function to check if a product is in favorites
function isInFavorites(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.some(item => item.id === productId);
}

// Initialize heart icons on page load
document.addEventListener('DOMContentLoaded', () => {
    const heartIcons = document.querySelectorAll('.heart-icon');
    heartIcons.forEach(icon => {
        const productId = icon.closest('[data-product-id]').dataset.productId;
        if (isInFavorites(productId)) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            icon.style.color = '#ff0000';
        }
    });
});
