package com.PAF.PAF.Assigment.Service;

import com.PAF.PAF.Assigment.Entity.NotificationModel;
import java.util.List;

public interface NotificationService {
    List<NotificationModel> getNotificationsForUser(String userId);
    void markAsRead(String notificationId);
    void deleteNotification(String notificationId);
    void addNotification(NotificationModel notification);
}
