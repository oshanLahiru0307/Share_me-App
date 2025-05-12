package com.PAF.PAF.Assigment.Repository;

import com.PAF.PAF.Assigment.Entity.NotificationEntity;
import org.apache.el.stream.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepo extends MongoRepository<NotificationEntity, String> {
    List<NotificationEntity> findByUserId(String userId);
    Optional<NotificationEntity> findById(String id);
    void deleteById(String id);
    boolean existsById(String id);

}
