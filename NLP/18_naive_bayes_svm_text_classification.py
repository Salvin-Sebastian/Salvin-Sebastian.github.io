# Program 18: Train a classifier using Naïve Bayes / SVM for text classification
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import SVC

X = ["win cash prize", "football match score", "free lottery winner", "player scored goal"]
y = ["Spam", "Sports", "Spam", "Sports"]

vec = CountVectorizer()
X_vec = vec.fit_transform(X)

nb = MultinomialNB().fit(X_vec, y)
svm = SVC().fit(X_vec, y)

test = vec.transform(["cash prize winner", "match goal"])
print("Naive Bayes:", nb.predict(test))
print("SVM:        ", svm.predict(test))

# Output:
# Naive Bayes: ['Spam' 'Sports']
# SVM:         ['Spam' 'Sports']
