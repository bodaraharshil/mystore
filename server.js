//server.js
const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
const cors = require('cors')

app.use(express.static(path.join(__dirname, '.next')));
app.use(cors())
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '.next', ''));
});

app.listen(port);