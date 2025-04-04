package com.PAF.PAF.Assigment.Controller;

import com.PAF.PAF.Assigment.Entity.UserEntity;
import com.PAF.PAF.Assigment.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value="/api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/addUser")
    public UserEntity addUser(@RequestBody UserEntity user) {
        return userService.createUser(user);
    }

    @GetMapping("/getAllUsers")
    public List<UserEntity> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/user/{id}")
    public Optional<UserEntity> getUserByEmail(@PathVariable int id) {
        return userService.getUserById(id);
    }

    @DeleteMapping("/user/{id}")
    public Optional<UserEntity> deleteUser(@PathVariable int id) {
        return userService.deleteUser(id);
    }

    @PutMapping("/user/{id}")
    public UserEntity updateUser(@PathVariable int id, @RequestBody UserEntity user) {
        return userService.updateUser(id, user);
    }
}
