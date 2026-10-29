# Question 18: Unsharp Masking and High-Boost Filtering
import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread('image.jpg', 0)
blur = cv2.GaussianBlur(img, (5, 5), 0)
mask = img.astype(np.float32) - blur.astype(np.float32)

unsharp = np.uint8(np.clip(img + 1.0 * mask, 0, 255))
highboost = np.uint8(np.clip(img + 2.0 * mask, 0, 255))

plt.subplot(1, 3, 1), plt.imshow(img, cmap='gray'), plt.title('Original'), plt.axis('off')
plt.subplot(1, 3, 2), plt.imshow(unsharp, cmap='gray'), plt.title('Unsharp (k=1)'), plt.axis('off')
plt.subplot(1, 3, 3), plt.imshow(highboost, cmap='gray'), plt.title('High-Boost (k=2)'), plt.axis('off')
plt.show()

# Output: Original, unsharp masked, and high-boost filtered images
