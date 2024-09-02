import { request, response } from 'express'
import { Hospital } from '../models/Hospital.js'

export class HospitalsController {
  static async getAllHospitals (req = request, res = response) {
    const hospitals = await Hospital.find().populate('user', 'name img')

    res.json({
      ok: true,
      hospitals
    })
  }

  static async createHospital (req = request, res = response) {
    const { name } = req.body

    const hospital = new Hospital({ name, user: req.uuid })

    const hospitalExists = await Hospital.findOne({ name })

    if (hospitalExists) {
      return res.status(400).json({
        ok: false,
        message: 'Hospital already exists'
      })
    }

    try {
      await hospital.save()

      return res.json({
        ok: true,
        message: 'Hospital created',
        hospital
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        ok: false,
        message: 'Error while saving hospital on database'
      })
    }
  }

  static async updateHospital (req = request, res = response) {

		const { id } = req.params
		const { name } = req.body

		try {
			const hospital = await Hospital.findById(id)

			if (!hospital) {
				return res.status(404).json({
					ok: false,
					message: 'Hospital not found'
				})
			}

			const cambiosHospital = {
				...req.body,
				user: req.uuid
			}

			const hospitalUpdated = await Hospital.findOneAndUpdate({ _id: id }, cambiosHospital, { new: true })

			res.json({
				ok: true,
				message: 'Hospital updated',
				hospital: hospitalUpdated
			})

		} catch (error) {
			res.status(500).json({
				ok: false,
				message: 'Error while updating hospital, talk to the admin'
			})
		}
  }

  static async deleteHospital (req = request, res = response) {

		const { id } = req.params

    try {
			const deletedHospital = await Hospital.findByIdAndDelete(id)

			res.json({
				ok: true,
				message: 'Hospital deleted',
				hospital: deletedHospital
			})
		} catch (error) {
			res.status(500).json({
				ok: false,
				message: 'Error while deleting hospital, talk to the admin'
			})
		}
  }
}
