package com.PAF.PAF.Assigment.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "notifications")
public class NotificationEntity {

    @Id
    private String id;
    private String userId;// The user who owns this notification
    private String commentedUser;
    private String message; // Notification message
    private Boolean read; // Whether the notification has been read

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCommentedUser() {
        return commentedUser;
    }

    public void setCommentedUser(String commentedUser) {
        this.commentedUser = commentedUser;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Boolean getRead() {
        return read;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
