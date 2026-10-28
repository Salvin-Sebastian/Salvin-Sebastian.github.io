# Program 34: Build a semantic network from a small dataset
import networkx as nx

G = nx.DiGraph([
    ("Canary", "Bird", {'rel': 'is-a'}),
    ("Bird", "Animal", {'rel': 'is-a'}),
    ("Canary", "Yellow", {'rel': 'color'}),
    ("Bird", "Wings", {'rel': 'has'})
])

print("Nodes:", list(G.nodes()))
print("Edges:", [(u, v, d['rel']) for u, v, d in G.edges(data=True)])

# Output:
# Nodes: ['Canary', 'Bird', 'Animal', 'Yellow', 'Wings']
# Edges: [('Canary', 'Bird', 'is-a'), ('Canary', 'Yellow', 'color'), ('Bird', 'Animal', 'is-a'), ('Bird', 'Wings', 'has')]
