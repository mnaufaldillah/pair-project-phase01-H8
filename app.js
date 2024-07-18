const express = require('express');
const router = require('./routes');
const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
