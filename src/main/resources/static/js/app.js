// ---------------------------------------------------------------
// Vocabulary Trainer — frontend logic
// Talks to the Spring Boot backend at /api/*
// Uses the browser's built-in SpeechSynthesis API for pronunciation
// (no external service or API key needed).
// ---------------------------------------------------------------

// ---------- UI translations (interface chrome only — content already comes translated from the API) ----------
const STRINGS = {
    en: {
        "app.title": "🗣️ Vocabulary Trainer",
        "home.back": "← Change language",
        "home.title": "What would you like to do?",
        "home.subtitle": "Learn new words, or practice using them.",
        "home.vocab.title": "Vocabulary",
        "home.vocab.desc": "Learn words by topic — Easy & Normal levels, flashcards, quizzes",
        "home.practice.title": "Practice",
        "home.practice.desc": "Grammar in Context & Reading — build real fluency",
        "levels.back": "← Home",
        "levels.title": "Choose your level",
        "levels.subtitle.vocab": "Pick a difficulty to start learning words, verbs and adjectives.",
        "level.easy.title": "Easy",
        "level.easy.desc.vocab": "Core everyday words — start here",
        "level.normal.title": "Normal",
        "level.normal.desc.vocab": "Solid intermediate vocabulary",
        "categories.back": "← Change level",
        "categories.title": "Choose a topic",
        "words.back": "← Change topic",
        "mode.list": "📃 List",
        "mode.flash": "🃏 Flashcards",
        "mode.quiz": "🎯 Quiz",
        "flash.hint": "Click card to reveal meaning & example",
        "common.listen": "🔊 Listen",
        "common.prev": "← Prev",
        "common.next": "Next →",
        "common.words": "words",
        "common.level": "level",
        "common.wellDone": "Well done! 🎉",
        "common.tryAgain": "Try again",
        "common.niceEffort": "Nice effort! 💪",
        "common.perfectScore": "Perfect score! 🏆",
        "common.excellentWork": "Excellent work! 🎉",
        "common.goodJob": "Good job! 👍",
        "common.correct": "✅ Correct!",
        "common.incorrectPrefix": "❌ Not quite — the answer is",
        "common.streakInARow": "in a row!",
        "common.streak": "streak",
        "practiceLevels.subtitle": "Pick a difficulty for practice.",
        "level.easy.desc.practice": "Core grammar & simple sentences",
        "level.normal.desc.practice": "Intermediate grammar & sentences",
        "practiceMenu.title": "Practice",
        "practiceMenu.subtitleTemplate": "{level} level — choose an activity.",
        "practice.grammar.title": "Grammar in Context",
        "practice.grammar.desc": "Fill-in-the-blank exercises: articles, prepositions, tenses, connectors & more",
        "practice.reading.title": "Reading",
        "practice.reading.desc": "Read real sentences aloud, with audio to check yourself",
        "grammarCategories.back": "← Back to Practice",
        "grammarCategories.title": "📝 Grammar in Context",
        "grammarCategories.subtitle": "Choose what you want to practice.",
        "grammarCategories.questions": "questions",
        "grammarCategories.exercises": "exercises",
        "tenseGroups.back": "← Back to Grammar in Context",
        "tenseGroups.title": "⏳ Verb Tenses",
        "tenseGroups.subtitle": "See how the same sentence changes across tenses. Fill in every blank.",
        "tenseGroups.next": "Next exercise →",
        "tenseGroups.exercise": "Exercise",
        "tenseGroups.score": "Score",
        "tenseGroups.sentence": "Sentence",
        "tenseGroups.noData": "No tense exercises found for this level yet.",
        "tenseGroups.scoredTemplate": "You scored {score} out of {total} ({pct}%).",
        "exercises.back": "← Back",
        "exercises.next": "Next question →",
        "exercises.question": "Question",
        "exercises.score": "Score",
        "exercises.noData": "No exercises found for this level yet.",
        "exercises.scoredTemplate": "You scored {score} out of {total} ({pct}%).",
        "quiz.title.suffix": "Quiz",
        "quiz.subtitle": "A quick 15-question quiz generated from this topic's words.",
        "quiz.whatDoesMean": 'What does "{word}" mean?',
        "quiz.whichWordMeans": 'Which word means: "{meaning}"?',
        "quiz.example": "Example:",
        "grammar.subtitle.exercise": "Choose the correct word to complete each sentence.",
        "reading.back": "← Back to Practice",
        "reading.title": "📖 Reading Practice",
        "reading.subtitle": "Read the sentence out loud, then press Listen to check yourself.",
        "reading.sentence": "Sentence",
        "reading.noData": "No reading sentences found for this level yet.",
        "breadcrumb.vocabulary": "Vocabulary",
        "breadcrumb.practice": "Practice",
        "footer.text": "Spring Boot backend · Data served from",
        "speech.unsupported": "Sorry, your browser doesn't support speech pronunciation.",
    },
    fr: {
        "app.title": "🗣️ Entraîneur de Vocabulaire",
        "home.back": "← Changer de langue",
        "home.title": "Que voulez-vous faire ?",
        "home.subtitle": "Apprenez de nouveaux mots ou entraînez-vous à les utiliser.",
        "home.vocab.title": "Vocabulaire",
        "home.vocab.desc": "Apprenez des mots par thème — niveaux Facile et Normal, cartes mémo, quiz",
        "home.practice.title": "Pratique",
        "home.practice.desc": "Grammaire en Contexte et Lecture — développez une vraie aisance",
        "levels.back": "← Accueil",
        "levels.title": "Choisissez votre niveau",
        "levels.subtitle.vocab": "Choisissez un niveau de difficulté pour commencer à apprendre des mots, verbes et adjectifs.",
        "level.easy.title": "Facile",
        "level.easy.desc.vocab": "Mots essentiels du quotidien — commencez ici",
        "level.normal.title": "Normal",
        "level.normal.desc.vocab": "Vocabulaire intermédiaire solide",
        "categories.back": "← Changer de niveau",
        "categories.title": "Choisissez un thème",
        "words.back": "← Changer de thème",
        "mode.list": "📃 Liste",
        "mode.flash": "🃏 Cartes mémo",
        "mode.quiz": "🎯 Quiz",
        "flash.hint": "Cliquez sur la carte pour révéler le sens et l'exemple",
        "common.listen": "🔊 Écouter",
        "common.prev": "← Précédent",
        "common.next": "Suivant →",
        "common.words": "mots",
        "common.level": "niveau",
        "common.wellDone": "Bien joué ! 🎉",
        "common.tryAgain": "Réessayer",
        "common.niceEffort": "Bel effort ! 💪",
        "common.perfectScore": "Score parfait ! 🏆",
        "common.excellentWork": "Excellent travail ! 🎉",
        "common.goodJob": "Bon travail ! 👍",
        "common.correct": "✅ Correct !",
        "common.incorrectPrefix": "❌ Pas tout à fait — la réponse est",
        "common.streakInARow": "d'affilée !",
        "common.streak": "d'affilée",
        "practiceLevels.subtitle": "Choisissez un niveau de difficulté pour vous entraîner.",
        "level.easy.desc.practice": "Grammaire de base et phrases simples",
        "level.normal.desc.practice": "Grammaire et phrases de niveau intermédiaire",
        "practiceMenu.title": "Pratique",
        "practiceMenu.subtitleTemplate": "Niveau {level} — choisissez une activité.",
        "practice.grammar.title": "Grammaire en Contexte",
        "practice.grammar.desc": "Exercices à trous : articles, prépositions, temps, connecteurs et plus",
        "practice.reading.title": "Lecture",
        "practice.reading.desc": "Lisez de vraies phrases à voix haute, avec audio pour vous vérifier",
        "grammarCategories.back": "← Retour à Pratique",
        "grammarCategories.title": "📝 Grammaire en Contexte",
        "grammarCategories.subtitle": "Choisissez ce que vous voulez pratiquer.",
        "grammarCategories.questions": "questions",
        "grammarCategories.exercises": "exercices",
        "tenseGroups.back": "← Retour à Grammaire en Contexte",
        "tenseGroups.title": "⏳ Conjugaison au Présent",
        "tenseGroups.subtitle": "Découvrez comment la même phrase change selon les temps. Complétez chaque blanc.",
        "tenseGroups.next": "Exercice suivant →",
        "tenseGroups.exercise": "Exercice",
        "tenseGroups.score": "Score",
        "tenseGroups.sentence": "Phrase",
        "tenseGroups.noData": "Aucun exercice de conjugaison trouvé pour ce niveau.",
        "tenseGroups.scoredTemplate": "Vous avez obtenu {score} sur {total} ({pct}%).",
        "exercises.back": "← Retour",
        "exercises.next": "Question suivante →",
        "exercises.question": "Question",
        "exercises.score": "Score",
        "exercises.noData": "Aucun exercice trouvé pour ce niveau.",
        "exercises.scoredTemplate": "Vous avez obtenu {score} sur {total} ({pct}%).",
        "quiz.title.suffix": "Quiz",
        "quiz.subtitle": "Un quiz rapide de 15 questions généré à partir des mots de ce thème.",
        "quiz.whatDoesMean": 'Que veut dire "{word}" ?',
        "quiz.whichWordMeans": 'Quel mot signifie : "{meaning}" ?',
        "quiz.example": "Exemple :",
        "grammar.subtitle.exercise": "Choisissez le bon mot pour compléter chaque phrase.",
        "reading.back": "← Retour à Pratique",
        "reading.title": "📖 Pratique de Lecture",
        "reading.subtitle": "Lisez la phrase à voix haute, puis appuyez sur Écouter pour vous vérifier.",
        "reading.sentence": "Phrase",
        "reading.noData": "Aucune phrase de lecture trouvée pour ce niveau.",
        "breadcrumb.vocabulary": "Vocabulaire",
        "breadcrumb.practice": "Pratique",
        "footer.text": "Backend Spring Boot · Données servies depuis",
        "speech.unsupported": "Désolé, votre navigateur ne prend pas en charge la prononciation vocale.",
    },
};

