# Question 4: Adjacency and Connectivity (4-neighbors and 8-neighbors of a pixel in a binary image)
import numpy as np
import matplotlib.pyplot as plt

# Create binary image
img = np.array([
    [0, 0, 0, 0, 0],
    [0, 1, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0]
])

# Display binary image
plt.imshow(img, cmap="gray")
plt.title("Binary Image")
plt.show()

# Pixel position
row = 2
col = 2

print("Selected Pixel:", img[row, col])

# 4-neighbors
print("\n4-Adjacency:")
print("Top:", img[row - 1, col])
print("Bottom:", img[row + 1, col])
print("Left:", img[row, col - 1])
print("Right:", img[row, col + 1])

# 8-neighbors
print("\n8-Adjacency:")

for i in range(row - 1, row + 2):
    for j in range(col - 1, col + 2):
        if (i, j) != (row, col):
            print(f"Neighbor ({i},{j}) =", img[i, j])
