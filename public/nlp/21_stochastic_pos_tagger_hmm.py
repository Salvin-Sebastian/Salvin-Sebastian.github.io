# Program 21: Implement a stochastic POS tagger using HMM
import nltk
from nltk.tag import HiddenMarkovModelTagger

train_data = [[('the', 'DT'), ('cat', 'NN'), ('sat', 'VB')],
              [('a', 'DT'), ('dog', 'NN'), ('barked', 'VB')]]

tagger = HiddenMarkovModelTagger.train(train_data)
test_sent = "the dog sat".split()
print("Tagged:", tagger.tag(test_sent))

# Output:
# Tagged: [('the', 'DT'), ('dog', 'NN'), ('sat', 'VB')]
