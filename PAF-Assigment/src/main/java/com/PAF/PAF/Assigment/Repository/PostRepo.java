package com.PAF.PAF.Assigment.Repository;

import com.PAF.PAF.Assigment.Entity.PostEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepo extends MongoRepository<PostEntity, String> {

}
