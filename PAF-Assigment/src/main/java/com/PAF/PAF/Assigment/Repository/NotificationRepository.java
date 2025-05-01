package com.PAF.PAF.Assigment.Repository;

import com.PAF.PAF.Assigment.Entity.NotificationModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface NotificationRepository extends MongoRepository<NotificationModel, String> {
    List<NotificationModel> findByUserId(String userId);
}
