# Program 07: Convert text to phoneme representation using a phonetic dictionary
import nltk
from nltk.corpus import cmudict

d = cmudict.dict()
words = "natural language python".split()

for w in words:
    if w in d:
        print(f"{w:<10} -> {' '.join(d[w][0])}")

# Output:
# natural    -> N AE1 CH ER0 AH0 L
# language   -> L AE1 NG G W AH0 JH
# python     -> P AY1 TH AA0 N
