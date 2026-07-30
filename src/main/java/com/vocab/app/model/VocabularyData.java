package com.vocab.app.model;

import java.util.List;

/**
 * Matches the top-level structure of the vocabulary.json resource file.
 */
public class VocabularyData {

    private List<Category> categories;
    private List<Word> words;

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }

    public List<Word> getWords() {
        return words;
    }

    public void setWords(List<Word> words) {
        this.words = words;
    }
}
