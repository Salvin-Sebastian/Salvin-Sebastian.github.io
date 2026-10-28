# Program 05: Demonstrate pragmatics by identifying speech acts
def identify_speech_act(text):
    if text.endswith('?'): return "Question"
    if text.endswith('!'): return "Exclamation"
    if text.split()[0].lower() in ['please', 'close', 'open', 'stop', 'do']: return "Command"
    return "Statement"

for s in ["What is your name?", "Close the door.", "NLP is amazing!"]:
    print(f"'{s}' -> {identify_speech_act(s)}")

# Output:
# 'What is your name?' -> Question
# 'Close the door.' -> Command
# 'NLP is amazing!' -> Exclamation
