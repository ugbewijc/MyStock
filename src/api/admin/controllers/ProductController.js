/**
 * 
 */
import { productValidator } from "../../../utils/Validator";
import ImageUploads from "../../../utils/ImageUploads";
import ProductModel from "../models/ProductModel";
export default class ProductController {
    constructor() { }

    static async allProduct() { }

    // static async oneProduct(){}

    static async addProduct(productDetails) {
        //const formData = await req.formData();
        try {
            const validatedProductDetails = productValidator().parse(productDetails);
            const productAttributes = [];
            for (let spec in productDetails.spec) {
                if (productDetails['spec'][spec] && productDetails['spec-details'][spec]) {
                    // productAttributes.push({ spec: productDetails['spec'][spec], spec_details: productDetails['spec-details'][spec] });
                    productAttributes.push([productDetails['spec'][spec],productDetails['spec-details'][spec]]);
                }
            }
            const {image1, image2, image3} = validatedProductDetails;
            const uploadPic = await ImageUploads.uploadImage([image1, image2, image3]);
            const saveProduct = await ProductModel.addProduct(validatedProductDetails, productAttributes, uploadPic);
            console.log(saveProduct);
        } catch (error) {
            throw new Error(error);
        }
    }

    static async updateProduct() { }

    static async activateDeactivateProduct() { }
}