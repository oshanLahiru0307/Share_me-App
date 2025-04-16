import axios from 'axios'
const BASE_URL = 'http://localhost:4000/api/v1'

class PostController {

    static async getAllPosts() {
        try {
            const response = await axios.get(`${BASE_URL}/getAllPosts`)
            return response.data
        } catch (error) {
            console.error('Error fetching posts:', error)
            throw error
        }
    }

    static async getPostById(postId) {
        try {
            const response = await axios.get(`${BASE_URL}/getPost/${postId}`)
            return response.data
        } catch (error) {
            console.error('Error fetching post:', error)
            throw error
        }
    }

    static async getPostsByUserId(userId) {
        try {
            const response = await axios.get(`${BASE_URL}/getUserPosts/${userId}`)
            return response.data
        } catch (error) {
            console.error('Error fetching posts by user ID:', error)
            throw error
        }
    }

    static async createPost(postData) {
        try {
            const response = await axios.post(`${BASE_URL}/createPost`, postData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            return response.data
        } catch (error) {
            console.error('Error creating post:', error)
            throw error
        }
    }

    static async updatePost(postData) {
        try {
            console.log({'Post data:': postData})
            const response = await axios.patch(`${BASE_URL}/updatePost`, postData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            return response.data
        } catch (error) {
            console.error('Error updating post:', error)
            throw error
        }
    }

    static async deletePost(postId) {
        try {
            const response = await axios.delete(`${BASE_URL}/deletePost/${postId}`)
            return response.data
        } catch (error) {
            console.error('Error deleting post:', error)
            throw error
        }
    }
    static async likePost(postId, userId) {
        try {
            const response = await axios.post(`${BASE_URL}/${postId}/userLike/${userId}`)
            return response.data
        } catch (error) {
            console.error('Error liking post:', error)
            throw error
        }
    }

    static async commentPost(postId, commentData) {
        try {
            const response = await axios.post(`${BASE_URL}/commentPost/${postId}`, commentData)
            return response.data
        } catch (error) {
            console.error('Error commenting on post:', error)
            throw error
        }
    }

}

export default PostController