function t(key, vars) {
    const dict = STRINGS[state && state.language] || STRINGS.en;
    let text = dict[key] !== undefined ? dict[key] : (STRINGS.en[key] !== undefined ? STRINGS.en[key] : key);
    if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
            text = text.replace(new RegExp(`\\{${k}\\}`, "g"), v);
        });
    }
    return text;
}

// Applies translated text to every static element carrying a data-i18n
// (textContent) or data-i18n-html (innerHTML, for strings with &amp; etc.)
// attribute. Called once the language is known and again on any UI-language change.
function applyStaticTranslations() {
    document.documentElement.lang = state.language || "en";
    document.querySelectorAll("[data-i18n]").forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-html]").forEach(el => {
        el.innerHTML = t(el.dataset.i18nHtml);
    });
    document.title = t("app.title").replace(/^[^\w]+/, "").trim() || document.title;
}

const API = {
    categories: (lang) => `/api/categories?lang=${encodeURIComponent(lang)}`,
    words: (lang, level, category) => `/api/words?lang=${encodeURIComponent(lang)}&level=${encodeURIComponent(level)}&category=${encodeURIComponent(category)}`,
    stats: (lang, level) => `/api/stats?lang=${encodeURIComponent(lang)}&level=${encodeURIComponent(level)}`,
    exercises: (lang, level) => `/api/exercises?lang=${encodeURIComponent(lang)}&level=${encodeURIComponent(level)}`,
    reading: (lang, level) => `/api/reading?lang=${encodeURIComponent(lang)}&level=${encodeURIComponent(level)}`,
    tenseGroups: (lang, level) => `/api/tense-groups?lang=${encodeURIComponent(lang)}&level=${encodeURIComponent(level)}`,
};

