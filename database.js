const mongoose = require('mongoose')
const assert = require('assert')
const { error } = require( 'console' )
const url = process.env.DB_URL

mongoose.connect(url, {useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true, 
    useFindAndModify: true}, 
    (error, link) => {
        assert.strictEqual(error, null, "DB Connection Failed...");

        console.log("Database Connection Established...");
    })