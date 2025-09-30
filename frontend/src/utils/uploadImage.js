import axios from "axios";
import axiosInstance from "./axiosInstance";
import { API_PATHS } from "./apiPath";

const uploadImage = async(imageFile) =>{
    const formData = new FormData();
    formData.append('image', imageFile);
    try{
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers:{
                'content-type' : 'multipart/form-data',
            },
        });
        return response.data;
    }catch(error){
        console.error('Error uploading the image:', error);
        throw error;
        
    }
};

export default uploadImage;