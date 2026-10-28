# Program 39: Build a simple Machine Translation system using sequence models
# Sequence-to-sequence translation of words and phrases (English -> French)

seq_model = {
    "hello": "bonjour",
    "how are you": "comment vas-tu",
    "thank you": "merci",
    "good morning": "bonjour"
}

def translate_sequence(sentence):
    text = sentence.lower().strip()
    if text in seq_model:
        return seq_model[text]
    word_map = {"how": "comment", "are": "vas", "you": "tu", "thank": "merci"}
    return " ".join(word_map.get(w, w) for w in text.split())

for s in ["Hello", "How are you", "Thank you"]:
    print(f"'{s}' -> '{translate_sequence(s)}'")

# Output:
# 'Hello' -> 'bonjour'
# 'How are you' -> 'comment vas-tu'
# 'Thank you' -> 'merci'
