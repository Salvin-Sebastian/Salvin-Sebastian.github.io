# Question 17: Laplacian Sharpening
import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread('image.jpg', 0)
lap = cv2.Laplacian(img, cv2.CV_64F)
sharpened = np.uint8(np.clip(img - lap, 0, 255))

plt.subplot(1, 3, 1), plt.imshow(img, cmap='gray'), plt.title('Original'), plt.axis('off')
plt.subplot(1, 3, 2), plt.imshow(np.abs(lap), cmap='gray'), plt.title('Laplacian'), plt.axis('off')
plt.subplot(1, 3, 3), plt.imshow(sharpened, cmap='gray'), plt.title('Sharpened'), plt.axis('off')
plt.show()

# Output: Original, Laplacian edge response, and Laplacian sharpened image
