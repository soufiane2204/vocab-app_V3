package com.vocab.app.model;

import java.util.List;

/**
 * One "Grammar in Context" tense exercise: a single base sentence
 * (e.g. "I take a picture") shown conjugated across 6 tenses (easy level)
 * or 7 tenses (normal level, adds Past Perfect), each as its own
 * fill-in-the-blank row on the same page.
 */
public class TenseGroup {

    private int id;
    private String level;        // easy | normal
    private String language;     // en | fr
    private String baseSentence; // reference sentence shown as the exercise heading
    private List<TenseRow> rows;

    public TenseGroup() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getBaseSentence() {
        return baseSentence;
    }

    public void setBaseSentence(String baseSentence) {
        this.baseSentence = baseSentence;
    }

    public List<TenseRow> getRows() {
        return rows;
    }

    public void setRows(List<TenseRow> rows) {
        this.rows = rows;
    }
}
