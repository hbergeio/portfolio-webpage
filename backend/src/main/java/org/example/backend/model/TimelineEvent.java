package org.example.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Table("TimelineEvents")
public class TimelineEvent {

    @Id
    @Column("EventID")
    private Long eventId;

    @Column("EventName")
    private String eventName;

    @Column("EventDescription")
    private String eventDescription;

    @Column("EventStart")
    private LocalDate eventStart;

    @Column("EventEnd")
    private LocalDate eventEnd;

    @Column("createdAt")
    private LocalDateTime createdAt;

    @Column("updatedAt")
    private LocalDateTime updatedAt;
}
