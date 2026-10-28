# Program 25: Define a Context-Free Grammar (CFG) in Python and parse sentences
import nltk

grammar = nltk.CFG.fromstring("""
S -> NP VP
NP -> Det N
VP -> V NP
Det -> 'the' | 'a'
N -> 'dog' | 'cat'
V -> 'chased'
""")

parser = nltk.ChartParser(grammar)
sent = "the dog chased a cat".split()

for tree in parser.parse(sent):
    print("Parsed Tree:", tree)

# Output:
# Parsed Tree: (S (NP (Det the) (N dog)) (VP (V chased) (NP (Det a) (N cat))))
