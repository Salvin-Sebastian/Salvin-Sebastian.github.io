# Program 02: Build a simple unigram language model for a given corpus
from collections import Counter

corpus = "the cat sat on the mat and the cat purred".split()
total = len(corpus)
counts = Counter(corpus)
unigram_probs = {w: count / total for w, count in counts.items()}

# Calculate probability of a test sentence
sent = "the cat purred".split()
prob = 1.0
for w in sent:
    prob *= unigram_probs.get(w, 0)

print("Sample Word Probabilities:", {k: round(v, 2) for k, v in list(unigram_probs.items())[:3]})
print(f"P('the cat purred'): {prob:.4f}")

# Output:
# Sample Word Probabilities: {'the': 0.3, 'cat': 0.2, 'sat': 0.1}
# P('the cat purred'): 0.0060
