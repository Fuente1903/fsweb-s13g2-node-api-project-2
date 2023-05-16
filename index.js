const express = require('express');
const server = require('./api/server');

const PORT = 3000;

const app = express();
app.use(express.json());

app.use('./api/posts', server);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});