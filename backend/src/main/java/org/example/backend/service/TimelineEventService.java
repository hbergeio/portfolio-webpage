package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.DTO.TimelineEventDTO;
import org.example.backend.model.TimelineEvent;
import org.example.backend.repository.TimelineEventRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;

@Service
@RequiredArgsConstructor
public class TimelineEventService {

    private final TimelineEventRepository eventRepository;

    public TimelineEvent createEvent(TimelineEventDTO eventDTO) {
        TimelineEvent newEvent = new TimelineEvent();

        newEvent.setEventName(eventDTO.eventName());
        newEvent.setEventDescription(eventDTO.eventDescription());

        try {
            newEvent.setEventStart(LocalDate.parse(eventDTO.eventStart()));
            if (eventDTO.eventEnd() != null && !eventDTO.eventEnd().isEmpty()) {
                newEvent.setEventEnd(LocalDate.parse(eventDTO.eventEnd()));
            }
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid date format.", e);
        }

        LocalDateTime now = LocalDateTime.now();
        newEvent.setCreatedAt(now);
        newEvent.setUpdatedAt(now);

        return eventRepository.save(newEvent);
    }
}