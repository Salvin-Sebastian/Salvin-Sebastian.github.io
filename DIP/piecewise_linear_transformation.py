# Question 11: Perform Piecewise Linear Transformations (Contrast Stretching and Thresholding)
import cv2
import numpy as np
import matplotlib.pyplot as plt

# Read image in grayscale
img = cv2.imread("sample.jpeg", 0)

# Contrast Stretching
contrast = cv2.normalize(img, None, 0, 255, cv2.NORM_MINMAX)

# Thresholding
threshold_value = 128
_, threshold = cv2.threshold(img, threshold_value, 255, cv2.THRESH_BINARY)

# Display images
plt.figure(figsize=(15,5))

plt.subplot(1,3,1)
plt.imshow(img, cmap='gray')
plt.title("Original Image")
plt.axis("off")

plt.subplot(1,3,2)
plt.imshow(contrast, cmap='gray')
plt.title("Contrast Stretching")
plt.axis("off")

plt.subplot(1,3,3)
plt.imshow(threshold, cmap='gray')
plt.title("Thresholding")
plt.axis("off")

plt.show()
