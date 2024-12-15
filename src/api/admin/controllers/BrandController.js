/***
 * 
 */

import { brandValidator } from "../../../utils/Validator";
import BrandModel from "../models/BrandModel";
export default class BrandController{

    constructor(){}

    // static async allBrands(){
    //     return "Brands";
    // }

    static async addBrand(name){
        const brand = name.toLowerCase();
       try {
        if(!brandValidator().parse({brand})){
            console.log('Invalid parsing');
            throw new Error('Invalid Brand');
        }
        const brandExists = await BrandModel.getBrandByName(brand);
        if(brandExists){
            throw new Error('Brand already exist');
        }
        return await BrandModel.createBrand(brand);
        // console.log("add brand",addBrand);
       } catch (error) {
        // console.log(error);
        throw error
       }
    }

    static async updateBrand(new_name, old_name){
        const newName = new_name.toLowerCase();
        const oldName = old_name.toLowerCase();
        try {
            if(oldName === newName){
                throw new Error('No change');
            }
            if(!brandValidator().parse({brand: newName, old: oldName})){
                // console.log('Invalid parsing');
                throw new Error('Invalid Brand Name');
            }
            const brandExists = await BrandModel.getBrandByName(newName);
            if(brandExists){
                throw new Error('Brand Name already exist');
            }
            return await BrandModel.updateBrand(newName, oldName);
        } catch (error) {
            // console.log(error);
            throw error
        }   
    }
}