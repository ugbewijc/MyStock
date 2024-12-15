#!/usr/bin/node
/**
 * 
 */

import Hasher from "../src/utils/Hasher.js";
import UserModel from "../src/api/admin/models/UserModel.js";

const newUser = async () => {
    try {
        if (!username || !password) {
            console.log("Username or Password cannot be empty");
            process.exit();
        }
        const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
        if (!emailReg.test(username)) {
            console.log("Invalid email");
            process.exit();
        }
        const hashedPassword = await Hasher.hash(password);
        const saveData = await UserModel.saveUser(username.toLocaleLowerCase(), hashedPassword);
        if (saveData?.username) {
            console.log(`Registered ${saveData.username}\nCongratulation`);
        }
    } catch (error) {
        console.log(error)
        process.exit();
    }
}

const args = process.argv.slice(2);
const [username, password] = args;
await newUser(username, password)//console.log()