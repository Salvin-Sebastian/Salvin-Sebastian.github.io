# Program 10: Implement text preprocessing: tokenization, stopword removal, stemming, lemmatization
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer

text = "The birds were flying and singing happily"
tokens = [w.lower() for w in nltk.word_tokenize(text) if w.isalnum()]
stops = set(stopwords.words('english'))
words = [w for w in tokens if w not in stops]

ps, wn = PorterStemmer(), WordNetLemmatizer()
print("Filtered:  ", words)
print("Stemmed:   ", [ps.stem(w) for w in words])
print("Lemmatized:", [wn.lemmatize(w) for w in words])

# Output:
# Filtered:   ['birds', 'flying', 'singing', 'happily']
# Stemmed:    ['bird', 'fli', 'sing', 'happili']
# Lemmatized: ['bird', 'flying', 'singing', 'happily']
