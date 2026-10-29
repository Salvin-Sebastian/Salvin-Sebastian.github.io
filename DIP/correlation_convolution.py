# Question 15: Perform spatial correlation and convolution using custom kernels
import cv2
import numpy as np
import matplotlib.pyplot as plt
# Read the image in grayscale
image = cv2.imread("image.jpeg", 0)
# Define a custom kernel
kernel = np.array([
    [1, 2, 1],
    [0, 0, 0],
    [-1, -2, -1]
], dtype=np.float32)
# -----------------------------
# Spatial Correlation
# -----------------------------
correlation = cv2.filter2D(image, -1, kernel)
# -----------------------------
# Spatial Convolution
# -----------------------------
# Flip the kernel by 180 degrees
flipped_kernel = cv2.flip(kernel, -1)
convolution = cv2.filter2D(image, -1, flipped_kernel)
# -----------------------------
# Display Results
# -----------------------------
plt.figure(figsize=(15, 5))
plt.subplot(1, 3, 1)
plt.imshow(image, cmap="gray")
plt.title("Original Image")
plt.axis("off")
plt.subplot(1, 3, 2)
plt.imshow(correlation, cmap="gray")
plt.title("Spatial Correlation")
plt.axis("off")
plt.subplot(1, 3, 3)
plt.imshow(convolution, cmap="gray")
plt.title("Spatial Convolution")
plt.axis("off")
plt.tight_layout()
plt.show()
