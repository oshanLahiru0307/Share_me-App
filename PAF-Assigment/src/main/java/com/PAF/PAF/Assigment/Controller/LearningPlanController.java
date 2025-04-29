package com.PAF.PAF.Assigment.Controller;

import com.PAF.PAF.Assigment.Entity.LearningPlanModel;
import com.PAF.PAF.Assigment.Entity.NotificationModel;
import com.PAF.PAF.Assigment.Entity.UserEntity;
import com.PAF.PAF.Assigment.Repository.LearningPlanRepository;
import com.PAF.PAF.Assigment.Repository.NotificationRepository;
import com.PAF.PAF.Assigment.Repository.UserRepo;
import com.PAF.PAF.Assigment.exception.LearningPlanNotFoundException;
import com.PAF.PAF.Assigment.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
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
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/v1") // Added base path for consistency
public class LearningPlanController {

    private static final Path UPLOAD_DIRECTORY = Paths.get("uploads/plan");

    @Autowired
    private LearningPlanRepository learningPlanRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepo userRepo;

    // Create new learning plan
    @PostMapping("/learningPlan")
    public LearningPlanModel createLearningPlan(@RequestBody LearningPlanModel newLearningPlan) {
        if (newLearningPlan.getPostOwnerID() == null || newLearningPlan.getPostOwnerID().isEmpty()) {
            throw new IllegalArgumentException("PostOwnerID is required.");
        }

        UserEntity user = userRepo.findById(newLearningPlan.getPostOwnerID())
                .orElseThrow(() -> new UserNotFoundException("User not found for ID: " + newLearningPlan.getPostOwnerID()));

        newLearningPlan.setPostOwnerName(user.getName()); // Correct field (UserEntity has 'name')
        newLearningPlan.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        return learningPlanRepository.save(newLearningPlan);
    }

    // Upload a plan file (e.g., image/pdf/etc.)
    @PostMapping("/learningPlan/upload")
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
        List<LearningPlanModel> plans = learningPlanRepository.findAll();
        plans.forEach(plan -> {
            if (plan.getPostOwnerID() != null) {
                userRepo.findById(plan.getPostOwnerID()).ifPresent(user -> plan.setPostOwnerName(user.getName()));
            }
        });
        return plans;
    }

    // Get learning plan by ID
    @GetMapping("/learningPlan/{id}")
    public LearningPlanModel getLearningPlanById(@PathVariable String id) {
        LearningPlanModel plan = learningPlanRepository.findById(id)
                .orElseThrow(() -> new LearningPlanNotFoundException(id));

        if (plan.getPostOwnerID() != null) {
            userRepo.findById(plan.getPostOwnerID()).ifPresent(user -> plan.setPostOwnerName(user.getName()));
        }

        return plan;
    }

    // Serve uploaded plan files
    @GetMapping("/learningPlan/uploads/{filename}")
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

    @PutMapping("/learningPlan/{id}")
    LearningPlanModel update(@RequestBody LearningPlanModel newLearningPlanModel, @PathVariable String id) {
        return learningPlanRepository.findById(id)
                .map(learningPlanModel -> {
                    learningPlanModel.setTitle(newLearningPlanModel.getTitle());
                    learningPlanModel.setDescription(newLearningPlanModel.getDescription());
                    learningPlanModel.setContentURL(newLearningPlanModel.getContentURL());
                    learningPlanModel.setTags(newLearningPlanModel.getTags());
                    learningPlanModel.setImageUrl(newLearningPlanModel.getImageUrl());
                    learningPlanModel.setStartDate(newLearningPlanModel.getStartDate()); // Update startDate
                    learningPlanModel.setEndDate(newLearningPlanModel.getEndDate());     // Update endDate
                    learningPlanModel.setCategory(newLearningPlanModel.getCategory());  // Update category
                    
                    if (newLearningPlanModel.getPostOwnerID() != null && !newLearningPlanModel.getPostOwnerID().isEmpty()) {
                        learningPlanModel.setPostOwnerID(newLearningPlanModel.getPostOwnerID());
                        // Fetch and update the real name of the post owner
                        String postOwnerName = userRepo.findById(newLearningPlanModel.getPostOwnerID())
                                .map(user -> user.getName())
                                .orElseThrow(() -> new UserNotFoundException("User not found for ID: " + newLearningPlanModel.getPostOwnerID()));
                        learningPlanModel.setPostOwnerName(postOwnerName);
                    }
                    
                    learningPlanModel.setTemplateID(newLearningPlanModel.getTemplateID()); // Update templateID
                    return learningPlanRepository.save(learningPlanModel);
                }).orElseThrow(() -> new LearningPlanNotFoundException(id));
    }

    @DeleteMapping("/learningPlan/{id}")
    public void delete(@PathVariable String id) {
        learningPlanRepository.deleteById(id);
    }


    @Scheduled(cron = "0 0 0 * * ?") // Runs daily at midnight
    public void sendExpiryNotifications() {
        List<LearningPlanModel> plans = learningPlanRepository.findAll();
        String currentDate = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        plans.forEach(plan -> {
            if (plan.getEndDate() != null && plan.getPostOwnerID() != null) {
                try {
                    LocalDateTime endDate = LocalDateTime.parse(plan.getEndDate(), DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                    LocalDateTime threeDaysBefore = endDate.minusDays(3);

                    if (threeDaysBefore.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")).equals(currentDate)) {
                        // Check if a notification already exists for this plan and user
                        boolean notificationExists = notificationRepository.findByUserId(plan.getPostOwnerID())
                                .stream()
                                .anyMatch(notification -> notification.getMessage().contains(plan.getTitle()));

                        if (!notificationExists) {
                            NotificationModel notification = new NotificationModel();
                            notification.setUserId(plan.getPostOwnerID());
                            notification.setMessage("Your learning plan \"" + plan.getTitle() + "\" will expire soon.");
                            notification.setCreatedAt(currentDate);
                            notification.setRead(false);
                            notificationRepository.save(notification);
                        }
                    }
                } catch (Exception e) {
                    System.err.println("Error processing plan with ID: " + plan.getId() + ". Error: " + e.getMessage());
                }
            }
        });
    }
}

