package com.vocab.app.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import com.vocab.app.model.TenseGroup;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Loads the grouped tense-drill dataset (src/main/resources/data/tense-groups.json)
 * once at startup and serves it back filtered by level. Each group is one
 * base sentence conjugated across several tenses, all on a single "page".
 */
@Service
public class TenseGroupService {

    private List<TenseGroup> groups = Collections.emptyList();

    @PostConstruct
    public void loadData() {
        try (InputStream is = new ClassPathResource("data/tense-groups.json").getInputStream()) {
            ObjectMapper mapper = new ObjectMapper();
            CollectionType listType = mapper.getTypeFactory()
                    .constructCollectionType(List.class, TenseGroup.class);
            this.groups = mapper.readValue(is, listType);
        } catch (Exception e) {
            throw new IllegalStateException("Could not load tense-groups.json", e);
        }
    }

    public List<TenseGroup> find(String language, String level) {
        String lang = (language == null) ? "en" : language;
        return groups.stream()
                .filter(g -> lang.equalsIgnoreCase(g.getLanguage() == null ? "en" : g.getLanguage()))
                .filter(g -> level == null || level.equalsIgnoreCase(g.getLevel()))
                .collect(Collectors.toList());
    }
}
