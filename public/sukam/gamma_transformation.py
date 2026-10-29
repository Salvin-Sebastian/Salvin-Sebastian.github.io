# Question 10: Gamma Transformation
import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread('image.jpg', 0)
gamma_low = np.uint8(255 * (img / 255.0) ** 0.5)
gamma_high = np.uint8(255 * (img / 255.0) ** 2.0)

plt.subplot(1, 3, 1), plt.imshow(img, cmap='gray'), plt.title('Original'), plt.axis('off')
plt.subplot(1, 3, 2), plt.imshow(gamma_low, cmap='gray'), plt.title('Gamma = 0.5'), plt.axis('off')
plt.subplot(1, 3, 3), plt.imshow(gamma_high, cmap='gray'), plt.title('Gamma = 2.0'), plt.axis('off')
plt.show()

# Output: Original and power-law (gamma) transformed images with gamma=0.5 and 2.0
