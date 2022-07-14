const router = require('express').Router();
const AuthService = require('../services/authService');
const User = require('../models/User')
const fs = require('fs');
const path = require('path');

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
      const userProfile = await User.findById(req.params.id)
      if (req.body.profilePicture && !req.body.firstTime) {
        const oldPath = path.join(__dirname, "..", "public/images", userProfile.profilePicture);
        console.log('fs.existsSync(oldPath)', fs.existsSync(oldPath))
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            return res.status(200).send('photo removed successfully');
          });
        }
      }
      await User.findByIdAndUpdate(req.params.id, {
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
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    return res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err)
  }
});


//get all friend requests

router.get('/:id/friend-requests', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const requestReceivedByUsers = await Promise.all(
      user.requestReceived.map(user => User.findById(user))
    );
    // const { requestSend, requestReceived, updatedAt, ...other } = requestReceivedByUsers._doc;
    return res.status(200).json(requestReceivedByUsers);
  } catch (err) {
    return res.status(500).json(err)
  }
});




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
      user.friends.map(user => User.findById(user)
      )
    );
    res.status(200).json(followings);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

//get suggested friends list

router.get('/:id/all', async (req, res) => {
  const userId = req.params.id;
  try {
    const users = await User.find({});
    const filteredUser = users.filter(user => {
      return String(user._id) !== String(userId) && user.friends.includes(userId) !== true && user.requestSend.includes(userId) !== true;
    });
    return res.status(200).json(filteredUser);
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

//send request to user

router.put("/:id/send-request", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.requestReceived.includes(req.body.userId)) {
        await Promise.all(
          [currentUser.updateOne({ $push: { requestSend: req.params.id } }), user.updateOne({ $push: { requestReceived: req.body.userId } })]
        );
        return res.status(200).json("request sent");
      } else {
        await Promise.all([user.updateOne({ $pull: { requestReceived: req.body.userId } }),
        currentUser.updateOne({ $pull: { requestSend: req.params.id } })])

        return res.status(200).json("request is cancelled");
      }
    } catch (err) {
      return res.status(500).json(err.message);
    }
  } else {
    res.status(403).json("you can not send request to yourself")
  }
})


//get list of pending requests for current user
router.get('/:id/pending-requests', async (req, res) => {
  try {
    const currentUserId = req.params.id;
    const currentUser = await User.findById(currentUserId);
    const pendingRequests = await Promise.all(
      currentUser.requestReceived.map(user => User.findById(user))
    );

    const filteredResult = pendingRequests.map(user => {
      const { username, profilePicture, _id } = user;
      return { username, profilePicture, _id }
    });

    return res.status(200).json(filteredResult);
  } catch (err) {
    return res.status(500).json(err.message);
  }
})


//action on pending requests

router.put('/:id/pending-request-actions', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const action = req.body.status;
    const currentUser = await User.findById(req.body.userId);

    if (req.params.id !== req.body.userId) {

      if (action === 1) {
        await Promise.all([
          currentUser.updateOne({ $push: { friends: req.params.id } }),
          user.updateOne({ $push: { friends: req.body.userId } }),
          user.updateOne({ $pull: { requestSend: req.body.userId } }),
          currentUser.updateOne({ $pull: { requestReceived: req.params.id } })
        ])
        return res.status(200).json({ message: "friend request accepted", accepted: true });
      } else if (action === 2) {
        await Promise.all([
          user.updateOne({ $pull: { requestSend: req.body.userId } }),
          currentUser.updateOne({ $pull: { requestReceived: req.params.id } })
        ])
        return res.status(200).json({ message: "friend request rejected", rejected: true });
      }
    }
  } catch (err) {
    return res.status(500).json(err.message)
  }

})



module.exports = router;