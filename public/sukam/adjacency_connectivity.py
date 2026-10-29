# Question 4: Adjacency and Connectivity
import numpy as np
import cv2

# 5x5 binary image with diagonal 1s
arr = np.array([
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1]], dtype=np.uint8)

n4, _ = cv2.connectedComponents(arr, connectivity=4)
n8, _ = cv2.connectedComponents(arr, connectivity=8)

print(f"4-Connected Components: {n4 - 1}")
print(f"8-Connected Components: {n8 - 1}")

# Output:
# 4-Connected Components: 5
# 8-Connected Components: 1
