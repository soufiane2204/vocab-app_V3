package com.vocab.app.model;

/**
 * Represents a vocabulary topic/category, e.g. "Travel" or "Food".
 */
public class Category {

    private String id;
    private String name;
    private String icon;
    private String language; // "en" | "fr" — the id stays the same across languages, only name is translated

    public Category() {
    }

    public Category(String id, String name, String icon, String language) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.language = language;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
