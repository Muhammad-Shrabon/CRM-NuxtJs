import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);

  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' });
  }

  const file = formData[0]; // first file
  const uploadResult = await cloudinary.uploader.upload_stream(
    { resource_type: "auto" }, // auto handles image, pdf, zip, etc.
    (error, result) => {
      if (error) throw createError({ statusCode: 500, statusMessage: error.message });
      return result;
    }
  );

  return uploadResult;
});
