/**
 * 
 */

import { getRepository } from "./db";

export default class CategoryModel {
    constructor() { }
    static async getCategoryRepository() {
        return getRepository('Category');
    }

    static async getAllCategory() {
        const categoryRepository = await this.getCategoryRepository();
        return await categoryRepository.find({
            select: {
                id: true,
                name: true,
            },
            order: { name: "ASC" }
        });
    }
    static async getCategoryByName(category_name) {
        const name = category_name.toLowerCase();
        const categoryRepository = await this.getCategoryRepository();
        return await categoryRepository.findOne({ where: { name } });
    }

    static async createCategory(category_name) {
        const name = category_name.toLowerCase();
        const categoryRepository = await this.getCategoryRepository();
        const category = categoryRepository.create({ name });
        return await categoryRepository.save(category);
    }

    static async updateCategory(new_name, old_name) {
        const newName = new_name.toLowerCase();
        const oldName = old_name.toLowerCase();
        const categoryRepository = await this.getCategoryRepository();
        const category = await categoryRepository.findOne({ where: { name: oldName } });
        if (category) {
            category.name = newName;
            return await categoryRepository.save(category);
        }
     }
}