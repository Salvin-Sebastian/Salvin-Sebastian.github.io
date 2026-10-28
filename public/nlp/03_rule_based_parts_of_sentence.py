# Program 03: Implement a rule-based system to identify parts of a sentence
import nltk

sent = "The student solved the puzzle"
tags = nltk.pos_tag(nltk.word_tokenize(sent))

# Rules: words before verb = Subject, verb = Predicate, words after = Object
subject, verb, obj = [], [], []
state = 'SUBJ'
for w, t in tags:
    if t.startswith('VB'):
        state = 'VERB'
        verb.append(w)
    elif state == 'VERB':
        state = 'OBJ'
        obj.append(w)
    elif state == 'SUBJ':
        subject.append(w)
    else:
        obj.append(w)

print("Subject:  ", " ".join(subject))
print("Predicate:", " ".join(verb))
print("Object:   ", " ".join(obj))

# Output:
# Subject:   The student
# Predicate: solved
# Object:    the puzzle
