package org.example.backend.controllers;

import lombok.RequiredArgsConstructor;
import org.example.backend.DTO.TimelineEventDTO;
import org.example.backend.service.TimelineEventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/timeline")
@RequiredArgsConstructor
public class TimelinePublicEventController {

    private final TimelineEventService eventService;

    @GetMapping("/events")
    public ResponseEntity<List<TimelineEventDTO>> getAllEvents() {
        List<TimelineEventDTO> events = eventService.getAllEvents();
        return ResponseEntity.ok(events);
    }
}