import { defineAction, ActionError } from 'astro:actions';
import { loginValidator, brandValidator, updateBrandValidator, categoryValidator, productValidator } from "../utils/Validator";
import Auth from '../utils/Auth';
import UserController from "../api/admin/controllers/UserController";
import BrandController from '../api/admin/controllers/BrandController';
import CategoryController from '../api/admin/controllers/CategoryController';
import ProductController from '../api/admin/controllers/ProductController';
import BrandModel from '../api/admin/models/BrandModel';
import CategoryModel from '../api/admin/models/CategoryModel';
import ProductModel from '../api/admin/models/ProductModel';

// export const server = {
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
  }),
  allCategory: defineAction({
    handler: async () => {
      const res = await CategoryModel.getAllCategory();
      return res;
    }
  }),
  addCategory: defineAction({
    accept: 'form',
    input: categoryValidator(),
    handler: async (input, context) => {
      const res = await CategoryController.addCategory(input.category.toLowerCase());
      return res;
    }
  }),
  updateCategory: defineAction({
    accept: 'form',
    input: categoryValidator(),
    handler: async (input, context) => {
      // console.log(input);
      if(input.category.toLowerCase() === input.old.toLowerCase()){
        throw new ActionError({
          code: "BAD_REQUEST",
          message: "No change",
        })
      }
      const res = await CategoryController.updateCategory(input.category.toLowerCase(), input.old.toLowerCase());
      return res;
    }
  }),
  allProducts: defineAction({
    handler: async () => {
      const res = await ProductModel.getAllProduct();
      return [];
    }
  }),
  addProduct: defineAction({
    accept: 'form',
    input: productValidator(),
    handler: async (input,context) => {
      const res = await ProductController.addProduct(input,context.request);
      console.log(res)
      return [];
    }
  }),
  updateProduct: defineAction({
    handler: async () => {
      return [];
    }
  })
}