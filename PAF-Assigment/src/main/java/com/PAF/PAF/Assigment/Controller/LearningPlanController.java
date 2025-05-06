package com.PAF.PAF.Assigment.Controller;

import com.PAF.PAF.Assigment.Entity.LearningPlanModel;
import com.PAF.PAF.Assigment.Repository.LearningPlanRepository;
import com.PAF.PAF.Assigment.exception.LearningPlanNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin()
@RequestMapping(value="/api/v1")
public class LearningPlanController {

    private static final Path UPLOAD_DIRECTORY = Paths.get("uploads/plan");

    @Autowired
    private LearningPlanRepository learningPlanRepository;

    // Create new learning plan
    @PostMapping("/learningPlan")
    public LearningPlanModel createLearningPlan(@RequestBody LearningPlanModel newLearningPlan) {
        newLearningPlan.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        return learningPlanRepository.save(newLearningPlan);
    }

    // Upload a plan file (e.g., image/pdf/etc.)
    @PostMapping("/learningPlan/planUpload")
    public String uploadPlanFile(@RequestParam("file") MultipartFile file) {
        try {
            if (!Files.exists(UPLOAD_DIRECTORY)) {
                Files.createDirectories(UPLOAD_DIRECTORY);
            }

            String extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
            String fileName = UUID.randomUUID() + extension;
            Path destination = UPLOAD_DIRECTORY.resolve(fileName);
            Files.copy(file.getInputStream(), destination);

            return fileName;
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload file: " + e.getMessage(), e);
        }
    }

    // Get all learning plans
    @GetMapping("/learningPlan")
    public List<LearningPlanModel> getAllLearningPlans() {
        return learningPlanRepository.findAll();
    }

    // Get learning plan by ID
    @GetMapping("/learningPlan/{id}")
    public LearningPlanModel getLearningPlanById(@PathVariable String id) {
        return learningPlanRepository.findById(id)
                .orElseThrow(() -> new LearningPlanNotFoundException(id));
    }

    // Update learning plan
    @PutMapping("/learningPlan/{id}")
    public LearningPlanModel update(@RequestBody LearningPlanModel newLearningPlanModel, @PathVariable String id) {
        return learningPlanRepository.findById(id)
                .map(learningPlanModel -> {
                    learningPlanModel.setTitle(newLearningPlanModel.getTitle());
                    learningPlanModel.setDescription(newLearningPlanModel.getDescription());
                    learningPlanModel.setContentURL(newLearningPlanModel.getContentURL());
                    learningPlanModel.setTags(newLearningPlanModel.getTags());
                    learningPlanModel.setImageUrl(newLearningPlanModel.getImageUrl());
                    learningPlanModel.setStartDate(newLearningPlanModel.getStartDate());
                    learningPlanModel.setEndDate(newLearningPlanModel.getEndDate());
                    learningPlanModel.setCategory(newLearningPlanModel.getCategory());
                    learningPlanModel.setPostOwnerID(newLearningPlanModel.getPostOwnerID());
                    learningPlanModel.setTemplateID(newLearningPlanModel.getTemplateID());
                    return learningPlanRepository.save(learningPlanModel);
                })
                .orElseThrow(() -> new LearningPlanNotFoundException(id));
    }

    // Delete learning plan
    @DeleteMapping("/learningPlan/{id}")
    public void delete(@PathVariable String id) {
        learningPlanRepository.deleteById(id);
    }

    // Serve uploaded plan files
    @GetMapping("/learningPlan/planImages/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        try {
            Path file = UPLOAD_DIRECTORY.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
