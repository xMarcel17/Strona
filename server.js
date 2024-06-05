const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
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

app.post('/purchase', (req, res) => {
    const { updatedProducts, purchasedTree } = req.body;

    // Odczytaj aktualną zawartość pliku purchased_trees.json, jeśli istnieje
    fs.readFile('res/points/purchased_trees.json', 'utf8', (err, fileData) => {
        if (err) {
            // Jeśli plik nie istnieje, utwórz nową listę zakupionych drzew
            const purchasedTrees = [];
            purchasedTrees.push(purchasedTree);

            // Zapisz listę zakupionych drzew do pliku purchased_trees.json
            fs.writeFile('res/points/purchased_trees.json', JSON.stringify({ trees: purchasedTrees }), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Błąd podczas zapisywania do pliku purchased_trees.json');
                    return;
                }
                console.log('Pomyślnie dodano zakupione drzewo do purchased_trees.json');
                res.status(200).send('Zakupiony produkt został zapisany');
            });
        } else {
            // Jeśli plik istnieje, dodaj nowe zakupione drzewo do istniejącej listy
            const purchasedTrees = JSON.parse(fileData).trees || [];
            purchasedTrees.push(purchasedTree);

            // Zapisz zaktualizowaną listę zakupionych drzew do pliku purchased_trees.json
            fs.writeFile('res/points/purchased_trees.json', JSON.stringify({ trees: purchasedTrees }), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Błąd podczas zapisywania do pliku purchased_trees.json');
                    return;
                }
                console.log('Pomyślnie dodano zakupione drzewo do purchased_trees.json');
                res.status(200).send('Zakupiony produkt został zapisany');
            });
        }
    });
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


app.use(express.static(path.join(__dirname, 'res')));
app.use(express.static(path.join(__dirname, 'forum')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/forum', (req, res) => {
    res.sendFile(path.join(__dirname, 'forum/forum.html'));
});

app.get('/forum/thread', (req, res) => {
    res.sendFile(path.join(__dirname, 'forum/thread.html'));
});

app.get('/forum/post', (req, res) => {
    res.sendFile(path.join(__dirname, 'forum/post.html'));
});
