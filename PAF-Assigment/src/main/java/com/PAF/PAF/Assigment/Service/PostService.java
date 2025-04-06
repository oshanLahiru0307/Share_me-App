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

    //get All posts...
    public List<PostEntity> getPosts(){
        return postRepo.findAll();
    }

    //get All posts of An user...
    public List<PostEntity> getPostsByUser(String user){
        return postRepo.findByUserId(user);
    }

    //get single post...
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
                post.setLikes(new HashMap<>());
            }
            if (!post.getLikes().containsKey(userId)) {
                post.getLikes().put(userId, true);
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
                post.setComments(new HashMap<>());
            }
            post.getComments().put(userId, commentText);
            postRepo.save(post);
        }
        return post;
    }

    public PostEntity editComment(String postId, String userId, String commentText) {
        PostEntity post = postRepo.findById(postId).orElse(null);
        if (post != null && post.getComments() != null && post.getComments().containsKey(userId)) {
            post.getComments().put(userId, commentText);
            postRepo.save(post);
        }
        return post;
    }

    public PostEntity deleteComment(String postId, String userId) {
        PostEntity post = postRepo.findById(postId).orElse(null);
        if (post != null && post.getComments() != null && post.getComments().containsKey(userId)) {
            post.getComments().remove(userId);
            postRepo.save(post);
        }
        return post;
    }

}

