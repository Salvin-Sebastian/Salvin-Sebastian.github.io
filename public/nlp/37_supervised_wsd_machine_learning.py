# Program 37: Build a supervised WSD model using machine learning
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

# Polysemous word 'bass': Fish vs Music
X = ["catch sea bass fish", "eat fresh sea bass", "play electric bass guitar", "loud bass music notes"]
y = ["Fish", "Fish", "Music", "Music"]

vec = CountVectorizer()
clf = MultinomialNB().fit(vec.fit_transform(X), y)

test = ["fresh sea bass", "loud bass music"]
print("Predictions:", list(zip(test, [str(p) for p in clf.predict(vec.transform(test))])))

# Output:
# Predictions: [('fresh sea bass', 'Fish'), ('loud bass music', 'Music')]
