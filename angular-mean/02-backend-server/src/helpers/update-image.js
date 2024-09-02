import {Doctor} from '../models/Doctor.js'
import {Hospital} from '../models/Hospital.js'
import {User} from '../models/User.js'

import fs from 'fs'

const deleteOldImage = (oldPath) => {
	if (fs.existsSync(oldPath)) {
		// Borrar imagen antigua
		fs.unlinkSync(oldPath)
	}
}

export const updateImage = async (tabla, id, fileName) => {

	let oldPath

	switch (tabla) {
		case 'hospitales':
			let hospital
			try {
				hospital = await Hospital.findById(id)
			} catch (error) {
				return false
			}

			if (!hospital) return false

			oldPath = `${process.cwd()}/uploads/${tabla}/${hospital.img}`

			deleteOldImage(oldPath)

			hospital.img = fileName

			try {
				await hospital.save()
				return true
			} catch (error) {
				console.log(error)
				return false
			}

		case 'medicos':
			let medico
			try {
				medico = await Doctor.findById(id)
			} catch (error) {
				return false
			}

			if (!medico) return false

			oldPath = `${process.cwd()}/uploads/${tabla}/${medico.img}`

			deleteOldImage(oldPath)

			medico.img = fileName

			try {
				await medico.save()
				return true
			} catch (error) {
				console.log(error)
				return false
			}
		case 'usuarios':
			let usuario
			try {
				usuario = await User.findById(id)
			} catch (error) {
				return false
			}

			if (!usuario) return false

			oldPath = `${process.cwd()}/uploads/${tabla}/${usuario.img}`

			deleteOldImage(oldPath)

			usuario.img = fileName

			try {
				await usuario.save()
				return true
			} catch (error) {
				console.log(error)
				return false
			}
	}
}
