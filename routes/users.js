const router = require('express').Router();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const User = require('../models/User');
const token_key = process.env.TOKEN_KEY;

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res) => {
    return res.status(200).json(
        {
            "status": true,
            "message": "Hi Arnav"
        }
    )
})

router.post('/register', 
[
    check('username').not().isEmpty().trim().escape(),
    check('password').not().isEmpty().trim().escape(),

    check('email').isEmail().normalizeEmail()
], 
(req, res) => {
    const errors = validationResult(req)
    
    if(!errors.isEmpty())
    {
        return res.status(400).json({
            status: false,
            'errors':  errors.array()
        });
    }
    console.log(req.body.username);

    return res.status(200).json({
        status: true,
        "data": req.body
    });
})

module.exports = router;