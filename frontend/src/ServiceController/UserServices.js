import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1'

class UserServices {

    static async getAllUsers(){

        try{
            const response = await axios.get(`${API_URL}/getUsers`);
            return response.data;
        }catch(error){
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    static async getUserById(userId){

        try{
            const response = await axios.get(`${API_URL}/getUserById/${userId}`);
            return response.data;
        }catch(error){
            console.error("Error fetching user by ID:", error);
            throw error;       
        }
    }

    static async getUserFriends(userId){
        
        try{
            const response = await axios.get(`${API_URL}/getUserFriends/${userId}`);
            return response.data;
        }catch(error){
            console.error("Error fetching user friends:", error);
            throw error;       
        }
    }

    static async followUnfollowUser(userId, friendId){
        try{
            const response = await axios.post(`${API_URL}/followUser/${userId}/${friendId}`);
            return response.data;
        }catch(error){
            console.error("Error following/unfollowing user:", error);
            throw error;       
        }
    }

    static async updateUser(userData){
        try{
            const response = await axios.patch(`${API_URL}/updateUser`, userData);
            return response.data;
        }catch(error){
            console.error("Error updating user:", error);
            throw error;       
        }
    }

    static async updateUserProfile(profileData){
        try{
            console.log("Profile data:", profileData);
            const response = await axios.patch(`${API_URL}/updateProfileDetails`, profileData)
            return response.data
        }catch(error){
            console.error("error updating profile data", error)
            throw error
        }
    }

    static async deleteUser(userId){
        try{
            const response = await axios.delete(`${API_URL}/deleteUser/${userId}`);
            return response.data;
        }catch(error){
            console.error("Error deleting user:", error);
            throw error;       
        }
    }

    static async uploadProfileImage(userId, formData){
        try{
            const response = await axios.post(`${API_URL}/uploadProfileImage/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        }catch(error){
            console.error("Error uploading profile image:", error);
            throw error;       
        }
    }

    static async uploadCoverImage(userId, formData){
        try{
            const response = await axios.post(`${API_URL}/uploadCoverImage/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        }catch(error){
            console.error("Error uploading cover image:", error);
            throw error;       
        }
    }

    static async getNonFriends(userId){
        try{
            const response = await axios.get(`${API_URL}/nonFriends/${userId}`);
            return response.data;
        }catch(error){
            console.error("Error fetching non-friends:", error);
            throw error;       
        }
    }
    
    static async loginUser(formData){
        try{
            const response = await axios.post(`${API_URL}/login`, formData);
            return response.data;
        }catch(error){
            console.error("userlogin error:", error);
            throw error;       
        }
    }

    static async addUser(formData){
        try{
            const response = await axios.post(`${API_URL}/createUser`, formData);
            return response.data;
        }catch(error){
            console.error("userRegister error:", error);
            throw error;       
        }
    }



}

export default UserServices;