
document.addEventListener("DOMContentLoaded", function() {
    let products = [];
    
    // Pobierz dane z pliku JSON
    fetch('res/product/products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            initProductList();
            initProductDetail();
        })
        .catch(error => console.error('Błąd podczas wczytywania pliku JSON:', error));

    const productList = document.getElementById('productList');
    const productDetail = document.getElementById('productDetail');
    const buyButton = document.getElementById('buyButton');
    const paymentDialog = document.getElementById('paymentDialog');
    const closeBtn = document.querySelector('.close');
    const cancelButton = document.getElementById('cancelButton');
    const confirmPurchaseButton = document.getElementById('confirmPurchaseButton');
    const paymentAmount = document.getElementById('paymentAmount');

    function initProductList() {
        if (productList) {
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';

                const productPhotoDiv = document.createElement('div');
                productPhotoDiv.className = 'photo';
                const productLink = document.createElement('a');
                productLink.href = `product.html?productId=${product.id}`;
                const productImg = document.createElement('img');
                productImg.src = product.image;
                productImg.alt = product.name;
                productLink.appendChild(productImg);
                productPhotoDiv.appendChild(productLink);

                const productDescription = document.createElement('p');
                productDescription.textContent = product.description;

                const buyButton = document.createElement('button');
                buyButton.className = 'buy-button';
                buyButton.textContent = 'Kup teraz';
                buyButton.onclick = function() {
                    location.href = `product.html?productId=${product.id}`;
                };

                productDiv.appendChild(productPhotoDiv);
                productDiv.appendChild(productDescription);
                productDiv.appendChild(buyButton);

                productList.appendChild(productDiv);
            });
        }
    }

    function initProductDetail() {
        if (productDetail) {
            const productId = getProductIDFromURL(window.location.href);
            const product = products.find(item => item.id === parseInt(productId));

            if (product) {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';

                const productPhotoDiv = document.createElement('div');
                productPhotoDiv.className = 'photo';
                const productLink = document.createElement('a');
                const productImg = document.createElement('img');
                productImg.src = product.image;
                productImg.alt = product.name;
                productLink.appendChild(productImg);
                productPhotoDiv.appendChild(productLink);

                const productDescription = document.createElement('p');
                productDescription.textContent = product.description;
                const productPrice = document.createElement('p');
                productPrice.textContent = product.price;
                const productDate = document.createElement('p');
                productDate.textContent = 'Data posadzenia: ' + product.date;

                productDiv.appendChild(productPhotoDiv);
                productDiv.appendChild(productDescription);
                productDiv.appendChild(productPrice);
                productDiv.appendChild(productDate);
                productDetail.appendChild(productDiv);

                buyButton.onclick = function() {
                    paymentAmount.textContent = product.price;
                    paymentDialog.style.display = "block";
                };

                confirmPurchaseButton.onclick = function() {
                    const productIndex = products.findIndex(item => item.id === product.id);
                    if (productIndex > -1) {
                        // Tworzymy kopię listy produktów, aby nie zmieniać oryginalnej listy do momentu potwierdzenia aktualizacji na serwerze
                        const updatedProducts = products.slice();
                        updatedProducts.splice(productIndex, 1);
                        
                        // Wysyłamy żądanie POST na serwer backendowy z zaktualizowaną listą produktów
                        fetch('http://localhost:3000/updateProducts', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(updatedProducts)
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Błąd podczas aktualizacji pliku JSON');
                            }
                            // Jeśli aktualizacja na serwerze zakończyła się sukcesem, usuwamy produkt z listy
                            products.splice(productIndex, 1);
                            alert("Produkt został zakupiony.");
                            paymentDialog.style.display = "none";
                            window.location.href = "shop.html";
                        })
                        .catch(error => console.error(error));
                    }
                };

                cancelButton.onclick = function() {
                    paymentDialog.style.display = "none";
                };

                closeBtn.onclick = function() {
                    paymentDialog.style.display = "none";
                };

                window.onclick = function(event) {
                    if (event.target == paymentDialog) {
                        paymentDialog.style.display = "none";
                    }
                };
            }
        }
    }

    function getProductIDFromURL(url) {
        const queryString = url.split('?')[1];
        const params = new URLSearchParams(queryString);
        return params.get('productId');
    }

    function saveProductsToFile(products) {
        fetch('/updateProducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(products)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Błąd podczas aktualizacji pliku JSON');
            }
            console.log('Plik products.json został zaktualizowany na serwerze');
        })
        .catch(error => console.error(error));
    }
});
