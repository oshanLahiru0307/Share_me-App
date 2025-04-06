package com.PAF.PAF.Assigment.Repository;

import com.PAF.PAF.Assigment.Entity.PostEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepo extends MongoRepository<PostEntity, String> {

    List<PostEntity> findByUserId(String user);
}
