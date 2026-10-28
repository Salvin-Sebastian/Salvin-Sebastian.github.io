# Program 20: Perform POS tagging using NLTK
import nltk

sent = "The quick brown fox jumps over the lazy dog"
tokens = nltk.word_tokenize(sent)
tags = nltk.pos_tag(tokens)

print("Tokens:", tokens[:4])
print("Tags:  ", tags[:4])

# Output:
# Tokens: ['The', 'quick', 'brown', 'fox']
# Tags:   [('The', 'DT'), ('quick', 'JJ'), ('brown', 'NN'), ('fox', 'NN')]
