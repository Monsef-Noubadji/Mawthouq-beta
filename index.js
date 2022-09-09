const bodyparser = require('body-parser')
const express = require('express');
const authRoutes = require('./routes/authRoute');
const cookieparser = require('cookie-parser')
const PORT = 4000

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieparser())
app.set('view engine', 'ejs');

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())




app.listen(PORT, console.log('App running at : http://127.0.0.1:' + PORT));

app.use(authRoutes);
