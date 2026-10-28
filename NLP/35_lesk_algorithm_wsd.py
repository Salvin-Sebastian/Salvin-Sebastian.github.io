# Program 35: Implement the Lesk algorithm for WSD
import nltk
from nltk.wsd import lesk

sent1 = "I deposited money in the bank".split()
sent2 = "The fisherman sat on the river bank".split()

sense1 = lesk(sent1, "bank", pos='n')
sense2 = lesk(sent2, "bank", pos='n')

print("Sense 1 (Finance):", sense1.name(), "-", sense1.definition())
print("Sense 2 (River):  ", sense2.name(), "-", sense2.definition())

# Output:
# Sense 1 (Finance): savings_bank.n.02 - a container (usually with a slot in the top) for keeping money at home
# Sense 2 (River):   bank.n.01 - sloping land (especially the slope beside a body of water)
