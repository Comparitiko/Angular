import { User } from '../models/User.js'
import { response, request } from 'express'
import bcrypt from 'bcrypt'
import { generateJWT } from '../helpers/jwt.js'

export class UsersController {
  // Methods
  static async getAllUsers (req = request, res = response) {
    const page = req.query.page || 1
    const limit = req.query.limit || 10

    const [users, total] = await Promise.all([
      User
        .find()
        .skip((page - 1) * limit)
        .limit(limit),

      User.countDocuments(),
    ])

    res.json({
      ok: true,
      users,
      uuid: req.uuid,
      total,
      page,
      limit
    })
  }

  static async createUser (req = request, res = response) {
    const { email, password } = req.body

    const user = new User(req.body)
    try {
      const emailExists = await User.findOne({ email })

      if (emailExists) {
        return res.status(400).json({
          ok: false,
          message: 'Email already exists'
        })
      }

      // Encrypt password with a random salt
      const salt = await bcrypt.genSalt()
      user.password = await bcrypt.hash(password, salt)

      const token = await generateJWT(user.id, user.name)

      await user.save()
      res.json({
        ok: true,
        user,
        token
      })
    } catch (error) {
      res.status(500).json({
        ok: false,
        message: 'Error while creating user'
      })
    }
  }

  static async updateUser (req = request, res = response) {
    // TODO: Validate token and check if is the owner of the user
    const { id } = req.params
    if (!id) {
      return res.status(400).json({
        ok: false,
        message: 'User id is required'
      })
    }
    try {
      const user = await User.findById(id)

      if (!user) {
        return res.status(404).json({
          ok: false,
          message: 'User not found'
        })
      }

      // Update user
      const { google, password, email, ...newUserData } = req.body

      if (user.email !== email) {
        // Check if email exists in db
        const emailExists = await User.findOne({ email })
        if (emailExists) {
          return res.status(400).json({
            ok: false,
            message: 'Email already exists'
          })
        }
      }

      newUserData.email = email

      const updatedUser = await User.findByIdAndUpdate(id, newUserData, { new: true })
      console.log(updatedUser)

      res.json({
        ok: true,
        user: updatedUser
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        ok: false,
        message: 'Error while updating user'
      })
    }
  }

  static async deleteUser (req = request, res = response) {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({
        ok: false,
        message: 'User id is required',
        uuid: req.uuid
      })
    }
    try {
      const user = await User.findById(id)

      if (!user) {
        return res.status(404).json({
          ok: false,
          message: 'User not found',
          uuid: req.uuid
        })
      }

      await User.findByIdAndDelete(id)

      res.json({
        ok: true,
        message: 'User deleted',
        uuid: req.uuid
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        ok: false,
        message: 'Error while deleting user',
        uuid: req.uuid
      })
    }
  }
}
