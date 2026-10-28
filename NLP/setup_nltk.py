import nltk

resources = [
    'punkt',
    'punkt_tab',
    'averaged_perceptron_tagger',
    'averaged_perceptron_tagger_eng',
    'maxent_ne_chunker',
    'maxent_ne_chunker_tab',
    'words',
    'wordnet',
    'omw-1.4',
    'stopwords',
    'cmudict',
    'treebank',
    'gutenberg'
]

print("Downloading required NLTK data packages...")
for res in resources:
    print(f"Downloading {res}...")
    nltk.download(res)

print("\nAll NLTK resources downloaded successfully! You can now run all 42 programs.")
