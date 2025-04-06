package com.PAF.PAF.Assigment.Controller;

import com.PAF.PAF.Assigment.Entity.UserEntity;
import com.PAF.PAF.Assigment.Service.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/createUser")
    public UserEntity createUser(@RequestBody UserEntity user) {
        return userService.createUser(user);
    }

    @GetMapping("/getUsers")
    public List<UserEntity> getUser() {
        return userService.getAllUsers();
    }

    @GetMapping("/getUserById/{id}")
    public UserEntity getUserByID(@PathVariable String id){
        return userService.getUserById(id);
    }

    @GetMapping("/getUserByEmail/{email}")
    public UserEntity getUserByEmail(@PathVariable String email){
        return userService.getUserByEmail(email);
    }

    @GetMapping("/getUserFriends/{userId}")
    public List<UserEntity> getUserFriends(@PathVariable String userId) {
        return userService.getUserFriends(userId);
    }

    @PostMapping("/followUser/{userId}/{friendId}")
    public UserEntity followUser(@PathVariable String userId, @PathVariable String friendId) {
        return userService.followUnfollowUser(userId, friendId);
    }

    @PatchMapping("/updateUser")
    public UserEntity updateUser(@RequestBody UserEntity user) {
        return userService.updateUser(user);
    }

    @DeleteMapping("/deleteUser/{id}")
    public UserEntity deleteUser(@PathVariable String id){
        return userService.deleteUser(id);
    }


}