// Grouping of grammarType values into user-facing practice categories, per language
const GRAMMAR_CATEGORIES_EN = [
    { id: "tenses", name: "Verb Tenses", icon: "⏳", types: ["VERB_TENSE", "PRESENT_SIMPLE", "PRESENT_CONTINUOUS", "PAST_SIMPLE", "PAST_CONTINUOUS", "PRESENT_PERFECT", "PRESENT_PERFECT_CONTINUOUS", "PAST_PERFECT", "PAST_PERFECT_CONTINUOUS", "FUTURE_SIMPLE", "FUTURE_CONTINUOUS"] },
    { id: "articles", name: "Articles (a/an/the)", icon: "🔤", types: ["ARTICLE"] },
    { id: "prepositions", name: "Prepositions", icon: "📍", types: ["PREPOSITION"] },
    { id: "demonstratives", name: "Demonstratives", icon: "👉", types: ["DEMONSTRATIVE"] },
    { id: "adverbs", name: "Adverbs", icon: "🎯", types: ["ADVERB"] },
    { id: "agreement", name: "Subject-Verb Agreement", icon: "🔗", types: ["AGREEMENT"] },
    { id: "connectors", name: "Connectors", icon: "💬", types: ["CONNECTOR"] },
    { id: "mix", name: "Mix Everything", icon: "🎲", types: null },
];

const GRAMMAR_CATEGORIES_FR = [
    { id: "articles", name: "Articles (le/la/un/une)", icon: "🔤", types: ["ARTICLE_GENDER"] },
    { id: "adjectives", name: "Accord des Adjectifs", icon: "🎨", types: ["ADJECTIVE_AGREEMENT"] },
    { id: "verbs", name: "Conjugaison au Présent", icon: "⏳", types: ["PRESENT_TENSE_FR"] },
    { id: "prepositions", name: "Prépositions", icon: "📍", types: ["PREPOSITION_FR"] },
    { id: "mix", name: "Tout Mélanger", icon: "🎲", types: null },
];

function getGrammarCategories() {
    return state.language === "fr" ? GRAMMAR_CATEGORIES_FR : GRAMMAR_CATEGORIES_EN;
}

const state = {
    language: null, // "en" | "fr" — chosen on the very first screen

    // Vocabulary path
    level: null,
    category: null,
    categories: [],
    words: [],
    flashIndex: 0,

    // Shared exercise engine (Grammar in Context + per-topic vocab Quiz)
    exercises: [],
    exerciseIndex: 0,
    exerciseScore: 0,
    exerciseAnswered: false,
    quizSource: "grammar", // "grammar" (Practice) or "vocab" (topic Quiz)
    exercisesBackTarget: "words", // where the exercises view's back button should go
    streak: 0,

    // Practice path
    practiceLevel: null,
    allLevelExercises: [], // full unfiltered pool for the chosen practice level
    currentGrammarCategory: null, // id from GRAMMAR_CATEGORIES, for retry

    // Reading
    readingSentences: [],
    readingIndex: 0,

    // Grouped tense practice (Verb Tenses: one base sentence across several tenses per page)
    tenseGroups: [],
    tenseGroupIndex: 0,
    tenseScore: 0,
    tenseTotalBlanks: 0,
    tenseRowsAnsweredCount: 0,
};

