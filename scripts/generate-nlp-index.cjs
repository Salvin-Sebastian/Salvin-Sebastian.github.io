const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const srcNlpDir = path.join(rootDir, 'NLP');
const destNlpDir = path.join(rootDir, 'public', 'nlp');

// Helper to format bytes
function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Map of topics for programs 1-42
const topics = {
  '01_tokenize_paragraph_nltk.py': 'Tokenize paragraph into sentences & words using NLTK',
  '02_unigram_language_model.py': 'Simple unigram language model for a corpus',
  '03_rule_based_parts_of_sentence.py': 'Rule-based system to identify parts of a sentence (Subject/Predicate/Object)',
  '04_word_similarity_semantic_analysis.py': 'Basic semantic analysis using WordNet word similarity',
  '05_pragmatics_speech_acts.py': 'Demonstrate pragmatics by identifying speech acts (Question, Command, Statement)',
  '06_analyze_speech_signals.py': 'Analyze speech signals (Sampling rate, amplitude, RMS energy) from WAV',
  '07_text_to_phoneme_cmudict.py': 'Convert text to phoneme representation using CMUdict',
  '08_ascii_vs_unicode_encoding.py': 'Demonstrate ASCII vs Unicode (UTF-8) character encoding and byte offsets',
  '09_multilingual_text_normalization.py': 'Multilingual text input handling, lowercase, case folding and normalization',
  '10_text_preprocessing_pipeline.py': 'Text preprocessing pipeline: tokenization, stopword removal, stemming & lemmatization',
  '11_load_and_explore_nltk_corpus.py': 'Load and explore an NLTK corpus (Inaugural corpus, word count, unique vocab)',
  '12_wordnet_synonyms_antonyms_hypernyms.py': 'Access WordNet lexical database for synonyms, antonyms, and hypernyms',
  '13_parse_xml_linguistic_resource.py': 'Parse XML-based linguistic resource and extract tagged parts of speech',
  '14_regex_extract_emails_dates_urls.py': 'Regular expressions to extract email addresses, dates (YYYY-MM-DD), and URLs',
  '15_finite_state_automaton_word_recognition.py': 'Finite State Automaton (FSA) transition simulation for word recognition',
  '16_morphological_analyzer_affix_stripping.py': 'Morphological analyzer using prefix and suffix affix stripping rules',
  '17_hidden_markov_model_sequence_prediction.py': 'Hidden Markov Model (HMM) sequence prediction for state transition probabilities',
  '18_naive_bayes_svm_text_classification.py': 'Naïve Bayes and Linear SVM models for document text classification',
  '19_crf_sequence_labeling_ner.py': 'Conditional Random Fields (CRF) sequence labeling for Named Entity Recognition',
  '20_pos_tagging_nltk.py': 'Part-of-Speech (POS) tagging using NLTK default perceptron tagger',
  '21_stochastic_pos_tagger_hmm.py': 'Stochastic POS tagger trained on Penn Treebank tagged sentences using HMM',
  '22_transformation_based_learning_tbl.py': 'Transformation-Based Learning (TBL) / Brill tagger for POS error correction',
  '23_handle_unknown_words_pos_tagging.py': 'Handle Out-Of-Vocabulary (OOV) / unknown words in POS tagging via regex fallback',
  '24_named_entities_and_multiword_expressions.py': 'Identify Named Entities (NE) and Multi-Word Expressions (MWE) using NLTK',
  '25_cfg_define_and_parse_sentences.py': 'Define Context-Free Grammar (CFG) in Python and parse syntax trees with ChartParser',
  '26_top_down_and_bottom_up_parsing.py': 'Top-down recursive descent parser vs bottom-up shift-reduce syntactic parsing',
  '27_chart_parsing_ambiguous_sentences.py': 'Chart parsing algorithm to generate multiple parse trees for ambiguous sentences',
  '28_probabilistic_parsing_pcfg.py': 'Probabilistic Context-Free Grammar (PCFG) and Viterbi parsing for sentence probability',
  '29_load_and_analyze_treebank.py': 'Load and inspect syntactic parse trees from NLTK Penn Treebank corpus',
  '30_evaluate_parsing_precision_recall.py': 'Evaluate parser performance metrics using Precision, Recall, and F1-score',
  '31_visualize_parse_trees.py': 'Visualize syntactic parse trees in ASCII text hierarchy and bracketed format',
  '32_sentence_meaning_logical_forms.py': 'Represent sentence semantics and predicates using First-Order Logic (FOL) expressions',
  '33_lexical_semantics_wordnet_similarity.py': 'Lexical semantic analysis with Path, Leacock-Chodorow (LCH), and Wu-Palmer (WUP)',
  '34_semantic_network_dataset.py': 'Construct semantic network knowledge graph from relations using NetworkX',
  '35_lesk_algorithm_wsd.py': 'Word Sense Disambiguation (WSD) using classical Lesk dictionary overlap algorithm',
  '36_wordnet_disambiguate_meanings_in_context.py': 'Disambiguate word meanings in context using WordNet synset overlap scoring',
  '37_supervised_wsd_machine_learning.py': 'Supervised Word Sense Disambiguation using Naive Bayes classifier & bag-of-words',
  '38_text_coherence_sentence_similarity.py': 'Evaluate discourse coherence using TF-IDF cosine similarity between adjacent sentences',
  '39_simple_machine_translation_sequence_model.py': 'Simple sequence lookup Machine Translation dictionary model (English to French)',
  '40_information_retrieval_tfidf.py': 'Information Retrieval (IR) search engine with TF-IDF vectorization and cosine ranking',
  '41_text_classification_spam_sentiment.py': 'Text classification for Spam detection and Sentiment analysis using Logistic Regression',
  '42_extractive_text_summarization.py': 'Extractive text summarization using sentence-level word frequency scoring',
  'NLP_Practical_Programs_1_to_42.pdf': 'Complete Printable A4 PDF Lab Manual (1 to 42) with syntax highlighting & outputs',
  'NLP_Practical_Programs_1_to_42.html': 'Interactive Web Manual with complete source code, theory, and copy buttons',
  'README.md': 'Master index, setup instructions, quick start guide, and program catalog',
  'requirements.txt': 'Python package dependencies (nltk, scikit-learn, numpy, scipy, matplotlib, networkx)',
  'setup_nltk.py': 'Automated setup script to download required NLTK corpora, tokenizers, and models',
  'sample.wav': '16-bit 16kHz PCM audio sample for speech signal analysis (Program 06)',
  'semantic_network.png': 'Generated semantic network knowledge graph visualization (Program 34)',
  'generate_pdf.py': 'PDF generator build script using WeasyPrint / Chrome headless rendering',
  'nlp_practical_programs.zip': 'All-in-one ZIP archive containing all 42 practical programs, assets, and documentation'
};

