package com.PAF.PAF.Assigment.Service.impl;

import com.PAF.PAF.Assigment.Entity.NotificationModel;
import com.PAF.PAF.Assigment.Service.NotificationService;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class NotificationServiceImpl implements NotificationService {

    private final Map<String, NotificationModel> notificationStore = new ConcurrentHashMap<>();

    @Override
    public List<NotificationModel> getNotificationsForUser(String userId) {
        List<NotificationModel> result = new ArrayList<>();
        for (NotificationModel n : notificationStore.values()) {
            if (n.getUserId().equals(userId)) {
                result.add(n);
            }
        }
        return result;
    }

    @Override
    public void markAsRead(String notificationId) {
        NotificationModel n = notificationStore.get(notificationId);
        if (n != null) n.setRead(true);
    }

    @Override
    public void deleteNotification(String notificationId) {
        notificationStore.remove(notificationId);
    }

    @Override
    public void addNotification(NotificationModel notification) {
        notification.setId(UUID.randomUUID().toString());
        notificationStore.put(notification.getId(), notification);
    }
}
