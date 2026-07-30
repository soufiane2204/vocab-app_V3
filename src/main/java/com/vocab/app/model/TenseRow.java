package com.vocab.app.model;

import java.util.List;

/**
 * One fill-in-the-blank row inside a TenseGroup, e.g. the "Present Simple"
 * row for the base sentence "I take a picture": "I ___ a picture every day."
 */
public class TenseRow {

    private String tenseLabel;   // e.g. "Present Simple"
    private String sentence;     // contains "___" as the blank
    private List<String> options;
    private String answer;
    private String explanation;

    public TenseRow() {
    }

    public String getTenseLabel() {
        return tenseLabel;
    }

    public void setTenseLabel(String tenseLabel) {
        this.tenseLabel = tenseLabel;
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
}
