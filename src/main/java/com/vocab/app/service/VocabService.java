package com.vocab.app.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vocab.app.model.Category;
import com.vocab.app.model.VocabularyData;
import com.vocab.app.model.Word;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * Loads the vocabulary dataset from the bundled JSON resource file
 * (src/main/resources/data/vocabulary.json) once when the application
 * starts, and serves it back through simple in-memory filtering.
 */
@Service
public class VocabService {

    private List<Category> categories = Collections.emptyList();
    private List<Word> words = Collections.emptyList();

    @PostConstruct
    public void loadData() {
        try (InputStream is = new ClassPathResource("data/vocabulary.json").getInputStream()) {
            ObjectMapper mapper = new ObjectMapper();
            VocabularyData data = mapper.readValue(is, VocabularyData.class);
            this.categories = data.getCategories();
            this.words = data.getWords();
        } catch (Exception e) {
            throw new IllegalStateException("Could not load vocabulary.json", e);
        }
    }

    public List<Category> getAllCategories(String language) {
        String lang = (language == null) ? "en" : language;
        return categories.stream()
                .filter(c -> lang.equalsIgnoreCase(c.getLanguage()))
                .collect(Collectors.toList());
    }

    public List<Word> getAllWords() {
        return words;
    }

    /**
     * Filters words by language, level and/or category. Level and category may be
     * null, in which case that filter is skipped. Language defaults to "en" if null,
     * for backward compatibility with clients that don't send it yet.
     */
    public List<Word> findWords(String language, String level, String category) {
        String lang = (language == null) ? "en" : language;
        return words.stream()
                .filter(w -> lang.equalsIgnoreCase(w.getLanguage()))
                .filter(w -> level == null || w.getLevel().equalsIgnoreCase(level))
                .filter(w -> category == null || w.getCategory().equalsIgnoreCase(category))
                .collect(Collectors.toList());
    }

    public long countWords(String language, String level, String category) {
        return findWords(language, level, category).size();
    }

    public List<String> getLevels() {
        return words.stream()
                .map(Word::getLevel)
                .filter(Objects::nonNull)
                .distinct()
                .collect(Collectors.toList());
    }
}
