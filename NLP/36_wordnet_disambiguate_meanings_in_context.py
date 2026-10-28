# Program 36: Use WordNet to disambiguate word meanings in context
from nltk.corpus import wordnet as wn

sent = "The cat caught a mouse"
context_syn = wn.synsets("cat", pos=wn.NOUN)[0]

# Disambiguate 'mouse' by selecting synset with highest similarity to context word 'cat'
mouse_senses = wn.synsets("mouse", pos=wn.NOUN)
best_sense = max(mouse_senses, key=lambda s: context_syn.wup_similarity(s) or 0)

print("Target Word: 'mouse' in context 'The cat caught a mouse'")
print("Disambiguated Sense:", best_sense.name(), "-", best_sense.definition())

# Output:
# Target Word: 'mouse' in context 'The cat caught a mouse'
# Disambiguated Sense: mouse.n.01 - any of numerous small rodents...
