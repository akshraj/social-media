const router = require('express').Router();
const User = require('../models/User');
const AuthService = require('../services/authService');

//Register
router.post('/register', async (req, res) => {
  const { username, email, password, desc, city, from } = req.body;

  const newUser = new User({
    username,
    email,
    password: await AuthService.generateHashedPassword(password),
    desc,
    city,
    from
  });

  try {
    const user = await newUser.save();
    const { password, ...other } = user;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});

//Login

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    !user && res.status(404).json("user not found");

    const validPassword = await AuthService.validPassword(password, user.password);

    !validPassword && res.status(400).json('wrong password');

    const { password, ...other } = user;
    return res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err.message);
  }
})

module.exports = router;