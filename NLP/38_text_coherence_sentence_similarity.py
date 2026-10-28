# Program 38: Analyze text coherence using sentence similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

sents = [
    "Python is great for NLP programming.",
    "NLP allows computers to understand text.",
    "Computers use text to learn language."
]

vecs = TfidfVectorizer().fit_transform(sents)
# Measure similarity between consecutive adjacent sentences
coherence = [float(cosine_similarity(vecs[i], vecs[i+1])[0][0]) for i in range(len(sents)-1)]

print("Pairwise Similarities: ", [round(s, 2) for s in coherence])
print("Overall Coherence Score:", round(sum(coherence) / len(coherence), 2))

# Output:
# Pairwise Similarities:  [0.12, 0.38]
# Overall Coherence Score: 0.25
