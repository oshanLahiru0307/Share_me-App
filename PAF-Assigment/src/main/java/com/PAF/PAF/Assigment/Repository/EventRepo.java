package com.PAF.PAF.Assigment.Repository;

import com.PAF.PAF.Assigment.Entity.EventEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepo extends MongoRepository<EventEntity, String> {

    // Custom query to find events by userId
    List<EventEntity> findAllByUserId(String userId);

    @Query("{ 'userId' : { '$ne' : ?0 } }")
    List<EventEntity> findAllEventsNotCreatedBy(String userId);
}
