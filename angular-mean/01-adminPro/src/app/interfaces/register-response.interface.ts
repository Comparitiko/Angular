import { User } from '../models/user.model';

export interface RegisterResponse {
	ok: boolean;
	token: string;
	user: User;
}
