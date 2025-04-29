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

    public UserEntity updateUser(UserEntity updatedUser) {
        UserEntity existingUser = userRepo.findById(updatedUser.getId()).orElse(null);
        if(existingUser != null) {
            if (updatedUser.getName() != null) existingUser.setName(updatedUser.getName());
            if (updatedUser.getEmail() != null) existingUser.setEmail(updatedUser.getEmail());
            if (updatedUser.getPassword() != null) existingUser.setPassword(updatedUser.getPassword()); // Consider password hashing
            if (updatedUser.getOccupation() != null) existingUser.setOccupation(updatedUser.getOccupation());
            if (updatedUser.getAddress() != null) existingUser.setAddress(updatedUser.getAddress());
            if (updatedUser.getCoverImg() != null) existingUser.setCoverImg(updatedUser.getCoverImg());
            if (updatedUser.getProfileImg() != null) existingUser.setProfileImg(updatedUser.getProfileImg());
            if (updatedUser.getFriendsList() != null) existingUser.setFriendsList(updatedUser.getFriendsList());
            return userRepo.save(updatedUser);
        }
        return null;
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

    //public List<UserEntity> getNonFriends(String currentUserId, List<String> friendIds) {
    //    return userRepo.findByIdNotInAndIdNot(friendIds, currentUserId);
    //}

    public List<UserEntity> getNonFriends(String currentUserId, List<String> friendIds) {
        return userRepo.findNonFriends(friendIds, currentUserId);
    }

     public UserEntity loginUser(UserEntity loginDetails) {
         UserEntity user = userRepo.findByEmail(loginDetails.getEmail()).orElse(null);
         if (user != null && user.getPassword().equals(loginDetails.getPassword())) {
             return user;
         }
         return null;
     }
}
