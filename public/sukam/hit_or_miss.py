# Question 24: Hit-or-Miss Transformation
import cv2
import numpy as np
import matplotlib.pyplot as plt

# 10x10 binary image with a pattern
img = np.zeros((10, 10), dtype=np.uint8)
img[2:5, 2:5] = 255   # 3x3 block
img[7, 7] = 255       # isolated point

# Structuring element to find an isolated 1 surrounded by 0s
kernel = np.array([
    [-1, -1, -1],
    [-1,  1, -1],
    [-1, -1, -1]], dtype=np.int8)

output = cv2.morphologyEx(img, cv2.MORPH_HITMISS, kernel)

plt.subplot(1, 2, 1), plt.imshow(img, cmap='gray'), plt.title('Binary Image'), plt.axis('off')
plt.subplot(1, 2, 2), plt.imshow(output, cmap='gray'), plt.title('Hit-or-Miss (Isolated Point)'), plt.axis('off')
plt.show()

# Output: Detects an isolated single pixel using hit-or-miss morphological transformation