const fileList = fs.readdirSync(destNlpDir).filter(f => f !== 'index.html');

// Sort files logically:
// 1. PDF & HTML at top
// 2. ZIP bundle
// 3. README
// 4. Programs 01 to 42
// 5. Assets / wav / png
// 6. Config / scripts
fileList.sort((a, b) => {
  const isProgA = /^\d\d_/.test(a);
  const isProgB = /^\d\d_/.test(b);
  if (isProgA && isProgB) {
    return parseInt(a.slice(0, 2), 10) - parseInt(b.slice(0, 2), 10);
  }
  if (a.endsWith('.pdf')) return -1;
  if (b.endsWith('.pdf')) return 1;
  if (a.endsWith('.html')) return -1;
  if (b.endsWith('.html')) return 1;
  if (a.endsWith('.zip')) return -1;
  if (b.endsWith('.zip')) return 1;
  if (a === 'README.md') return -1;
  if (b === 'README.md') return 1;
  if (isProgA && !isProgB) return -1;
  if (!isProgA && isProgB) return 1;
  return a.localeCompare(b);
});

// Build items data
const items = [];
for (const file of fileList) {
  const fullPath = path.join(destNlpDir, file);
  const stat = fs.statSync(fullPath);
  const ext = path.extname(file).toLowerCase();
  
  let category = 'other';
  if (/^\d\d_/.test(file)) category = 'practicals';
  else if (ext === '.pdf' || ext === '.html' || file === 'README.md') category = 'manuals';
  else if (ext === '.wav' || ext === '.png') category = 'assets';
  else if (ext === '.py' || ext === '.txt' || ext === '.zip') category = 'config';

  let content = null;
  // If text file under 100KB, read content for immediate in-browser viewing
  if (stat.size < 100 * 1024 && (ext === '.py' || ext === '.txt' || ext === '.md')) {
    content = fs.readFileSync(fullPath, 'utf8');
  }

  items.push({
    name: file,
    ext,
    size: stat.size,
    sizeFormatted: formatBytes(stat.size),
    category,
    desc: topics[file] || `NLP Practical Lab file: ${file}`,
    hasCode: !!content,
    code: content
  });
}

