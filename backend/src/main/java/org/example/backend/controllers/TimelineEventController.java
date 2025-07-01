package org.example.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.example.backend.DTO.TimelineEventDTO;
import org.example.backend.model.TimelineEvent;
import org.example.backend.service.TimelineEventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/timeline")
@RequiredArgsConstructor
public class TimelineEventController {

    private final TimelineEventService eventService;

    @PostMapping("/events")
    public ResponseEntity<?> addTimelineEvent(@RequestBody TimelineEventDTO eventData) {
        try {
            TimelineEvent createdEvent = eventService.createEvent(eventData);

            return ResponseEntity.status(HttpStatus.CREATED).body(createdEvent);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "An unexpected error occurred."));

        }
    }
}