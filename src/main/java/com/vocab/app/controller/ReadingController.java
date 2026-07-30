package com.vocab.app.controller;

import com.vocab.app.model.ReadingSentence;
import com.vocab.app.service.ReadingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reading")
@CrossOrigin(origins = "*")
public class ReadingController {

    private final ReadingService readingService;

    public ReadingController(ReadingService readingService) {
        this.readingService = readingService;
    }

    /**
     * GET /api/reading?lang=fr&level=easy
     */
    @GetMapping
    public List<ReadingSentence> getReadingSentences(
            @RequestParam(required = false) String lang,
            @RequestParam(required = false) String level) {
        return readingService.find(lang, level);
    }
}
