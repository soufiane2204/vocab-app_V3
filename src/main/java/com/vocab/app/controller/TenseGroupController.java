package com.vocab.app.controller;

import com.vocab.app.model.TenseGroup;
import com.vocab.app.service.TenseGroupService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tense-groups")
@CrossOrigin(origins = "*")
public class TenseGroupController {

    private final TenseGroupService tenseGroupService;

    public TenseGroupController(TenseGroupService tenseGroupService) {
        this.tenseGroupService = tenseGroupService;
    }

    /**
     * GET /api/tense-groups?lang=fr&level=easy
     * Returns base sentences conjugated across several tenses, each group
     * being one self-contained multi-row exercise.
     */
    @GetMapping
    public List<TenseGroup> getTenseGroups(
            @RequestParam(required = false) String lang,
            @RequestParam(required = false) String level) {
        return tenseGroupService.find(lang, level);
    }
}
