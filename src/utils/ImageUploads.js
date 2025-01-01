/**
 * 
 */
import { mkdir } from 'fs/promises';
import { extname, join } from 'path';
export default class ImageUploads {
    constructor() { }

    static async uploadImage(imageArray = []) {// formData
        try {
            const uploadFolder = join(process.cwd(), 'src', 'uploads');
            await mkdir(uploadFolder, { recursive: true });
            const filesNames = [];
            // const image1 = formData.get('image1');
            // const image2 = formData.get('image2');
            // const image3 = formData.get('image3');
            // for (let img of [image1, image2, image3]) {
            for (let img of imageArray) {
                if (img.size > 0) {
                    const fileName = `${Date.now()}${extname(img.name)}`;
                    const filePath = join(uploadFolder, fileName);
                    const arrayBuffer = await img.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    // fs.writeFileSync(filePath, buffer);
                    fs.writeFile(filePath, buffer, (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                    filesNames.push(fileName);
                }
            }
            return filesNames;
        } catch (error) {
            throw new Error(error);
        }
    }
}