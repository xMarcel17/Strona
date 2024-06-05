const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware do parsowania ciała żądania w formacie JSON
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// Endpoint do aktualizacji pliku products.json
app.post('/updateProducts', (req, res) => {
    const updatedProducts = req.body;

    // Konwertujemy listę products na format JSON
    const jsonData = JSON.stringify(updatedProducts, null, 2);

    // Zapisujemy zaktualizowane dane do pliku products.json
    fs.writeFile('res/product/products.json', jsonData, 'utf8', (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Błąd podczas zapisywania pliku JSON');
            return;
        }
        console.log('Plik products.json został zaktualizowany');
        res.status(200).send('Plik products.json został zaktualizowany');
    });
});

// Start serwera
app.listen(port, () => {
    console.log(`Serwer backendowy nasłuchuje na porcie ${port}`);
});
