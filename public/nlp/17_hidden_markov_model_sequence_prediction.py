# Program 17: Implement a simple Hidden Markov Model (HMM) for sequence prediction
states = ['Sunny', 'Rainy']
start_p = {'Sunny': 0.6, 'Rainy': 0.4}
trans_p = {'Sunny': {'Sunny': 0.7, 'Rainy': 0.3}, 'Rainy': {'Sunny': 0.4, 'Rainy': 0.6}}
emit_p  = {'Sunny': {'walk': 0.6, 'shop': 0.4}, 'Rainy': {'walk': 0.1, 'shop': 0.9}}

obs = ['walk', 'shop']
# Viterbi decoding algorithm
v0 = {s: start_p[s] * emit_p[s][obs[0]] for s in states}
v1 = {s: max(v0[prev] * trans_p[prev][s] * emit_p[s][obs[1]] for prev in states) for s in states}
best_state = max(v1, key=v1.get)

print("Observations:      ", obs)
print("Likely Final State:", best_state)

# Output:
# Observations:       ['walk', 'shop']
# Likely Final State: Sunny
