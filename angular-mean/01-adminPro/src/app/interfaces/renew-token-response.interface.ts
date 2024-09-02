import { User } from '../models/user.model';

export interface RenewTokenResponse {
	token: string;
	user: User;
	ok: boolean;
}
