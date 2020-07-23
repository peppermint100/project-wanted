import * as bcrypt from "bcrypt"
import { Error, Hash } from "bcrypt"

const salt = process.env.BCRYPT_SALT || 10;

// encode password
export const encode = (password: string): Promise<string> => {
    let hash: string;
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, salt, (err: Error, hash: Hash) => {
            if (err) reject(err);
            hash = JSON.stringify(hash);
            resolve(hash)
            return;
        })
    });
}
// decode password

export const compare = async (password: string, hashedPassword: string) => {
    await bcrypt.compare(password, hashedPassword, (err: Error, result: boolean) => {
        if (err) return null;
        return result
    })
} 