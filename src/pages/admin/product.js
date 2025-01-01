import ImageUploads from '../../utils/ImageUploads';

export async function POST({ params, request }) {
  const formData = await request.formData();
  const uploadPic =await ImageUploads.uploadImage(formData);
  console.log(uploadPic);
};