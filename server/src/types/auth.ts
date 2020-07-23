import { Role } from "./role";

export interface registerRequest {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    description: string;
    role: Role;
    skills: string[]
}

export interface loginRequest {
    email: string;
    password: string;
}