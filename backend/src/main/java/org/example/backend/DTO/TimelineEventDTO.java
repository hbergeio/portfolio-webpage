package org.example.backend.DTO;

public record TimelineEventDTO(
        String eventName,
        String eventDescription,
        String eventStart,
        String eventEnd,
        Integer eventImportance
) {}