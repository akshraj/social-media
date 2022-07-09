const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

//create a post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    return res.status(200).json(savePost)
  } catch (err) {
    return res.status(500).json(err.message)
  }
});

//update a post
router.put('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post.userId === req.body.userId) {
      const updatedPost = await post.updateOne({
        $set: req.body
      });
      return res.status(200).json('the post has been updated')
    } else {
      res.status(403).json('you can update only your post')
    }
  } catch (err) {
    return res.status(500).json(err.message)
  }
})

//delete a post

router.delete('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      return res.status(200).json('the post has been deleted')
    } else {
      res.status(403).json('you can delete only your post')
    }
  } catch (err) {
    return res.status(500).json(err.message)
  }
})

//like a post

router.put('/:postId/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      return res.status(200).json('You liked the post')
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      return res.status(200).json('You unliked the post');
    }
  } catch (err) {
    return res.status(500).json(err.message)
  }
})


//get a post

router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    return res.status(200).json(post)
  } catch (err) {
    return res.status(500).json(err)
  }
})


//get user's all posts

router.get('/timeline/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId)
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendsPosts = await Promise.all(
      currentUser.followings.map(friendId => Post.find({ userId: friendId }))
    );

    let posts = userPosts.concat(...friendsPosts);

    posts = posts.sort((a, b) => b.createdAt - a.createdAt);

    return res.status(200).json(posts);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json(err.message);
  }
});

//get single user's post
router.get('/profile/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    const userPosts = await Post.find({ userId: user._id }).sort({ 'createdAt': -1 });
    return res.status(200).json(userPosts)
  } catch (err) {
    console.log(err.message);
    return res.status(500).json(err.message);
  }
});


module.exports = router;