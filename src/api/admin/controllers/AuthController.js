/**
 * Auth.js  credential-based authentication
 */



// import { auth } from '@auth/core';
// import { AppDataSource } from '../../db';
// import { User } from '../../db/entity/User';
// import Hasher from '../../../utils/Hasher';

// const authHandler = auth({
//   providers: [
//     {
//       id: 'credentials',
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         const user = await AppDataSource.getRepository(User).findOneBy({
//           email: credentials.email,
//         });

//         if (user && await Hasher.verify(user.password, credentials.password)) {
//             console.log(user)
//           return user;
//         }
//         return null;
//       },
//     },
//   ],
//   session: {
//     strategy: 'database',
//     maxAge: 24 * 60 * 60, // Session expiration (24 hours)
//     updateAge: 60 * 60, // Update session every hour
//   },
//   cookies: {
//     sessionToken: {
//       name: 'session_token', 
//       httpOnly: true, // Ensures the cookie is not accessible via JavaScript
//       secure: process.env.NODE_ENV === 'production', // Only set secure cookies in production
//       sameSite: 'strict', // Prevents CSRF attacks by ensuring cookies are sent only from same site
//     },
//   },
//   secret: process.env.AUTH_SECRET || 'secret', // Set a secret for sessions
// });

// export default authHandler;


// import { auth } from '@auth/core';
// import { AppDataSource } from '../../db'; // Import the data source
// import { User } from '../../db/entity/User'; // Import the User entity

// const authHandler = auth({
//   providers: [
//     {
//       id: 'credentials',
//       name: 'Credentials',
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const user = await AppDataSource.getRepository(User).findOneBy({
//           email: credentials.email,
//         });

//         if (user && user.password === credentials.password) {
//           return user;
//         }
//         return null;
//       },
//     },
//   ],
//   session: {
//     strategy: 'database', // Use database session store
//   },
//   pages: {
//     signIn: '/login', // Specify a custom login page (optional)
//   },
//   secret: process.env.AUTH_SECRET || 'secret', // Set your secret
// });

// export default authHandler;
