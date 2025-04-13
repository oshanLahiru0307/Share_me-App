package com.PAF.PAF.Assigment.Controller;

import com.PAF.PAF.Assigment.Entity.EventEntity;
import com.PAF.PAF.Assigment.Service.EventServices;
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
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/v1")
@CrossOrigin
public class EventController {

    private static final String UPLOAD_DIRECTORY = "uploads/events";

    @Autowired
    private EventServices eventServices;

    @PostMapping("/createEvent")
    public EventEntity createEvent(@RequestParam("topic") String topic,
                                   @RequestParam("organization") String organization,
                                   @RequestParam("date") String date,
                                   @RequestParam("time") String time,
                                   @RequestParam("location") String location,
                                   @RequestParam("description") String description,
                                   @RequestParam("speaker") String speaker,
                                   @RequestParam(value = "image", required = false) MultipartFile image, // Use 'image' as the parameter name
                                   @RequestParam(value = "link", required = false) String link,
                                   @RequestParam("userId") String userId, // Get userId from the request header
                                   @RequestParam("userName") String userName) throws IOException {

        String imgUrl = saveAndGetImageUrl(image);

        EventEntity event = new EventEntity();
        event.setUserId(userId);
        event.setUserName(userName);
        event.setTopic(topic);
        event.setOrganization(organization);
        event.setDate(date);
        event.setTime(time);
        event.setLocation(location);
        event.setDescription(description);
        event.setSpeaker(speaker);
        event.setImgUrl(imgUrl);
        event.setLink(link);

        return eventServices.createEvent(event);
    }

    @GetMapping("/getAllEvents")
    public List<EventEntity> getAllEvents() {
        return eventServices.getAllEvents();
    }

    @GetMapping("/getEventById/{id}")
    public EventEntity getEventById(@PathVariable("id") String id) {
        return eventServices.getEventById(id);
    }

    @GetMapping("/getEventsByUserId/{userId}")
    public List<EventEntity> getEventsByUserId(@PathVariable("userId") String userId) {
        return eventServices.getEventByUserId(userId);
    }

    @GetMapping("/others/{userId}")
    public ResponseEntity<List<EventEntity>> getAllEventsExcludingSelf(@PathVariable String userId) {
        List<EventEntity> otherEvents = eventServices.getAllEventsExcludingSelf(userId);
        return new ResponseEntity<>(otherEvents, HttpStatus.OK);
    }

    @PatchMapping("/updateEvent")
    public EventEntity updateEvent(@RequestBody EventEntity eventEntity) {
        return eventServices.updateEvent(eventEntity);
    }

    @DeleteMapping("/deleteEvent/{id}")
    public void deleteEvent(@PathVariable("id") String id) {
        eventServices.deleteEvent(id);
    }


    @GetMapping("uploads/events/{filename}")
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
