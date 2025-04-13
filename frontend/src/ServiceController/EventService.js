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


}

export default EventService;