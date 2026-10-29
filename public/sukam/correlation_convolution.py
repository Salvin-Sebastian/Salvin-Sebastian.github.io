# Question 15: Spatial Correlation and Convolution
import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread('image.jpg', 0)
# Asymmetric kernel to distinguish correlation from convolution
kernel = np.array([[1, 2, 3], [0, 0, 0], [-1, -2, -3]], dtype=np.float32)

corr = cv2.filter2D(img, -1, kernel)               # Correlation (unflipped)
conv = cv2.filter2D(img, -1, np.flip(kernel))     # Convolution (180-degree flipped)

plt.subplot(1, 2, 1), plt.imshow(corr, cmap='gray'), plt.title('Correlation'), plt.axis('off')
plt.subplot(1, 2, 2), plt.imshow(conv, cmap='gray'), plt.title('Convolution'), plt.axis('off')
plt.show()

# Output: Demonstrates spatial correlation and convolution using flipped kernel
