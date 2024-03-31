const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'shubham';
const fetchuser = require('../middleware/fetchUser')

//ROUTE 1: Create a User using : POST "/api/auth/createuser". No login required.

router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("name", "Please enter your name correct").isLength({
      min: 3,
      max: 15,
    }),
    body("password", "Enter Strong password")
      .isLength({ min: 5, max: 15 })
      .isStrongPassword(),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors , return bad request and the error.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    // check whether the user exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({success, error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user:{
            id: user.id,
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
    //   console.log(jwtData);
      success = true;
      res.json({success,authtoken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


//ROUTE 2: Authenticate a user using : POST "/api/auth/login". No login required.

router.post(
    "/login",
    [
      body("email", "Enter a valid email").isEmail(),
      body("password", "Password cannot be blank")
        .exists(),
    ],
    async (req, res) => {

      let success = false;
        
     // If there are errors , return bad request and the error.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
        let user =await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "Please try to login with correct Credentials"});
        }
        const passwordCompare =await bcrypt.compare(password , user.password);
        if(!passwordCompare){
            return res.status(400).json({success , error: "Please try to login with correct Credentials"});
        }
        const data = {
            user:{
                id: user.id,
            }
          }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success , authtoken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!!");
    }
    })

    //ROUTE 3: Get Logedin user details using : POST "/api/auth/getuser". login required.
router.post(
        "/getuser",
        fetchuser,
        async (req, res) =>{
            try {
                const userId = req.user.id;
                const user = await User.findById(userId).select("-password");
                res.send(user);
            } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error!!");
            }
})
module.exports = router;
