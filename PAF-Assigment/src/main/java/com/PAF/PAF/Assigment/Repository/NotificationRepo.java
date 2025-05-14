package com.PAF.PAF.Assigment.Repository;

import com.PAF.PAF.Assigment.Entity.NotificationEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NotificationRepo extends MongoRepository<NotificationEntity, String> {
    List<NotificationEntity> findByUserId(String userId);
    Optional<NotificationEntity> findById(String id);

}
