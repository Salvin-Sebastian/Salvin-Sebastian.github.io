# Question 23: Morphological Operations
import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread('image.jpg', 0)
_, binary = cv2.threshold(img, 128, 255, cv2.THRESH_BINARY)
kernel = np.ones((5, 5), np.uint8)

erosion = cv2.erode(binary, kernel)
dilation = cv2.dilate(binary, kernel)
opening = cv2.morphologyEx(binary, cv2.MORPH_OPEN, kernel)
closing = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, kernel)

plt.subplot(2, 3, 1), plt.imshow(binary, cmap='gray'), plt.title('Binary'), plt.axis('off')
plt.subplot(2, 3, 2), plt.imshow(erosion, cmap='gray'), plt.title('Erosion'), plt.axis('off')
plt.subplot(2, 3, 3), plt.imshow(dilation, cmap='gray'), plt.title('Dilation'), plt.axis('off')
plt.subplot(2, 3, 4), plt.imshow(opening, cmap='gray'), plt.title('Opening'), plt.axis('off')
plt.subplot(2, 3, 5), plt.imshow(closing, cmap='gray'), plt.title('Closing'), plt.axis('off')
plt.show()

# Output: Binary image with erosion, dilation, opening, and closing operations
