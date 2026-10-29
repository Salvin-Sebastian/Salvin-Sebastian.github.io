# Question 19: Apply gradient operators (Sobel, Prewitt) for edge detection
import cv2
import numpy as np
import matplotlib.pyplot as plt

# Read the image
image = cv2.imread("sample.jpeg")   # Replace with your image path

# Convert to grayscale
gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# -----------------------------
# Sobel Edge Detection
# -----------------------------
sobel_x = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
sobel_y = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)
sobel = cv2.magnitude(sobel_x, sobel_y)
sobel = cv2.convertScaleAbs(sobel)

# -----------------------------
# Prewitt Edge Detection
# -----------------------------
kernel_x = np.array([[-1, 0, 1],
                     [-1, 0, 1],
                     [-1, 0, 1]])

kernel_y = np.array([[-1, -1, -1],
                     [ 0,  0,  0],
                     [ 1,  1,  1]])

prewitt_x = cv2.filter2D(gray, -1, kernel_x)
prewitt_y = cv2.filter2D(gray, -1, kernel_y)
prewitt = cv2.addWeighted(prewitt_x, 0.5, prewitt_y, 0.5, 0)

# -----------------------------
# Display Results
# -----------------------------
plt.figure(figsize=(15,5))

plt.subplot(1,3,1)
plt.imshow(gray, cmap='gray')
plt.title("Original")
plt.axis("off")

plt.subplot(1,3,2)
plt.imshow(sobel, cmap='gray')
plt.title("Sobel")
plt.axis("off")

plt.subplot(1,3,3)
plt.imshow(prewitt, cmap='gray')
plt.title("Prewitt")
plt.axis("off")

plt.tight_layout()
plt.show()
