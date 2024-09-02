import { request, response } from "express";
import {randomUUID} from 'crypto'
import { updateImage } from "../helpers/update-image.js";
import mongoose from "mongoose";
import {existsSync} from "fs";


export class UploadController {

	static async getImage (req = request, res = response) {
		const { tabla, imagen } = req.params

		const filePath = `${process.cwd()}/uploads/${tabla}/${imagen}`

		if (!existsSync(filePath)) {
			return res.sendFile(`${process.cwd()}/uploads/default/no-img.jpg`)
		}

		res.sendFile(filePath)
	}
	static async upload (req = request, res = response) {

		const { tabla, id } = req.params

		if (!mongoose.isValidObjectId(id)) {
			return res.status(400).json({
				ok: false,
				message: 'Invalid id'
			})
		}

		const tiposValidos = ['hospitales', 'medicos', 'usuarios']

		if (!tiposValidos.includes(tabla)) {
			return res.status(400).json({
				ok: false,
				message: 'Solo se pueden subir imagenes de hospitales, medicos y usuarios'
			})
		}

		// validar que exista un archivo
		if (!req.files || Object.keys(req.files).length === 0) {
			return res.status(400).json({
				ok: false,
				message: 'No files were uploaded.'
			});
		}

		// Procesar la imagen
		const file = req.files.image

		const fileExtension = file.name.split('.').pop()

		// Validar extension
		const validExtensions = ['jpg', 'jpeg', 'png', 'gif']

		if (!validExtensions.includes(fileExtension)) {
			return res.status(400).json({
				ok: false,
				message: 'Invalid file extension'
			})
		}

		// Generar el nombre del archivo
		const uuid = randomUUID().toString()
		const fileName = `${uuid}.${fileExtension}`

		// Path para guardar el archivo
		const filePath = `${process.cwd()}/uploads/${tabla}/${fileName}`

		// Mover el archivo
		file.mv(filePath, (err) => {
			if (err) {
				console.log(err)
				return res.status(500).json({
					ok: false,
					message: 'Error saving file',
				})
			}
		})

		// Actualizar la base de datos
		if (await updateImage(tabla, id, fileName)) {
			res.json({
				ok: true,
				message: 'Uploaded successfully',
				fileName
			})
		} else {
			res.status(500).json({
				ok: false,
				message: 'Error uploading file'
			})
		}
	}
}
