# Program 27: Use chart parsing to analyze ambiguous sentences
import nltk

grammar = nltk.CFG.fromstring("""
S -> NP VP
NP -> 'I' | Det N | NP PP
VP -> V NP | VP PP
PP -> P NP
Det -> 'the' | 'a'
N -> 'man' | 'telescope'
V -> 'saw'
P -> 'with'
""")

parser = nltk.ChartParser(grammar)
sent = "I saw the man with a telescope".split()
trees = list(parser.parse(sent))

print(f"Ambiguous Parses Count: {len(trees)}")
for i, t in enumerate(trees, 1):
    print(f"Parse Tree {i}:", t)

# Output:
# Ambiguous Parses Count: 2
# Parse Tree 1: (S (NP I) (VP (VP (V saw) (NP (Det the) (N man))) (PP (P with) (NP (Det a) (N telescope)))))
# Parse Tree 2: (S (NP I) (VP (V saw) (NP (NP (Det the) (N man)) (PP (P with) (NP (Det a) (N telescope))))))
