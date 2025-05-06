package com.PAF.PAF.Assigment.Repository;

import com.PAF.PAF.Assigment.Entity.LearningPlanModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LearningPlanRepository extends MongoRepository<LearningPlanModel, String> {
    void deleteByPostOwnerID(String postOwnerID);
    List<LearningPlanModel> findByPostOwnerID(String postOwnerID);
    List<LearningPlanModel> findByPostOwnerName(String postOwnerName); // New method
}
