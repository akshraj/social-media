class Auth {
  city;
  coverPicture;
  createdAt;
  desc;
  email;
  followers;
  followings;
  from;
  isAdmin;
  profilePicture;
  relationship;
  username;
  _id;
  constructor(user) {
    this.city = user.city
    this.coverPicture = user.coverPicture
    this.createdAt = user.createdAt
    this.desc = user.desc
    this.email = user.email
    this.followers = user.followers,
      this.followings = user.followings,
      this.from = user.from,
      this.isAdmin = user.isAdmin,
      this.profilePicture = user.profilePicture,
      this.relationship = user.relationship,
      this.username = user.username,
      this._id = user._id
  }
}

module.exports = Auth;