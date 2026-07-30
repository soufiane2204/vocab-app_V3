package com.vocab.app.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import com.vocab.app.model.Exercise;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Loads the grammar exercises dataset from the bundled JSON resource file
 * (src/main/resources/data/exercises.json) once at startup and serves it
 * back through simple in-memory filtering.
 */
@Service
public class ExerciseService {

    private List<Exercise> exercises = Collections.emptyList();

    @PostConstruct
    public void loadData() {
        try (InputStream is = new ClassPathResource("data/exercises.json").getInputStream()) {
            ObjectMapper mapper = new ObjectMapper();
            CollectionType listType = mapper.getTypeFactory()
                    .constructCollectionType(List.class, Exercise.class);
            this.exercises = mapper.readValue(is, listType);
        } catch (Exception e) {
            throw new IllegalStateException("Could not load exercises.json", e);
        }
    }

    public List<Exercise> getAll() {
        return exercises;
    }

    /**
     * Filters exercises by language, topic, grammar type, and/or level.
     * Topic/grammarType/level may be null to skip that filter. Language
     * defaults to "en" if null, for backward compatibility.
     */
    public List<Exercise> find(String language, String topic, String grammarType, String level) {
        String lang = (language == null) ? "en" : language;
        return exercises.stream()
                .filter(e -> lang.equalsIgnoreCase(e.getLanguage()))
                .filter(e -> topic == null || e.getTopic().equalsIgnoreCase(topic))
                .filter(e -> grammarType == null || e.getGrammarType().equalsIgnoreCase(grammarType))
                .filter(e -> level == null || e.getLevel().equalsIgnoreCase(level))
                .collect(Collectors.toList());
    }

    public List<String> getGrammarTypes(String topic) {
        return exercises.stream()
                .filter(e -> topic == null || e.getTopic().equalsIgnoreCase(topic))
                .map(Exercise::getGrammarType)
                .filter(Objects::nonNull)
                .distinct()
                .collect(Collectors.toList());
    }
}
