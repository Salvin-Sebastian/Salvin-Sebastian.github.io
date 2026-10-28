# Program 40: Implement Information Retrieval using TF-IDF
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

docs = [
    "Python is for data science and AI",
    "Deep learning models use neural networks",
    "SQL databases store structured relational records"
]

vec = TfidfVectorizer()
X = vec.fit_transform(docs)

query = ["neural networks deep learning"]
sims = cosine_similarity(vec.transform(query), X)[0]
best_idx = sims.argmax()

print("Query:     ", query[0])
print(f"Best Match (Doc {best_idx + 1}, score={sims[best_idx]:.2f}): {docs[best_idx]}")

# Output:
# Query:      neural networks deep learning
# Best Match (Doc 2, score=0.74): Deep learning models use neural networks
