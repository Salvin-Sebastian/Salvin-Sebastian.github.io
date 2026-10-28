# Program 26: Implement top-down and bottom-up parsing
import nltk

grammar = nltk.CFG.fromstring("""
S -> NP VP
NP -> 'John' | 'Mary'
VP -> V NP
V -> 'saw'
""")

sent = "John saw Mary".split()
td = nltk.RecursiveDescentParser(grammar)  # Top-Down Parser
bu = nltk.ShiftReduceParser(grammar)       # Bottom-Up Parser

print("Top-Down Tree: ", list(td.parse(sent))[0])
print("Bottom-Up Tree:", list(bu.parse(sent))[0])

# Output:
# Top-Down Tree:  (S (NP John) (VP (V saw) (NP Mary)))
# Bottom-Up Tree: (S (NP John) (VP (V saw) (NP Mary)))
