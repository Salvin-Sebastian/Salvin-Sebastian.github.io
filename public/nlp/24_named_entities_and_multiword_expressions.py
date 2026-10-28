# Program 24: Identify named entities and multiword expressions
import nltk
from nltk.tokenize import MWETokenizer

sent = "Sundar Pichai works at Google in New York"
tokens = nltk.word_tokenize(sent)

# Named Entities
chunks = nltk.ne_chunk(nltk.pos_tag(tokens))
entities = [f"{' '.join(c[0] for c in sub)} ({sub.label()})" for sub in chunks if hasattr(sub, 'label')]

# Multiword Expressions
mwe = MWETokenizer([('New', 'York')])
print("Named Entities:       ", entities)
print("Tokenized with MWE:   ", mwe.tokenize(tokens))

# Output:
# Named Entities:        ['Sundar (PERSON)', 'Pichai (PERSON)', 'Google (ORGANIZATION)', 'New York (GPE)']
# Tokenized with MWE:    ['Sundar', 'Pichai', 'works', 'at', 'Google', 'in', 'New_York']
