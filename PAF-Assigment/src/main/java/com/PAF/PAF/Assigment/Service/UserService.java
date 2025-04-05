package com.PAF.PAF.Assigment.Service;

import com.PAF.PAF.Assigment.Entity.UserEntity;
import com.PAF.PAF.Assigment.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        return userRepo.findAll();
    }

    public UserEntity getUserById(String id) {
        Optional<UserEntity> user = userRepo.findById(id);
        return user.orElse(null);
    }

    public UserEntity getUserByEmail(String email) {
        Optional<UserEntity> user = userRepo.findByEmail(email);
        return user.orElse(null);
    }

    public UserEntity updateUser(UserEntity user) {
        return userRepo.save(user);
    }

    public UserEntity deleteUser(String id) {
        UserEntity user = getUserById(id);
        userRepo.deleteById(id);
        return user;
    }

}
