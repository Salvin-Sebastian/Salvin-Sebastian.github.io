# Program 28: Implement probabilistic parsing using PCFG
import nltk

grammar = nltk.PCFG.fromstring("""
S -> NP VP [1.0]
NP -> Det N [0.6] | 'John' [0.4]
VP -> V NP [1.0]
Det -> 'the' [1.0]
N -> 'dog' [1.0]
V -> 'saw' [1.0]
""")

parser = nltk.ViterbiParser(grammar)
sent = "John saw the dog".split()

for tree in parser.parse(sent):
    print("Viterbi PCFG Tree:", tree)
    print("Probability:      ", round(tree.prob(), 4))

# Output:
# Viterbi PCFG Tree: (S (NP John) (VP (V saw) (NP (Det the) (N dog)))) (p=0.24)
# Probability:       0.24
