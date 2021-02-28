export type Token = {
    access_token: string;
    expires_in: number;
};

export type LoginPayload = {
    email: string;
    password: string;
};

export type SignUpPayload = {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    password: string;
};
