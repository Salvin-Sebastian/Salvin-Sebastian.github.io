# Program 15: Implement a simple Finite State Automaton (FSA) for word recognition
def fsa_recognize_ing(word):
    # Recognizes words ending with 'ing'
    state = 0
    for ch in word.lower():
        if state == 0: state = 1 if ch == 'i' else 0
        elif state == 1: state = 2 if ch == 'n' else (1 if ch == 'i' else 0)
        elif state == 2: state = 3 if ch == 'g' else (1 if ch == 'i' else 0)
        elif state == 3: state = 1 if ch == 'i' else 0
    return state == 3

for w in ["sing", "playing", "walk"]:
    print(f"'{w}': {fsa_recognize_ing(w)}")

# Output:
# 'sing': True
# 'playing': True
# 'walk': False
