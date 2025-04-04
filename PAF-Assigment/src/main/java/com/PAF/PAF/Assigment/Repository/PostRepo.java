package com.PAF.PAF.Assigment.Repository;

import com.PAF.PAF.Assigment.Entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepo extends JpaRepository<PostEntity, Integer> {
}
