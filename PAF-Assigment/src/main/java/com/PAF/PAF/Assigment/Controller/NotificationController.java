package com.PAF.PAF.Assigment.Controller;

import com.PAF.PAF.Assigment.Entity.NotificationModel;
import com.PAF.PAF.Assigment.Service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
@CrossOrigin
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/{userId}")
    public List<NotificationModel> getUserNotifications(@PathVariable String userId) {
        return notificationService.getNotificationsForUser(userId);
    }

    @PostMapping("/markAsRead/{notificationId}")
    public void markAsRead(@PathVariable String notificationId) {
        notificationService.markAsRead(notificationId);
    }

    @DeleteMapping("/{notificationId}")
    public void deleteNotification(@PathVariable String notificationId) {
        notificationService.deleteNotification(notificationId);
    }
}
