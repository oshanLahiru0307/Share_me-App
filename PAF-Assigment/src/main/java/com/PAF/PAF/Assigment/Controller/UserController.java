package com.PAF.PAF.Assigment.Controller;

import com.PAF.PAF.Assigment.Entity.UserEntity;
import com.PAF.PAF.Assigment.Service.UserService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collections;
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

    @PatchMapping("/updateProfile")
    public UserEntity updateUserProfile(@RequestParam(value = "userId") String userId,
                                        @RequestParam(value = "name") String name,
                                        @RequestParam(value = "occupation") String occupation,
                                        @RequestParam(value = "address") String address){
        UserEntity user = userService.getUserById(userId);
        if(user != null){
            user.setName(name);
            user.setOccupation(occupation);
            user.setAddress(address);
        }
        return userService.updateUser(user);
    }

    @DeleteMapping("/deleteUser/{id}")
    public UserEntity deleteUser(@PathVariable String id){
        return userService.deleteUser(id);
    }


    @PostMapping("/login")
    public UserEntity login(@RequestBody UserEntity loginDetails) {
        return userService.loginUser(loginDetails);
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

    @GetMapping("uploads/users/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(UPLOAD_DIRECTORY).resolve(filename);
            UrlResource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body((Resource) resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @GetMapping("/nonFriends/{userId}")
    public ResponseEntity<List<UserEntity>> getNonFriends(@PathVariable String userId) {
        UserEntity currentUser = userService.getUserById(userId);
        if (currentUser != null) {
            List<String> friendIds = currentUser.getFriendsList();
            List<UserEntity> nonFriends = userService.getNonFriends(userId,friendIds != null ? friendIds : List.of());
            return ResponseEntity.ok(nonFriends);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public String saveAndGetImageUrl(MultipartFile Imagefile) throws IOException {
        Path filePath = Paths.get(UPLOAD_DIRECTORY);

        if(!Files.exists(filePath)){
            Files.createDirectories(filePath);
        }

        String fileName = UUID.randomUUID().toString() + "_" + Imagefile.getOriginalFilename();
        Path filePathWithName = filePath.resolve(fileName);
        Files.copy(Imagefile.getInputStream(), filePathWithName);

        String url = UPLOAD_DIRECTORY+"/"+fileName;

        return url;
    }
}
