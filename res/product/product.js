document.addEventListener("DOMContentLoaded", function() {
    loadProfileData();

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');

    const products = [
        {
            id: 1,
            name: 'Jodła kaukaska',
            price: '100 PLN',
            date: '01.01.2022',
            image: 'res/shop/jodla_kaukaska.jpg'
        },
        {
            id: 2,
            name: 'Świerk Srebrny - Średni',
            price: '200 PLN',
            date: '15.03.2022',
            image: 'res/shop/swierk_srebrny.jpg'
        },
        {
            id: 3,
            name: 'Świerk Srebrny - Duży',
            price: '300 PLN',
            date: '10.05.2022',
            image: 'res/shop/swierk_srebrny2.jpg'
        },
        {
            id: 4,
            name: 'Świerk Srebrny - Mały',
            price: '400 PLN',
            date: '20.07.2022',
            image: 'res/shop/swierk_srebrny3.jpg'
        },
        {
            id: 5,
            name: 'Świerk Serbski',
            price: '500 PLN',
            date: '25.09.2022',
            image: 'res/shop/swierk_serbski.jpg'
        },
        {
            id: 6,
            name: 'Sosna',
            price: '600 PLN',
            date: '30.11.2022',
            image: 'res/shop/sosna.jpg'
        }
    ];

    const product = products.find(p => p.id == productId);

    if (product) {
        document.getElementById('productImage').src = product.image;
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productPrice').textContent = `Cena: ${product.price}`;
        document.getElementById('productDate').textContent = `Data zasadzenia: ${product.date}`;
    }

    document.getElementById('buyButton').addEventListener('click', function() {
        alert('Dziękujemy za zakup!');
    });
});
