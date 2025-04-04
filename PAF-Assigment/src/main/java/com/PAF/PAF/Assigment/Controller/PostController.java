package com.PAF.PAF.Assigment.Controller;

import com.PAF.PAF.Assigment.Entity.PostEntity;
import com.PAF.PAF.Assigment.Service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.*;

@RestController
@RequestMapping(value="/api/v1")
@CrossOrigin
public class PostController {

    private static final String UPLOAD_DIRECTORY = "uploads/"; // Folder to store images

    @Autowired
    private PostService postService;

    @PostMapping("/addPost")
    public ResponseEntity<PostEntity> createPost(
            @RequestParam("caption") String caption,
            @RequestParam("images") MultipartFile[] images) {

        try {
            List<String> imageUrls = saveImagesAndGetUrls(images);
            PostEntity createdPost = postService.createPost(caption, imageUrls);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    private List<String> saveImagesAndGetUrls(MultipartFile[] images) throws IOException {
        List<String> imageUrls = new ArrayList<>();
        Path uploadPath = Paths.get(UPLOAD_DIRECTORY);

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        for (MultipartFile image : images) {
            String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(image.getInputStream(), filePath);

            // Store the relative URL in the database
            imageUrls.add("/" + UPLOAD_DIRECTORY + fileName); // or filePath.toString() for absolute paths
        }

        return imageUrls;
    }

    @GetMapping("/getPost/{id}")
    public ResponseEntity<Map<String, Object>> getPostWithImages(@PathVariable int id) {
        PostEntity post = postService.getPostById(id);
        if (post == null) {
            return ResponseEntity.notFound().build();
        }

        Map<String, Object> postData = new HashMap<>();
        postData.put("id", post.getId());
        postData.put("caption", post.getCaption());

        List<String> imageUrls = postService.getImageUrls(post); // Get image URLs
        postData.put("imageUrls", imageUrls);

        return ResponseEntity.ok(postData);
    }

}
