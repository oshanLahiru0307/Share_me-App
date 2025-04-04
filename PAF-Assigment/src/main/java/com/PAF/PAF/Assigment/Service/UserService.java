package com.PAF.PAF.Assigment.Service;

import com.PAF.PAF.Assigment.Entity.UserEntity;
import com.PAF.PAF.Assigment.Repository.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public UserEntity createUser(UserEntity user) {
        return userRepo.save(user);
    }

    public List<UserEntity> getAllUsers() {
        List<UserEntity> users = userRepo.findAll();
        return users;
    }

    public Optional<UserEntity> getUserById(int id) {
        Optional<UserEntity> user = userRepo.findById(id);
        return user;
    }

    public Optional<UserEntity> deleteUser(int id){
        Optional<UserEntity> user = userRepo.findById(id);
        userRepo.deleteById(id);
        return user;
    }

    public UserEntity updateUser(int id, UserEntity user) {
        return userRepo.save(user);
    }
}
