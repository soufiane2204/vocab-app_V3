package com.vocab.app.controller;

import com.vocab.app.model.Category;
import com.vocab.app.model.Word;
import com.vocab.app.service.VocabService;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class VocabController {

    private final VocabService vocabService;

    public VocabController(VocabService vocabService) {
        this.vocabService = vocabService;
    }

    @GetMapping("/categories")
    public List<Category> getCategories(@RequestParam(required = false) String lang) {
        return vocabService.getAllCategories(lang);
    }

    /**
     * Returns words, optionally filtered by language (en|fr), level (easy|normal)
     * and/or category id (e.g. "food", "travel").
     * Example: GET /api/words?lang=fr&level=easy&category=travel
     */
    @GetMapping("/words")
    public List<Word> getWords(
            @RequestParam(required = false) String lang,
            @RequestParam(required = false) String level,
            @RequestParam(required = false) String category) {
        return vocabService.findWords(lang, level, category);
    }

    /**
     * Returns a count of how many words exist per category for a given language and level,
     * useful for building the level-selection dashboard on the frontend.
     */
    @GetMapping("/stats")
    public Map<String, Object> getStats(
            @RequestParam(required = false) String lang,
            @RequestParam(required = false) String level) {
        Map<String, Object> stats = new LinkedHashMap<>();
        for (Category c : vocabService.getAllCategories(lang)) {
            stats.put(c.getId(), vocabService.countWords(lang, level, c.getId()));
        }
        return stats;
    }

    @GetMapping("/levels")
    public List<String> getLevels() {
        return vocabService.getLevels();
    }
}
