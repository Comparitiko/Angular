import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_SECRET);

export async function googleVerify(token) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_ID, // Specify the CLIENT_ID of the app that accesses the backend
		// Or, if multiple clients access the backend:
		// [CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
	});
	const { email, name, family_name, picture } = ticket.getPayload();
	return { email, name, family_name, picture };
	// If the request specified a Google Workspace domain:
	// const domain = payload['hd'];
}
