# Program 42: Generate text summaries using extractive methods
from collections import Counter
from nltk.tokenize import sent_tokenize, word_tokenize

text = "NLP is a branch of AI. It helps computers understand human language. NLP is useful for translation and chatbots."
sents = sent_tokenize(text)
words = [w.lower() for w in word_tokenize(text) if w.isalnum()]
freq = Counter(words)

# Score sentences by word frequency
scores = {s: sum(freq[w.lower()] for w in word_tokenize(s) if w.isalnum()) for s in sents}
top_sent = max(scores, key=scores.get)

print("Original Sentences:", len(sents))
print("Extractive Summary:", top_sent)

# Output:
# Original Sentences: 3
# Extractive Summary: NLP is useful for translation and chatbots.
