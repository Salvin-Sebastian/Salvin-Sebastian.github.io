# Program 31: Visualize parse trees for given sentences
from nltk.tree import Tree

tree = Tree.fromstring("(S (NP (Det The) (N cat)) (VP (V sat)))")

print("Bracket Representation:")
print(tree)
print("\nASCII Visualization:")
tree.pretty_print()

# Output:
# Bracket Representation:
# (S (NP (Det The) (N cat)) (VP (V sat)))
# 
# ASCII Visualization:
#         S         
#    _____|____      
#   NP         VP   
#  __|___      |     
# Det    N     V    
#  |     |     |     
# The   cat   sat   
