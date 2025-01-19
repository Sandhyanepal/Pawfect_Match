const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['Individual', 'Organization', 'Admin'], // Only these two roles are allowed
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: String,
  verificationTokenExpiry: Date,
  resetPasswordToken: String,
  resetPasswordExpiry: Date,
})

userSchema.pre('save', async function (req, res) {
  const salt = await bcrypt.genSaltSync(10)
  this.password = await bcrypt.hash(this.password, salt)
})
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}
module.exports = mongoose.model('User', userSchema)
