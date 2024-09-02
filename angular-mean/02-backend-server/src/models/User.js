import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  img: {
    type: String
  },
  role: {
    type: String,
    required: true,
    default: 'USER_ROLE'
  },
  google: {
    type: Boolean,
    default: false
  }
})

UserSchema.method('toJSON', function () {
  const { __v, _id, password, ...Object } = this.toObject()
  Object.uuid = _id
  return Object
})

export const User = model('User', UserSchema)
