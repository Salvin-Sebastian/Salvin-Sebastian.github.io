# Program 04: Perform basic semantic analysis using word similarity
from nltk.corpus import wordnet as wn

w1 = wn.synsets("cat", pos=wn.NOUN)[0]
w2 = wn.synsets("dog", pos=wn.NOUN)[0]

print("Path Similarity:     ", w1.path_similarity(w2))
print("Wu-Palmer Similarity:", round(w1.wup_similarity(w2), 4))

# Output:
# Path Similarity:      0.2
# Wu-Palmer Similarity: 0.8571
