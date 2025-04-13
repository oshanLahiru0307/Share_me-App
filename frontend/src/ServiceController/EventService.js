import axios from 'axios';

const BASE_URL = 'http://localhost:4000/api/v1';

class EventService {

    static async getAllEvents() {
        try {
            const response = await axios.get(`${BASE_URL}/getAllEvents`);
            return response.data;
        } catch (error) {
            console.error('Error fetching events:', error);
            throw error;
        }
    }

    static async getEventById(eventId) {
        try {
            const response = await axios.get(`${BASE_URL}/getEventById/${eventId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching event:', error);
            throw error;
        }
    }

    static async createEvent(eventData) {
        try {
            const response = await axios.post(`${BASE_URL}/createEvent`, eventData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    }

    static async updateEvent(eventData) {
        try {
            const response = await axios.patch(`${BASE_URL}/updateEvent`, eventData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating event:', error);
            throw error;
        }
    }

    static async deleteEvent(eventId) {
        try {
            const response = await axios.delete(`${BASE_URL}/deleteEvent/${eventId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting event:', error);
            throw error;
        }
    }

    static async getEventByUserId(userId) {
        try {
            const response = await axios.get(`${BASE_URL}/getEventByUserId/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching events by user ID:', error);
            throw error;
        }
    }

    static async getOtherEvents(userId) {
        try {
            const response = await axios.get(`${BASE_URL}/others/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching events by category:', error);
            throw error;
        }
    }


}

export default EventService;