const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/project', (req, res) => {
    res.render('project');
});

app.get('/intro', (req, res) => {
    res.render('intro');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
