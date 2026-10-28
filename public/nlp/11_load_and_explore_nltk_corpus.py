# Program 11: Load and explore a corpus using NLTK
import nltk
from nltk.corpus import gutenberg

words = gutenberg.words('austen-emma.txt')

print("Total Words: ", len(words))
print("Unique Vocab:", len(set(words)))
print("Top 3 Words: ", nltk.FreqDist(w.lower() for w in words if w.isalpha()).most_common(3))

# Output:
# Total Words:  192427
# Unique Vocab: 7811
# Top 3 Words:  [('to', 5239), ('the', 5201), ('and', 4896)]
