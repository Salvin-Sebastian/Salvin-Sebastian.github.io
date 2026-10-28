# Program 22: Demonstrate Transformation-Based Learning (TBL) tagging
sent = "they will fish and opened the can".split()
# Step 1: Initial baseline tagger (all Nouns)
tags = ['NN'] * len(sent)

# Step 2: Contextual transformation rules
for i in range(len(sent)):
    if i > 0 and sent[i-1] in ['will', 'can']: tags[i] = 'VB'  # Modal -> Verb
    elif sent[i].endswith('ed'): tags[i] = 'VBD'              # Suffix -ed -> Past Verb
    elif i > 0 and sent[i-1] == 'the': tags[i] = 'NN'         # Determiner -> Noun

print("Input: ", sent)
print("Tagged:", list(zip(sent, tags)))

# Output:
# Input:  ['they', 'will', 'fish', 'and', 'opened', 'the', 'can']
# Tagged: [('they', 'NN'), ('will', 'NN'), ('fish', 'VB'), ('and', 'NN'), ('opened', 'VBD'), ('the', 'NN'), ('can', 'NN')]
