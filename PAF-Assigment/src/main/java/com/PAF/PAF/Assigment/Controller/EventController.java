package com.PAF.PAF.Assigment.Controller;

import com.PAF.PAF.Assigment.Entity.EventEntity;
import com.PAF.PAF.Assigment.Service.EventServices;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/event")
@CrossOrigin
public class EventController {

    private EventServices eventServices;

    @PostMapping("/createEvent")
    public EventEntity createEvent(@RequestBody EventEntity eventEntity) {
        return eventServices.createEvent(eventEntity);
    }

    @GetMapping("/getAllEvents")
    public List<EventEntity> getAllEvents() {
        return eventServices.getAllEvents();
    }

    @GetMapping("/getEventById/{id}")
    public EventEntity getEventById(@PathVariable("id") String id) {
        return eventServices.getEventById(id);
    }

    @PatchMapping("/updateEvent")
    public EventEntity updateEvent(@RequestBody EventEntity eventEntity) {
        return eventServices.updateEvent(eventEntity);
    }

    @DeleteMapping("/deleteEvent/{id}")
    public void deleteEvent(@PathVariable("id") String id) {
        eventServices.deleteEvent(id);
    }

}
