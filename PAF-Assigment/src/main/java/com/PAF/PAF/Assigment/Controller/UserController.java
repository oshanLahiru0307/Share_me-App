package com.PAF.PAF.Assigment.Controller;

import com.PAF.PAF.Assigment.Entity.UserEntity;
import com.PAF.PAF.Assigment.Service.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value="/api/v1")
@CrossOrigin
public class UserController {

    private static final String UPLOAD_DIRECTORY = "uploads/users";

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


    public String saveAndGetImageUrl(MultipartFile Imagefile) throws IOException {
        Path filePath = Paths.get(UPLOAD_DIRECTORY);

        if(!Files.exists(filePath)){
            Files.createDirectories(filePath);
        }

        String fileName = UUID.randomUUID().toString() + "_" + Imagefile.getOriginalFilename();
        Path filePathWithName = filePath.resolve(fileName);
        Files.copy(Imagefile.getInputStream(), filePathWithName);

        String url = "/"+UPLOAD_DIRECTORY+"/"+fileName;

        return url;
    }

    @PostMapping("/uploadProfileImage/{userId}")
    public UserEntity uploadProfileImage(@PathVariable String userId, @RequestParam("profileImage") MultipartFile file) throws IOException {
        UserEntity user = userService.getUserById(userId);
        if (user != null) {
            String imageUrl = saveAndGetImageUrl(file);
            user.setProfileImg(imageUrl);
            return userService.updateUser(user);
        }
        return null;
    }

    @PostMapping("/uploadCoverImage/{userId}")
    public UserEntity uploadCoverImage(@PathVariable String userId, @RequestParam("coverImage") MultipartFile file) throws IOException {
        UserEntity user = userService.getUserById(userId);
        if (user != null) {
            String imageUrl = saveAndGetImageUrl(file);
            user.setCoverImg(imageUrl);
            return userService.updateUser(user);
        }
        return null;
    }



}
