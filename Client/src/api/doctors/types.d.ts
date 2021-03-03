export type Doctor = {
    id: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string; // ISO string
    contactPhone: string;
    consultPrice: number;
};

export type CreateDoctorPayload = {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    contactPhone: string;
    consultPrice: number;
    email: string;
    password: string;
    specialties: string[];
};
