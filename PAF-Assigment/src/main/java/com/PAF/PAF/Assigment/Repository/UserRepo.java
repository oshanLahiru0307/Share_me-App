package com.PAF.PAF.Assigment.Repository;


import com.PAF.PAF.Assigment.Entity.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<UserEntity, String> {
    //user find by email...
    Optional<UserEntity> findByEmail(String email);
}
