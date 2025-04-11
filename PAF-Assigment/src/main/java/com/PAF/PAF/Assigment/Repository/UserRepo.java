package com.PAF.PAF.Assigment.Repository;


import com.PAF.PAF.Assigment.Entity.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<UserEntity, String> {
    //user find by email...
    Optional<UserEntity> findByEmail(String email);

    //@Query("{ '_id' : { '$nin' : ?0 }, '_id' : { '$ne' : ?1 } }")
    //List<UserEntity> findByIdNotInAndIdNot(List<String> ids, String currentUserId);

    @Query("{ '$and' : [ { '_id' : { '$nin' : ?0 } }, { '_id' : { '$ne' : ?1 } } ] }")
    List<UserEntity> findNonFriends(List<String> friendIds, String currentUserId);

}
