const router = require('express').Router();
const AuthService = require('../services/authService');
const User = require('../models/User')

//update user
router.put('/:id', async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        req.body.password = await AuthService.generateHashedPassword(req.body.password);
      } catch (err) {
        return res.status(500).json(err)
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
      });
      return res.status(200).json("Account has been updated")
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    return res.status(403).json('you can only update your account!')
  }
})

//delete user

router.delete('/:id', async (req, res) => {
  if (req.params.id === req.body.userId || req.user.isAdmin) {
    try {
      await User.deleteOne({ _id: req.params.id });
      return res.status(200).json("Account has been deleted")
    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    return res.status(403).json('You can delete only your account!');
  }
})


//get a user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, updatedAt, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err)
  }
})


//follow a user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } })
        await currentUser.updateOne({ $push: { followings: req.params.id } })

        return res.status(200).json("user has been followed")
      } else {
        return res.status(403).json("you already follow this user")
      }

    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    res.status(403).json("you can not follow yourself")
  }
})

//unfollow

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } })
        await currentUser.updateOne({ $pull: { followings: req.params.id } })

        return res.status(200).json("user has been unfollowed")
      } else {
        return res.status(403).json("you dont follow this user")
      }

    } catch (err) {
      return res.status(500).json(err)
    }
  } else {
    res.status(403).json("you can not unfollow yourself")
  }
});


//get friends list

router.get('/:id/friends', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const followings = await Promise.all(
      user.followings.map(user => User.findById(user)
      )
    );
    res.status(200).json(followings);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get('/:id/all', async (req, res) => {
  const userId = req.params.id;
  try {
    const users = await User.find({});
    const filteredUser = users.filter(user => String(user._id) !== String(userId));
    return res.status(200).json(filteredUser);
  } catch (err) {
    return res.status(500).json(err.message);
  }
})


module.exports = router;