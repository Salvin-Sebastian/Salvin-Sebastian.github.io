# Program 30: Evaluate parsing performance using precision and recall
# Extracted labeled constituent brackets: (Label, start_idx, end_idx)
gold = {('NP', 0, 2), ('VP', 2, 4), ('S', 0, 4)}
cand = {('NP', 0, 2), ('VP', 2, 3), ('S', 0, 4)}

matched = len(gold & cand)
precision = matched / len(cand)
recall = matched / len(gold)
f1 = 2 * precision * recall / (precision + recall)

print(f"Precision: {precision:.2f}, Recall: {recall:.2f}, F1: {f1:.2f}")

# Output:
# Precision: 0.67, Recall: 0.67, F1: 0.67
