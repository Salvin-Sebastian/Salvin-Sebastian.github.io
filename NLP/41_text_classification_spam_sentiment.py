# Program 41: Perform text classification (spam detection / sentiment analysis)
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

texts = ["win cash prize claim now", "important meeting notes", "win free prize lottery", "call me tomorrow"]
labels = ["Spam", "Ham", "Spam", "Ham"]

vec = CountVectorizer()
clf = MultinomialNB().fit(vec.fit_transform(texts), labels)

test = ["free prize winner", "see you at meeting"]
print("Input:      ", test)
print("Predictions:", [str(p) for p in clf.predict(vec.transform(test))])

# Output:
# Input:       ['free prize winner', 'see you at meeting']
# Predictions: ['Spam', 'Ham']
