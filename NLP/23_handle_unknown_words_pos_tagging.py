# Program 23: Handle unknown words in POS tagging
lexicon = {'the': 'DT', 'is': 'VBZ', 'fast': 'JJ'}

def tag_unknown(w):
    if w.lower() in lexicon: return lexicon[w.lower()]
    if w.isdigit(): return 'CD'        # Number
    if w.endswith('ing'): return 'VBG' # Gerund
    if w.endswith('ed'): return 'VBD'  # Past verb
    if w.endswith('ly'): return 'RB'   # Adverb
    return 'NN'                        # Default open-class noun

sent = "the 2026 player is running quickly".split()
print("Tagged:", [(w, tag_unknown(w)) for w in sent])

# Output:
# Tagged: [('the', 'DT'), ('2026', 'CD'), ('player', 'NN'), ('is', 'VBZ'), ('running', 'VBG'), ('quickly', 'RB')]
