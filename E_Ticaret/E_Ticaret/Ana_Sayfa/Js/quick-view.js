document.addEventListener('DOMContentLoaded', function () {
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const modal = document.getElementById('quickViewModal');
    const closeModal = modal.querySelector('.close-modal');
    const mainImage = modal.querySelector('#modalMainImage');
    const modalBrand = modal.querySelector('.modal-product-brand');
    const modalName = modal.querySelector('.modal-product-name');
    const modalPrice = modal.querySelector('.modal-product-price');
    const modalDescription = modal.querySelector('.modal-product-description p');
    const thumbnails = modal.querySelector('.thumbnail-images');
    const sizeBtns = modal.querySelectorAll('.size-btn');
    const quantityInput = modal.querySelector('.quantity-selector input');
    const minusBtn = modal.querySelector('.qty-btn.minus');
    const plusBtn = modal.querySelector('.qty-btn.plus');

    // Quick View butonlarına tıklama olayı
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const productId = this.closest('.product-card').dataset.productId;
            openModal(productId);
        });
    });

    // Modalı kapatma
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Modal dışına tıklayarak kapatma
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // Thumbnail resimlerine tıklama
    thumbnails.addEventListener('click', function (e) {
        if (e.target.tagName === 'IMG') {
            thumbnails.querySelectorAll('img').forEach(img => img.classList.remove('active'));
            e.target.classList.add('active');
            mainImage.src = e.target.src;
        }
    });

    // Hacim seçenekleri
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            sizeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Miktar kontrolü
    minusBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });

    plusBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        if (value < 10) {
            quantityInput.value = value + 1;
        }
    });

    // Ürün bilgileri
    const productData = {
        kadin1: {
            brand: 'Chanel',
            name: 'No 5 EDP',
            price: '4.999 TL',
            description: 'Chanel No 5, çiçeksi ve odunsu notalarla zenginleştirilmiş lüks bir kadın parfümüdür.',
            images: ['../img/No 5 EDP.png']
        },
        kadin2: {
            brand: 'Dior',
            name: 'Miss Dior EDP',
            price: '1.999 TL',
            description: 'Miss Dior, çiçeksi ve meyvemsi kokuların mükemmel birleşimidir.',
            images: ['../img/Miss Dior EDP.png']
        },
        kadin3: {
            brand: 'YSL',
            name: 'Black Opium EDP',
            price: '4.599 TL',
            description: 'Black Opium, yoğun kahve ve vanilya notalarıyla gece kullanımına uygundur.',
            images: ['../img/Black Opium EDP.png']
        },
        kadin4: {
            brand: 'Lancôme',
            name: 'La Vie Est Belle EDP',
            price: '3.799 TL',
            description: 'La Vie Est Belle, tatlı ve şekerli notalarıyla neşe veren bir kokudur.',
            images: ['../img/La Vie Est Belle EDP.png']
        }
    };

    // Modalı açma fonksiyonu
    function openModal(productId) {
        const product = productData[productId];
        if (product) {
            modalBrand.textContent = product.brand;
            modalName.textContent = product.name;
            modalPrice.textContent = product.price;
            modalDescription.textContent = product.description;
            mainImage.src = product.images[0];

            // Thumbnail güncelleme
            thumbnails.innerHTML = '';
            product.images.forEach(image => {
                const img = document.createElement('img');
                img.src = image;
                img.alt = product.name;
                thumbnails.appendChild(img);
            });

            modal.classList.add('active');
        }

        // Form değerlerini sıfırla
        quantityInput.value = 1;
        sizeBtns.forEach((btn, index) => {
            btn.classList.toggle('active', index === 0);
        });
    }
});