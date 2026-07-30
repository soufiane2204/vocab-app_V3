package com.vocab.app.model;

import java.util.List;

/**
 * Represents a single grammar exercise (multiple choice), e.g. choosing
 * between "a/an/the", "in/on/at", verb tenses, or subject-verb agreement.
 * Exercises are grouped under a vocabulary "topic" (verbs or adjectives)
 * and a grammarType, and are split by difficulty level.
 */
public class Exercise {

    private int id;
    private String topic;        // "verbs" | "adjectives"
    private String grammarType;  // ARTICLE | PREPOSITION | VERB_TENSE | AGREEMENT | DEMONSTRATIVE
    private String level;        // easy | normal | hard
    private String sentence;     // contains "___" as the blank to fill
    private List<String> options;
    private String answer;
    private String explanation;
    private String language; // "en" | "fr"

    public Exercise() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getGrammarType() {
        return grammarType;
    }

    public void setGrammarType(String grammarType) {
        this.grammarType = grammarType;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getSentence() {
        return sentence;
    }

    public void setSentence(String sentence) {
        this.sentence = sentence;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
