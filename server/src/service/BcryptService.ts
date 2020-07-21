import bcrypt, { Error, Hash } from "bcrypt"

const salt = process.env.BCRYPT_SALT || 10;

// encode password
export const encode = (password: string) => {
    bcrypt.hash(password, salt, (err: Error, hash: Hash) => {
        if (err) return null;
        return hash;
    });
}
// decode password

export const compare = (password: string, hashedPassword: string) => {
    bcrypt.compare(password, hashedPassword, (err: Error, result: boolean) => {
        if (err) return null;
        return result
    })
} 