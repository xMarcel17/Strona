const products = [
    {
        id: 1,
        name: 'Jodła Kaukaska',
        price: '100 PLN',
        date: '01.01.2022',
        image: 'res/shop/jodla_kaukaska.jpg',
        description: 'Jodła kaukaska'
    },
    {
        id: 2,
        name: 'Świerk Srebrny - Średni',
        price: '200 PLN',
        date: '15.03.2022',
        image: 'res/shop/swierk_srebrny.jpg',
        description: 'Świerk Srebrny - Średni'
    },
    {
        id: 3,
        name: 'Świerk Srebrny - Duży',
        price: '300 PLN',
        date: '10.05.2022',
        image: 'res/shop/swierk_srebrny2.jpg',
        description: 'Świerk Srebrny - Duży'
    },
    {
        id: 4,
        name: 'Świerk Srebrny - Mały',
        price: '400 PLN',
        date: '20.07.2022',
        image: 'res/shop/swierk_srebrny3.jpg',
        description: 'Świerk Srebrny - Mały'
    },
    {
        id: 5,
        name: 'Świerk Serbski',
        price: '500 PLN',
        date: '25.09.2022',
        image: 'res/shop/swierk_serbski.jpg',
        description: 'Świerk Serbski'
    },
    {
        id: 6,
        name: 'Sosna',
        price: '600 PLN',
        date: '30.11.2022',
        image: 'res/shop/sosna.jpg',
        description: 'Sosna'
    }
];

document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById('productList');

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
});

document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById('productDetail');

    if (productList) {
        const productId = getProductIDFromURL(window.location.href);
        const product = products.find(item => item.id === parseInt(productId));

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
        productDate.textContent = 'Data posadzenia: '+product.date;

        productDiv.appendChild(productPhotoDiv);
        productDiv.appendChild(productDescription);
        productDiv.appendChild(productPrice);
        productDiv.appendChild(productDate);
        productList.appendChild(productDiv);
    }
});

function getProductIDFromURL(url) {
    const queryString = url.split('?')[1];
    const params = new URLSearchParams(queryString);
    return params.get('productId');
}


