import axios from "axios";
import { toast } from "sonner";

export const hostSingleImage = async (imageData: File[]) => {
  const url = `https://api.cloudinary.com/v1_1/depy0i4bl/image/upload`;
  const uploadPreset = "my_unsigned_upload"; // Replace with your actual upload preset

  const uploadedUrls = [];

  for (let i = 0; i < imageData.length; i++) {
    const formData = new FormData();
    formData.append("file", imageData[i]);
    formData.append("upload_preset", uploadPreset);
    try {
      const response = await axios.post(url, formData);

      if (response.data && response.data.secure_url) {
        uploadedUrls.push(response.data.secure_url);
      } else {
        console.error("Invalid response data", response.data);
      }
    } catch (error: any) {
      console.error("Upload Error:", error.response);
    }
  }
  return uploadedUrls;
};

// export const hostMultipleImage = async (images: HTMLImageElement[]) => {
//   const uploadPreset = "my_unsigned_upload"; // Replace with your actual upload preset

//   const uploadedUrls = [];

//   for (let i = 0; i < images.length; i++) {
//     const formData = new FormData();
//     formData.append("file", images[i]);
//     formData.append("upload_preset", uploadPreset);

//     try {
//       const response = await axios.post(imageHosting, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (response.data && response.data.secure_url) {
//         uploadedUrls.push(response.data.secure_url);
//       } else {
//         setLoading(false);
//         console.error("Invalid response data", response.data);
//       }
//     } catch (error) {
//       setLoading(false);
//       console.error("Upload Error:", error.response);
//     }
//   }
// };