const els = {
    breadcrumb: document.getElementById("breadcrumb"),
    viewLanguage: document.getElementById("view-language"),
    viewHome: document.getElementById("view-home"),
    viewLevels: document.getElementById("view-levels"),
    viewCategories: document.getElementById("view-categories"),
    viewWords: document.getElementById("view-words"),
    viewPracticeLevels: document.getElementById("view-practice-levels"),
    viewPracticeMenu: document.getElementById("view-practice-menu"),
    viewGrammarCategories: document.getElementById("view-grammar-categories"),
    grammarCategoryGrid: document.getElementById("grammar-category-grid"),
    viewExercises: document.getElementById("view-exercises"),
    viewReading: document.getElementById("view-reading"),
    viewTenseGroups: document.getElementById("view-tense-groups"),

    categoryGrid: document.getElementById("category-grid"),
    wordsTitle: document.getElementById("words-title"),
    listMode: document.getElementById("list-mode"),
    flashMode: document.getElementById("flash-mode"),
    modeListBtn: document.getElementById("mode-list"),
    modeFlashBtn: document.getElementById("mode-flash"),
    modeQuizBtn: document.getElementById("mode-quiz"),
    flashWord: document.getElementById("flash-word"),
    flashPos: document.getElementById("flash-pos"),
    flashMeaning: document.getElementById("flash-meaning"),
    flashExample: document.getElementById("flash-example"),
    flashCard: document.getElementById("flashcard"),
    flashBack: document.querySelector(".flash-back"),
    flashCounter: document.getElementById("flash-counter"),
    flashPrev: document.getElementById("flash-prev"),
    flashNext: document.getElementById("flash-next"),
    flashListen: document.getElementById("flash-listen"),
    flashEmoji: document.getElementById("flash-emoji"),
    flashPronunciation: document.getElementById("flash-pronunciation"),

    practiceMenuSubtitle: document.getElementById("practice-menu-subtitle"),

    exercisesBackBtn: document.getElementById("exercises-back-btn"),
    exercisesTitle: document.getElementById("exercises-title"),
    exercisesSubtitle: document.getElementById("exercises-subtitle"),
    exerciseProgress: document.getElementById("exercise-progress"),
    progressBarFill: document.getElementById("progress-bar-fill"),
    exerciseCard: document.getElementById("exercise-card"),
    exerciseTag: document.getElementById("exercise-tag"),
    exerciseSentence: document.getElementById("exercise-sentence"),
    exerciseOptions: document.getElementById("exercise-options"),
    exerciseFeedback: document.getElementById("exercise-feedback"),
    exerciseNext: document.getElementById("exercise-next"),
    exerciseSummary: document.getElementById("exercise-summary"),
    exerciseScore: document.getElementById("exercise-score"),
    exerciseRetry: document.getElementById("exercise-retry"),

    readingCounter: document.getElementById("reading-counter"),
    readingProgressFill: document.getElementById("reading-progress-fill"),
    readingSentence: document.getElementById("reading-sentence"),
    readingListen: document.getElementById("reading-listen"),
    readingPrev: document.getElementById("reading-prev"),
    readingNext: document.getElementById("reading-next"),

    tenseGroupsTitle: document.getElementById("tense-groups-title"),
    tenseGroupProgress: document.getElementById("tense-group-progress"),
    tenseGroupProgressFill: document.getElementById("tense-group-progress-fill"),
    tenseGroupCard: document.getElementById("tense-group-card"),
    tenseGroupBase: document.getElementById("tense-group-base"),
    tenseRows: document.getElementById("tense-rows"),
    tenseGroupNext: document.getElementById("tense-group-next"),
    tenseGroupSummary: document.getElementById("tense-group-summary"),
    tenseGroupScore: document.getElementById("tense-group-score"),
    tenseGroupRetry: document.getElementById("tense-group-retry"),
};

// ---------- Speech ----------
function speak(text) {
    if (!("speechSynthesis" in window)) {
        alert(t("speech.unsupported"));
        return;
    }
    window.speechSynthesis.cancel(); // stop any current utterance
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = state.language === "fr" ? "fr-FR" : "en-US";
    utter.rate = 0.92;
    window.speechSynthesis.speak(utter);
}

// ---------- Utilities ----------
function shuffle(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// ---------- View switching ----------
const ALL_VIEWS = {
    language: "viewLanguage",
    home: "viewHome",
    levels: "viewLevels",
    categories: "viewCategories",
    words: "viewWords",
    "practice-levels": "viewPracticeLevels",
    "practice-menu": "viewPracticeMenu",
    "grammar-categories": "viewGrammarCategories",
    exercises: "viewExercises",
    reading: "viewReading",
    "tense-groups": "viewTenseGroups",
};

function showView(name) {
    Object.entries(ALL_VIEWS).forEach(([key, elKey]) => {
        els[elKey].classList.toggle("hidden", key !== name);
    });
    updateBreadcrumb(name);
}

function updateBreadcrumb(viewName) {
    const parts = [];
    if (["levels", "categories", "words"].includes(viewName)) {
        parts.push(t("breadcrumb.vocabulary"));
        if (state.level) parts.push(state.level.toUpperCase());
        if (state.category) {
            const cat = state.categories.find(c => c.id === state.category);
            parts.push(cat ? cat.name : state.category);
        }
    } else if (["practice-levels", "practice-menu", "grammar-categories", "exercises", "reading", "tense-groups"].includes(viewName) && state.quizSource !== "vocab") {
        parts.push(t("breadcrumb.practice"));
        if (state.practiceLevel) parts.push(state.practiceLevel.toUpperCase());
    } else if (viewName === "exercises" && state.quizSource === "vocab") {
        parts.push(t("breadcrumb.vocabulary"));
        if (state.level) parts.push(state.level.toUpperCase());
        const cat = state.categories.find(c => c.id === state.category);
        parts.push(cat ? cat.name : state.category);
    }
    els.breadcrumb.textContent = parts.join(" / ");
}

// ---------- LANGUAGE ----------
document.querySelectorAll("[data-lang]").forEach(btn => {
    btn.addEventListener("click", () => {
        const chosen = btn.dataset.lang;
        if (chosen !== state.language) {
            // switching language invalidates any cached data fetched under the old one
            state.categories = [];
            state.words = [];
        }
        state.language = chosen;
        applyStaticTranslations();
        showView("home");
    });
});

// ---------- HOME ----------
document.querySelectorAll("[data-home]").forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.home;
        if (target === "vocabulary") {
            showView("levels");
        } else if (target === "practice") {
            showView("practice-levels");
        }
    });
});

