package com.PAF.PAF.Assigment.Service;

import com.PAF.PAF.Assigment.Entity.UserEntity;
import com.PAF.PAF.Assigment.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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


    public List<UserEntity> getUserFriends(String userId){
        UserEntity user = userRepo.findById(userId).orElse(null);
        if(user == null || user.getFriendsList() == null){
            return new ArrayList<>();
        }
        List<UserEntity> friends = new ArrayList<>();
        for(String friendId: user.getFriendsList()){
            UserEntity friend = userRepo.findById(friendId).orElse(null);
            if(friend != null){
                friends.add(friend);
            }
        }
        return friends;
    }

    public UserEntity followUnfollowUser(String currentUserId, String targetUserId) {
        UserEntity currentUser = userRepo.findById(currentUserId).orElse(null);
        UserEntity targetUser = userRepo.findById(targetUserId).orElse(null);

        if (currentUser != null && targetUser != null) {
            if (currentUser.getFriendsList() == null) {
                currentUser.setFriendsList(new ArrayList<>());
            }
            if (!currentUser.getFriendsList().contains(targetUserId)) {
                currentUser.getFriendsList().add(targetUserId);

                if (targetUser.getFriendsList() == null) {
                    targetUser.setFriendsList(new ArrayList<>());
                }

                if (!targetUser.getFriendsList().contains(currentUserId)) {
                    targetUser.getFriendsList().add(currentUserId);
                }

                userRepo.save(currentUser);
                userRepo.save(targetUser);
            }else{
                currentUser.getFriendsList().remove(targetUserId);
                targetUser.getFriendsList().remove(currentUserId);
                userRepo.save(currentUser);
                userRepo.save(targetUser);
            }
        }
        return currentUser;
    }

}
