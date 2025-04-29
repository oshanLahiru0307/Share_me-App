package com.PAF.PAF.Assigment.Entity;

import org.springframework.data.annotation.Id; // Correct import for MongoDB
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "notifications")
public class NotificationModel {
    @Id
    private String id; // Removed @GeneratedValue
    private String userId; // The user who owns this notification
    private String message; // Notification message
    private boolean read; // Whether the notification has been read
    private String createdAt; // Timestamp of the notification

    public NotificationModel() {}

    public NotificationModel(String userId, String message, boolean read, String createdAt) {
        this.userId = userId;
        this.message = message;
        this.read = read;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
