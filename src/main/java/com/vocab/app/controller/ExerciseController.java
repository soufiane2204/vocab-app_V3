package com.vocab.app.controller;

import com.vocab.app.model.Exercise;
import com.vocab.app.service.ExerciseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exercises")
@CrossOrigin(origins = "*")
public class ExerciseController {

    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    /**
     * GET /api/exercises?lang=fr&topic=verbs&grammarType=VERB_TENSE&level=easy
     * All parameters are optional.
     */
    @GetMapping
    public List<Exercise> getExercises(
            @RequestParam(required = false) String lang,
            @RequestParam(required = false) String topic,
            @RequestParam(required = false) String grammarType,
            @RequestParam(required = false) String level) {
        return exerciseService.find(lang, topic, grammarType, level);
    }

    @GetMapping("/types")
    public List<String> getGrammarTypes(@RequestParam(required = false) String topic) {
        return exerciseService.getGrammarTypes(topic);
    }
}
