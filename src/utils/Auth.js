/**
 * 
 */
import SessionManager from "./SessionManager";
import Jwt from "./Jwt";
export default class Auth {
    constructor() { }
    static async authUser(user) {
        try {
            //create session
            const session = await SessionManager.createSession(user);
            const userDetails = {
                'id': session.id,
                'name': session.user
            };
            return await Jwt.createToken(userDetails);
        } catch (error) {
            // console.log(error);
            return error
        }
    }
    static async verifyAuth(token) {
        try {            
        const decoded = await Jwt.verifyToken(token);
        if(!decoded){
            return false;
        }
        const session = await SessionManager.validateSession(decoded.id, decoded.name);
        if(!session){
            return false;
        }
        const updateSession = await SessionManager.updateSession(session.id, { expiresAt: new Date(Date.now() + ( 60 * 60 * 1000))});
        if(!updateSession){
            return false;
        }
        return decoded.name;
            
        } catch (error) {
            // console.log(error);
            return false
        }
    }

    // static async deleteAuth(token) {
    //     try {
    //         const decoded = await Jwt.verifyToken(token);
    //         if(!decoded){
    //             throw new Error('Invalid or expired token');
    //         }
    //         // const session = await SessionManager.validateSession(decoded.id, decoded.name);
    //         // if(!session){
    //         //     return false;
    //         // }
    //         const deleteSession = await SessionManager.deleteSession(decoded.id);
    //         // if(!deleteSession){
    //         //     return false;
    //         // }
    //         return true;
    //     } catch (error) {
    //         // console.log(error);
    //         return true;
    //     }
    // }
}
