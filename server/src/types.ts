export type User = {
	id: string;
	firstName: string;
	lastName: string | null;
	username: string | null;
	email: string | null;
	thirdPartyID: string | null;
	thirdPartyProvider: string | null;
	passwordHash?: string | null;
	dateOfBirth: Date | null;
};
