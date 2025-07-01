package org.example.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Table("timelineevents")
public class TimelineEvent {

    @Id
    @Column("eventid")
    private Long eventId;

    @Column("eventname")
    private String eventName;

    @Column("eventdescription")
    private String eventDescription;

    @Column("eventstart")
    private LocalDate eventStart;

    @Column("eventend")
    private LocalDate eventEnd;

    @Column("createdat")
    private LocalDateTime createdAt;

    @Column("updatedat")
    private LocalDateTime updatedAt;
}