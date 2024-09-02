import { request, response } from 'express'
import { User } from '../models/User.js'
import { Doctor } from '../models/Doctor.js'
import { Hospital } from '../models/Hospital.js'

export class SearchController {
  static async search (req = request, res = response) {
    const query = req.query.q

    if (!query) {
      return res.status(400).json({
        ok: false,
        message: 'Missing query parameter'
      })
    }

    const regex = new RegExp(query, 'i')

    try {
      const [users, hospitals, doctors] = await Promise.all([
        User.find({ name: regex }),
        Hospital.find({ name: regex }),
        Doctor.find({ name: regex })
      ])

      const data = users.concat(hospitals).concat(doctors)

      return res.json({
        ok: true,
        message: 'Search successful',
        query,
        data
      })
    } catch (error) {
      console.error(error)
      return res.json({
        ok: false,
        message: 'Search failed'
      })
    }
  }

	static async getDocumentsCollection (req = request, res = response) {
		const {busqueda, tabla } = req.params
		const regex = new RegExp(busqueda, 'i')

		let data

		if (tabla === 'medicos') {
			data = await Doctor.find({ name: regex })
				.populate('user', 'name img')
				.populate('hospital', 'name img')
			return res.json({
				ok: true,
				resultados: data
			})
		} else if (tabla === 'hospitales') {
			data = await Hospital.find({ name: regex }).populate('user', 'name img')
			return res.json({
				ok: true,
				resultados: data
			})
		}
		else if (tabla === 'usuarios') {
			data = await User.find({ name: regex })
			return res.json({
				ok: true,
				resultados: data
			})
		}

		res.status(400).json({
			ok: false,
			message: 'La tabla debe ser medicos, hospitales o usuarios'
		})
	}
}
