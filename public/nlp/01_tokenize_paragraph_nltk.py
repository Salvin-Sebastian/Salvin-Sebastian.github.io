# Program 01: Tokenize a paragraph into sentences and words using NLTK
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize

text = "Hello world! Welcome to NLP. Let us learn."

print("Sentences:", sent_tokenize(text))
print("Words:    ", word_tokenize(text))

# Output:
# Sentences: ['Hello world!', 'Welcome to NLP.', 'Let us learn.']
# Words:     ['Hello', 'world', '!', 'Welcome', 'to', 'NLP', '.', 'Let', 'us', 'learn', '.']
