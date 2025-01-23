import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../consts/consts.js";

const expirationTime =
	process.env.NODE_ENV === "production"
		? 60 * 60 * 2 // 2 hours in production env
		: 60 * 60 * 24 * 7 * 31; // 31 days in dev env

export const generateJWT = (uuid, name) => {
	return new Promise((resolve, reject) => {
		jwt.sign(
			{ uuid, name },
			JWT_SECRET,
			{
				expiresIn: expirationTime,
			},
			(err, token) => {
				if (err) {
					reject("No se pudo generar el JWT");
				}
				resolve(token);
			}
		);
	});
};
