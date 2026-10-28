# Program 12: Access and query WordNet for synonyms, antonyms, and hypernyms
from nltk.corpus import wordnet as wn

syn = wn.synsets("good", pos=wn.ADJ)[0]
synonyms = [l.name() for l in syn.lemmas()]
antonyms = [l.antonyms()[0].name() for l in syn.lemmas() if l.antonyms()]
hypernyms = [h.name() for h in syn.hypernyms()]

print("Synonyms: ", synonyms)
print("Antonyms: ", antonyms)

# Output:
# Synonyms:  ['good']
# Antonyms:  ['bad']
