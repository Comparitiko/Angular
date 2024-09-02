import { request, response } from 'express'
import { User } from '../models/User.js'
import bcrypt from 'bcrypt'
import { googleVerify } from '../helpers/google-verify.js'
import { validateJwt } from '../middlewares/validate-jwt.js'
import { generateJWT } from '../helpers/jwt.js'

export class AuthController {
	static async renewToken (req = request, res = response) {
		const uuid = req.uuid

		const userDb = await User.findById(uuid)

		if (!userDb) {
			return res.status(401).json({
				ok: false,
				message: 'Invalid token'
			})
		}

		const token = await generateJWT(uuid, userDb.name)

		res.json({
			ok: true,
			user: userDb,
			token
		})
	}
	static async loginGoogle (req = request, res = response) {
		const { token } = req.body

		try {
			const {email, name, family_name, picture } = await googleVerify(token)

			const userDb = await User.findOne({ email })

			let user

			if (!userDb) {
				user = new User({
					email,
					name,
					lastName: family_name,
					password: '!#$%@',
					img: picture,
					google: true
				})
			} else {
				user = userDb
				user.google = true
			}

			// Save user
			user.save()

			// Create JWT
			const jwtToken = await generateJWT(user.id)

			res.cookie('token', jwtToken, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: 1000 * 60 * 60 * 24 * 30
			})
			res.json({
				ok: true,
				message: 'Logged in successfully',
				email,
				name,
				family_name,
				picture,
				token: jwtToken
			})

		} catch (error) {
			console.log(error)
			return res.status(400).json({
				ok: false,
				message: 'Google token is invalid'
			})
		}

	}
  static async login (req = request, res = response) {
    const { email, password } = req.body

    try {
      const dbUser = await User.findOne({ email })

      // Check if user exists on database
      if (!dbUser) {
        return res.status(401).json({
          ok: false,
          message: 'Invalid email or password'
        })
      }

      // Compare passwords
      const validPassword = await bcrypt.compare(password, dbUser.password)

      if (!validPassword) {
        return res.status(401).json({
          ok: false,
          message: 'Invalid email or password'
        })
      }

      // Create token
      const token = await generateJWT(dbUser.id, dbUser.name)

      res.json({
        ok: true,
        token,
        message: 'Logged in successfully'
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        ok: false,
        message: 'Internal server error'
      })
    }
  }
}
