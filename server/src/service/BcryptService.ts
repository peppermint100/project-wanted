import bcrypt, { Error, Hash } from "bcrypt"

const salt = process.env.BCRYPT_SALT || 10;

// encode password
export const encode = (password: string): string | null => {
    bcrypt.hash(password, salt, (err: Error, hash: Hash) => {
        if (err) return null;
        return JSON.stringify(hash);
    });
    return null;
}
// decode password

export const compare = async (password: string, hashedPassword: string) => {
    await bcrypt.compare(password, hashedPassword, (err: Error, result: boolean) => {
        if (err) return null;
        return result
    })
} 