package com.PAF.PAF.Assigment.Service;

import com.PAF.PAF.Assigment.Entity.NotificationEntity;
import com.PAF.PAF.Assigment.Repository.NotificationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class NotificationServices {

    @Autowired
    private NotificationRepo notificationRepo;

    public NotificationEntity CreatNotification(String userId, String commentedUser, String message) {
        NotificationEntity notification = new NotificationEntity();
        notification.setUserId(userId);
        notification.setCommentedUser(commentedUser);
        notification.setMessage(message);
        notification.setRead(false);
        return notificationRepo.save(notification);
    }

    public List<NotificationEntity> markAsRead(String id) {
        List<NotificationEntity> notifications = notificationRepo.findByUserId(id);
        if (notifications != null) {
            for(NotificationEntity notification : notifications) {
                if (!notification.getRead()) {
                    notification.setRead(true);
                    notificationRepo.save(notification);
                }
            }
        }
        return notifications;
    }

    public List<NotificationEntity> getNotificationById(String id) {
        List<NotificationEntity> notifications = notificationRepo.findByUserId(id);
        return notifications;
    }

    public String deleteNotification(String id) {
        NotificationEntity notification = notificationRepo.findById(id).orElse(null);
        if (notification != null) {
            notificationRepo.delete(notification);
            return "Notification deleted successfully";
        }
        return "Notification not found";
    }


}
