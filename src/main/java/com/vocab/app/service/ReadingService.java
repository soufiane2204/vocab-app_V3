package com.vocab.app.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import com.vocab.app.model.ReadingSentence;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Loads the Reading practice sentences from the bundled JSON resource file
 * (src/main/resources/data/reading.json) once at startup.
 */
@Service
public class ReadingService {

    private List<ReadingSentence> sentences = Collections.emptyList();

    @PostConstruct
    public void loadData() {
        try (InputStream is = new ClassPathResource("data/reading.json").getInputStream()) {
            ObjectMapper mapper = new ObjectMapper();
            CollectionType listType = mapper.getTypeFactory()
                    .constructCollectionType(List.class, ReadingSentence.class);
            this.sentences = mapper.readValue(is, listType);
        } catch (Exception e) {
            throw new IllegalStateException("Could not load reading.json", e);
        }
    }

    public List<ReadingSentence> find(String language, String level) {
        String lang = (language == null) ? "en" : language;
        return sentences.stream()
                .filter(s -> lang.equalsIgnoreCase(s.getLanguage()))
                .filter(s -> level == null || s.getLevel().equalsIgnoreCase(level))
                .collect(Collectors.toList());
    }
}
