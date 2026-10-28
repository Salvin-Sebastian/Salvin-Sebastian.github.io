# Program 19: Apply Conditional Random Fields (CRF) for sequence labeling (NER)
import sklearn_crfsuite

def word2features(sent):
    return [{'word': w, 'is_title': w.istitle()} for w in sent]

X_train = [word2features(['John', 'lives', 'in', 'London'])]
y_train = [['B-PER', 'O', 'O', 'B-LOC']]

crf = sklearn_crfsuite.CRF()
crf.fit(X_train, y_train)

X_test = [word2features(['Mary', 'visited', 'Paris'])]
print("Input: ", ['Mary', 'visited', 'Paris'])
print("Tagged:", crf.predict(X_test)[0])

# Output:
# Input:  ['Mary', 'visited', 'Paris']
# Tagged: ['B-PER', 'O', 'B-LOC']
