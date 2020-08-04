import { Role } from '../types/role';
export interface updateStatusRequest {
    userId: number;
    skills?: string[];
    username?: string;
    description?: string;
    role?: Role
}