import { defineAction, ActionError } from 'astro:actions';
import { loginValidator, brandValidator, updateBrandValidator } from "../utils/Validator";
import UserController from "../api/admin/controllers/UserController";
import Auth from '../utils/Auth';
import BrandController from '../api/admin/controllers/BrandController';
import BrandModel from '../api/admin/models/BrandModel';

export const server = {
  login: defineAction({
    accept: 'form',
    input: loginValidator(),
    handler: async (input, context) => {
      // console.log(new Date(Date.now()));
      // console.log(new Date(Date.now() + (  24*60 * 60 * 1000)));  
      const {username, password} = input;
      //authenticate user
      const res = await UserController.login(username.toLowerCase(),password);
      if(!res.status){
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "User must be logged in.",
        });
      }
      return await Auth.authUser(res.data.username);
    }
  }),
  logout: defineAction({
    handler: async (_input, context) => {
      const res = await UserController.logout(context.cookies.get('mystock').value);
      return res.affected;
    }
  }),
  allBrands: defineAction({
    handler: async (_input, context) => {
      // const res = await BrandController.allBrands();
      const res = await BrandModel.getAllBrand();
      return res;
    }
  }),
  addBrand: defineAction({
    accept: 'form',
    input: brandValidator(),
    handler: async (input, context) => {
      const res = await BrandController.addBrand(input.brand.toLowerCase());
      return res;
    }
  }),
  updateBrand: defineAction({
    accept: 'form',
    input: updateBrandValidator(),
    handler: async (input, context) => {
      if(input.brand.toLowerCase() === input.old.toLowerCase()){
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "No change",
        })
      }
      const res = await BrandController.updateBrand(input.brand.toLowerCase(), input.old.toLowerCase());
      return res;
    }
  })
}