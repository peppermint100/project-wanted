import * as jsonwebtoken from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET || "secret"

// create jwt
export const generateToken = (email: string) => {
    let token = jsonwebtoken.sign(
        {
            email,
        },
        SECRET,
        {
            expiresIn: "1h",
        }
    );

    return token;
};

// validate jwt
export const verifyToken = (token: string) => {
    try {
        let decoded = jsonwebtoken.verify(token, SECRET);
        return decoded;
    } catch (TokenExpiredError) {
        return TokenExpiredError;
    }
};


