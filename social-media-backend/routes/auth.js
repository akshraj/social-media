const router = require('express').Router();
const User = require('../models/User');
const AuthService = require('../services/authService');

//Register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  const newUser = new User({
    username,
    email,
    password: await AuthService.generateHashedPassword(password),
  });

  try {
    const user = await newUser.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err });
  }

});

//Login

router.post('/login', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const validPassword = await AuthService.validPassword(req.body.password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'wrong password' });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ message: err.message });
  }
})

module.exports = router;