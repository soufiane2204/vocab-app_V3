package com.vocab.app.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Represents a single vocabulary entry: a word, its part of speech,
 * its category, its difficulty level, a plain-English meaning and
 * an example sentence.
 */
public class Word {

    private int id;
    private String word;

    @JsonProperty("partOfSpeech")
    private String partOfSpeech;

    private String category;
    private String level; // easy | normal | hard
    private String meaning;
    private String example;
    private String emoji;
    private String pronunciation;
    private String language; // "en" | "fr"

    public Word() {
    }

    public Word(int id, String word, String partOfSpeech, String category,
                String level, String meaning, String example, String emoji, String pronunciation, String language) {
        this.id = id;
        this.word = word;
        this.partOfSpeech = partOfSpeech;
        this.category = category;
        this.level = level;
        this.meaning = meaning;
        this.example = example;
        this.emoji = emoji;
        this.pronunciation = pronunciation;
        this.language = language;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String getPartOfSpeech() {
        return partOfSpeech;
    }

    public void setPartOfSpeech(String partOfSpeech) {
        this.partOfSpeech = partOfSpeech;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    public String getMeaning() {
        return meaning;
    }

    public void setMeaning(String meaning) {
        this.meaning = meaning;
    }

    public String getExample() {
        return example;
    }

    public void setExample(String example) {
        this.example = example;
    }

    public String getEmoji() {
        return emoji;
    }

    public void setEmoji(String emoji) {
        this.emoji = emoji;
    }

    public String getPronunciation() {
        return pronunciation;
    }

    public void setPronunciation(String pronunciation) {
        this.pronunciation = pronunciation;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