console.log(`Prepared metadata for ${items.length} files.`);

// Generate standalone HTML
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NLP Practical Lab Repository | Salvin Sebastian</title>
  <meta name="description" content="Browse, preview, and download all 42 Natural Language Processing practical exam programs, complete A4 PDF manual, datasets, and solutions.">
  <link rel="icon" type="image/x-icon" href="/icons/favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #090b10;
      --bg-card: rgba(18, 22, 34, 0.75);
      --bg-card-hover: rgba(28, 34, 52, 0.85);
      --bg-code: #0d111a;
      --border: rgba(255, 255, 255, 0.08);
      --border-accent: rgba(170, 59, 255, 0.35);
      --text: #cbd5e1;
      --text-muted: #64748b;
      --text-heading: #f8fafc;
      --accent-purple: #aa3bff;
      --accent-cyan: #38bdf8;
      --accent-blue: #3b82f6;
      --accent-green: #10b981;
      --accent-orange: #f59e0b;
      --accent-pink: #ec4899;
      --gradient: linear-gradient(135deg, #aa3bff 0%, #38bdf8 100%);
      --font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
      --font-mono: 'Fira Code', ui-monospace, Consolas, monospace;
      --radius: 12px;
      --shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-sans);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      position: relative;
      overflow-x: hidden;
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }

    /* Subtle background glow effect */
    body::before {
      content: '';
      position: fixed;
      top: -200px;
      left: 50%;
      transform: translateX(-50%);
      width: 800px;
      height: 600px;
      background: radial-gradient(circle, rgba(170, 59, 255, 0.12) 0%, rgba(56, 189, 248, 0.08) 50%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }

    a {
      color: var(--accent-cyan);
      text-decoration: none;
      transition: all 0.2s ease;
    }
    a:hover {
      color: #7dd3fc;
    }

    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      position: relative;
      z-index: 1;
    }

    /* TOP NAVBAR */
    header.site-header {
      background: rgba(9, 11, 16, 0.85);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      position: sticky;
      top: 0;
      z-index: 100;
      padding: 16px 0;
    }
    .nav-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .breadcrumb-nav {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      font-weight: 600;
    }
    .breadcrumb-nav .site-link {
      color: var(--text-heading);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
    }
    .breadcrumb-nav .site-link:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
    }
    .breadcrumb-nav .sep {
      color: var(--text-muted);
    }
    .breadcrumb-nav .current-badge {
      color: var(--accent-purple);
      background: rgba(170, 59, 255, 0.1);
      border: 1px solid var(--border-accent);
      padding: 6px 12px;
      border-radius: 8px;
      font-family: var(--font-mono);
      font-size: 13px;
    }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      font-size: 13px;
      font-weight: 600;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
      border: 1px solid transparent;
      font-family: var(--font-sans);
    }
    .btn-primary {
      background: var(--gradient);
      color: #fff;
      box-shadow: 0 4px 14px rgba(170, 59, 255, 0.35);
    }
    .btn-primary:hover {
      opacity: 0.95;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(170, 59, 255, 0.5);
      color: #fff;
    }
    .btn-ghost {
      background: rgba(255, 255, 255, 0.04);
      color: var(--text);
      border-color: var(--border);
    }
    .btn-ghost:hover {
      background: rgba(255, 255, 255, 0.08);
      color: var(--text-heading);
      border-color: rgba(255, 255, 255, 0.2);
    }

    /* HERO */
    .hero-section {
      padding: 48px 0 32px;
      text-align: center;
    }
    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: rgba(56, 189, 248, 0.1);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: var(--accent-cyan);
      border-radius: 30px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    .hero-title {
      font-size: 40px;
      font-weight: 800;
      color: var(--text-heading);
      letter-spacing: -0.5px;
      margin-bottom: 12px;
      line-height: 1.2;
    }
    .hero-title span {
      background: var(--gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-desc {
      font-size: 16px;
      color: var(--text-muted);
      max-width: 720px;
      margin: 0 auto 32px;
    }
    .stats-row {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 32px;
    }
    .stat-pill {
      background: var(--bg-card);
      border: 1px solid var(--border);
      padding: 10px 18px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .stat-pill strong {
      color: var(--text-heading);
      font-size: 18px;
      font-family: var(--font-mono);
    }
    .stat-pill span {
      font-size: 13px;
      color: var(--text-muted);
    }

    .hero-ctas {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    /* CONTROLS (SEARCH & TABS) */
    .controls-wrapper {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 16px 20px;
      margin-bottom: 24px;
      backdrop-filter: blur(12px);
    }
    .controls-top {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .search-box {
      flex: 1;
      min-width: 280px;
      position: relative;
    }
    .search-box svg {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      pointer-events: none;
    }
    .search-input {
      width: 100%;
      padding: 12px 40px 12px 42px;
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: var(--text-heading);
      font-size: 14px;
      font-family: var(--font-sans);
      outline: none;
      transition: all 0.2s ease;
    }
    .search-input:focus {
      border-color: var(--accent-purple);
      box-shadow: 0 0 0 3px rgba(170, 59, 255, 0.2);
    }
    .search-clear {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: transparent;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 14px;
      display: none;
    }
    .search-clear:hover {
      color: var(--text-heading);
    }
    .filter-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .tab-btn {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border);
      color: var(--text-muted);
      padding: 7px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .tab-btn:hover {
      background: rgba(255, 255, 255, 0.08);
      color: var(--text-heading);
    }
    .tab-btn.active {
      background: rgba(170, 59, 255, 0.15);
      border-color: var(--accent-purple);
      color: #f1f5f9;
    }
    .controls-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: var(--text-muted);
      border-top: 1px solid var(--border);
      padding-top: 12px;
    }

    /* DIRECTORY TABLE */
    .table-container {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
      box-shadow: var(--shadow);
      margin-bottom: 60px;
    }
    table.file-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
    }
    thead th {
      background: rgba(0, 0, 0, 0.4);
      padding: 14px 18px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-muted);
      border-bottom: 1px solid var(--border);
    }
    tbody tr {
      border-bottom: 1px solid var(--border);
      transition: background 0.15s ease;
    }
    tbody tr:last-child {
      border-bottom: none;
    }
    tbody tr:hover {
      background: var(--bg-card-hover);
    }
    td {
      padding: 14px 18px;
      font-size: 14px;
      vertical-align: middle;
    }
    .col-name {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 600;
    }
    .file-icon {
      font-size: 20px;
      width: 28px;
      height: 28px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      flex-shrink: 0;
    }
    .file-link {
      color: var(--text-heading);
      font-family: var(--font-mono);
      font-size: 13px;
      cursor: pointer;
    }
    .file-link:hover {
      color: var(--accent-cyan);
    }
    .badge-tag {
      font-size: 10px;
      text-transform: uppercase;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    .badge-py { background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); }
    .badge-pdf { background: rgba(239, 68, 68, 0.15); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); }
    .badge-html { background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); }
    .badge-zip { background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3); }
    .badge-doc { background: rgba(148, 163, 184, 0.15); color: #cbd5e1; border: 1px solid rgba(148, 163, 184, 0.3); }
    
    .col-desc {
      color: var(--text);
      max-width: 480px;
      font-size: 13.5px;
    }
    .col-size {
      color: var(--text-muted);
      font-family: var(--font-mono);
      font-size: 12.5px;
      white-space: nowrap;
    }
    .col-actions {
      text-align: right;
      white-space: nowrap;
    }
    .action-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 6px 10px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 6px;
      border: 1px solid var(--border);
      background: rgba(255, 255, 255, 0.04);
      color: var(--text);
      cursor: pointer;
      transition: all 0.2s ease;
      margin-left: 6px;
    }
    .action-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      color: var(--text-heading);
      border-color: rgba(255, 255, 255, 0.25);
    }
    .action-btn.copy:hover {
      border-color: var(--accent-purple);
      color: #c084fc;
    }
    .action-btn.download:hover {
      border-color: var(--accent-cyan);
      color: #38bdf8;
    }

    /* MODAL CODE VIEWER */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(8px);
      z-index: 1000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .modal-backdrop.open {
      display: flex;
    }
    .modal-dialog {
      background: #0d111a;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: var(--radius);
      width: 100%;
      max-width: 900px;
      max-height: 88vh;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      overflow: hidden;
      animation: modalIn 0.2s ease-out forwards;
    }
    @keyframes modalIn {
      from { transform: scale(0.96); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    .modal-header {
      padding: 16px 20px;
      background: #131826;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .modal-title-wrap {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .modal-filename {
      font-family: var(--font-mono);
      font-size: 15px;
      font-weight: 700;
      color: var(--text-heading);
    }
    .modal-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .modal-body {
      padding: 20px;
      overflow-y: auto;
      flex: 1;
    }
    pre.code-block {
      background: #090c13;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 16px;
      color: #e2e8f0;
      font-family: var(--font-mono);
      font-size: 13px;
      line-height: 1.6;
      overflow-x: auto;
      white-space: pre;
    }
    .code-comment { color: #64748b; font-style: italic; }
    .code-string { color: #38bdf8; }
    .code-keyword { color: #c084fc; font-weight: 600; }

    /* TOAST */
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #1e293b;
      color: #f8fafc;
      padding: 12px 20px;
      border-radius: 8px;
      border: 1px solid var(--accent-purple);
      box-shadow: 0 10px 25px rgba(0,0,0,0.5);
      font-size: 13px;
      font-weight: 600;
      z-index: 2000;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.25s ease;
      pointer-events: none;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .toast.show {
      opacity: 1;
      transform: translateY(0);
    }

    /* FOOTER */
    footer.site-footer {
      margin-top: auto;
      border-top: 1px solid var(--border);
      padding: 32px 0;
      background: rgba(9, 11, 16, 0.95);
      text-align: center;
      color: var(--text-muted);
      font-size: 13px;
    }

    @media (max-width: 768px) {
      .hero-title { font-size: 28px; }
      .col-desc { display: none; }
      thead th:nth-child(2) { display: none; }
      .nav-actions .btn-ghost { display: none; }
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <header class="site-header">
    <div class="container nav-inner">
      <div class="breadcrumb-nav">
        <a href="/" class="site-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          Salvin Sebastian
        </a>
        <span class="sep">/</span>
        <span class="current-badge">📁 nlp</span>
      </div>
      <div class="nav-actions">
        <a href="/nlp/NLP_Practical_Programs_1_to_42.pdf" target="_blank" class="btn btn-ghost">
          📕 PDF Manual
        </a>
        <a href="/nlp/nlp_practical_programs.zip" download class="btn btn-primary">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          Download ZIP
        </a>
      </div>
    </div>
  </header>

  <!-- MAIN -->
  <main class="container">
    <section class="hero-section">
      <div class="hero-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        BCA Semester Syllabus • Lab Repository
      </div>
      <h1 class="hero-title">Natural Language Processing <span>Lab Hub</span></h1>
      <p class="hero-desc">
        Complete collection of all 42 practical programs, shortest exam-ready implementations, expected outputs, full A4 PDF manual, and linguistic assets.
      </p>

      <div class="stats-row">
        <div class="stat-pill">
          <strong>42</strong>
          <span>Python Practicals</span>
        </div>
        <div class="stat-pill">
          <strong>1 to 42</strong>
          <span>Syllabus Topics</span>
        </div>
        <div class="stat-pill">
          <strong>A4 PDF</strong>
          <span>Printable Manual</span>
        </div>
        <div class="stat-pill">
          <strong>100%</strong>
          <span>Offline Ready</span>
        </div>
      </div>

      <div class="hero-ctas">
        <a href="/nlp/NLP_Practical_Programs_1_to_42.pdf" target="_blank" class="btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          Open Complete PDF Manual
        </a>
        <a href="/nlp/NLP_Practical_Programs_1_to_42.html" target="_blank" class="btn btn-ghost">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
          Open HTML Web Guide
        </a>
        <a href="https://github.com/Salvin-Sebastian/Salvin-Sebastian.github.io/tree/main/NLP" target="_blank" rel="noopener noreferrer" class="btn btn-ghost">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          View on GitHub
        </a>
      </div>
    </section>

    <!-- SEARCH & CONTROLS -->
    <div class="controls-wrapper">
      <div class="controls-top">
        <div class="search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input type="text" id="searchInput" class="search-input" placeholder="Search by name, program #, topic (e.g. 'pos', 'viterbi', '05', '.pdf')... [/]" autocomplete="off">
          <button id="searchClear" class="search-clear">✕</button>
        </div>
        <div class="filter-tabs">
          <button class="tab-btn active" data-cat="all">All (${items.length})</button>
          <button class="tab-btn" data-cat="practicals">Practicals 01-42 (42)</button>
          <button class="tab-btn" data-cat="manuals">Manuals & Docs (3)</button>
          <button class="tab-btn" data-cat="assets">Assets & Media (2)</button>
          <button class="tab-btn" data-cat="config">Setup & ZIP (4)</button>
        </div>
      </div>
      <div class="controls-meta">
        <span id="resultCount">Showing ${items.length} files</span>
        <span>Click any row to preview or copy code</span>
      </div>
    </div>

    <!-- TABLE -->
    <div class="table-container">
      <table class="file-table">
        <thead>
          <tr>
            <th style="width: 32%;">File Name</th>
            <th style="width: 44%;">Topic / Description</th>
            <th style="width: 10%;">Size</th>
            <th style="width: 14%; text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody id="filesBody">
          <!-- Populated by JavaScript -->
        </tbody>
      </table>
    </div>
  </main>

  <!-- MODAL / VIEWER -->
  <div id="modalBackdrop" class="modal-backdrop">
    <div class="modal-dialog">
      <div class="modal-header">
        <div class="modal-title-wrap">
          <span id="modalIcon" class="file-icon">📄</span>
          <span id="modalFilename" class="modal-filename">filename.py</span>
          <span id="modalBadge" class="badge-tag badge-py">PY</span>
        </div>
        <div class="modal-actions">
          <button id="modalCopyBtn" class="action-btn copy">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copy Code
          </button>
          <a id="modalDownloadBtn" href="#" download class="action-btn download">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Download
          </a>
          <button id="modalCloseBtn" class="action-btn">✕</button>
        </div>
      </div>
      <div class="modal-body" id="modalBody">
        <!-- Rendered Code or Media -->
      </div>
    </div>
  </div>

  <!-- TOAST -->
  <div id="toast" class="toast">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span id="toastMsg">Copied to clipboard</span>
  </div>

  <!-- FOOTER -->
  <footer class="site-footer">
    <div class="container">
      <p>
        Natural Language Processing (NLP) Lab Solutions • Maintained by <a href="/">Salvin Sebastian</a> • Hosted on GitHub Pages
      </p>
    </div>
  </footer>

  <!-- SCRIPT DATA & LOGIC -->
  <script>
    const fileData = ${JSON.stringify(items)};

    function getIcon(file) {
      if (file.name.endsWith('.pdf')) return '📕';
      if (file.name.endsWith('.html')) return '🌐';
      if (file.name.endsWith('.zip')) return '📦';
      if (file.name.endsWith('.py')) return '🐍';
      if (file.name.endsWith('.wav')) return '🎵';
      if (file.name.endsWith('.png')) return '🖼️';
      if (file.name.endsWith('.md')) return '📝';
      return '📄';
    }

    function getBadgeClass(ext) {
      if (ext === '.py') return 'badge-py';
      if (ext === '.pdf') return 'badge-pdf';
      if (ext === '.html') return 'badge-html';
      if (ext === '.zip') return 'badge-zip';
      return 'badge-doc';
    }

    let currentFilter = 'all';
    let searchQuery = '';

    const filesBody = document.getElementById('filesBody');
    const searchInput = document.getElementById('searchInput');
    const searchClear = document.getElementById('searchClear');
    const resultCount = document.getElementById('resultCount');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const modalFilename = document.getElementById('modalFilename');
    const modalBadge = document.getElementById('modalBadge');
    const modalIcon = document.getElementById('modalIcon');
    const modalBody = document.getElementById('modalBody');
    const modalCopyBtn = document.getElementById('modalCopyBtn');
    const modalDownloadBtn = document.getElementById('modalDownloadBtn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');

    let currentModalFile = null;

    function showToast(text) {
      toastMsg.innerText = text;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2500);
    }

    function copyToClipboard(text, label) {
      navigator.clipboard.writeText(text).then(() => {
        showToast('Copied ' + (label || 'content') + ' to clipboard!');
      }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Copied ' + (label || 'content') + ' to clipboard!');
      });
    }

    function renderTable() {
      const q = searchQuery.toLowerCase().trim();
      const filtered = fileData.filter(item => {
        const matchesCategory = currentFilter === 'all' || item.category === currentFilter;
        const matchesQuery = !q || item.name.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q);
        return matchesCategory && matchesQuery;
      });

      resultCount.innerText = 'Showing ' + filtered.length + ' of ' + fileData.length + ' files';

      if (filtered.length === 0) {
        filesBody.innerHTML = '<tr><td colspan="4" style="text-align:center; padding: 40px; color: var(--text-muted);">No matching files found. Try a different search term.</td></tr>';
        return;
      }

      filesBody.innerHTML = filtered.map(item => {
        const icon = getIcon(item);
        const badge = getBadgeClass(item.ext);
        const extName = item.ext.replace('.', '').toUpperCase() || 'FILE';

        return \`
          <tr data-file="\${item.name}">
            <td>
              <div class="col-name">
                <span class="file-icon">\${icon}</span>
                <span class="file-link" onclick="openFileViewer('\${item.name}')">\${item.name}</span>
                <span class="badge-tag \${badge}">\${extName}</span>
              </div>
            </td>
            <td>
              <div class="col-desc">\${item.desc}</div>
            </td>
            <td>
              <div class="col-size">\${item.sizeFormatted}</div>
            </td>
            <td class="col-actions">
              <button class="action-btn" onclick="openFileViewer('\${item.name}')" title="Preview file">
                👁️ View
              </button>
              \${item.hasCode ? \`
                <button class="action-btn copy" onclick="copyFileCode('\${item.name}')" title="Copy code">
                  📋 Copy
                </button>
              \` : ''}
              <a href="/nlp/\${item.name}" download class="action-btn download" title="Download raw file">
                ⬇️ Download
              </a>
            </td>
          </tr>
        \`;
      }).join('');
    }

    function openFileViewer(fileName) {
      const file = fileData.find(f => f.name === fileName);
      if (!file) return;

      currentModalFile = file;
      modalFilename.innerText = file.name;
      modalIcon.innerText = getIcon(file);
      modalBadge.className = 'badge-tag ' + getBadgeClass(file.ext);
      modalBadge.innerText = file.ext.replace('.', '').toUpperCase();
      modalDownloadBtn.href = '/nlp/' + file.name;

      if (file.hasCode && file.code) {
        modalCopyBtn.style.display = 'inline-flex';
        modalBody.innerHTML = '<pre class="code-block"><code>' + escapeHtml(file.code) + '</code></pre>';
      } else if (file.ext === '.pdf') {
        modalCopyBtn.style.display = 'none';
        modalBody.innerHTML = '<div style="text-align:center; padding: 40px;">' +
          '<h3 style="color:#f8fafc; margin-bottom:12px;">PDF Document: ' + file.name + ' (' + file.sizeFormatted + ')</h3>' +
          '<p style="color:#94a3b8; margin-bottom: 24px;">This is a compiled A4 PDF lab manual with formatted programs and outputs.</p>' +
          '<a href="/nlp/' + file.name + '" target="_blank" class="btn btn-primary">Open Full PDF in New Tab</a>' +
          '</div>';
      } else if (file.ext === '.html') {
        modalCopyBtn.style.display = 'none';
        modalBody.innerHTML = '<div style="text-align:center; padding: 40px;">' +
          '<h3 style="color:#f8fafc; margin-bottom:12px;">HTML Interactive Guide: ' + file.name + '</h3>' +
          '<p style="color:#94a3b8; margin-bottom: 24px;">Full standalone web manual containing all 42 practical programs with syntax highlighting.</p>' +
          '<a href="/nlp/' + file.name + '" target="_blank" class="btn btn-primary">Open Full Guide in New Tab</a>' +
          '</div>';
      } else if (file.ext === '.wav') {
        modalCopyBtn.style.display = 'none';
        modalBody.innerHTML = '<div style="text-align:center; padding: 40px;">' +
          '<h3 style="color:#f8fafc; margin-bottom:12px;">Speech Signal Audio: ' + file.name + '</h3>' +
          '<p style="color:#94a3b8; margin-bottom: 20px;">16 kHz mono WAV file analyzed in Program 06.</p>' +
          '<audio controls style="width: 100%; max-width: 400px; margin-bottom: 20px;"><source src="/nlp/' + file.name + '" type="audio/wav"></audio>' +
          '</div>';
      } else if (file.ext === '.png') {
        modalCopyBtn.style.display = 'none';
        modalBody.innerHTML = '<div style="text-align:center; padding: 20px;">' +
          '<h3 style="color:#f8fafc; margin-bottom:16px;">Semantic Network Graph: ' + file.name + '</h3>' +
          '<img src="/nlp/' + file.name + '" alt="Semantic Network" style="max-width:100%; max-height:480px; border-radius:8px; border:1px solid rgba(255,255,255,0.1);">' +
          '</div>';
      } else if (file.ext === '.zip') {
        modalCopyBtn.style.display = 'none';
        modalBody.innerHTML = '<div style="text-align:center; padding: 40px;">' +
          '<h3 style="color:#f8fafc; margin-bottom:12px;">Complete ZIP Bundle: ' + file.name + ' (' + file.sizeFormatted + ')</h3>' +
          '<p style="color:#94a3b8; margin-bottom: 24px;">Contains all 42 practical python scripts, assets, PDF manual, and documentation.</p>' +
          '<a href="/nlp/' + file.name + '" download class="btn btn-primary">Download Complete ZIP Archive</a>' +
          '</div>';
      } else {
        modalCopyBtn.style.display = 'none';
        modalBody.innerHTML = '<div style="text-align:center; padding: 40px;"><p style="color:#94a3b8;">Binary or large file. Please use the download button above.</p></div>';
      }

      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = 'auto';
      currentModalFile = null;
    }

    function copyFileCode(fileName) {
      const file = fileData.find(f => f.name === fileName);
      if (file && file.code) {
        copyToClipboard(file.code, file.name);
      }
    }

    function escapeHtml(text) {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    // Event Listeners
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      searchClear.style.display = searchQuery ? 'block' : 'none';
      renderTable();
    });

    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      searchClear.style.display = 'none';
      renderTable();
      searchInput.focus();
    });

    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.cat;
        renderTable();
      });
    });

    modalCloseBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });

    modalCopyBtn.addEventListener('click', () => {
      if (currentModalFile && currentModalFile.code) {
        copyToClipboard(currentModalFile.code, currentModalFile.name);
      }
    });

    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    });

    // Initial render
    renderTable();
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(destNlpDir, 'index.html'), html, 'utf8');
console.log('Successfully generated public/nlp/index.html');
