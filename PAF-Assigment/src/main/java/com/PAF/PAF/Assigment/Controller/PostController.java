package com.PAF.PAF.Assigment.Controller;

import com.PAF.PAF.Assigment.Entity.PostEntity;
import com.PAF.PAF.Assigment.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("/getAllPosts")
    public List<PostEntity> getAllPosts(){
        return postService.getPosts();
    }

    @GetMapping("/getPost/{id}")
    public PostEntity getPostById(@PathVariable String id){
        return postService.getPost(id);
    }

    @GetMapping("/getUserPosts/{userId}")
    public List<PostEntity> getUserPosts(@PathVariable String userId){
        return postService.getPostsByUser(userId);
    }

    @PostMapping("/createPost")
    public PostEntity createPost(@RequestBody PostEntity post){
        return postService.createPost(post);
    }
    @PostMapping("{postId}/userLike/{userId}")
    public PostEntity userLike(@PathVariable String postId, @PathVariable String userId){
        return postService.likeOrDislikePost(postId, userId);
    }

    @PostMapping("/{postId}/addComment/{userId}")
    public PostEntity addComment(@PathVariable String postId, @PathVariable String userId, @RequestBody String comment){
        return postService.addComment(postId, userId, comment);
    }

    @PatchMapping("/{postId}/editComment/{userId}")
    public PostEntity editComment(@PathVariable String postId, @PathVariable String userId, @RequestBody String comment){
        return postService.editComment(postId, userId, comment);
    }

    @DeleteMapping("/{postId}/deleteComment/{userId}")
    public PostEntity deleteComment(@PathVariable String postId, @PathVariable String userId){
        return postService.deleteComment(postId, userId);
    }

}