// ---------- Generic back-button handling ----------
document.querySelectorAll("[data-back]").forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.back;
        if (target === "language") {
            state.level = null;
            state.category = null;
            state.practiceLevel = null;
            showView("language");
        } else if (target === "home") {
            state.level = null;
            state.category = null;
            state.practiceLevel = null;
            showView("home");
        } else if (target === "levels") {
            state.category = null;
            showView("levels");
        } else if (target === "categories") {
            showView("categories");
        } else if (target === "practice-levels") {
            showView("practice-levels");
        } else if (target === "practice-menu") {
            showView("practice-menu");
        } else if (target === "grammar-categories") {
            showView("grammar-categories");
        }
    });
});

// ---------- VOCABULARY: Levels ----------
document.querySelectorAll("[data-level]").forEach(btn => {
    btn.addEventListener("click", async () => {
        state.level = btn.dataset.level;
        await loadCategories();
        showView("categories");
    });
});

// ---------- VOCABULARY: Categories ----------
async function loadCategories() {
    if (state.categories.length === 0) {
        const res = await fetch(API.categories(state.language));
        state.categories = await res.json();
    }
    const statsRes = await fetch(API.stats(state.language, state.level));
    const stats = await statsRes.json();

    els.categoryGrid.innerHTML = "";
    state.categories.forEach(cat => {
        const card = document.createElement("button");
        card.className = "category-card";
        card.innerHTML = `
            <span class="category-icon">${cat.icon || "📘"}</span>
            <span class="category-name">${cat.name}</span>
            <span class="category-count">${stats[cat.id] ?? 0} ${t("common.words")}</span>
        `;
        card.addEventListener("click", async () => {
            state.category = cat.id;
            await loadWords();
            showView("words");
        });
        els.categoryGrid.appendChild(card);
    });
}

// ---------- VOCABULARY: Words ----------
async function loadWords() {
    const res = await fetch(API.words(state.language, state.level, state.category));
    state.words = await res.json();
    state.flashIndex = 0;

    const cat = state.categories.find(c => c.id === state.category);
    els.wordsTitle.textContent = `${cat ? cat.icon + " " + cat.name : ""} — ${state.level} ${t("common.level")}`;

    renderList();
    renderFlashcard();
    setActiveMode("list");
}

function renderList() {
    els.listMode.innerHTML = "";
    state.words.forEach((w, i) => {
        const card = document.createElement("div");
        card.className = `word-card level-${state.level}`;
        card.dataset.index = String(i + 1).padStart(2, "0");
        card.innerHTML = `
            <div class="word-top">
                ${w.emoji ? `<span class="word-emoji">${w.emoji}</span>` : ""}
                <span class="word-title">${w.word}</span>
                <span class="word-pos">${w.partOfSpeech}</span>
                ${w.pronunciation ? `<span class="word-pronunciation">[ ${w.pronunciation} ]</span>` : ""}
            </div>
            <p class="word-meaning">${w.meaning}</p>
            <p class="word-example">“${w.example}”</p>
            <button class="listen-btn">${t("common.listen")}</button>
        `;
        card.querySelector(".listen-btn").addEventListener("click", () => speak(w.word));
        els.listMode.appendChild(card);
    });
}

// ---------- Flashcards ----------
function renderFlashcard() {
    if (state.words.length === 0) return;
    const w = state.words[state.flashIndex];
    els.flashEmoji.textContent = w.emoji || "";
    els.flashWord.textContent = w.word;
    els.flashPos.textContent = w.partOfSpeech;
    els.flashPronunciation.textContent = w.pronunciation ? `[ ${w.pronunciation} ]` : "";
    els.flashMeaning.textContent = w.meaning;
    els.flashExample.textContent = `“${w.example}”`;
    els.flashBack.classList.add("hidden");
    els.flashCounter.textContent = `${state.flashIndex + 1} / ${state.words.length}`;
    els.flashPrev.disabled = state.flashIndex === 0;
    els.flashNext.disabled = state.flashIndex === state.words.length - 1;
}

els.flashCard.addEventListener("click", (e) => {
    if (e.target.closest(".listen-btn")) return; // don't flip when clicking listen
    els.flashBack.classList.toggle("hidden");
});

els.flashListen.addEventListener("click", (e) => {
    e.stopPropagation();
    const w = state.words[state.flashIndex];
    if (w) speak(w.word);
});

els.flashPrev.addEventListener("click", () => {
    if (state.flashIndex > 0) {
        state.flashIndex--;
        renderFlashcard();
    }
});

els.flashNext.addEventListener("click", () => {
    if (state.flashIndex < state.words.length - 1) {
        state.flashIndex++;
        renderFlashcard();
    }
});

// ---------- Mode toggle (List / Flashcards / Quiz) ----------
function setActiveMode(mode) {
    els.modeListBtn.classList.toggle("active", mode === "list");
    els.modeFlashBtn.classList.toggle("active", mode === "flash");
    els.modeQuizBtn.classList.remove("active");
    els.listMode.classList.toggle("hidden", mode !== "list");
    els.flashMode.classList.toggle("hidden", mode !== "flash");
}

