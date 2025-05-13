const axios = require('axios');
const BASE_URI = 'http://localhost:4000/api/v1';

class NotificationService {
  static async getNotification(userId) {
    try {
      const response = await axios.get(`${BASE_URI}/getUsersAllNotifications/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  static async markAsRead(notificationId) {
    try {
      const response = await axios.patch(`${BASE_URI}/marksAsRead/${notificationId}`);
      return response.data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

    static async deleteNotification(notificationId) {
        try {
        const response = await axios.delete(`${BASE_URI}/deleteNotification/${notificationId}`);
        return response.data;
        } catch (error) {
        console.error('Error deleting notification:', error);
        throw error;
        }
    }
}

export default NotificationService;