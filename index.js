require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const port = process.env.PORT;
const database = require('./database');

const userRoutes = require('./routes/users')

app.use(cors());
app.use(morgan('dev'));

app.use('api/users', userRoutes);

app.get('/', (req, res) => {
    return res.status(200).json({
        'message' : "Welcome to Arnav's Homepage" 
    });
});

app.listen(port, () => {
    console.log("Server running at port " + port);
});