import { request, response } from 'express'
import { Doctor } from '../models/Doctor.js'
import { Hospital } from '../models/Hospital.js'

export class DoctorsController {
  static async getAllDoctors (req = request, res = response) {
    const doctors = await Doctor.find()
      .populate('hospital', 'name img')
      .populate('user', 'name img')

    return res.json({
      ok: true,
      doctors
    })
  }

  static async createDoctor (req = request, res = response) {
    const { name, lastName, hospital, dni } = req.body

    const hospitalExists = await Hospital.findById(hospital)

    if (!hospitalExists) {
      return res.json({
        ok: false,
        message: 'Hospital does not exist'
      })
    }

    const doctor = new Doctor({ dni, name, lastName, hospital, user: req.uuid })

    const doctorExists = await Doctor.findOne({ dni })

    if (doctorExists) {
      return res.json({
        ok: false,
        message: 'Doctor already exists'
      })
    }

    try {
      await doctor.save()
      return res.json({
        ok: true,
        message: 'Doctor created',
        doctor
      })
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: 'Error while creating doctor'
      })
    }
  }

  static async updateDoctor (req = request, res = response) {
    const { id } = req.params
		const { hospital} = req.body

    try {
			const doctor = await Doctor.findById(id)

			if (!doctor) {
				return res.status(404).json({
					ok: false,
					message: 'Doctor not found'
				})
			}



			let hospitalDB

			if (hospital) {
				hospitalDB = await Hospital.findById(hospital)

				if (!hospitalDB) {
					return res.status(404).json({
						ok: false,
						message: 'Hospital not found'
					})
				}
			}

			const cambiosDoctor = {
				...req.body,
				user: req.uuid
			}

			const doctorUpdated = await Doctor.findOneAndUpdate({ _id: id }, cambiosDoctor, { new: true })

			res.json({
				ok: true,
				message: 'Doctor updated',
				doctor: doctorUpdated
			})

		} catch (error) {
			res.status(500).json({
				ok: false,
				message: 'Error while updating doctor, talk to the admin'
			})
		}
  }

  static async deleteDoctor (req = request, res = response) {
    const { id } = req.params

    try {
			const deletedDoctor = await Doctor.findByIdAndDelete(id)

			res.json({
				ok: true,
				message: 'Doctor deleted',
				doctor: deletedDoctor
			})
		} catch (error) {
			res.status(500).json({
				ok: false,
				message: 'Error while deleting doctor, talk to the admin'
			})
		}
  }
}