els.modeListBtn.addEventListener("click", () => setActiveMode("list"));

els.modeFlashBtn.addEventListener("click", () => {
    setActiveMode("flash");
    renderFlashcard();
});

els.modeQuizBtn.addEventListener("click", () => {
    state.quizSource = "vocab";
    state.exercisesBackTarget = "words";
    loadVocabQuiz();
    showView("exercises");
});

// ---------- Quiz (auto-generated from vocabulary, works for every topic) ----------
function loadVocabQuiz() {
    const cat = state.categories.find(c => c.id === state.category);
    const pool = shuffle(state.words);
    const quizWords = pool.slice(0, Math.min(15, pool.length)); // short, fun sessions

    state.exercises = quizWords.map(w => {
        const askMeaning = Math.random() < 0.5;
        const distractorPool = pool.filter(x => x.id !== w.id);
        const distractors = shuffle(distractorPool).slice(0, 3);

        if (askMeaning) {
            const options = shuffle([w.meaning, ...distractors.map(d => d.meaning)]);
            return {
                grammarType: "VOCABULARY",
                sentence: t("quiz.whatDoesMean", { word: w.word }),
                options,
                answer: w.meaning,
                explanation: `${t("quiz.example")} "${w.example}"`,
            };
        } else {
            const options = shuffle([w.word, ...distractors.map(d => d.word)]);
            return {
                grammarType: "VOCABULARY",
                sentence: t("quiz.whichWordMeans", { meaning: w.meaning }),
                options,
                answer: w.word,
                explanation: `${t("quiz.example")} "${w.example}"`,
            };
        }
    });

    state.exerciseIndex = 0;
    state.exerciseScore = 0;
    state.streak = 0;
    state.exerciseAnswered = false;

    els.exercisesTitle.textContent = `🎯 ${cat ? cat.icon + " " + cat.name : ""} ${t("quiz.title.suffix")} — ${state.level} ${t("common.level")}`;
    els.exercisesSubtitle.textContent = t("quiz.subtitle");

    els.exerciseSummary.classList.add("hidden");
    els.exerciseCard.classList.remove("hidden");
    renderExercise();
}

// ---------- PRACTICE: Level selection ----------
document.querySelectorAll("[data-practice-level]").forEach(btn => {
    btn.addEventListener("click", () => {
        state.practiceLevel = btn.dataset.practiceLevel;
        const levelLabel = t(`level.${state.practiceLevel}.title`);
        els.practiceMenuSubtitle.textContent = t("practiceMenu.subtitleTemplate", { level: levelLabel });
        showView("practice-menu");
    });
});

// ---------- PRACTICE: Menu (Grammar in Context vs Reading) ----------
document.querySelectorAll("[data-practice]").forEach(btn => {
    btn.addEventListener("click", async () => {
        const choice = btn.dataset.practice;
        if (choice === "grammar") {
            await loadGrammarCategories();
            showView("grammar-categories");
        } else if (choice === "reading") {
            await loadReading();
            showView("reading");
        }
    });
});

// ---------- Grammar category picker ----------
async function loadGrammarCategories() {
    const res = await fetch(API.exercises(state.language, state.practiceLevel));
    state.allLevelExercises = await res.json();

    els.grammarCategoryGrid.innerHTML = "";
    getGrammarCategories().forEach(cat => {
        const isGroupedTenses = (state.language === "en" && cat.id === "tenses") ||
                                 (state.language === "fr" && cat.id === "verbs");
        const count = isGroupedTenses
            ? 100
            : cat.types === null
                ? state.allLevelExercises.length
                : state.allLevelExercises.filter(e => cat.types.includes(e.grammarType)).length;
        const countLabel = isGroupedTenses ? t("grammarCategories.exercises") : t("grammarCategories.questions");

        const card = document.createElement("button");
        card.className = "category-card";
        card.innerHTML = `
            <span class="category-icon">${cat.icon}</span>
            <span class="category-name">${cat.name}</span>
            <span class="category-count">${count} ${countLabel}</span>
        `;
        card.addEventListener("click", () => {
            if (isGroupedTenses) {
                // Verb Tenses / Conjugaison au Présent uses the grouped multi-tense layout
                // instead of the flat quiz: one base sentence conjugated across every
                // tense on a single page.
                startTensePractice();
                return;
            }
            state.quizSource = "grammar";
            state.exercisesBackTarget = "grammar-categories";
            state.currentGrammarCategory = cat.id;
            startGrammarCategory(cat.id);
            showView("exercises");
        });
        els.grammarCategoryGrid.appendChild(card);
    });
}

function startGrammarCategory(categoryId) {
    const cat = getGrammarCategories().find(c => c.id === categoryId);
    const filtered = cat.types === null
        ? state.allLevelExercises
        : state.allLevelExercises.filter(e => cat.types.includes(e.grammarType));

    state.exercises = shuffle(filtered);
    state.exerciseIndex = 0;
    state.exerciseScore = 0;
    state.streak = 0;
    state.exerciseAnswered = false;

    els.exercisesTitle.textContent = `📝 ${cat.icon} ${cat.name} — ${state.practiceLevel} ${t("common.level")}`;
    els.exercisesSubtitle.textContent = t("grammar.subtitle.exercise");

    els.exerciseSummary.classList.add("hidden");
    els.exerciseCard.classList.remove("hidden");
    renderExercise();
}

