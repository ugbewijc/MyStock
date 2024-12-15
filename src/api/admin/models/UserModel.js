/**
 * 
 */

import { getRepository } from "./db.js";

export default class UserModel {
    constructor() {}

    static async getUserRepository() {
        return getRepository('User');
    }

    static async saveUser(username, password) {
        try {
            // Get Repository
            const userRepository = await this.getUserRepository();
            // Check if the user exists
            const existingUser = await this.getUser({ username: username });
            if (existingUser) {
                throw 'User already exit';
            }
            // Create a new user
            const newUser = userRepository.create({ username, password });
            // Save the user
            return await userRepository.save(newUser);
        } catch (error) {
            // console.error(error);
            throw error
        }
    }

    static async getUser(userDetails = {}) {
        const userRepository = await this.getUserRepository();
        return await userRepository.findOne({
            where: userDetails,
        });
    }
}