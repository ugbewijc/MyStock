/**
 * User Controllerr class handles user business logic inclusing
 * - user registration
 * - User Login
 * - User Log Out
 */

import { loginValidator } from "../../../utils/Validator.js";
import Hasher from "../../../utils/Hasher.js";
import UserModel from "../models/UserModel.js";
import Jwt from "../../../utils/Jwt.js";
import SessionManager from "../../../utils/SessionManager.js";

export default class UserController {
  constructor() { }

  static async login(username, password) {
    // console.log(username, password);
    try {
      //validate input
      if (!username && !password) {
        // throw ('Username or password is empty');
        // console.log(username, password, "Invalid username and password");
        throw Error;
      }

      if (!loginValidator().parse({ username, password })) {
        // console.log(username, password, "Invalid parsing");
        // throw ('username should be valid email abd password should not be empty');
        throw Error;
      }

      // get user details
      const userDetails = await UserModel.getUser({username});
      if(!userDetails){
        // throw ('user not found in db');
        throw Error;
      }
      //check user password
      const validHash = await Hasher.verify(password,userDetails.password);
      if(!validHash){
        // throw ('Incorrect Password');
        throw Error;
      }
      return {
        status: 1, //error
        data:{
          username: userDetails.username
        }
      }

      //Retrun Valid Username
      // return new Response(`${userDetails.username}`,{
      //   status: 200,
      //   statusText: "success",
      // });

    } catch (error) {
      console.log(error);
      // return error;
      // console.error(error.stack)
      // throw new Error( error);
      // throw new Error('Invalid Credentials');
      // return new Response("Invalid User",{
      //   status: 400,
      //   statusText: "Invalid Credentials",
      // });
      return {
        status: 0, //error
        message:"Invalid Credentials"
      }
    }
  }

  static async logout(token) {
    // Add logout logic here
    try {
      const validJwt = await Jwt.verifyToken(token);
      // console.log(validJwt);
      return await SessionManager.deleteSession(validJwt.id);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // static async addUser(username, password) {
  //   try {
  //     //validate input
  //     if (!username && !password) {
  //       throw ('Invalid Credentials');
  //     }
  //     if (!loginValidator().parse({ username, password })) {
  //       throw ('Invalid Credentials');
  //     }

  //     //hash password
  //     const hashedPassword = await Hasher.hash(password);
  //     const saveData = await UserModel.saveUser(username, hashedPassword);
  //     return (`Registered ${saveData.username}\n Congratulation`);
  //     //   return new Response('User registered successfully', { status: 200 });
  //     //   return new Response('Failed to register user', { status: 500 })
  //   } catch (error) {
  //     // console.log(error)
  //     throw new Error('Invalid Credentials');
  //   }
  // }
}
