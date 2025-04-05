package com.PAF.PAF.Assigment.Service;

import com.PAF.PAF.Assigment.Entity.PostEntity;
import com.PAF.PAF.Assigment.Repository.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class PostService {

    @Autowired
    private PostRepo postRepo;

    public PostEntity createPost(PostEntity post){
        return postRepo.save(post);
    }

    public List<PostEntity> getPosts(){
        return postRepo.findAll();
    }

    public PostEntity getPost(String id){
        Optional<PostEntity> post = postRepo.findById(id);
        return post.orElse(null);
    }

    public PostEntity updatePost(PostEntity post){
        return postRepo.save(post);
    }

    public PostEntity deletePost(String id){
        Optional<PostEntity> post = postRepo.findById(id);
        postRepo.deleteById(id);
        return post.orElse(null);
    }

    public PostEntity likeOrDislikePost(String postId, String userId) {
        PostEntity post = postRepo.findById(postId).orElse(null);
        if (post != null) {
            if (post.getLikes() == null) {
                post.setLikes(new ArrayList<>());
            }
            if (!post.getLikes().contains(userId)) {
                post.getLikes().add(userId);
            }else{
                post.getLikes().remove(userId);
            }
            postRepo.save(post);
        }
        return post;
    }

    public PostEntity addComment(String postId, String userId, String commentText) {
        PostEntity post = postRepo.findById(postId).orElse(null);
        if (post != null) {
            if (post.getComments() == null) {
                post.setComments(new ArrayList<>());
            }
            Map<String, String> comment = new HashMap<>();
            comment.put("userId", userId);
            comment.put("commentText", commentText);
            post.getComments().add(comment);
            postRepo.save(post);
        }
        return post;
    }

    public PostEntity editComment(String postId, String userId, String commentText, int commentIndex) {
        PostEntity post = postRepo.findById(postId).orElse(null);
        if (post != null && post.getComments() != null && commentIndex >= 0 && commentIndex < post.getComments().size()) {
            Map<String, String> comment = post.getComments().get(commentIndex);
            if (comment.get("userId").equals(userId)) {
                comment.put("commentText", commentText);
                postRepo.save(post);
            }
        }
        return post;
    }

    public PostEntity deleteComment(String postId, String userId, int commentIndex) {
        PostEntity post = postRepo.findById(postId).orElse(null);
        if (post != null && post.getComments() != null && commentIndex >= 0 && commentIndex < post.getComments().size()) {
            Map<String, String> comment = post.getComments().get(commentIndex);
            if (comment.get("userId").equals(userId)) {
                post.getComments().remove(commentIndex);
                postRepo.save(post);
            }
        }
        return post;
    }

}

