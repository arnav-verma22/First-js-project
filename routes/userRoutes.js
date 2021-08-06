const router = require('express').Router();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const moment = require('moment');

var User = require('../models/User');
const token_key = process.env.TOKEN_KEY;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

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
    //console.log(req.body.username);

    User.findOne({ email: req.body.email }).then(user => {

        // check user
        if (user) {
  
          return res.status(409).json({
            "status": false,
            error: {
              "email": "validation.email_exists"
            },
            "message": "User email already exists"
          });
  
        } else {
  
          // hash user password
          const salt = bcrypt.genSaltSync(10)
          const hashedPasssword = bcrypt.hashSync(req.body.password, salt);
  
          // create user object from user model
          const newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: hashedPasssword
          });
  
          // insert new user
          newUser.save().then(result => {
  
            return res.status(200).json({
              "status": true,
              "user": result
            });
  
          }).catch(error => {
  
            return res.status(502).json({
              "status": false,
              "error": {
                "db_error": "validation.db_error"
              }
            });
  
          });
        }
      }).catch(error => {
        return res.status(502).json({
          "status": false,
          "error": {
            "db_error": "validation.db_error"
          }
        });
    });

})

module.exports = router;