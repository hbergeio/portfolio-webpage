package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.DTO.TimelineEventDTO;
import org.example.backend.model.TimelineEvent;
import org.example.backend.repository.TimelineEventRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class TimelineEventService {

    private final TimelineEventRepository eventRepository;

    public TimelineEvent createEvent(TimelineEventDTO eventDTO) {
        TimelineEvent newEvent = new TimelineEvent();

        newEvent.setEventName(eventDTO.eventName());
        newEvent.setEventDescription(eventDTO.eventDescription());
        newEvent.setEventImportance(eventDTO.eventImportance());

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

    public List<TimelineEventDTO> getAllEvents() {
        return StreamSupport.stream(eventRepository.findAll().spliterator(), false)
                .map(this::convertToDto) // For each event, call our conversion helper
                .collect(Collectors.toList());
    }

    private TimelineEventDTO convertToDto(TimelineEvent event) {
        String eventEndStr = (event.getEventEnd() != null) ? event.getEventEnd().toString() : null;

        return new TimelineEventDTO(
                event.getEventName(),
                event.getEventDescription(),
                event.getEventStart().toString(),
                eventEndStr,
                event.getEventImportance()
        );
    }
}