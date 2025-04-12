package com.PAF.PAF.Assigment.Repository;

import com.PAF.PAF.Assigment.Entity.EventEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepo extends MongoRepository<EventEntity, String> {
}
