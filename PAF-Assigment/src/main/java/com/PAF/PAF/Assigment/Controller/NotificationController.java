package com.PAF.PAF.Assigment.Controller;

import com.PAF.PAF.Assigment.Entity.NotificationEntity;
import com.PAF.PAF.Assigment.Service.NotificationServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1")
public class NotificationController {

   @Autowired
    private NotificationServices notificationService;

   @GetMapping("/getUsersAllNotifications/{userId}")
    public List<NotificationEntity> getAllNotifications(@PathVariable String userId) {
        return notificationService.getNotificationById(userId);
    }

    @PatchMapping("/marksAsRead/{Id}")
    public List<NotificationEntity> marksAsRead(@PathVariable String Id) {
        return notificationService.markAsRead(Id);
    }

    @DeleteMapping("/deleteNotification/{Id}")
    public String deleteNotification(@PathVariable String Id) {
        return notificationService.deleteNotification(Id);
    }

}
