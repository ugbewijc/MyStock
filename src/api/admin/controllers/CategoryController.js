/**
 * 
 */
import CategoryModel from '../models/CategoryModel.js';
import { categoryValidator } from '../../../utils/Validator.js';

export default class CategoryController {

    constructor() { }

    static async addCategory(name) {
        const category = name.toLowerCase();
        try {
            if (!categoryValidator().parse({ category })) {
                // console.log('Invalid parsing');
                throw new Error('Invalid Category');
            }
            const categoryExists = await CategoryModel.getCategoryByName(category);
            if (categoryExists) {
                throw new Error('Category already exist');
            }
            return await CategoryModel.createCategory(category);
        } catch (error) {
            console.log(error);
            throw error
        }
    }


    static async updateCategory(new_name, old_name) {
        const newName = new_name.toLowerCase();
        const oldName = old_name.toLowerCase();
        try {
            if (oldName === newName) {
                throw new Error('No change');
            }
            if (!categoryValidator().parse({ category: newName, old: oldName })) {
                // console.log('Invalid parsing');
                throw new Error('Invalid Category Name');
            }
            const categoryExists = await CategoryModel.getCategoryByName(newName);
            if (categoryExists) {
                throw new Error('Category Name already exist');
            }
            return await CategoryModel.updateCategory(newName, oldName);
        } catch (error) {
            // console.log(error);
            throw error
        }
    }
}