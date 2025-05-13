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

   @GetMapping("/getUsersAllNotifications")
    public List<NotificationEntity> getAllNotifications(String userId) {
        return notificationService.getNotificationById(userId);
    }

    @PatchMapping("/marksAsRead/{Id}")
    public NotificationEntity marksAsRead(@RequestParam String Id) {
        return notificationService.markAsRead(Id);
    }



}
