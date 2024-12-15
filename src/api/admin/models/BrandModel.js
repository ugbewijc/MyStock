/**
 * 
 */

import { getRepository } from "./db";

export default class BrandModel {
    constructor() { }
    static async getBrandRepository() {
        return getRepository('Brand');
    }

    static async getAllBrand() {
        const brandRepository = await this.getBrandRepository();
        return await brandRepository.find({
            select: {
                id: true,
                name: true,
            },
            order: { name: "ASC" }
        });
    }
    static async getBrandByName(brand_name) {
        const name = brand_name.toLowerCase();
        const brandRepository = await this.getBrandRepository();
        return await brandRepository.findOne({ where: { name } });
    }

    static async createBrand(brand_name) {
        const name = brand_name.toLowerCase();
        const brandRepository = await this.getBrandRepository();
        const brand = brandRepository.create({ name });
        return await brandRepository.save(brand);
    }

    static async updateBrand(new_name, old_name) {
        const newName = new_name.toLowerCase();
        const oldName = old_name.toLowerCase();
        const brandRepository = await this.getBrandRepository();
        const brand = await brandRepository.findOne({ where: { name: oldName } });
        if (brand) {
            brand.name = newName;
            return await brandRepository.save(brand);
        }
     }
}