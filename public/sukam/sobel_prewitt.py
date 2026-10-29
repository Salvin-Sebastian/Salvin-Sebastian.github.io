# Question 19: Sobel and Prewitt Edge Detection
import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread('image.jpg', 0)

# Sobel Operator
sx = cv2.Sobel(img, cv2.CV_64F, 1, 0, ksize=3)
sy = cv2.Sobel(img, cv2.CV_64F, 0, 1, ksize=3)
sobel = np.uint8(np.clip(np.hypot(sx, sy), 0, 255))

# Prewitt Operator
px_k = np.array([[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]], dtype=np.float32)
py_k = np.array([[-1, -1, -1], [0, 0, 0], [1, 1, 1]], dtype=np.float32)
px = cv2.filter2D(img, cv2.CV_64F, px_k)
py = cv2.filter2D(img, cv2.CV_64F, py_k)
prewitt = np.uint8(np.clip(np.hypot(px, py), 0, 255))

plt.subplot(1, 3, 1), plt.imshow(img, cmap='gray'), plt.title('Original'), plt.axis('off')
plt.subplot(1, 3, 2), plt.imshow(sobel, cmap='gray'), plt.title('Sobel Edges'), plt.axis('off')
plt.subplot(1, 3, 3), plt.imshow(prewitt, cmap='gray'), plt.title('Prewitt Edges'), plt.axis('off')
plt.show()

# Output: Original image along with Sobel and Prewitt edge detections
