package com.PAF.PAF.Assigment.Service;

import com.PAF.PAF.Assigment.Entity.EventEntity;
import com.PAF.PAF.Assigment.Repository.EventRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EventServices {

    @Autowired
    private EventRepo eventRepo;

    public List<EventEntity> getAllEvents(){
        return eventRepo.findAll();
    }

    public EventEntity getEventById(String id){
        return eventRepo.findById(String.valueOf(id)).orElse(null);
    }

    public List<EventEntity> getEventByUserId(String userId){
        return eventRepo.findAllByUserId(userId);
    }

    public EventEntity createEvent(EventEntity event){
        return eventRepo.save(event);
    }

    public EventEntity updateEvent(EventEntity event){
        EventEntity existingEvent = eventRepo.findById(event.getId()).orElse(null);
        if (existingEvent != null) {
            existingEvent.setUserId(event.getUserId());
            existingEvent.setUserName(event.getUserName());
            existingEvent.setImgUrl(event.getImgUrl());
            existingEvent.setTopic(event.getTopic());
            existingEvent.setOrganization(event.getOrganization());
            existingEvent.setDate(event.getDate());
            existingEvent.setTime(event.getTime());
            existingEvent.setLocation(event.getLocation());
            existingEvent.setLink(event.getLink());
            existingEvent.setDescription(event.getDescription());
            existingEvent.setSpeaker(event.getSpeaker());
            return eventRepo.save(existingEvent);
        }
        return null;
    }

    public EventEntity deleteEvent(String id){
        EventEntity existingEvent = eventRepo.findById(id).orElse(null);
        if (existingEvent != null) {
            eventRepo.delete(existingEvent);
            return existingEvent;
        }
        return null;
    }

    public List<EventEntity> getAllEventsExcludingSelf(String userId) {
        return eventRepo.findAllEventsNotCreatedBy(userId);
    }
}
