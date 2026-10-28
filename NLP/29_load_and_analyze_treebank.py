# Program 29: Load and analyze TreeBank data using NLTK
import nltk
from nltk.corpus import treebank

tree = treebank.parsed_sents()[0]

print("Treebank Sentence Words:", tree.leaves()[:5])
print("Sample Subtree (NP):    ", [s for s in tree.subtrees() if s.label() == 'NP'][0])

# Output:
# Treebank Sentence Words: ['Pierre', 'Vinken', ',', '61', 'years']
# Sample Subtree (NP):     (NP (NNP Pierre) (NNP Vinken))
