# Program 33: Perform lexical semantic analysis using WordNet similarity measures
from nltk.corpus import wordnet as wn

c1 = wn.synsets("cat", pos=wn.NOUN)[0]
c2 = wn.synsets("dog", pos=wn.NOUN)[0]

print("Path Similarity:            ", round(c1.path_similarity(c2), 4))
print("Leacock-Chodorow Similarity:", round(c1.lch_similarity(c2), 4))
print("Wu-Palmer Similarity:       ", round(c1.wup_similarity(c2), 4))

# Output:
# Path Similarity:             0.2
# Leacock-Chodorow Similarity: 2.0281
# Wu-Palmer Similarity:        0.8571
