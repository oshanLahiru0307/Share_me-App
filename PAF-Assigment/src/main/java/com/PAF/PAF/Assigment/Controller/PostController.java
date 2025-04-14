package com.PAF.PAF.Assigment.Controller;

import com.PAF.PAF.Assigment.Entity.PostEntity;
import com.PAF.PAF.Assigment.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/v1")
@CrossOrigin
public class PostController {

    private static final String UPLOAD_DIRECTORY = "uploads/postImages";

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
    public PostEntity createPost(@RequestParam ("userId") String userId,
                                 @RequestParam("username") String username,
                                 @RequestParam("occupation") String occupation,
                                 @RequestParam("caption") String caption,
                                 @RequestParam("imageFiles") List<MultipartFile> imageFiles) throws IOException {
        List<String> imageUrls = saveAndGetImageUrls(imageFiles);
        PostEntity post = new PostEntity();
        post.setUserId(userId);
        post.setUsername(username);
        post.setOccupation(occupation);
        post.setCaption(caption);
        post.setImageUrls(imageUrls);
        post.setLikes(null);
        post.setComments(null);
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

    @GetMapping("uploads/postImages/{filename}")
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


    public List<String> saveAndGetImageUrls(List<MultipartFile> imageFiles) throws IOException {
        Path filePath = Paths.get(UPLOAD_DIRECTORY);

        if(!Files.exists(filePath)){
            Files.createDirectories(filePath);
        }

        List<String> urls = new ArrayList<>();
        for(MultipartFile imageFile : imageFiles) {
            String fileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
            Path filePathWithName = filePath.resolve(fileName);
            Files.copy(imageFile.getInputStream(), filePathWithName);
            String url = UPLOAD_DIRECTORY+"/"+fileName;
            urls.add(url);
        }

        return urls;
    }

}
