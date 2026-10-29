# Question 11: Piecewise Linear Transformations
import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread('image.jpg', 0)
# Contrast stretching: map [50, 180] to [0, 255]
stretched = np.uint8(np.clip((img - 50) * (255.0 / (180 - 50)), 0, 255))
# Thresholding: binary piecewise linear
_, thresh = cv2.threshold(img, 128, 255, cv2.THRESH_BINARY)

plt.subplot(1, 3, 1), plt.imshow(img, cmap='gray'), plt.title('Original'), plt.axis('off')
plt.subplot(1, 3, 2), plt.imshow(stretched, cmap='gray'), plt.title('Contrast Stretched'), plt.axis('off')
plt.subplot(1, 3, 3), plt.imshow(thresh, cmap='gray'), plt.title('Thresholded'), plt.axis('off')
plt.show()

# Output: Original, contrast-stretched, and binary thresholded images
