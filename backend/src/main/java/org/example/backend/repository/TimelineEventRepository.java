package org.example.backend.repository;

import org.example.backend.model.TimelineEvent;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimelineEventRepository extends CrudRepository<TimelineEvent, Long> {
}