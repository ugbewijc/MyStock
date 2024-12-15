/**
 * 
 */
import jwt from 'jsonwebtoken';
export default class Jwt {
    constructor() { }

    static async createToken(payload) {
        try {
            const jwt_key = process.env.JWT_SECRET || 'secret';
            return jwt.sign(payload, jwt_key, { expiresIn: '30d' });
        } catch (error) {
            // console.log(error);
            return error
        }

    }
    static async verifyToken(token) {
        const jwt_key = process.env.JWT_SECRET || 'secret';
        try {
            const decoded = jwt.verify(token, jwt_key);
            return decoded;  // Returns the decoded payload if the token is valid
        } catch (error) {
            throw error
            // console.log(error);
            // throw new Error('Invalid or expired token');
        }
    }
}