// ---------- Grouped tense practice (Verb Tenses: one sentence across every tense) ----------
async function startTensePractice() {
    const res = await fetch(API.tenseGroups(state.language, state.practiceLevel));
    state.tenseGroups = await res.json();
    state.tenseGroupIndex = 0;
    state.tenseScore = 0;
    state.tenseTotalBlanks = state.tenseGroups.reduce((sum, g) => sum + g.rows.length, 0);
    state.tenseRowsAnsweredCount = 0;

    els.tenseGroupsTitle.textContent = `${t("tenseGroups.title")} — ${state.practiceLevel} ${t("common.level")}`;
    els.tenseGroupSummary.classList.add("hidden");
    els.tenseGroupCard.classList.remove("hidden");
    showView("tense-groups");
    renderTenseGroup();
}

function renderTenseGroup() {
    if (state.tenseGroups.length === 0) {
        els.tenseGroupCard.innerHTML = `<p>${t("tenseGroups.noData")}</p>`;
        return;
    }
    const group = state.tenseGroups[state.tenseGroupIndex];
    state.tenseRowsAnsweredCount = 0;

    els.tenseGroupProgress.textContent = `${t("tenseGroups.exercise")} ${state.tenseGroupIndex + 1} / ${state.tenseGroups.length} · ${t("tenseGroups.score")}: ${state.tenseScore} / ${state.tenseTotalBlanks}`;
    els.tenseGroupProgressFill.style.width = `${(state.tenseGroupIndex / state.tenseGroups.length) * 100}%`;
    els.tenseGroupBase.textContent = `${t("tenseGroups.sentence")}: "${group.baseSentence}"`;
    els.tenseGroupNext.classList.add("hidden");

    els.tenseRows.innerHTML = "";
    group.rows.forEach(row => {
        const rowEl = document.createElement("div");
        rowEl.className = "tense-row";
        rowEl.innerHTML = `
            <p class="tense-row-label">${row.tenseLabel}</p>
            <p class="tense-row-sentence">${row.sentence.replace("___", "▁▁▁▁▁")}</p>
            <div class="tense-row-options"></div>
            <div class="tense-row-feedback hidden"></div>
        `;
        const optionsEl = rowEl.querySelector(".tense-row-options");
        row.options.forEach(opt => {
            const btn = document.createElement("button");
            btn.className = "exercise-option-btn";
            btn.textContent = opt;
            btn.addEventListener("click", () => selectTenseRowAnswer(row, rowEl, opt, btn, group));
            optionsEl.appendChild(btn);
        });
        els.tenseRows.appendChild(rowEl);
    });
}

function selectTenseRowAnswer(row, rowEl, chosen, btnEl, group) {
    if (rowEl.dataset.answered === "true") return;
    rowEl.dataset.answered = "true";
    const isCorrect = chosen === row.answer;
    if (isCorrect) state.tenseScore++;
    state.tenseRowsAnsweredCount++;

    rowEl.querySelectorAll(".exercise-option-btn").forEach(b => {
        b.disabled = true;
        if (b.textContent === row.answer) b.classList.add("correct");
        else if (b === btnEl) b.classList.add("incorrect");
    });

    const fb = rowEl.querySelector(".tense-row-feedback");
    fb.classList.remove("hidden");
    fb.className = `tense-row-feedback ${isCorrect ? "correct-fb" : "incorrect-fb"}`;
    fb.textContent = (isCorrect ? t("common.correct") + " " : `${t("common.incorrectPrefix")} "${row.answer}". `) + row.explanation;

    els.tenseGroupProgress.textContent = `${t("tenseGroups.exercise")} ${state.tenseGroupIndex + 1} / ${state.tenseGroups.length} · ${t("tenseGroups.score")}: ${state.tenseScore} / ${state.tenseTotalBlanks}`;

    if (state.tenseRowsAnsweredCount === group.rows.length) {
        els.tenseGroupNext.classList.remove("hidden");
        els.tenseGroupProgressFill.style.width = `${((state.tenseGroupIndex + 1) / state.tenseGroups.length) * 100}%`;
    }
}

els.tenseGroupNext.addEventListener("click", () => {
    if (state.tenseGroupIndex < state.tenseGroups.length - 1) {
        state.tenseGroupIndex++;
        renderTenseGroup();
    } else {
        els.tenseGroupCard.classList.add("hidden");
        els.tenseGroupSummary.classList.remove("hidden");
        const pct = Math.round((state.tenseScore / state.tenseTotalBlanks) * 100);
        let headline = t("common.niceEffort");
        if (pct === 100) headline = t("common.perfectScore");
        else if (pct >= 80) headline = t("common.excellentWork");
        else if (pct >= 60) headline = t("common.goodJob");
        els.tenseGroupSummary.querySelector("h3").textContent = headline;
        els.tenseGroupScore.textContent = t("tenseGroups.scoredTemplate", { score: state.tenseScore, total: state.tenseTotalBlanks, pct });
    }
});

els.tenseGroupRetry.addEventListener("click", () => {
    startTensePractice();
});

