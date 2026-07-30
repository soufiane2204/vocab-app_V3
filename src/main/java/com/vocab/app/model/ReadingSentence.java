package com.vocab.app.model;

/**
 * Represents a single sentence used for Reading practice
 * (read the sentence, press Listen to hear correct pronunciation/rhythm).
 */
public class ReadingSentence {

    private int id;
    private String level; // easy | normal
    private String text;
    private String topic; // originating vocabulary topic, for variety/context
    private String language; // "en" | "fr"

    public ReadingSentence() {
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

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
