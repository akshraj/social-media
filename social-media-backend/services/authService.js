const bcrypt = require('bcrypt');
const saltRounds = 10;

class AuthService {
  async generateHashedPassword(password) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async validPassword(password, hashedPassword) {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  }
}

module.exports = new AuthService();