import bcrypt from 'bcrypt';

export default class Hasher {
    constructor() { }
    static async hash(elemet) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(elemet, salt);
    }
    static async verify(element, hashedElement) {
        return await bcrypt.compare(element, hashedElement);
    }
}