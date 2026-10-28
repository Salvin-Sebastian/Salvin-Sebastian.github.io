# Natural Language Processing (NLP) - BCA Semester Practical Exam Solutions

This folder contains **all 42 NLP practical programs** from the semester syllabus, rewritten to be **the shortest, simplest, and easiest to memorize** for BCA semester lab exams.

---

## Key Features

- **Shortest Code**: Approximately 5–15 lines per program.
- **Minimal Output**: Only 1–3 lines of essential output.
- **Exam-Ready**: Simple variables, small inputs, easy to write by hand on exam answer sheets.
- **Genuine Algorithms**: Every program implements the actual concept asked (NLTK, WordNet, HMM, CRF, TF-IDF, PCFG, ML classifiers, Lesk, FSA, etc.).
- **Self-Contained**: Includes test inputs and expected `# Output:` comments inside each file.

---

## Complete Index of Programs (1 to 42)

| # | Question / Topic | File Link | Lines | Sample Output Preview |
|---|------------------|-----------|-------|-----------------------|
| **1** | Tokenize paragraph into sentences & words using NLTK | [`01_tokenize_paragraph_nltk.py`](file:///d:/Documents/NLP/01_tokenize_paragraph_nltk.py) | 8 | `Sentences: [...]`, `Words: [...]` |
| **2** | Simple unigram language model for a corpus | [`02_unigram_language_model.py`](file:///d:/Documents/NLP/02_unigram_language_model.py) | 16 | `P('the cat purred'): 0.0060` |
| **3** | Rule-based system to identify parts of a sentence | [`03_rule_based_parts_of_sentence.py`](file:///d:/Documents/NLP/03_rule_based_parts_of_sentence.py) | 22 | `Subject: The student`, `Predicate: solved`, `Object: the puzzle` |
| **4** | Basic semantic analysis using word similarity | [`04_word_similarity_semantic_analysis.py`](file:///d:/Documents/NLP/04_word_similarity_semantic_analysis.py) | 8 | `Path Similarity: 0.2`, `Wu-Palmer Similarity: 0.8571` |
| **5** | Demonstrate pragmatics by identifying speech acts | [`05_pragmatics_speech_acts.py`](file:///d:/Documents/NLP/05_pragmatics_speech_acts.py) | 10 | `'What is your name?' -> Question`, `'Close the door.' -> Command` |
| **6** | Use Python libraries to analyze speech signals | [`06_analyze_speech_signals.py`](file:///d:/Documents/NLP/06_analyze_speech_signals.py) | 13 | `Sampling Rate: 16000 Hz`, `Max Amplitude: 32766.0, RMS Energy: 23168.42` |
| **7** | Convert text to phoneme representation using CMUdict | [`07_text_to_phoneme_cmudict.py`](file:///d:/Documents/NLP/07_text_to_phoneme_cmudict.py) | 11 | `natural -> N AE1 CH ER0 AH0 L`, `python -> P AY1 TH AA0 N` |
| **8** | Demonstrate ASCII vs Unicode encoding | [`08_ascii_vs_unicode_encoding.py`](file:///d:/Documents/NLP/08_ascii_vs_unicode_encoding.py) | 6 | `ASCII 'A': 65`, `UTF-8 bytes: b'A \xc2\xa9'` |
| **9** | Multilingual text input and normalization | [`09_multilingual_text_normalization.py`](file:///d:/Documents/NLP/09_multilingual_text_normalization.py) | 8 | `Original: Café STRAßE`, `Normalized: café strasse` |
| **10** | Text preprocessing: tokenization, stopwords, stemming, lemmatization | [`10_text_preprocessing_pipeline.py`](file:///d:/Documents/NLP/10_text_preprocessing_pipeline.py) | 13 | `Filtered: [...]`, `Stemmed: [...]`, `Lemmatized: [...]` |
| **11** | Load and explore a corpus using NLTK | [`11_load_and_explore_nltk_corpus.py`](file:///d:/Documents/NLP/11_load_and_explore_nltk_corpus.py) | 8 | `Total Words: 192427`, `Unique Vocab: 7811`, `Top 3 Words: [...]` |
| **12** | Access WordNet for synonyms, antonyms, hypernyms | [`12_wordnet_synonyms_antonyms_hypernyms.py`](file:///d:/Documents/NLP/12_wordnet_synonyms_antonyms_hypernyms.py) | 10 | `Synonyms: ['good']`, `Antonyms: ['bad']` |
| **13** | Parse XML-based linguistic resource | [`13_parse_xml_linguistic_resource.py`](file:///d:/Documents/NLP/13_parse_xml_linguistic_resource.py) | 10 | `Extracted Nouns: ['cat', 'mat']`, `Extracted Verbs: ['sat']` |
| **14** | Regex to extract emails, dates, and URLs | [`14_regex_extract_emails_dates_urls.py`](file:///d:/Documents/NLP/14_regex_extract_emails_dates_urls.py) | 11 | `Emails: [...]`, `Dates: [...]`, `URLs: [...]` |
| **15** | Finite State Automaton (FSA) for word recognition | [`15_finite_state_automaton_word_recognition.py`](file:///d:/Documents/NLP/15_finite_state_automaton_word_recognition.py) | 13 | `'sing': True`, `'playing': True`, `'walk': False` |
| **16** | Morphological analyzer (prefix, suffix stripping) | [`16_morphological_analyzer_affix_stripping.py`](file:///d:/Documents/NLP/16_morphological_analyzer_affix_stripping.py) | 15 | `unhappiness -> ('un', 'happi', 'ness')` |
| **17** | Hidden Markov Model (HMM) sequence prediction | [`17_hidden_markov_model_sequence_prediction.py`](file:///d:/Documents/NLP/17_hidden_markov_model_sequence_prediction.py) | 14 | `Observations: ['walk', 'shop']`, `Likely Final State: Sunny` |
| **18** | Naïve Bayes / SVM for text classification | [`18_naive_bayes_svm_text_classification.py`](file:///d:/Documents/NLP/18_naive_bayes_svm_text_classification.py) | 16 | `Naive Bayes: ['Spam' 'Sports']`, `SVM: ['Spam' 'Sports']` |
| **19** | Conditional Random Fields (CRF) for sequence labeling | [`19_crf_sequence_labeling_ner.py`](file:///d:/Documents/NLP/19_crf_sequence_labeling_ner.py) | 16 | `Input: ['Mary', 'visited', 'Paris']`, `Tagged: ['B-PER', 'O', 'B-LOC']` |
| **20** | POS tagging using NLTK | [`20_pos_tagging_nltk.py`](file:///d:/Documents/NLP/20_pos_tagging_nltk.py) | 8 | `Tokens: ['The', 'quick', ...]`, `Tags: [('The', 'DT'), ...]` |
| **21** | Stochastic POS tagger using HMM | [`21_stochastic_pos_tagger_hmm.py`](file:///d:/Documents/NLP/21_stochastic_pos_tagger_hmm.py) | 10 | `Tagged: [('the', 'DT'), ('dog', 'NN'), ('sat', 'VB')]` |
| **22** | Transformation-Based Learning (TBL) tagging | [`22_transformation_based_learning_tbl.py`](file:///d:/Documents/NLP/22_transformation_based_learning_tbl.py) | 13 | `Tagged: [('they', 'NN'), ('will', 'NN'), ('fish', 'VB'), ...]` |
| **23** | Handle unknown words in POS tagging | [`23_handle_unknown_words_pos_tagging.py`](file:///d:/Documents/NLP/23_handle_unknown_words_pos_tagging.py) | 14 | `Tagged: [('the', 'DT'), ('2026', 'CD'), ('player', 'NN'), ...]` |
| **24** | Identify named entities and multiword expressions | [`24_named_entities_and_multiword_expressions.py`](file:///d:/Documents/NLP/24_named_entities_and_multiword_expressions.py) | 14 | `Named Entities: [...]`, `Tokenized with MWE: [...]` |
| **25** | Define CFG in Python and parse sentences | [`25_cfg_define_and_parse_sentences.py`](file:///d:/Documents/NLP/25_cfg_define_and_parse_sentences.py) | 15 | `Parsed Tree: (S (NP (Det the) (N dog)) (VP (V chased) ...))` |
| **26** | Top-down and bottom-up parsing | [`26_top_down_and_bottom_up_parsing.py`](file:///d:/Documents/NLP/26_top_down_and_bottom_up_parsing.py) | 16 | `Top-Down Tree: (S ...)`, `Bottom-Up Tree: (S ...)` |
| **27** | Chart parsing for ambiguous sentences | [`27_chart_parsing_ambiguous_sentences.py`](file:///d:/Documents/NLP/27_chart_parsing_ambiguous_sentences.py) | 18 | `Ambiguous Parses Count: 2`, `Parse Tree 1: (...)`, `Parse Tree 2: (...)` |
| **28** | Probabilistic parsing using PCFG | [`28_probabilistic_parsing_pcfg.py`](file:///d:/Documents/NLP/28_probabilistic_parsing_pcfg.py) | 16 | `Viterbi PCFG Tree: (...)`, `Probability: 0.24` |
| **29** | Load and analyze TreeBank data using NLTK | [`29_load_and_analyze_treebank.py`](file:///d:/Documents/NLP/29_load_and_analyze_treebank.py) | 7 | `Treebank Sentence Words: [...]`, `Sample Subtree: (NP ...)` |
| **30** | Evaluate parsing performance using precision and recall | [`30_evaluate_parsing_precision_recall.py`](file:///d:/Documents/NLP/30_evaluate_parsing_precision_recall.py) | 11 | `Precision: 0.67, Recall: 0.67, F1: 0.67` |
| **31** | Visualize parse trees for given sentences | [`31_visualize_parse_trees.py`](file:///d:/Documents/NLP/31_visualize_parse_trees.py) | 9 | Bracket Representation and ASCII Hierarchy Tree |
| **32** | Represent sentence meaning using logical forms | [`32_sentence_meaning_logical_forms.py`](file:///d:/Documents/NLP/32_sentence_meaning_logical_forms.py) | 7 | `Sentence 1 FOL: Loves(john,mary)` |
| **33** | Lexical semantic analysis using WordNet similarity | [`33_lexical_semantics_wordnet_similarity.py`](file:///d:/Documents/NLP/33_lexical_semantics_wordnet_similarity.py) | 8 | `Path Sim: 0.2`, `LCH Sim: 2.0281`, `WUP Sim: 0.8571` |
| **34** | Build semantic network from a small dataset | [`34_semantic_network_dataset.py`](file:///d:/Documents/NLP/34_semantic_network_dataset.py) | 10 | `Nodes: ['Canary', ...]`, `Edges: [('Canary', 'Bird', 'is-a'), ...]` |
| **35** | Implement Lesk algorithm for WSD | [`35_lesk_algorithm_wsd.py`](file:///d:/Documents/NLP/35_lesk_algorithm_wsd.py) | 11 | `Sense 1 (Finance): savings_bank.n.02`, `Sense 2 (River): bank.n.01` |
| **36** | Disambiguate word meanings in context with WordNet | [`36_wordnet_disambiguate_meanings_in_context.py`](file:///d:/Documents/NLP/36_wordnet_disambiguate_meanings_in_context.py) | 11 | `Target: 'mouse'`, `Disambiguated Sense: mouse.n.01 (rodent)` |
| **37** | Supervised WSD model using machine learning | [`37_supervised_wsd_machine_learning.py`](file:///d:/Documents/NLP/37_supervised_wsd_machine_learning.py) | 12 | `Predictions: [('fresh sea bass', 'Fish'), ('loud bass music', 'Music')]` |
| **38** | Analyze text coherence using sentence similarity | [`38_text_coherence_sentence_similarity.py`](file:///d:/Documents/NLP/38_text_coherence_sentence_similarity.py) | 13 | `Pairwise Similarities: [0.12, 0.38]`, `Overall Coherence Score: 0.25` |
| **39** | Simple Machine Translation using sequence models | [`39_simple_machine_translation_sequence_model.py`](file:///d:/Documents/NLP/39_simple_machine_translation_sequence_model.py) | 16 | `'How are you' -> 'comment vas-tu'`, `'Thank you' -> 'merci'` |
| **40** | Information Retrieval using TF-IDF | [`40_information_retrieval_tfidf.py`](file:///d:/Documents/NLP/40_information_retrieval_tfidf.py) | 16 | `Query: neural networks deep learning`, `Best Match (Doc 2): ...` |
| **41** | Text classification (spam detection / sentiment) | [`41_text_classification_spam_sentiment.py`](file:///d:/Documents/NLP/41_text_classification_spam_sentiment.py) | 12 | `Input: ['free prize winner', ...]`, `Predictions: ['Spam', 'Ham']` |
| **42** | Generate text summaries using extractive methods | [`42_extractive_text_summarization.py`](file:///d:/Documents/NLP/42_extractive_text_summarization.py) | 13 | `Original Sentences: 3`, `Extractive Summary: ...` |

---

## How to Run Any Program

Open your terminal or command prompt in `d:\Documents\NLP` and run:

```bash
python <filename>.py
```