// ---------- Shared exercise rendering (Grammar in Context + Quiz) ----------
function renderExercise() {
    if (state.exercises.length === 0) {
        els.exerciseCard.innerHTML = `<p>${t("exercises.noData")}</p>`;
        return;
    }
    const ex = state.exercises[state.exerciseIndex];
    state.exerciseAnswered = false;

    els.exerciseProgress.innerHTML = `${t("exercises.question")} ${state.exerciseIndex + 1} / ${state.exercises.length} · ${t("exercises.score")}: ${state.exerciseScore}` +
        (state.streak >= 2 ? `<span class="streak-badge">🔥 ${state.streak} ${t("common.streak")}</span>` : "");
    els.progressBarFill.style.width = `${(state.exerciseIndex / state.exercises.length) * 100}%`;
    els.exerciseTag.textContent = ex.grammarType.replace(/_/g, " ");
    els.exerciseSentence.textContent = ex.sentence.replace("___", "▁▁▁▁▁");
    els.exerciseFeedback.classList.add("hidden");
    els.exerciseFeedback.textContent = "";
    els.exerciseNext.classList.add("hidden");

    els.exerciseOptions.innerHTML = "";
    ex.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.className = "exercise-option-btn";
        btn.textContent = opt;
        btn.addEventListener("click", () => selectAnswer(opt, btn));
        els.exerciseOptions.appendChild(btn);
    });
}

function selectAnswer(chosen, btnEl) {
    if (state.exerciseAnswered) return;
    state.exerciseAnswered = true;
    const ex = state.exercises[state.exerciseIndex];
    const isCorrect = chosen === ex.answer;
    if (isCorrect) {
        state.exerciseScore++;
        state.streak++;
    } else {
        state.streak = 0;
    }

    document.querySelectorAll(".exercise-option-btn").forEach(b => {
        b.disabled = true;
        if (b.textContent === ex.answer) b.classList.add("correct");
        else if (b === btnEl) b.classList.add("incorrect");
    });

    const streakNote = isCorrect && state.streak >= 3 ? ` 🔥 ${state.streak} ${t("common.streakInARow")}` : "";
    els.exerciseFeedback.classList.remove("hidden");
    els.exerciseFeedback.className = `exercise-feedback ${isCorrect ? "correct-fb" : "incorrect-fb"}`;
    els.exerciseFeedback.textContent = (isCorrect ? t("common.correct") + streakNote + " " : `${t("common.incorrectPrefix")} "${ex.answer}". `) + ex.explanation;

    els.exerciseProgress.innerHTML = `${t("exercises.question")} ${state.exerciseIndex + 1} / ${state.exercises.length} · ${t("exercises.score")}: ${state.exerciseScore}` +
        (state.streak >= 2 ? `<span class="streak-badge">🔥 ${state.streak} ${t("common.streak")}</span>` : "");
    els.progressBarFill.style.width = `${((state.exerciseIndex + 1) / state.exercises.length) * 100}%`;
    els.exerciseNext.classList.remove("hidden");
}

els.exerciseNext.addEventListener("click", () => {
    if (state.exerciseIndex < state.exercises.length - 1) {
        state.exerciseIndex++;
        renderExercise();
    } else {
        els.exerciseCard.classList.add("hidden");
        els.exerciseSummary.classList.remove("hidden");
        const pct = Math.round((state.exerciseScore / state.exercises.length) * 100);
        let headline = t("common.niceEffort");
        if (pct === 100) headline = t("common.perfectScore");
        else if (pct >= 80) headline = t("common.excellentWork");
        else if (pct >= 60) headline = t("common.goodJob");
        els.exerciseSummary.querySelector("h3").textContent = headline;
        els.exerciseScore.textContent = t("exercises.scoredTemplate", { score: state.exerciseScore, total: state.exercises.length, pct });
    }
});

els.exerciseRetry.addEventListener("click", async () => {
    if (state.quizSource === "vocab") {
        loadVocabQuiz();
    } else {
        startGrammarCategory(state.currentGrammarCategory);
    }
});

// The exercises view is shared by two flows (topic Quiz and Practice > Grammar in Context),
// so its back button target is set dynamically before the view is shown.
els.exercisesBackBtn.addEventListener("click", () => {
    showView(state.exercisesBackTarget);
});

// ---------- PRACTICE: Reading ----------
async function loadReading() {
    const res = await fetch(API.reading(state.language, state.practiceLevel));
    state.readingSentences = shuffle(await res.json());
    state.readingIndex = 0;
    renderReading();
}

function renderReading() {
    if (state.readingSentences.length === 0) {
        els.readingSentence.textContent = t("reading.noData");
        return;
    }
    const item = state.readingSentences[state.readingIndex];
    els.readingSentence.textContent = item.text;
    els.readingCounter.textContent = `${t("reading.sentence")} ${state.readingIndex + 1} / ${state.readingSentences.length}`;
    els.readingProgressFill.style.width = `${((state.readingIndex + 1) / state.readingSentences.length) * 100}%`;
    els.readingPrev.disabled = state.readingIndex === 0;
    els.readingNext.disabled = state.readingIndex === state.readingSentences.length - 1;
}

els.readingListen.addEventListener("click", () => {
    const item = state.readingSentences[state.readingIndex];
    if (item) speak(item.text);
});

els.readingPrev.addEventListener("click", () => {
    if (state.readingIndex > 0) {
        state.readingIndex--;
        renderReading();
    }
});

els.readingNext.addEventListener("click", () => {
    if (state.readingIndex < state.readingSentences.length - 1) {
        state.readingIndex++;
        renderReading();
    }
});

// initial view
showView("language");
