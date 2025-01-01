/**
 * 
 */
import { getRepository } from "./db.js";
import { ProductAttribute } from "./entity/ProductAttribute.js";
import { Product } from "./entity/ProductEntity.js";

export default class ProductModel {
    constructor() { }

    static async getProductRepository() {
        return await getRepository('Product');
    }
    // static async getProductRepository() {
    //     return getRepository('Product');
    // }

    static async getAllProduct() {
        const productRepository = await this.getProductRepository();
        const res = await productRepository.find()
        console.log('get all product', res);
        // return await productRepository.find({
        //     select: {
        //         id: true,
        //         name: true,
        //     },
        //     order: { name: "ASC" }
        // });
    }
    static async getProductByName(product_name) {
        const name = product_name.toLowerCase();
        const productRepository = await this.getProductRepository();
        return await productRepository.findOne({ where: { name } });
    }

    static async addProduct(productDetails, productAttributes, uploadPic) {
        // console.log(productDetails, productAttributes, uploadPic);
        const dataSource = await getRepository(); //get data source
        const queryRunner = await dataSource.createQueryRunner(); // Start transaction
        // console.log(queryRunner)
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const productRepository = await this.getProductRepository(); // get product repo
        const productAttributesRepository = await getRepository('ProductAttribute'); // get productAttributes repo
        try {
            const product = { // create product
                    name: productDetails?.name,
                    description: productDetails?.description || '',
                    brandId: Number(productDetails?.brand),
                    categoryId: Number(productDetails?.category),
                    image1: uploadPic[0] || '',
                    image2: uploadPic[1] || '',
                    image3: uploadPic[2] || '',
                    brand_id: Number(productDetails?.brand),
                    category_id: Number(productDetails?.category)
                };
               const savedProduct = await queryRunner.manager.save(Product, product)
               console.log('savedProduct',savedProduct);
                const savedAttributeArray =[]
                const attributeObject= productAttributes.map(async (attr) => {
                    const savedAttribute = await queryRunner.manager.save(ProductAttribute, {
                        attribute: [attr[0],attr[1]],
                        productId:savedProduct.id,
                        product_id: savedProduct
                    });
                    return savedAttribute;         
                })
                const whtf = attributeObject.then((val) => {
                    console.log(val);
                    return val;
                });
                console.log(whtf, savedAttributeArray);
                // commit transaction now:
                await queryRunner.commitTransaction()
                // const savedDatat = await dataSource.manager.transaction(async (transactionalEntityManager) => {
                //     const savedProduct = await transactionalEntityManager.save(Product, product);
                //     // photo1.user = savedUser;
                //     // photo2.user = savedUser;
                //     console.log(savedProduct);
                //     // const savedAttributeArray =[]
                //     // const attributeObject= productAttributes.map(async (attr) => {
                //     //     const savedAttribute = await transactionalEntityManager.save(ProductAttribute, {
                //     //         attribute: [attr[0],attr[1]],
                //     //         product_id:savedProduct.id
                    //     });
                    //     savedAttributeArray.push(savedAttribute)
                    //     console.log(savedAttribute)
                    // })
                    // console.log(savedAttributeArray);
                
                    // await transactionalEntityManager.save(Photo, photo1);
                    // await transactionalEntityManager.save(Photo, photo2);
                //   });
            // const product = await queryRunner.manager.save(Product, {
            //     name: productDetails.name,
            //     description: productDetails.description || '',
            //     image1: uploadPic[0] || '',
            //     image2: uploadPic[1] || '',
            //     image3: uploadPic[2] || '',
            //     brand_id: Number(productDetails.brand),
            //     category_id: Number(productDetails.category)
            //   });
            //   console.log('product',product);
            //   const attributes = await productAttributes.map(async (attr) => {
            //     const attribute = await queryRunner.manager.save(ProductAttribute, {
            //       attribute: attr,
            //       product_id: product.id
            //     });
            //     console.log(attribute);
            //     return attribute;
            //   });
            // console.log(await attributes);
            // //   const savedAttributes = await Promise.all(attributes.map(attribute => queryRunner.manager.save(attribute)));
            
            // //   const savedProduct = await queryRunner.manager.save(product);
            
            //   await queryRunner.commitTransaction();
            // //   console.log(savedProduct, savedAttributes);
            // // const product = new Product();
            // product.name = productDetails.name;
            // product.description = productDetails.description || '';
            // product.image1 = uploadPic[0] || '';
            // product.image2 = uploadPic[1] || '';
            // product.image3 = uploadPic[2] || '';
            // product.brandId = Number(productDetails.brand);
            // product.categoryId = Number(productDetails.category);
            // const savedProduct = await queryRunner.manager.save(product);
            // const product = productRepository.create();
            // const product = productRepository.create();
            // product.name = productDetails?.name;
            // product.description = productDetails?.description || '';
            // product.image1 = uploadPic[0] || '';
            // product.image2 = uploadPic[1] || '';
            // product.image3 = uploadPic[2] || '';
            // product.brand_id = Number(productDetails?.brand);
            // product.category_id = Number(productDetails?.category);

            //   const savedProduct = await queryRunner.manager.save(product) //await productRepository.save(product);
            // console.log(savedProduct);
            // const product = productRepository.create({ // create product
            //     name: productDetails?.name,
            //     description: productDetails?.description || '',
            //     image1: uploadPic[0] || '',
            //     image2: uploadPic[1] || '',
            //     image3: uploadPic[2] || '',
            //     brand_id: Number(productDetails?.brand),
            //     category_id: Number(productDetails?.category)
            // });
            // const savedProduct = await queryRunner.manager.save(product); // Save product within transaction
            // const attributePromises = productAttributes.map(async (attr) => {// Create and save attributes
            //     // const attribute = productAttributesRepository.create();
            //     // attribute.attribute = attr;
            //     // attribute.product_id = savedProduct.id;
            //     // return await queryRunner.manager.save(attribute);
            // })
            // const savedAttributes = await Promise.all(attributePromises);
            // await queryRunner.commitTransaction(); // Commit transaction
            // return {
            //     product: savedProduct,
            //     attributes: savedAttributes
            // }
        } catch (error) {
            await queryRunner.rollbackTransaction(); // Rollback transaction on error
            console.log(error);
            // throw error;
        } finally {
            await queryRunner.release(); // Release query runner
        }
    }
}