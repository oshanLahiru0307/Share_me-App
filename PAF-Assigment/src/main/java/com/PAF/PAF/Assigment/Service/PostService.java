package com.PAF.PAF.Assigment.Service;

import com.PAF.PAF.Assigment.Entity.PostEntity;
import com.PAF.PAF.Assigment.Repository.PostRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepo postRepository;

    public PostEntity createPost(String caption, List<String> imageUrls) {
        PostEntity post = new PostEntity();
        post.setCaption(caption);
        if (!imageUrls.isEmpty()) post.setImage1(imageUrls.get(0));
        if (imageUrls.size() > 1) post.setImage2(imageUrls.get(1));
        if (imageUrls.size() > 2) post.setImage3(imageUrls.get(2));
        return postRepository.save(post);
    }

    public PostEntity getPostById(int id) {
        Optional<PostEntity> postOptional = postRepository.findById(id);
        return postOptional.orElse(null);
    }

    public List<String> getImageUrls(PostEntity post) {
        List<String> imageUrls = new ArrayList<>();
        if (post.getImage1() != null) {
            imageUrls.add(post.getImage1());
        }
        if (post.getImage2() != null) {
            imageUrls.add(post.getImage2());
        }
        if (post.getImage3() != null) {
            imageUrls.add(post.getImage3());
        }
        return imageUrls;
    }
}

