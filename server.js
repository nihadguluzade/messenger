const express = require('express');
const app = express();
const port = 5000;

app.get('/hey', (req, res) => res.send('ho!'));

app.listen(port, () => console.log(`Server listening on port ${port}`));