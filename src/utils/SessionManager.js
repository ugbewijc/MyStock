import { getRepository } from '../api/admin/models/db'
import { MoreThan } from 'typeorm';
export default class SessionManager {
  constructor() { }

  static async getSessionRepository() {
    return getRepository('Session');
  }

  static async createSession(user) {
    try {
      //delete existing session and create a new one
      const userExist = await this.getSessionByUsername(user);
      if (userExist) {
        await this.deleteSession(userExist.id);
      }
      const sessionRepository = await this.getSessionRepository();
      const session = sessionRepository.create({
        user,
        expiresAt: new Date(Date.now() + (60 * 60 * 1000))
      })
      return await sessionRepository.save(session);
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }

  static async validateSession(sessionId, username) {
    const sessionRepository = await this.getSessionRepository();
    return await sessionRepository.findOne({
      where: {
         id: sessionId,
         user: username,
         expiresAt: MoreThan (new Date()) 
        },
      select: ['id', 'user', 'createdAt', 'expiresAt']
    })
  }

  static async getSessionById(sessionId) {
    const sessionRepository = await this.getSessionRepository();
    return await sessionRepository.findOne({
      where: { id: sessionId },
      select: ['id', 'user', 'createdAt', 'expiresAt']
    })
  }

  static async getSessionByUsername(username) {
    const sessionRepository = await this.getSessionRepository();
    return await sessionRepository.findOne({
      where: { user: username },
      select: ['id', 'user', 'createdAt', 'expiresAt']
    })
  }

 static  async updateSession(sessionId, data ) {
    try {
      const sessionRepository = await this.getSessionRepository();
      return await sessionRepository.update(sessionId, data);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteSession(sessionId) {
    const sessionRepository = await this.getSessionRepository();
    return await sessionRepository.delete(sessionId)
  }

  static async deleteExpiredSessions() {
    const sessionRepository = await this.getSessionRepository();
    const now = new Date()
    return await sessionRepository
      .createQueryBuilder()
      .delete()
      .where('expiresAt < :now', { now })
      .execute()
  }
}


//     static async createSession(name) {
//         // sessionData = JSON.stringify({
//         //     name: name,
//         //     expiresAt: Date.now() + 60 * 60 * 1000, // 1-hour expiration
//         // });
//         // // Set the session cookie
//         // cookies.set('mystock', sessionData, {
//         //     httpOnly: true,       // Prevent JavaScript access
//         //     // secure: true,         // Ensure it's only sent over HTTPS
//         //     sameSite: 'strict',   // Mitigate CSRF
//         //     maxAge: 60 * 60,      // 1 hour in seconds
//         //     path: '/admin',            // Available across the entire site
//         // });

//         // return {
//         //     sessionDetail: {
//         //         name: name,
//         //         expiresAt: Date.now() + 60 * 60 * 1000, // 1-hour expiration
//         //         },
//         //     cookiesDetails:{
//         //             httpOnly: true,       // Prevent JavaScript access
//         //             // secure: true,         // Ensure it's only sent over HTTPS
//         //             sameSite: 'strict',   // Mitigate CSRF
//         //             maxAge: 60 * 60,      // 1 hour in seconds
//         //             path: '/admin',            // Available across the entire site
//         //         }
//         // };
//         // response.headers.set('Set-Cookie', cookie);

//         // return new Response('Session created successfully!');
//     }


// // export const createSession = (response, user) => {
// //   const sessionData = JSON.stringify({ userId: user.id, username: user.username });
// //   const cookie = serialize(SESSION_COOKIE_NAME, sessionData, {
// //     httpOnly: true,
// //     maxAge: 60 * 60 * 24, // 1 day
// //     path: '/',
// //   });
// //   response.headers.set('Set-Cookie', cookie);
// // };