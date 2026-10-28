# Program 32: Represent sentence meaning using logical forms
from nltk.sem.logic import Expression

expr1 = Expression.fromstring("Loves(john, mary)")
expr2 = Expression.fromstring("all x.(Student(x) -> Studies(x))")

print("Sentence 1 FOL:", expr1)
print("Sentence 2 FOL:", expr2)

# Output:
# Sentence 1 FOL: Loves(john,mary)
# Sentence 2 FOL: all x.(Student(x) -> Studies(x))
